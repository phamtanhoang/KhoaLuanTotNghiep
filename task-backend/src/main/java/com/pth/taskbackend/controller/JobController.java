package com.pth.taskbackend.controller;
import com.pth.taskbackend.dto.request.JobRequest;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.dto.response.JobResponse;
import com.pth.taskbackend.dto.response.StepResponse;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.*;
import com.pth.taskbackend.repository.JobRepository;
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
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.pth.taskbackend.util.constant.PathConstant.BASE_URL;

@CrossOrigin(origins = "*")
@Tag(name = "Jobs", description = "Jobs APIs")
@SecurityRequirement(name = "javainuseapi")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = {BASE_URL + "/jobs"})
public class JobController {

    @Autowired
    JobService jobService;
    @Autowired
    JobRepository jobRepository;
    @Autowired
    CategoryService categoryService;
    @Autowired
    HumanResourceService humanResourceService;
    @Autowired
    JwtService jwtService;
    @Autowired
    CheckPermission checkPermission;
    @Autowired
    EmployerService employerService;
    @Autowired UserRepository userRepository;
    @Autowired
    ProcessService processService;

    @Operation(summary = "Get list", description = "", tags = {})
    @GetMapping("")
    public ResponseEntity<BaseResponse> getJobs(@RequestParam(required = false) String keyword,
                                                @RequestParam(required = false) String location,
                                                @RequestParam(required = false) String fromSalary,
                                                @RequestParam(required = false) String toSalary,
                                                @RequestParam(required = false) String categoryId,
                                                Pageable pageable) {
        try {
            Page<Job> jobs = jobService.searchJobs(keyword, location, fromSalary, toSalary, categoryId, pageable);

            if (jobs.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc rỗng", HttpStatus.NOT_FOUND.value(), null)
                );
            } else {
                List<JobResponse> jobResponses = jobs.getContent().stream().map(job -> {
                    List<StepResponse> stepResponses;
                    if (job.getProcess() != null) {
                        stepResponses = job.getProcess().getSteps().stream()
                                .map(step -> new StepResponse(
                                        step.getId(),
                                        step.getName(),
                                        step.getNumber(),
                                        step.getProcess() != null ? step.getProcess().getId() : null
                                ))
                                .collect(Collectors.toList());
                    } else {
                        stepResponses = Collections.emptyList();
                    }

                    return new JobResponse(
                            job.getId(),
                            job.getCreated(),
                            job.getUpdated(),
                            job.getToDate(),
                            job.getName(),
                            job.getDescription(),
                            job.getExperience(),
                            job.getFromSalary(),
                            job.getToSalary(),
                            job.getLocation(),
                            job.getStatus(),
                            job.getCategory().getId(),
                            job.getCategory().getName(),
                            job.getHumanResource().getId(),
                            job.getHumanResource().getFirstName() + " " + job.getHumanResource().getLastName(),
                            job.getHumanResource().getEmployer().getName(),
                            job.getHumanResource().getEmployer().getId(),
                            job.getHumanResource().getEmployer().getUser().getEmail(),
                            job.getProcess() != null ? job.getProcess().getId() : null,
                            stepResponses
                    );
                }).collect(Collectors.toList());

                Page<JobResponse> jobResponsePage = new PageImpl<>(jobResponses, jobs.getPageable(), jobs.getTotalElements());
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc", HttpStatus.OK.value(), jobResponsePage)
                );

            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }

    }

    @GetMapping("/getJobs-admin")
    public ResponseEntity<?> getJobsByAdmin(@RequestHeader("Authorization") String token,
                                            @RequestParam(required = false) String name,
                                            @RequestParam(required = false) String categoryId,
                                            @RequestParam(required = false) EStatus status, Pageable pageable) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.ADMIN);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );

            if(status==EStatus.DELETED)
                return ResponseEntity.ok(
                        new BaseResponse("Không được sử dụng trạng thái này", HttpStatus.BAD_REQUEST.value(), null)
                );

            Page<Job> jobs = jobService.findByNameContainingAndCategoryIdAndStatus(name, categoryId,status, pageable);
            if (jobs.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc rỗng", HttpStatus.NOT_FOUND.value(), null)
                );
            } else {
                List<JobResponse> jobResponses = jobs.getContent().stream().map(job -> {
                    List<StepResponse> stepResponses;
                    if (job.getProcess() != null) {
                        stepResponses = job.getProcess().getSteps().stream()
                                .map(step -> new StepResponse(
                                        step.getId(),
                                        step.getName(),
                                        step.getNumber(),
                                        step.getProcess() != null ? step.getProcess().getId() : null
                                ))
                                .collect(Collectors.toList());
                    } else {
                        stepResponses = Collections.emptyList();
                    }

                    return new JobResponse(
                            job.getId(),
                            job.getCreated(),
                            job.getUpdated(),
                            job.getToDate(),
                            job.getName(),
                            job.getDescription(),
                            job.getExperience(),
                            job.getFromSalary(),
                            job.getToSalary(),
                            job.getLocation(),
                            job.getStatus(),
                            job.getCategory().getId(),
                            job.getCategory().getName(),
                            job.getHumanResource().getId(),
                            job.getHumanResource().getFirstName() + " " + job.getHumanResource().getLastName(),
                            job.getHumanResource().getEmployer().getName(),
                            job.getHumanResource().getEmployer().getId(),
                            job.getHumanResource().getEmployer().getUser().getEmail(),
                            job.getProcess() != null ? job.getProcess().getId() : null,
                            stepResponses
                    );
                }).collect(Collectors.toList());

                Page<JobResponse> jobResponsePage = new PageImpl<>(jobResponses, jobs.getPageable(), jobs.getTotalElements());
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc", HttpStatus.OK.value(), jobResponsePage)
                );
            }
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }

    }

    @GetMapping("/jobCount")
    public ResponseEntity<?> getJobCount(@RequestHeader("Authorization") String token  ) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.ADMIN);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );

            Long jobCount = jobService.countAll();
            return ResponseEntity.ok(
                    new BaseResponse("Số lượng công việc trên hệ thống", HttpStatus.OK.value(), jobCount)
            );

        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }

    }

    @GetMapping("/pendingJobs")
    public ResponseEntity<?> getPendingJob(@RequestHeader("Authorization") String token, Pageable pageable) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.ADMIN);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );


            Page<Job> jobs = jobService.findByStatusOrderByCreatedDesc(EStatus.PENDING, pageable);
            if (jobs.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc rỗng", HttpStatus.NOT_FOUND.value(), null)
                );
            } else {
                List<JobResponse> jobResponses = jobs.getContent().stream().map(job -> {
                    List<StepResponse> stepResponses;
                    if (job.getProcess() != null) {
                        stepResponses = job.getProcess().getSteps().stream()
                                .map(step -> new StepResponse(
                                        step.getId(),
                                        step.getName(),
                                        step.getNumber(),
                                        step.getProcess() != null ? step.getProcess().getId() : null
                                ))
                                .collect(Collectors.toList());
                    } else {
                        stepResponses = Collections.emptyList();
                    }

                    return new JobResponse(
                            job.getId(),
                            job.getCreated(),
                            job.getUpdated(),
                            job.getToDate(),
                            job.getName(),
                            job.getDescription(),
                            job.getExperience(),
                            job.getFromSalary(),
                            job.getToSalary(),
                            job.getLocation(),
                            job.getStatus(),
                            job.getCategory().getId(),
                            job.getCategory().getName(),
                            job.getHumanResource().getId(),
                            job.getHumanResource().getFirstName() + " " + job.getHumanResource().getLastName(),
                            job.getHumanResource().getEmployer().getName(),
                            job.getHumanResource().getEmployer().getId(),
                            job.getHumanResource().getEmployer().getUser().getEmail(),
                            job.getProcess() != null ? job.getProcess().getId() : null,
                            stepResponses
                    );
                }).collect(Collectors.toList());

                Page<JobResponse> jobResponsePage = new PageImpl<>(jobResponses, jobs.getPageable(), jobs.getTotalElements());
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc", HttpStatus.OK.value(), jobResponsePage)
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
    @GetMapping("/getJobs-hr")
    public ResponseEntity<BaseResponse> getJobsByHR(@RequestHeader("Authorization")String token,
                                                    @RequestParam(required = false) String keyword,
                                                    @RequestParam(required = false) String categoryId,
                                                    @RequestParam(required = false)EStatus status,
                                                    Pageable pageable) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<HumanResource> optionalHumanResource = humanResourceService.findByEmail(email);
            if (optionalHumanResource.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );

            if(status==EStatus.DELETED)
                return ResponseEntity.ok(
                        new BaseResponse("Không được sử dụng trạng thái này", HttpStatus.BAD_REQUEST.value(), null)
                );
            Page<Job> jobs = jobService.findByKeywordAndStatusAndCategoryIdAndHRId(keyword, status, categoryId, optionalHumanResource.get().getId(),pageable);

            if (jobs.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc rỗng", HttpStatus.NOT_FOUND.value(), null)
                );
            } else {
                List<JobResponse> jobResponses = jobs.getContent().stream().map(job -> {
                    List<StepResponse> stepResponses;
                    if (job.getProcess() != null) {
                        stepResponses = job.getProcess().getSteps().stream()
                                .map(step -> new StepResponse(
                                        step.getId(),
                                        step.getName(),
                                        step.getNumber(),
                                        step.getProcess() != null ? step.getProcess().getId() : null
                                ))
                                .collect(Collectors.toList());
                    } else {
                        stepResponses = Collections.emptyList();
                    }

                    return new JobResponse(
                            job.getId(),
                            job.getCreated(),
                            job.getUpdated(),
                            job.getToDate(),
                            job.getName(),
                            job.getDescription(),
                            job.getExperience(),
                            job.getFromSalary(),
                            job.getToSalary(),
                            job.getLocation(),
                            job.getStatus(),
                            job.getCategory().getId(),
                            job.getCategory().getName(),
                            job.getHumanResource().getId(),
                            job.getHumanResource().getFirstName() + " " + job.getHumanResource().getLastName(),
                            job.getHumanResource().getEmployer().getName(),
                            job.getHumanResource().getEmployer().getId(),
                            job.getHumanResource().getEmployer().getUser().getEmail(),
                            job.getProcess() != null ? job.getProcess().getId() : null,
                            stepResponses
                    );
                }).collect(Collectors.toList());

                Page<JobResponse> jobResponsePage = new PageImpl<>(jobResponses, jobs.getPageable(), jobs.getTotalElements());
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc", HttpStatus.OK.value(), jobResponsePage)
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
    @GetMapping("/getJobs-employer")
    public ResponseEntity<BaseResponse> getJobsByEmployer(@RequestHeader("Authorization")String token,
                                                    @RequestParam(required = false) String keyword,
                                                    @RequestParam(required = false) String categoryId,
                                                    @RequestParam(required = false)EStatus status,
                                                    Pageable pageable) {
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

            if(status==EStatus.DELETED)
                return ResponseEntity.ok(
                        new BaseResponse("Không được sử dụng trạng thái này", HttpStatus.BAD_REQUEST.value(), null)
                );
            Page<Job> jobs = jobService.findByKeywordAndStatusAndCategoryIdAndEmployerId(keyword, status, categoryId, optionalEmployer.get().getId(),pageable);

            if (jobs.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc rỗng", HttpStatus.NOT_FOUND.value(), null)
                );
            } else {
                List<JobResponse> jobResponses = jobs.getContent().stream().map(job -> {
                    List<StepResponse> stepResponses;
                    if (job.getProcess() != null) {
                        stepResponses = job.getProcess().getSteps().stream()
                                .map(step -> new StepResponse(
                                        step.getId(),
                                        step.getName(),
                                        step.getNumber(),
                                        step.getProcess() != null ? step.getProcess().getId() : null
                                ))
                                .collect(Collectors.toList());
                    } else {
                        stepResponses = Collections.emptyList();
                    }

                    return new JobResponse(
                            job.getId(),
                            job.getCreated(),
                            job.getUpdated(),
                            job.getToDate(),
                            job.getName(),
                            job.getDescription(),
                            job.getExperience(),
                            job.getFromSalary(),
                            job.getToSalary(),
                            job.getLocation(),
                            job.getStatus(),
                            job.getCategory().getId(),
                            job.getCategory().getName(),
                            job.getHumanResource().getId(),
                            job.getHumanResource().getFirstName() + " " + job.getHumanResource().getLastName(),
                            job.getHumanResource().getEmployer().getName(),
                            job.getHumanResource().getEmployer().getId(),
                            job.getHumanResource().getEmployer().getUser().getEmail(),
                            job.getProcess() != null ? job.getProcess().getId() : null,
                            stepResponses
                    );
                }).collect(Collectors.toList());

                Page<JobResponse> jobResponsePage = new PageImpl<>(jobResponses, jobs.getPageable(), jobs.getTotalElements());
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc", HttpStatus.OK.value(), jobResponsePage)
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
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getJob(@PathVariable String id) {
        try {

            Optional<Job> optionalJob = jobService.findById(id);

            if (optionalJob.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy công việc", HttpStatus.NOT_FOUND.value(), null)
                );
            } else {
                Job job = optionalJob.get();
                List<StepResponse> stepResponses;
                if (job.getProcess() != null) {
                    stepResponses = job.getProcess().getSteps().stream()
                            .map(step -> new StepResponse(
                                    step.getId(),
                                    step.getName(),
                                    step.getNumber(),
                                    step.getProcess() != null ? step.getProcess().getId() : null
                            ))
                            .collect(Collectors.toList());
                } else {
                    stepResponses = Collections.emptyList();
                }

                JobResponse jobResponse = new JobResponse(
                        job.getId(),
                        job.getCreated(),
                        job.getUpdated(),
                        job.getToDate(),
                        job.getName(),
                        job.getDescription(),
                        job.getExperience(),
                        job.getFromSalary(),
                        job.getToSalary(),
                        job.getLocation(),
                        job.getStatus(),
                        job.getCategory().getId(),
                        job.getCategory().getName(),
                        job.getHumanResource().getId(),
                        job.getHumanResource().getFirstName() + " " + job.getHumanResource().getLastName(),
                        job.getHumanResource().getEmployer().getName(),
                        job.getHumanResource().getEmployer().getId(),
                        job.getHumanResource().getEmployer().getUser().getEmail(),
                        job.getProcess() != null ? job.getProcess().getId() : null,
                        stepResponses
                );

                return ResponseEntity.ok(
                        new BaseResponse("Thông tin công việc", HttpStatus.OK.value(), jobResponse)
                );
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "Create", description = "", tags = {})
    @PostMapping("/create")
    public ResponseEntity<BaseResponse> createJob(@RequestHeader("Authorization")String token, @RequestBody JobRequest request) throws IOException {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<HumanResource> optionalHumanResource = humanResourceService.findByEmail(email);
            if (optionalHumanResource.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy HR ", HttpStatus.NOT_FOUND.value(), null)
                );


            Optional<Category> existedCategory = categoryService.findById(request.categoryId());
            if (existedCategory.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new BaseResponse("Danh mục không hợp lệ", HttpStatus.BAD_REQUEST.value(), null));
            }
            Job job = new Job();
            job.setName(request.name());
            job.setStatus(EStatus.PENDING);
            job.setExperience(request.experience());
            job.setDescription(request.description());
            job.setCategory(existedCategory.get());
            job.setFromSalary(request.fromSalary());
            job.setToSalary(request.toSalary());
            job.setToDate(request.toDate());
            job.setLocation(request.location());
            job.setHumanResource(optionalHumanResource.get());

            job.setTags(request.tags());
            jobService.create(job);

            return ResponseEntity.ok(
                    new BaseResponse("Tạo công việc thành công", HttpStatus.OK.value(), job)
            );
        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new BaseResponse("Tên công việc đã tồn tại", HttpStatus.BAD_REQUEST.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }



    @Operation(summary = "update", description = "", tags = {})
    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse> updateJob(@RequestHeader("Authorization")String token,@PathVariable("id") String id, @RequestBody JobRequest request) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<HumanResource> optionalHumanResource = humanResourceService.findByEmail(email);
            if (optionalHumanResource.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy HR ", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<Job> optionalJob = jobService.findById(id);
            if (optionalJob.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new BaseResponse("Không tìm thấy công việc", HttpStatus.NOT_FOUND.value(), null));
            }

            Job job = optionalJob.get();
            job.setStatus(EStatus.PENDING);
            job.setName(request.name());
            job.setDescription(request.description());
            job.setLocation(request.location());
            job.setFromSalary(request.fromSalary());
            job.setToSalary(request.toSalary());
            job.setToDate(request.toDate());
            job.setExperience(request.experience());
            job.setHumanResource(optionalHumanResource.get());
            job.setProcess(processService.findById(request.processId()).get());
            job.getTags().clear();
            job.getTags().addAll(request.tags());
            if (request.categoryId() != null) {
                Optional<Category> optionalCategory = categoryService.findById(request.categoryId());
                if (optionalCategory.isPresent()) {
                    job.setCategory(optionalCategory.get());
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(new BaseResponse("Danh mục không hợp lệ", HttpStatus.BAD_REQUEST.value(), null));
                }
            }


         jobService.update(job);


            return ResponseEntity.ok(
                    new BaseResponse("Cập nhật công việc thành công", HttpStatus.OK.value(), job)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "update status", description = "", tags = {})
    @PatchMapping("/{id}")
    public ResponseEntity<BaseResponse> updateJobStatus(@RequestHeader("Authorization")String token, @PathVariable("id") String id,@RequestPart EStatus status) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.ADMIN)||
                                checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR)||
                                checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<Job> optionalJob = jobService.findById(id);
            if (optionalJob.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy công việc tương ứng", HttpStatus.NOT_FOUND.value(), null)
                );
            if(status==EStatus.DELETED)
                return ResponseEntity.ok(
                        new BaseResponse("Không được xóa", HttpStatus.NOT_FOUND.value(), null)
                );
            Job job = optionalJob.get();
            switch (status)
            {
                case ACTIVE :
                    if(job.getStatus().equals(EStatus.ACTIVE))
                        return ResponseEntity.ok(
                                new BaseResponse("Đã bật đang tuyển công việc này", HttpStatus.OK.value(), null)
                        );
                    job.setStatus(EStatus.ACTIVE);
                    jobService.update(job);

                    return ResponseEntity.ok(
                            new BaseResponse("Bật tuyển công việc thành công", HttpStatus.OK.value(), null)
                    );
                case INACTIVE:
                    if(job.getStatus().equals(EStatus.INACTIVE))
                        return ResponseEntity.ok(
                                new BaseResponse("Đã tắt tuyển dụng công việc này", HttpStatus.OK.value(), null)
                        );
                    job.setStatus(EStatus.INACTIVE);
                    jobService.update(job);

                    return ResponseEntity.ok(
                            new BaseResponse("Tắt tuyển dụng công việc thành công", HttpStatus.OK.value(), null)
                    );
                case PENDING:
                    if (optionalUser.get().getRole().equals(ERole.ADMIN)) {
                        job.setStatus(EStatus.ACTIVE);
                        jobService.update(job);

                        return ResponseEntity.ok(
                                new BaseResponse("Duyệt công việc thành công", HttpStatus.OK.value(), null)
                        );
                    }
                    else
                    {
                        return ResponseEntity.ok(
                                new BaseResponse("Không có quyền duyệt công việc này", HttpStatus.OK.value(), null)
                        );
                    }
                default:
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(new BaseResponse("Trạng thái không hợp lệ", HttpStatus.BAD_REQUEST.value(), null));
            }

        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.ok(new BaseResponse("Không tìm thấy công việc cần duyệt!", HttpStatus.NOT_FOUND.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    @Operation(summary = "delete job", description = "", tags = {})
    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> deleteJob(@RequestHeader("Authorization")String token, @PathVariable("id") String id) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.ADMIN)||
                    checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR)||
                    checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );

            User user = optionalUser.get();

            Optional<Job> optionalJob = jobService.findById(id);
            if (optionalJob.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy công việc", HttpStatus.NOT_FOUND.value(), null)
                );
            }

            Job job = optionalJob.get();
            Optional<HumanResource> humanResource = humanResourceService.findByEmail(user.getEmail());
            if (humanResource.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy HR", HttpStatus.NOT_FOUND.value(), null)
                );

            if (!job.getHumanResource().getId().equals(humanResource.get().getId())) {
                return ResponseEntity.ok(
                        new BaseResponse("Bạn không có quyền xóa công việc này", HttpStatus.FORBIDDEN.value(), null)
                );
            }
            else
            {
                Optional<Employer>optionalEmployer = employerService.findByUserEmail(email);
                if (optionalEmployer.isEmpty())
                    return ResponseEntity.ok(
                            new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null)
                    );
                if (!job.getHumanResource().getEmployer().getId().equals(optionalEmployer.get().getId()))
                    return ResponseEntity.ok(
                            new BaseResponse("Bạn không có quyền xóa công việc này", HttpStatus.FORBIDDEN.value(), null)
                    );
            }
            job.setStatus(EStatus.DELETED);
            jobService.update(job);
            return ResponseEntity.ok(
                    new BaseResponse("Xóa công việc thành công", HttpStatus.OK.value(), null)
            );

            }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

}






