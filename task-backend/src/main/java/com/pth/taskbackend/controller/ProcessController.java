package com.pth.taskbackend.controller;
import com.pth.taskbackend.dto.request.ProcessRequest;
import com.pth.taskbackend.dto.request.StepRequest;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.dto.response.ProcessResponse;
import com.pth.taskbackend.dto.response.StepResponse;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.*;
import com.pth.taskbackend.model.meta.Process;
import com.pth.taskbackend.repository.UserRepository;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static com.pth.taskbackend.util.constant.PathConstant.BASE_URL;

@CrossOrigin(origins = "*")
@Tag(name = "Procedures", description = "Procedures APIs")
@SecurityRequirement(name = "javainuseapi")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = {BASE_URL + "/processes"})
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
    UserRepository userRepository;
    @Autowired
    private EmployerService employerService;
    private final CheckPermission checkPermission;
    @Autowired HumanResourceService humanResourceService;

    @Operation(summary = "Create", description = "", tags = {})
    @PostMapping("")
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

            Optional<Process> optionalProcess = processService.findByNameAndEmployerId(processRequest.name(), optionalEmployer.get().getId());
            if (optionalProcess.isPresent()) {
                return ResponseEntity.ok(new BaseResponse("Tên quy trình đã tồn tại", HttpStatus.BAD_REQUEST.value(), null));
            }

            Employer employer = optionalEmployer.get();
            Process process = new Process();
            process.setEmployer(employer);
            process.setName(processRequest.name());
            process.setDescription(processRequest.description());
            Process createdProcess = processService.create(process);

            for (StepRequest stepRequest : processRequest.steps()) {
                Step step = new Step();
                step.setName(stepRequest.name());
                step.setNumber(stepRequest.number());
                step.setProcess(createdProcess);
                step.setDescription(stepRequest.description());
                 stepService.create(step);
            }

            Process finalProcess = processService.findById(process.getId()).get();

            return ResponseEntity.ok(new BaseResponse("Tạo quy trình thành công", HttpStatus.OK.value(), finalProcess));
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (DataIntegrityViolationException e) {
            e.printStackTrace();
            return ResponseEntity.ok(new BaseResponse("Tên quy trình đã tồn tại", HttpStatus.BAD_REQUEST.value(), null));
        } catch (Exception e) {
            e.printStackTrace();
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

            Optional<Process> optionalProcess = processService.findByIdAndEmployerId(id,optionalEmployer.get().getId());
            if (optionalProcess.isEmpty()) {
                return ResponseEntity.ok(new BaseResponse("Không tìm thấy quy trình", HttpStatus.BAD_REQUEST.value(), null));
            }
            Optional<Process>existsProcess = processService.findByNameAndEmployerId(processRequest.name(), optionalEmployer.get().getId());
            if(existsProcess.isPresent())
                if(!existsProcess.get().getId().equals(optionalProcess.get().getId()))
                    return ResponseEntity.ok(new BaseResponse("Đã có quy trình tên này ", HttpStatus.BAD_REQUEST.value(), null));
            Process process = optionalProcess.get();
            process.setName(processRequest.name());
            process.setDescription(processRequest.description());
            Process createdProcess = processService.create(process);
            List<Step>steps = stepService.findByProcessId(id);
            for(Step step:steps)
                stepService.delete(step);
            for (StepRequest stepRequest : processRequest.steps()) {
                Step step = new Step();
                step.setName(stepRequest.name());
                step.setNumber(stepRequest.number());
                step.setProcess(createdProcess);
                step.setDescription(stepRequest.description());
                 stepService.create(step);
            }

            processService.update(createdProcess);

            return ResponseEntity.ok(new BaseResponse("Cập nhật quy trình thành công", HttpStatus.OK.value(), createdProcess));
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (DataIntegrityViolationException e) {
            e.printStackTrace();
            return ResponseEntity.ok(new BaseResponse("Tên quy trình đã tồn tại", HttpStatus.BAD_REQUEST.value(), null));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "Get list", description = "", tags = {})
    @GetMapping("")
    public ResponseEntity<BaseResponse> getProcesses(@RequestHeader("Authorization") String token, @RequestParam(required = false) String name, Pageable pageable) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER) || checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
                if (optionalUser.isEmpty())
                    return ResponseEntity.ok(
                            new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                    );

                Page<ProcessResponse> responseList;
                if (optionalUser.get().getRole().equals(ERole.EMPLOYER)) {
                    Employer employer = employerService.findByUserEmail(email).get();
                    Page<Object[]> objects = processService.findProcessWithStepCountByNameContainingAndEmployerId((name != null) ? name :"", employer.getId(), pageable);
                    List<ProcessResponse> processes = objects.getContent().stream().map(result -> {
                        Process process = (Process) result[0];
                        long count = (Long) result[1];
                        return createProcessResponse(process, count, pageable);
                    }).collect(Collectors.toList());
                    responseList = new PageImpl<>(processes, pageable, objects.getTotalElements());
                } else if (optionalUser.get().getRole().equals(ERole.HR)) {
                    HumanResource hr = humanResourceService.findByEmail(email).get();
                    Page<Object[]> objects = processService.findProcessWithStepCountByNameContainingAndEmployerId(name, hr.getEmployer().getId(), pageable);
                    List<ProcessResponse> processes = objects.getContent().stream().map(result -> {
                        Process process = (Process) result[0];
                        Long count = (Long) result[1];
                        return createProcessResponse(process, count, pageable);
                    }).collect(Collectors.toList());
                    responseList = new PageImpl<>(processes, pageable, objects.getTotalElements());
                } else {
                    return ResponseEntity.ok(
                            new BaseResponse("Vai trò người dùng không hợp lệ", HttpStatus.BAD_REQUEST.value(), null)
                    );
                }

                if (responseList.isEmpty()) {
                    return ResponseEntity.ok(
                            new BaseResponse("Danh sách quy trình rỗng", HttpStatus.OK.value(), null)
                    );
                } else {
                    return ResponseEntity.ok(
                            new BaseResponse("Danh sách quy trình", HttpStatus.OK.value(), responseList)
                    );
                }
        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
            }
        }

    @Operation(summary = "Get list", description = "", tags = {})
    @GetMapping("/getProcesses_Dropdown")
    public ResponseEntity<BaseResponse> getProcessesDropDown(@RequestHeader("Authorization") String token) {
        try {
            String email = jwtService.extractUsername(token.substring(7));

            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER) || checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );

            List<ProcessResponse> responseList;
            if (optionalUser.get().getRole().equals(ERole.EMPLOYER)) {
                Employer employer = employerService.findByUserEmail(email).get();
                List<Object[]> objects = processService.findByEmployerId(employer.getId());
                responseList = objects.stream().map(result -> {
                    Process process = (Process) result[0];
                    long count = (Long) result[1];
                    return createProcessResponse(process, count, null);
                }).collect(Collectors.toList());
            } else if (optionalUser.get().getRole().equals(ERole.HR)) {
                HumanResource hr = humanResourceService.findByEmail(email).get();
                List<Object[]> objects = processService.findByHrId(hr.getEmployer().getId());
                responseList = objects.stream().map(result -> {
                    Process process = (Process) result[0];
                    Long count = (Long) result[1];
                    return createProcessResponse(process, count, null);
                }).collect(Collectors.toList());
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Vai trò người dùng không hợp lệ", HttpStatus.BAD_REQUEST.value(), null)
                );
            }

            if (responseList.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách quy trình rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách quy trình", HttpStatus.OK.value(), responseList)
                );
            }
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    private ProcessResponse createProcessResponse(Process process, Long stepCount, Pageable pageable) {
            Page<Step> steps = stepService.findByProcessId(process.getId(), pageable);

            List<StepResponse> stepList = steps.getContent().stream()
                    .map(step -> new StepResponse(
                            step.getId(),
                            step.getName(),
                            step.getNumber(),
                            step.getDescription(),
                            step.getProcess().getId()
                    ))
                    .collect(Collectors.toList());

            return new ProcessResponse(
                    process.getId(),
                    process.getCreated(),
                    process.getUpdated(),
                    process.getName(),
                    process.getDescription(),
                    stepCount,
                    stepList
            );
        }

    @Operation(summary = "Get process ", description = "", tags = {})
    @GetMapping("{id}")
    public ResponseEntity<BaseResponse> getProcess(@RequestHeader("Authorization") String token,@PathVariable("id") String id) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );


            Optional<Process> optionalProcess = processService.findById(id);
            if (optionalProcess.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy quy trình", HttpStatus.NOT_FOUND.value(), null)
                );
            Process process = optionalProcess.get();
            Page<Step> steps = stepService.findByProcessId(process.getId(), Pageable.unpaged());

            List<StepResponse> stepList = steps.getContent().stream()
                    .map(step -> new StepResponse(
                            step.getId(),
                            step.getName(),
                            step.getNumber(),
                            step.getDescription(),
                            step.getProcess().getId()
                    ))
                    .collect(Collectors.toList());


            ProcessResponse response = new ProcessResponse(
                    process.getId(),
                    process.getCreated(),
                    process.getUpdated(),
                    process.getName(),
                    process.getDescription(),
                    stepService.countAllByProcessId(process.getId()),
                    stepList
            );


                return ResponseEntity.ok(
                        new BaseResponse("Danh sách quy trình", HttpStatus.OK.value(), response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "delete process", description = "", tags = {})
    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> deleteProcess(@RequestHeader("Authorization")String token, @PathVariable("id") String id) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<Employer> optionalEmployer = employerService.findByUserEmail(email);
            if (optionalEmployer.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );

            Employer employer = optionalEmployer.get();

            Optional<Process> optionalProcess = processService.findByIdAndEmployerId(id,employer.getId());
            if (optionalProcess.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy quy trình", HttpStatus.NOT_FOUND.value(), null)
                );
            }

            List<Process> process = processService.findProcessesWithIdInJob(id);
            if (!process.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Quy trình đang được sử dụng", HttpStatus.OK.value(), null)
                );
//            List<Step>steps = stepService.findByProcessId(id);
//            for(Step step:steps)
//                stepService.delete(step);
            processService.delete(optionalProcess.get());
            return ResponseEntity.ok(
                    new BaseResponse("Xóa quy trình thành công", HttpStatus.OK.value(), null)
            );

        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
}
