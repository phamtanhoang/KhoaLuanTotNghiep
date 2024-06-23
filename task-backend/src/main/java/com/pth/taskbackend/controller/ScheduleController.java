package com.pth.taskbackend.controller;

import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.*;
import com.pth.taskbackend.repository.UserRepository;
import com.pth.taskbackend.security.JwtService;
import com.pth.taskbackend.service.CandidateService;
import com.pth.taskbackend.service.EmployerService;
import com.pth.taskbackend.service.HumanResourceService;
import com.pth.taskbackend.service.ScheduleService;
import com.pth.taskbackend.util.func.CheckPermission;
import io.jsonwebtoken.ExpiredJwtException;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static com.pth.taskbackend.util.constant.PathConstant.BASE_URL;

@CrossOrigin(origins = "*")
@Tag(name = "Schedule", description = "Schedule APIs")
@SecurityRequirement(name = "javainuseapi")
@RestController
@RequestMapping(value = {BASE_URL + "/schedules"})
public class ScheduleController {
    @Autowired
    CheckPermission checkPermission;
    @Autowired
    JwtService jwtService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ScheduleService scheduleService;
    @Autowired
    CandidateService candidateService;
    @Autowired
    HumanResourceService humanResourceService;
    @Autowired
    EmployerService employerService;

    @GetMapping("")
    public ResponseEntity<BaseResponse> getDataSchedule(@RequestHeader("Authorization") String token) throws IOException {
        try {
            String username = jwtService.extractUsername(token.substring(7));
            boolean hasPermission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER) ||
                    checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR) ||
                    checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.CANDIDATE);
            if (!hasPermission) {
                return ResponseEntity.ok(new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null));
            }
            Optional<User> userOptional = userRepository.findByEmail(username);

            if (userOptional.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
            User user = userOptional.get();
            if (user.getRole() == ERole.CANDIDATE) {
                Optional<Candidate> candidateOptional = candidateService.findByUserEmail(user.getEmail());
                if (candidateOptional.isEmpty()) {
                    return ResponseEntity.ok(
                            new BaseResponse("Không tìm thấy ứng viên!", HttpStatus.NOT_FOUND.value(), null)
                    );
                }
                List<Schedule> scheduleList = scheduleService.getDataScheduleByCandidateId(candidateOptional.get().getId());
                return ResponseEntity.ok(new BaseResponse("Tải danh sách lịch hẹn thành công", 200, scheduleList));
            } else if (user.getRole() == ERole.HR) {
                Optional<HumanResource> humanResource = humanResourceService.findByEmail(user.getEmail());
                if (humanResource.isEmpty()) {
                    return ResponseEntity.ok(
                            new BaseResponse("Không tìm thấy nhà tuyển dụng!", HttpStatus.NOT_FOUND.value(), null)
                    );
                }
                List<Schedule> scheduleList = scheduleService.getDataScheduleByHRId(humanResource.get().getId());
                return ResponseEntity.ok(new BaseResponse("Tải danh sách lịch hẹn thành công", 200, scheduleList));
            } else if (user.getRole() == ERole.EMPLOYER) {
                Optional<Employer> employerOptional = employerService.findByUserEmail(user.getEmail());
                if (employerOptional.isEmpty()) {
                    return ResponseEntity.ok(
                            new BaseResponse("Không tìm thấy nhà tuyển dụng!", HttpStatus.NOT_FOUND.value(), null)
                    );
                }
                List<Schedule> scheduleList = scheduleService.getDataScheduleByEmployerId(employerOptional.get().getId());
                return ResponseEntity.ok(new BaseResponse("Tải danh sách lịch hẹn thành công", 200, scheduleList));
            }
            return ResponseEntity.ok(new BaseResponse("Tải danh sách lịch hẹn thất bại!", 400, null));
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

}
