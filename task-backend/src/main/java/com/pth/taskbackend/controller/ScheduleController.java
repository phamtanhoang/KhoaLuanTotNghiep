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
import com.pth.taskbackend.service.StepScheduleService;
import com.pth.taskbackend.util.func.CheckPermission;
import io.jsonwebtoken.ExpiredJwtException;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static com.pth.taskbackend.util.constant.PathConstant.BASE_URL;

@CrossOrigin(origins = "*")
@Tag(name = "Schedule", description = "Schedule APIs")
@SecurityRequirement(name = "javainuseapi")
@RestController
@RequestMapping(value = {BASE_URL + "/schedule"})
public class ScheduleController {
    CheckPermission checkPermission;
    @Autowired
    JwtService jwtService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    StepScheduleService stepScheduleService;
    @Autowired
    CandidateService candidateService;
    @Autowired
    HumanResourceService humanResourceService;
    @Autowired
    EmployerService employerService;

    @GetMapping("")
    public ResponseEntity<BaseResponse> getDataSchedule(@RequestHeader("Authorization") String token,
                                                        @RequestParam(required = false) String userId,
                                                        @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fromDate,
                                                        @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate toDate) throws IOException {
        try {
            String username = jwtService.extractUsername(token.substring(7));
            Optional<User> userOptional = userRepository.findByEmail(username);

            if (userOptional.isEmpty())  {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
            User user = userOptional.get();
            if(user.getRole()== ERole.CANDIDATE) {
                Optional<Candidate>  candidateOptional = candidateService.findByUserEmail(user.getEmail());
                if (candidateOptional.isEmpty())  {
                    return ResponseEntity.ok(
                            new BaseResponse("Không tìm thấy ứng viên!", HttpStatus.NOT_FOUND.value(), null)
                    );
                }
                List<StepSchedule> stepScheduleList = stepScheduleService.getDataScheduleByCandidateId(candidateOptional.get().getId(), fromDate, toDate);
                return ResponseEntity.ok(new BaseResponse("Tải danh sách lịch hẹn thành công", 200, stepScheduleList));
            }
            if(user.getRole()== ERole.HR) {
                Optional<HumanResource>  humanResource = humanResourceService.findByEmail(user.getEmail());
                if (humanResource.isEmpty())  {
                    return ResponseEntity.ok(
                            new BaseResponse("Không tìm thấy nhà tuyển dụng!", HttpStatus.NOT_FOUND.value(), null)
                    );
                }
                List<StepSchedule> stepScheduleList = stepScheduleService.getDataScheduleByHRId(humanResource.get().getId(), fromDate, toDate);
                return ResponseEntity.ok(new BaseResponse("Tải danh sách lịch hẹn thành công", 200, stepScheduleList));
            }
            if(user.getRole()== ERole.EMPLOYER) {
                Optional<Employer>  employerOptional = employerService.findByUserEmail(user.getEmail());
                if (employerOptional.isEmpty())  {
                    return ResponseEntity.ok(
                            new BaseResponse("Không tìm thấy nhà tuyển dụng!", HttpStatus.NOT_FOUND.value(), null)
                    );
                }
                List<StepSchedule> stepScheduleList = stepScheduleService.getDataScheduleByCandidateId(employerOptional.get().getId(), fromDate, toDate);
                return ResponseEntity.ok(new BaseResponse("Tải danh sách lịch hẹn thành công", 200, stepScheduleList));
            }
            return ResponseEntity.ok(new BaseResponse("Tải danh sách lịch hẹn thất bại!", 400, null));
        }
        catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

}
