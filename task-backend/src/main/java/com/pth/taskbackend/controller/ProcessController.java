package com.pth.taskbackend.controller;
import com.pth.taskbackend.dto.request.ProcessRequest;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Employer;
import com.pth.taskbackend.model.meta.Process;
import com.pth.taskbackend.model.meta.Step;
import com.pth.taskbackend.repository.JobRepository;
import com.pth.taskbackend.security.JwtService;
import com.pth.taskbackend.service.*;
import com.pth.taskbackend.util.func.CheckPermission;
import io.jsonwebtoken.ExpiredJwtException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Optional;

import static com.pth.taskbackend.util.constant.PathConstant.BASE_URL;

@CrossOrigin(origins = "*")
@Tag(name = "Procedures", description = "Procedures APIs")
@SecurityRequirement(name = "javainuseapi")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = {BASE_URL + "/procedures"})
public class ProcessController {

    @Autowired
    private ProcessService processService;

    @Autowired
    private JobService jobService;

    @Autowired
    StepService stepService;
    @Autowired
    JwtService jwtService;

    @Autowired
    private EmployerService employerService;
    private final CheckPermission checkPermission;


    @Operation(summary = "Create", description = "", tags = {})
    @PostMapping("/create")
    public ResponseEntity<BaseResponse> createProcess(@RequestBody ProcessRequest processRequest, @RequestHeader("Authorization") String token) throws IOException {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean hasPermission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!hasPermission) {
                return ResponseEntity.ok(new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null));
            }

            Optional<Employer> optionalEmployer = employerService.findByUserEmail(email);
            if (optionalEmployer.isEmpty()) {
                return ResponseEntity.ok(new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null));
            }

            Optional<Process> optionalProcedure = processService.findByName(processRequest.name());
            if (optionalProcedure.isPresent()) {
                return ResponseEntity.ok(new BaseResponse("Tên quy trình đã tồn tại", HttpStatus.BAD_REQUEST.value(), null));
            }

            Employer employer = optionalEmployer.get();
            Process process = new Process();
            process.setEmployer(employer);
            process.setName(processRequest.name());
            process.setDescription(processRequest.description());
            process.setSteps(processRequest.steps());
            Process createdProcess = processService.create(process);


            return ResponseEntity.ok(new BaseResponse("Tạo quy trình thành công", HttpStatus.OK.value(), createdProcess));
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        }catch (DataIntegrityViolationException e) {
            return ResponseEntity.ok(new BaseResponse("Tên quy trình đã tồn tại", HttpStatus.BAD_REQUEST.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Update", description = "", tags = {})
    @PatchMapping("/{id}")
    public ResponseEntity<BaseResponse> updateProcess(@PathVariable("id") String id, @RequestBody ProcessRequest processRequest, @RequestHeader("Authorization") String token) throws IOException {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean hasPermission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!hasPermission) {
                return ResponseEntity.ok(new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null));
            }

            Optional<Employer> optionalEmployer = employerService.findByUserEmail(email);
            if (optionalEmployer.isEmpty()) {
                return ResponseEntity.ok(new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null));
            }

            Optional<Process> optionalProcess = processService.findById(id);
            if (optionalProcess.isPresent()) {
                if (!jobService.findByProcessId(optionalEmployer.get().getId(), Pageable.unpaged()).isEmpty())
                    return ResponseEntity.ok(new BaseResponse("Đang có công việc sử dụng quy trình này", HttpStatus.BAD_REQUEST.value(), null));
                else {
                    Process process = optionalProcess.get();
                    process.setName(processRequest.name());
                    process.setDescription(processRequest.description());
                    process.getSteps().clear();
                    process.getSteps().addAll(processRequest.steps());
                    processService.update(process);
                    return ResponseEntity.ok(new BaseResponse("Cập nhật quy trình thành công", HttpStatus.OK.value(), process));

                }
            }
            return ResponseEntity.ok(new BaseResponse("Không tìm thấy quy trình này", HttpStatus.NOT_FOUND.value(), null));


        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.ok(new BaseResponse("Tên quy trình đã tồn tại", HttpStatus.BAD_REQUEST.value(), null));
        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

}
