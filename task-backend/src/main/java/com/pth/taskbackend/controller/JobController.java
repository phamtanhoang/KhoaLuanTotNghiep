package com.pth.taskbackend.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pth.taskbackend.dto.request.ChangeDealine;
import com.pth.taskbackend.dto.request.JobRequest;
import com.pth.taskbackend.dto.response.*;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Process;
import com.pth.taskbackend.model.meta.*;
import com.pth.taskbackend.repository.JobRepository;
import com.pth.taskbackend.repository.UserRepository;
import com.pth.taskbackend.security.JwtService;
import com.pth.taskbackend.service.*;
import com.pth.taskbackend.util.func.CheckPermission;
import com.pth.taskbackend.util.func.DateFunc;
import io.jsonwebtoken.ExpiredJwtException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.CompletableFuture;
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
    @Autowired
    UserRepository userRepository;
    @Autowired
    ProcessService processService;
    @Autowired
    StepService stepService;
    @Autowired
    TagService tagService;
    @Autowired
    VipEmployerService vipEmployerService;
    @Autowired
    CandidateService candidateService;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    ApplicationService applicationService;
    @Autowired
    MailService mailService;

    @Operation(summary = "Get list", description = "", tags = {})
    @GetMapping("")
    public ResponseEntity<BaseResponse> getJobs(@RequestHeader(value = "Authorization", required = false) String token,
                                                @RequestParam(required = false) String keyword,
                                                @RequestParam(required = false) String location,
                                                @RequestParam(required = false) String experience,
                                                @RequestParam(required = false) Integer dateNumber,
                                                @RequestParam(required = false) String categoryId,
                                                @RequestParam(required = false) String tagId,
                                                Pageable pageable) {
        try {
            Optional<Candidate> optionalCandidate;

            if (token != null) {
                String email = jwtService.extractUsername(token.substring(7));
                boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.CANDIDATE);
                if (permission) {
                    optionalCandidate = candidateService.findByUserEmail(email);
                    if (optionalCandidate.isEmpty())
                        return ResponseEntity.ok(
                                new BaseResponse("Không tìm thấy ứng viên ", HttpStatus.NOT_FOUND.value(), null)
                        );
                } else {
                    optionalCandidate = null;
                }
            } else {
                optionalCandidate = null;
            }

            LocalDateTime fromDate = null;
            if (dateNumber != null) {
                fromDate = LocalDateTime.now().minusDays(dateNumber);
            }

            Page<Job> jobs = jobService.searchJobs(keyword, location, experience, fromDate, categoryId, tagId, pageable);
            if (jobs.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                List<JobResponse> jobResponses = jobs.getContent().stream().map(job -> {
                    List<StepResponse> stepResponses;

                    if (job.getProcess() != null) {
                        Page<Step> steps = stepService.findByProcessId(job.getProcess().getId(), null);

                        List<Step> stepList = steps.getContent();

                        stepResponses = stepList.stream()
                                .map(step -> new StepResponse(
                                        step.getId(),
                                        step.getName(),
                                        step.getNumber(),
                                        step.getDescription(),
                                        step.getProcess() != null ? step.getProcess().getId() : null
                                ))
                                .collect(Collectors.toList());
                    } else {
                        stepResponses = Collections.emptyList();
                    }
                    List<com.pth.taskbackend.model.meta.Tag> tagList = tagService.findByJobId(job.getId(), null).toList();

                    JobCategoryResponse categoryResponse = new JobCategoryResponse(
                            job.getCategory() != null ? job.getCategory().getId() : null,
                            job.getCategory() != null ? job.getCategory().getName() : null);

                    JobEmployerResponse jobEmployerResponse = new JobEmployerResponse(
                            job.getHumanResource().getEmployer().getName(),
                            job.getHumanResource().getEmployer().getId(),
                            job.getHumanResource().getEmployer().getUser().getEmail(),
                            job.getHumanResource().getEmployer().getImage(),
                            job.getHumanResource().getEmployer().getPhoneNumber());

                    JobProcessResponse jobProcessResponse = new JobProcessResponse(
                            job.getProcess() != null ? job.getProcess().getId() : null,
                            job.getProcess() != null ? job.getProcess().getName() : null,
                            stepResponses
                    );

                    JobHrResponse jobHrResponse = new JobHrResponse(
                            job.getHumanResource().getId(),
                            job.getHumanResource().getFirstName() + " " + job.getHumanResource().getLastName()
                    );


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
                            vipEmployerService.isVip(job.getHumanResource().getEmployer().getId()),
                            optionalCandidate != null && (optionalCandidate.filter(value -> jobService.findByCandidateIdAndJobId(value.getId(), job.getId()).isPresent()).isPresent()),
                            DateFunc.isExpired(job.getToDate()),
                            optionalCandidate != null && (optionalCandidate.filter(candidate -> applicationService.findByJobIdAndCandidateId(job.getId(), candidate.getId()).isPresent()).isPresent()),
                            categoryResponse,
                            jobEmployerResponse,
                            jobHrResponse,
                            jobProcessResponse,
                            tagList
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
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get list", description = "", tags = {})
    @GetMapping("/getJobs/{id}")
    public ResponseEntity<BaseResponse> getJobsByEmployerId(@RequestHeader(value = "Authorization", required = false) String token,
                                                            @PathVariable String id,
                                                            @RequestParam(required = false) String name,
                                                            @RequestParam(required = false) String location,
                                                            Pageable pageable) {
        try {
            Optional<Candidate> optionalCandidate;
            if (token != null) {
                String email = jwtService.extractUsername(token.substring(7));
                boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.CANDIDATE);
                if (permission) {
                    optionalCandidate = candidateService.findByUserEmail(email);
                    if (optionalCandidate.isEmpty())
                        return ResponseEntity.ok(
                                new BaseResponse("Không tìm thấy ứng viên ", HttpStatus.NOT_FOUND.value(), null)
                        );
                } else {
                    optionalCandidate = null;
                }
            } else {
                optionalCandidate = null;
            }

            Page<Job> jobs = jobService.findByEmployerIdAndNameAndLocation(id, name, location, pageable);
            if (jobs.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                List<JobResponse> jobResponses = jobs.getContent().stream().map(job -> {
                    List<StepResponse> stepResponses;

                    if (job.getProcess() != null) {
                        Page<Step> steps = stepService.findByProcessId(job.getProcess().getId(), null);

                        List<Step> stepList = steps.getContent();

                        stepResponses = stepList.stream()
                                .map(step -> new StepResponse(
                                        step.getId(),
                                        step.getName(),
                                        step.getNumber(),
                                        step.getDescription(),
                                        step.getProcess() != null ? step.getProcess().getId() : null
                                ))
                                .collect(Collectors.toList());
                    } else {
                        stepResponses = Collections.emptyList();
                    }
                    List<com.pth.taskbackend.model.meta.Tag> tagList = tagService.findByJobId(job.getId(), null).toList();

                    JobCategoryResponse categoryResponse = new JobCategoryResponse(
                            job.getCategory() != null ? job.getCategory().getId() : null,
                            job.getCategory() != null ? job.getCategory().getName() : null);

                    JobEmployerResponse jobEmployerResponse = new JobEmployerResponse(
                            job.getHumanResource().getEmployer().getName(),
                            job.getHumanResource().getEmployer().getId(),
                            job.getHumanResource().getEmployer().getUser().getEmail(),
                            job.getHumanResource().getEmployer().getImage(),
                            job.getHumanResource().getEmployer().getPhoneNumber());

                    JobProcessResponse jobProcessResponse = new JobProcessResponse(
                            job.getProcess() != null ? job.getProcess().getId() : null,
                            job.getProcess() != null ? job.getProcess().getName() : null,
                            stepResponses
                    );

                    JobHrResponse jobHrResponse = new JobHrResponse(
                            job.getHumanResource().getId(),
                            job.getHumanResource().getFirstName() + " " + job.getHumanResource().getLastName()
                    );


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
                            vipEmployerService.isVip(job.getHumanResource().getEmployer().getId()),
                            optionalCandidate != null && jobService.checkIsSaveJob(optionalCandidate.get().getId(), job.getId()),
                            DateFunc.isExpired(job.getToDate()),
                            optionalCandidate != null && optionalCandidate.filter(candidate -> applicationService.findByJobIdAndCandidateId(job.getId(), candidate.getId()).isPresent()).isPresent(),
                            categoryResponse,
                            jobEmployerResponse,
                            jobHrResponse,
                            jobProcessResponse,
                            tagList
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
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get list", description = "", tags = {})
    @GetMapping("/getVipJobs")
    public ResponseEntity<BaseResponse> getVipJobs(Pageable pageable) {
        try {

            Page<Job> jobs = jobService.findVipJob(pageable);
            if (jobs.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                List<JobResponse> jobResponses = jobs.getContent().stream().map(job -> {

                    JobEmployerResponse jobEmployerResponse = new JobEmployerResponse(
                            job.getHumanResource().getEmployer().getName(),
                            job.getHumanResource().getEmployer().getId(),
                            job.getHumanResource().getEmployer().getUser().getEmail(),
                            job.getHumanResource().getEmployer().getImage(),
                            job.getHumanResource().getEmployer().getPhoneNumber());


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
                            true,
                            false,
                            DateFunc.isExpired(job.getToDate()),
                            false,
                            null,
                            jobEmployerResponse,
                            null,
                            null,
                            null
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

    @Operation(summary = "Get top Jobs", description = "", tags = {})
    @GetMapping("/top-jobs")
    public ResponseEntity<BaseResponse> getTopJobs(Pageable pageable) {
        try {
            Page<Object[]> jobs = jobService.findActiveJobsWithApplicationCount(pageable);
            if (jobs.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                List<TopJobResponse> topJobResponses = jobs.stream().map(result -> {
                    Job job = (Job) result[0];
                    Long applicationCount = (Long) result[1];
                    return new TopJobResponse(
                            job.getId(),
                            job.getName(),
                            job.getHumanResource().getEmployer().getId(),
                            job.getHumanResource().getEmployer().getName(),
                            job.getHumanResource().getEmployer().getImage(),
                            applicationCount
                    );
                }).collect(Collectors.toList());

                Page<TopJobResponse> jobResponsePage = new PageImpl<>(topJobResponses, jobs.getPageable(), jobs.getTotalElements());
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc", HttpStatus.OK.value(), jobResponsePage)
                );
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    //1
    @GetMapping("/getJobs-admin")
    public ResponseEntity<?> getJobsByAdmin(@RequestHeader("Authorization") String token,
                                            @RequestParam(required = false) String keyword,
                                            @RequestParam(required = false) EStatus status,
                                            @RequestParam(required = false) boolean isExpired,
                                            Pageable pageable) {
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

            if (status == EStatus.DELETED)
                return ResponseEntity.ok(
                        new BaseResponse("Không được sử dụng trạng thái này", HttpStatus.BAD_REQUEST.value(), null)
                );

            Page<Job> jobs = jobService.findByNameContainingAndCategoryIdAndStatus(keyword, null, status, isExpired, pageable);
            if (jobs.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                List<JobResponse> jobResponses = jobs.getContent().stream().map(job -> {
                    List<StepResponse> stepResponses;

                    if (job.getProcess() != null) {
                        Page<Step> steps = stepService.findByProcessId(job.getProcess().getId(), Pageable.unpaged());

                        List<Step> stepList = steps.getContent();
                        stepResponses = stepList.stream()
                                .map(step -> new StepResponse(
                                        step.getId(),
                                        step.getName(),
                                        step.getNumber(),
                                        step.getDescription(),
                                        step.getProcess() != null ? step.getProcess().getId() : null
                                ))
                                .collect(Collectors.toList());
                    } else {
                        stepResponses = Collections.emptyList();
                    }
                    List<com.pth.taskbackend.model.meta.Tag> tags = tagService.findByJobId(job.getId(), null).toList();


                    JobCategoryResponse categoryResponse = new JobCategoryResponse(
                            job.getCategory() != null ? job.getCategory().getId() : null,
                            job.getCategory() != null ? job.getCategory().getName() : null);

                    JobEmployerResponse jobEmployerResponse = new JobEmployerResponse(
                            job.getHumanResource().getEmployer().getName(),
                            job.getHumanResource().getEmployer().getId(),
                            job.getHumanResource().getEmployer().getUser().getEmail(),
                            job.getHumanResource().getEmployer().getImage(),
                            job.getHumanResource().getEmployer().getPhoneNumber());

                    JobProcessResponse jobProcessResponse = new JobProcessResponse(
                            job.getProcess() != null ? job.getProcess().getId() : null,
                            job.getProcess() != null ? job.getProcess().getName() : null,
                            stepResponses
                    );

                    JobHrResponse jobHrResponse = new JobHrResponse(
                            job.getHumanResource().getId(),
                            job.getHumanResource().getFirstName() + " " + job.getHumanResource().getLastName()
                    );

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
                            vipEmployerService.isVip(job.getHumanResource().getEmployer().getId()),
                            false,
                            job.getToDate().isBefore(LocalDateTime.now()),
                            DateFunc.isExpired(job.getToDate()),
                            categoryResponse,
                            jobEmployerResponse,
                            jobHrResponse,
                            jobProcessResponse,
                            tags
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
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }

    }

    @GetMapping("/jobCount")
    public ResponseEntity<?> getJobCount(@RequestHeader("Authorization") String token) {
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

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }

    }

    @GetMapping("/pendingJobs-admin")
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
                        new BaseResponse("Danh sách công việc rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                List<JobResponse> jobResponses = jobs.getContent().stream().map(job -> {

                    List<StepResponse> stepResponses;
                    if (job.getProcess() != null) {
                        Page<Step> steps = stepService.findByProcessId(job.getProcess().getId(), Pageable.unpaged());

                        List<Step> stepList = steps.getContent();
                        stepResponses = stepList.stream()
                                .map(step -> new StepResponse(
                                        step.getId(),
                                        step.getName(),
                                        step.getNumber(),
                                        step.getDescription(),
                                        step.getProcess() != null ? step.getProcess().getId() : null
                                ))
                                .collect(Collectors.toList());
                    } else {
                        stepResponses = Collections.emptyList();
                    }
                    List<com.pth.taskbackend.model.meta.Tag> tags = tagService.findByJobId(job.getId(), null).toList();

                    JobCategoryResponse categoryResponse = new JobCategoryResponse(
                            job.getCategory() != null ? job.getCategory().getId() : null,
                            job.getCategory() != null ? job.getCategory().getName() : null);

                    JobEmployerResponse jobEmployerResponse = new JobEmployerResponse(
                            job.getHumanResource().getEmployer().getName(),
                            job.getHumanResource().getEmployer().getId(),
                            job.getHumanResource().getEmployer().getUser().getEmail(),
                            job.getHumanResource().getEmployer().getImage(),
                            job.getHumanResource().getEmployer().getPhoneNumber());

                    JobProcessResponse jobProcessResponse = new JobProcessResponse(
                            job.getProcess() != null ? job.getProcess().getId() : null,
                            job.getProcess() != null ? job.getProcess().getName() : null,
                            stepResponses
                    );

                    JobHrResponse jobHrResponse = new JobHrResponse(
                            job.getHumanResource().getId(),
                            job.getHumanResource().getFirstName() + " " + job.getHumanResource().getLastName()
                    );

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
                            false,
                            false,
                            DateFunc.isExpired(job.getToDate()),
                            false,
                            categoryResponse,
                            jobEmployerResponse,
                            jobHrResponse,
                            jobProcessResponse,
                            tags
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
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @GetMapping("/pendingJobs-employer")
    public ResponseEntity<?> getPendingJobEmployer(@RequestHeader("Authorization") String token, Pageable pageable) {
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


            Page<Job> jobs = jobService.findByEmployerIdAndStatus(optionalEmployer.get().getId(), EStatus.PENDING, pageable);
            if (jobs.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                List<JobResponse> jobResponses = jobs.getContent().stream().map(job -> {

                    List<StepResponse> stepResponses;
                    if (job.getProcess() != null) {
                        Page<Step> steps = stepService.findByProcessId(job.getProcess().getId(), Pageable.unpaged());

                        List<Step> stepList = steps.getContent();
                        stepResponses = stepList.stream()
                                .map(step -> new StepResponse(
                                        step.getId(),
                                        step.getName(),
                                        step.getNumber(),
                                        step.getDescription(),
                                        step.getProcess() != null ? step.getProcess().getId() : null
                                ))
                                .collect(Collectors.toList());
                    } else {
                        stepResponses = Collections.emptyList();
                    }
                    List<com.pth.taskbackend.model.meta.Tag> tags = tagService.findByJobId(job.getId(), null).toList();

                    JobCategoryResponse categoryResponse = new JobCategoryResponse(
                            job.getCategory() != null ? job.getCategory().getId() : null,
                            job.getCategory() != null ? job.getCategory().getName() : null);

                    JobEmployerResponse jobEmployerResponse = new JobEmployerResponse(
                            job.getHumanResource().getEmployer().getName(),
                            job.getHumanResource().getEmployer().getId(),
                            job.getHumanResource().getEmployer().getUser().getEmail(),
                            job.getHumanResource().getEmployer().getImage(),
                            job.getHumanResource().getEmployer().getPhoneNumber());

                    JobProcessResponse jobProcessResponse = new JobProcessResponse(
                            job.getProcess() != null ? job.getProcess().getId() : null,
                            job.getProcess() != null ? job.getProcess().getName() : null,
                            stepResponses
                    );

                    JobHrResponse jobHrResponse = new JobHrResponse(
                            job.getHumanResource().getId(),
                            job.getHumanResource().getFirstName() + " " + job.getHumanResource().getLastName()
                    );

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
                            vipEmployerService.isVip(job.getHumanResource().getEmployer().getId()),
                            false,
                            DateFunc.isExpired(job.getToDate()),
                            false,

                            categoryResponse,
                            jobEmployerResponse,
                            jobHrResponse,
                            jobProcessResponse,
                            tags
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
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get list", description = "", tags = {})
    @GetMapping("/getJobs-employer")
    public ResponseEntity<BaseResponse> getJobsByEmployer(@RequestHeader("Authorization") String token,
                                                          @RequestParam(required = false) String keyword,
                                                          @RequestParam(required = false) String categoryId,
                                                          @RequestParam(required = false) EStatus status,
                                                          @RequestParam(required = false) boolean isExpired,
                                                          Pageable pageable) {
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

            if (status == EStatus.DELETED)
                return ResponseEntity.ok(
                        new BaseResponse("Không được sử dụng trạng thái này", HttpStatus.BAD_REQUEST.value(), null)
                );

            Page<Job> jobs;
            if (optionalUser.get().getRole().equals(ERole.HR)) {
                Optional<HumanResource> humanResourceOptional = humanResourceService.findByEmail(email);
                if (humanResourceOptional.isEmpty())
                    return ResponseEntity.status(HttpStatus.OK)
                            .body(new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null));

                jobs = jobService.findByKeywordAndStatusAndCategoryIdAndHRId(keyword, status, categoryId, humanResourceOptional.get().getId(), isExpired, pageable);

            } else {

                Optional<Employer> optionalEmployer = employerService.findByUserEmail(email);
                if (optionalEmployer.isEmpty())
                    return ResponseEntity.status(HttpStatus.OK)
                            .body(new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null));
                jobs = jobService.findByKeywordAndStatusAndCategoryIdAndEmployerId(keyword, status, categoryId, optionalEmployer.get().getId(), isExpired, pageable);

            }
            if (jobs.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                List<JobResponse> jobResponses = jobs.getContent().stream().map(job -> {

                    List<StepResponse> stepResponses;

                    if (job.getProcess() != null) {
                        Page<Step> steps = stepService.findByProcessId(job.getProcess().getId(), Pageable.unpaged());
                        List<Step> stepList = steps.getContent();
                        stepResponses = stepList.stream()
                                .map(step -> new StepResponse(
                                        step.getId(),
                                        step.getName(),
                                        step.getNumber(),
                                        step.getDescription(),
                                        step.getProcess() != null ? step.getProcess().getId() : null
                                ))
                                .collect(Collectors.toList());
                    } else {
                        stepResponses = Collections.emptyList();
                    }
                    List<com.pth.taskbackend.model.meta.Tag> tags = tagService.findByJobId(job.getId(), null).toList();

                    JobCategoryResponse categoryResponse = new JobCategoryResponse(
                            job.getCategory() != null ? job.getCategory().getId() : null,
                            job.getCategory() != null ? job.getCategory().getName() : null);
                    JobEmployerResponse jobEmployerResponse = new JobEmployerResponse(
                            job.getHumanResource().getEmployer().getName(),
                            job.getHumanResource().getEmployer().getId(),
                            job.getHumanResource().getEmployer().getUser().getEmail(),
                            job.getHumanResource().getEmployer().getImage(),
                            job.getHumanResource().getEmployer().getPhoneNumber());

                    JobProcessResponse jobProcessResponse = new JobProcessResponse(
                            job.getProcess() != null ? job.getProcess().getId() : null,
                            job.getProcess() != null ? job.getProcess().getName() : null,
                            stepResponses
                    );

                    JobHrResponse jobHrResponse = new JobHrResponse(
                            job.getHumanResource().getId(),
                            job.getHumanResource().getFirstName() + " " + job.getHumanResource().getLastName()
                    );

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
                            vipEmployerService.isVip(job.getHumanResource().getEmployer().getId()),
                            false,
                            DateFunc.isExpired(job.getToDate()),
                            false,

                            categoryResponse,
                            jobEmployerResponse,
                            jobHrResponse,
                            jobProcessResponse,
                            tags
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
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }

    }

    @Operation(summary = "Get detail", description = "", tags = {})
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getJob(@RequestHeader(name = "Authorization", required = false) String token, @PathVariable String id) {
        try {
            Optional<Candidate> optionalCandidate;
            if (token != null) {
                String email = jwtService.extractUsername(token.substring(7));
                boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.CANDIDATE);
                if (permission) {
                    optionalCandidate = candidateService.findByUserEmail(email);
                    if (optionalCandidate.isEmpty())
                        return ResponseEntity.ok(
                                new BaseResponse("Không tìm thấy ứng viên ", HttpStatus.NOT_FOUND.value(), null)
                        );
                } else {
                    optionalCandidate = null;
                }
            } else {
                optionalCandidate = null;
            }
            Optional<Job> optionalJob = jobService.findByIdAndStatus(id, EStatus.ACTIVE).isEmpty() ? jobService.findByIdAndStatus(id, EStatus.PAUSED) : jobService.findByIdAndStatus(id, EStatus.ACTIVE);

            if (optionalJob.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy công việc", HttpStatus.NOT_FOUND.value(), null)
                );
            } else {
                Job job = optionalJob.get();
                List<StepResponse> stepResponses;

                if (job.getProcess() != null) {
                    Page<Step> steps = stepService.findByProcessId(job.getProcess().getId(), Pageable.unpaged());

                    List<Step> stepList = steps.getContent();
                    stepResponses = stepList.stream()
                            .map(step -> new StepResponse(
                                    step.getId(),
                                    step.getName(),
                                    step.getNumber(),
                                    step.getDescription(),
                                    step.getProcess() != null ? step.getProcess().getId() : null
                            ))
                            .collect(Collectors.toList());
                } else {
                    stepResponses = Collections.emptyList();
                }
                List<com.pth.taskbackend.model.meta.Tag> tags = tagService.findByJobId(job.getId(), null).toList();

                JobCategoryResponse categoryResponse = new JobCategoryResponse(
                        job.getCategory() != null ? job.getCategory().getId() : null,
                        job.getCategory() != null ? job.getCategory().getName() : null);

                JobEmployerResponse jobEmployerResponse = new JobEmployerResponse(
                        job.getHumanResource().getEmployer().getName(),
                        job.getHumanResource().getEmployer().getId(),
                        job.getHumanResource().getEmployer().getUser().getEmail(),
                        job.getHumanResource().getEmployer().getImage(),
                        job.getHumanResource().getEmployer().getPhoneNumber());

                JobProcessResponse jobProcessResponse = new JobProcessResponse(
                        job.getProcess() != null ? job.getProcess().getId() : null,
                        job.getProcess() != null ? job.getProcess().getName() : null,
                        stepResponses
                );

                JobHrResponse jobHrResponse = new JobHrResponse(
                        job.getHumanResource().getId(),
                        job.getHumanResource().getFirstName() + " " + job.getHumanResource().getLastName()
                );

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
                        vipEmployerService.isVip(job.getHumanResource().getEmployer().getId()),
                        optionalCandidate != null && jobService.checkIsSaveJob(optionalCandidate.get().getId(), job.getId()),
                        DateFunc.isExpired(job.getToDate()),
                        optionalCandidate != null && (optionalCandidate.filter(candidate -> applicationService.findByJobIdAndCandidateId(job.getId(), candidate.getId()).isPresent()).isPresent()),
                        categoryResponse,
                        jobEmployerResponse,
                        jobHrResponse,
                        jobProcessResponse,
                        tags
                );

                return ResponseEntity.ok(
                        new BaseResponse("Thông tin công việc", HttpStatus.OK.value(), jobResponse)
                );
            }

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get similar", description = "", tags = {})
    @GetMapping("/getSimilar/{id}")
    public ResponseEntity<BaseResponse> getJobSimilar(@RequestHeader(name = "Authorization", required = false) String token, @PathVariable String id, Pageable pageable) {
        try {
            Optional<Candidate> optionalCandidate;
            if (token != null) {
                String email = jwtService.extractUsername(token.substring(7));
                boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.CANDIDATE);
                if (permission) {
                    optionalCandidate = candidateService.findByUserEmail(email);
                    if (optionalCandidate.isEmpty())
                        return ResponseEntity.ok(
                                new BaseResponse("Không tìm thấy ứng viên!", HttpStatus.NOT_FOUND.value(), null)
                        );
                } else {
                    optionalCandidate = null;
                }
            } else {
                optionalCandidate = null;
            }
            Optional<Job> optionalJob = jobService.findById(id);
            if (optionalJob.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy công viêc! ", HttpStatus.NOT_FOUND.value(), null)
                );
            }
            Page<Job> jobs = jobService.findJobSimilar(id, pageable);

            List<JobResponse> jobResponses = jobs.getContent().stream().map(job -> {
                JobCategoryResponse categoryResponse = new JobCategoryResponse(
                        job.getCategory() != null ? job.getCategory().getId() : null,
                        job.getCategory() != null ? job.getCategory().getName() : null);
                JobEmployerResponse jobEmployerResponse = new JobEmployerResponse(
                        job.getHumanResource().getEmployer().getName(),
                        job.getHumanResource().getEmployer().getId(),
                        job.getHumanResource().getEmployer().getUser().getEmail(),
                        job.getHumanResource().getEmployer().getImage(),
                        job.getHumanResource().getEmployer().getPhoneNumber());


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
                        vipEmployerService.isVip(job.getHumanResource().getEmployer().getId()),
                        optionalCandidate != null && (optionalCandidate.filter(value -> jobService.findByCandidateIdAndJobId(value.getId(), job.getId()).isPresent()).isPresent()),
                        false,
                        false,
                        categoryResponse,
                        jobEmployerResponse,
                        null,
                        null,
                        null
                );
            }).collect(Collectors.toList());

            Page<JobResponse> jobResponsePage = new PageImpl<>(jobResponses, jobs.getPageable(), jobs.getTotalElements());
            return ResponseEntity.ok(
                    new BaseResponse("Thông tin công việc", HttpStatus.OK.value(), jobResponses)
            );


        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get detail", description = "", tags = {})
    @GetMapping("/getDetail-employer/{id}")
    public ResponseEntity<BaseResponse> getJobDetailsByEmployer(@RequestHeader("Authorization") String token, @PathVariable String id) {
        try {

            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR) || checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng  ", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<Job> optionalJob;
            if (optionalUser.get().getRole().equals(ERole.HR)) {
                Optional<HumanResource> humanResourceOptional = humanResourceService.findByEmail(email);
                if (humanResourceOptional.isEmpty())
                    return ResponseEntity.status(HttpStatus.OK)
                            .body(new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null));

                optionalJob = jobService.findByIdAndHRId(id, humanResourceOptional.get().getId());

            } else {

                Optional<Employer> optionalEmployer = employerService.findByUserEmail(email);
                if (optionalEmployer.isEmpty())
                    return ResponseEntity.status(HttpStatus.OK)
                            .body(new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null));
                optionalJob = jobService.findByIdAndEmployerId(id, optionalEmployer.get().getId());

            }
            if (optionalJob.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy công việc", HttpStatus.NOT_FOUND.value(), null)
                );
            } else {
                Job job = optionalJob.get();
                List<StepResponse> stepResponses;

                if (job.getProcess() != null) {
                    Page<Step> steps = stepService.findByProcessId(job.getProcess().getId(), Pageable.unpaged());

                    List<Step> stepList = steps.getContent();
                    stepResponses = stepList.stream()
                            .map(step -> new StepResponse(
                                    step.getId(),
                                    step.getName(),
                                    step.getNumber(),
                                    step.getDescription(),
                                    step.getProcess() != null ? step.getProcess().getId() : null
                            ))
                            .collect(Collectors.toList());
                } else {
                    stepResponses = Collections.emptyList();
                }
                List<com.pth.taskbackend.model.meta.Tag> tags = tagService.findByJobId(job.getId(), null).toList();

                JobCategoryResponse categoryResponse = new JobCategoryResponse(
                        job.getCategory() != null ? job.getCategory().getId() : null,
                        job.getCategory() != null ? job.getCategory().getName() : null);

                JobEmployerResponse jobEmployerResponse = new JobEmployerResponse(
                        job.getHumanResource().getEmployer().getName(),
                        job.getHumanResource().getEmployer().getId(),
                        job.getHumanResource().getEmployer().getUser().getEmail(),
                        job.getHumanResource().getEmployer().getImage(),
                        job.getHumanResource().getEmployer().getPhoneNumber());

                JobProcessResponse jobProcessResponse = new JobProcessResponse(
                        job.getProcess() != null ? job.getProcess().getId() : null,
                        job.getProcess() != null ? job.getProcess().getName() : null,
                        stepResponses
                );

                JobHrResponse jobHrResponse = new JobHrResponse(
                        job.getHumanResource().getId(),
                        job.getHumanResource().getFirstName() + " " + job.getHumanResource().getLastName() + " (" + job.getHumanResource().getUser().getEmail() + ")"
                );

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
                        vipEmployerService.isVip(job.getHumanResource().getEmployer().getId()),
                        false,
                        DateFunc.isExpired(job.getToDate()),
                        false,
                        categoryResponse,
                        jobEmployerResponse,
                        jobHrResponse,
                        jobProcessResponse,
                        tags
                );
                return ResponseEntity.ok(
                        new BaseResponse("Thông tin công việc", HttpStatus.OK.value(), jobResponse)
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

    @Operation(summary = "Get detail", description = "", tags = {})
    @GetMapping("/getDetail-admin/{id}")
    public ResponseEntity<BaseResponse> getJobByAdmin(@PathVariable String id, @RequestHeader("Authorization") String token) {
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
                        new BaseResponse("Không tìm thấy người dùng  ", HttpStatus.NOT_FOUND.value(), null)
                );
            Optional<Job> optionalJob = jobService.findByIdAndStatus(id, null);

            if (optionalJob.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy công việc", HttpStatus.NOT_FOUND.value(), null)
                );
            } else {
                Job job = optionalJob.get();
                List<StepResponse> stepResponses;

                if (job.getProcess() != null) {
                    Page<Step> steps = stepService.findByProcessId(job.getProcess().getId(), Pageable.unpaged());

                    List<Step> stepList = steps.getContent();
                    stepResponses = stepList.stream()
                            .map(step -> new StepResponse(
                                    step.getId(),
                                    step.getName(),
                                    step.getNumber(),
                                    step.getDescription(),
                                    step.getProcess() != null ? step.getProcess().getId() : null
                            ))
                            .collect(Collectors.toList());
                } else {
                    stepResponses = Collections.emptyList();
                }

                List<com.pth.taskbackend.model.meta.Tag> tags = tagService.findByJobId(job.getId(), null).toList();

                JobCategoryResponse categoryResponse = new JobCategoryResponse(
                        job.getCategory() != null ? job.getCategory().getId() : null,
                        job.getCategory() != null ? job.getCategory().getName() : null);

                JobEmployerResponse jobEmployerResponse = new JobEmployerResponse(
                        job.getHumanResource().getEmployer().getName(),
                        job.getHumanResource().getEmployer().getId(),
                        job.getHumanResource().getEmployer().getUser().getEmail(),
                        job.getHumanResource().getEmployer().getImage(),
                        job.getHumanResource().getEmployer().getPhoneNumber());

                JobProcessResponse jobProcessResponse = new JobProcessResponse(
                        job.getProcess() != null ? job.getProcess().getId() : null,
                        job.getProcess() != null ? job.getProcess().getName() : null,
                        stepResponses
                );

                JobHrResponse jobHrResponse = new JobHrResponse(
                        job.getHumanResource().getId(),
                        job.getHumanResource().getFirstName() + " " + job.getHumanResource().getLastName()
                );

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
                        vipEmployerService.isVip(job.getHumanResource().getEmployer().getId()),
                        false,
                        DateFunc.isExpired(job.getToDate()),
                        false,

                        categoryResponse,
                        jobEmployerResponse,
                        jobHrResponse,
                        jobProcessResponse,
                        tags
                );
                return ResponseEntity.ok(
                        new BaseResponse("Thông tin công việc", HttpStatus.OK.value(), jobResponse)
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

    @Operation(summary = "Create", description = "", tags = {})
    @PostMapping("/create")
    public ResponseEntity<BaseResponse> createJob(@RequestHeader("Authorization") String token, @RequestBody JobRequest request) throws IOException {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR) || checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy nhà tuyển dụng ", HttpStatus.NOT_FOUND.value(), null)
                );


            Job job = new Job();
            job.setName(request.name());
            job.setStatus(EStatus.PENDING);
            job.setExperience(request.experience());
            job.setDescription(request.description());
            job.setCategory(request.categoryId() == null ? null : categoryService.findById(request.categoryId()).isEmpty() ? null : categoryService.findById(request.categoryId()).get());
            job.setFromSalary(request.fromSalary());
            job.setToSalary(request.toSalary());
            job.setToDate(request.toDate());
            job.setLocation(request.location());
            if (optionalUser.get().getRole().equals(ERole.EMPLOYER)) {
                Optional<HumanResource> optionalHumanResource = humanResourceService.findById(request.humanResourceId());
                if (optionalHumanResource.isEmpty())
                    return ResponseEntity.status(HttpStatus.OK)
                            .body(new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null));

                job.setHumanResource(optionalHumanResource.get());

            } else {
                job.setHumanResource(humanResourceService.findByEmail(email).get());

            }
            Set<com.pth.taskbackend.model.meta.Tag> tags = new HashSet<>();
            for (com.pth.taskbackend.model.meta.Tag tag : request.tags()) {
                Optional<com.pth.taskbackend.model.meta.Tag> optional = tagService.findById(tag.getId());
                optional.ifPresent(tags::add);
            }
            job.setTags(tags);

            Optional<Process> optionalProcess = processService.findById(request.processId());
            if (optionalProcess.isEmpty())
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new BaseResponse("Không tìm thấy quy trình", HttpStatus.NOT_FOUND.value(), null));
            job.setProcess(optionalProcess.get());

            jobService.create(job);

            List<StepResponse> stepResponses;

            if (job.getProcess() != null) {
                Page<Step> steps = stepService.findByProcessId(job.getProcess().getId(), Pageable.unpaged());

                List<Step> stepList = steps.getContent();
                stepResponses = stepList.stream()
                        .map(step -> new StepResponse(
                                step.getId(),
                                step.getName(),
                                step.getNumber(),
                                step.getDescription(),
                                step.getProcess() != null ? step.getProcess().getId() : null
                        ))
                        .collect(Collectors.toList());
            } else {
                stepResponses = Collections.emptyList();
            }

            JobCategoryResponse categoryResponse = new JobCategoryResponse(
                    job.getCategory() != null ? job.getCategory().getId() : null,
                    job.getCategory() != null ? job.getCategory().getName() : null);

            JobEmployerResponse jobEmployerResponse = new JobEmployerResponse(
                    job.getHumanResource().getEmployer().getName(),
                    job.getHumanResource().getEmployer().getId(),
                    job.getHumanResource().getEmployer().getUser().getEmail(),
                    job.getHumanResource().getEmployer().getImage(),
                    job.getHumanResource().getEmployer().getPhoneNumber());

            JobProcessResponse jobProcessResponse = new JobProcessResponse(
                    job.getProcess() != null ? job.getProcess().getId() : null,
                    job.getProcess() != null ? job.getProcess().getName() : null,
                    stepResponses
            );

            JobHrResponse jobHrResponse = new JobHrResponse(
                    job.getHumanResource().getId(),
                    job.getHumanResource().getFirstName() + " " + job.getHumanResource().getLastName()
            );

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
                    vipEmployerService.isVip(job.getHumanResource().getEmployer().getId()),
                    false,
                    DateFunc.isExpired(job.getToDate()),
                    false,

                    categoryResponse,
                    jobEmployerResponse,
                    jobHrResponse,
                    jobProcessResponse,
                    tags.stream().toList()
            );
            return ResponseEntity.ok(
                    new BaseResponse("Tạo công việc thành công", HttpStatus.OK.value(), jobResponse)
            );
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    @Operation(summary = "update", description = "", tags = {})
    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse> updateJob(@RequestHeader("Authorization") String token, @PathVariable("id") String id, @RequestBody JobRequest request) throws IOException {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR) || checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng  ", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<Job> optionalJob = jobService.findById(id);
            if (optionalJob.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new BaseResponse("Không tìm thấy công việc", HttpStatus.NOT_FOUND.value(), null));
            }

            Optional<Process> optionalProcess = processService.findById(request.processId());
            if (optionalProcess.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new BaseResponse("Không tìm thấy quy trình", HttpStatus.NOT_FOUND.value(), null));
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
            if (optionalUser.get().getRole().equals(ERole.EMPLOYER)) {
                Optional<HumanResource> optionalHumanResource = humanResourceService.findById(request.humanResourceId());
                if (optionalHumanResource.isEmpty())
                    return ResponseEntity.status(HttpStatus.OK)
                            .body(new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null));

                job.setHumanResource(optionalHumanResource.get());

            } else {
                job.setHumanResource(humanResourceService.findByEmail(email).get());

            }
            if (request.tags() != null) {
                Set<com.pth.taskbackend.model.meta.Tag> tags = new HashSet<>();
                for (com.pth.taskbackend.model.meta.Tag tag : request.tags()) {
                    Optional<com.pth.taskbackend.model.meta.Tag> optional = tagService.findById(tag.getId());
                    tags.add(optional.get());
                }
                job.getTags().clear();
                job.setTags(tags);
            }
            job.setProcess(optionalProcess.get());


            job.setCategory(request.categoryId() == null ? null : categoryService.findById(request.categoryId()).isEmpty() ? null : categoryService.findById(request.categoryId()).get());


            List<StepResponse> stepResponses;
            Page<Step> steps = stepService.findByProcessId(job.getProcess().getId(), Pageable.unpaged());

            List<Step> stepList = steps.getContent();
            if (job.getProcess() != null) {
                stepResponses = stepList.stream()
                        .map(step -> new StepResponse(
                                step.getId(),
                                step.getName(),
                                step.getNumber(),
                                step.getDescription(),
                                step.getProcess() != null ? step.getProcess().getId() : null
                        ))
                        .collect(Collectors.toList());
            } else {
                stepResponses = Collections.emptyList();
            }
            jobService.create(job);

            JobCategoryResponse categoryResponse = new JobCategoryResponse(
                    job.getCategory() != null ? job.getCategory().getId() : null,
                    job.getCategory() != null ? job.getCategory().getName() : null);

            JobEmployerResponse jobEmployerResponse = new JobEmployerResponse(
                    job.getHumanResource().getEmployer().getName(),
                    job.getHumanResource().getEmployer().getId(),
                    job.getHumanResource().getEmployer().getUser().getEmail(),
                    job.getHumanResource().getEmployer().getImage(),
                    job.getHumanResource().getEmployer().getPhoneNumber());

            JobProcessResponse jobProcessResponse = new JobProcessResponse(
                    job.getProcess() != null ? job.getProcess().getId() : null,
                    job.getProcess() != null ? job.getProcess().getName() : null,
                    stepResponses
            );

            JobHrResponse jobHrResponse = new JobHrResponse(
                    job.getHumanResource().getId(),
                    job.getHumanResource().getFirstName() + " " + job.getHumanResource().getLastName()
            );

            Set<com.pth.taskbackend.model.meta.Tag> tags = new HashSet<>();
            for (com.pth.taskbackend.model.meta.Tag tag : request.tags()) {
                Optional<com.pth.taskbackend.model.meta.Tag> optional = tagService.findById(tag.getId());
                optional.ifPresent(tags::add);
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
                    vipEmployerService.isVip(job.getHumanResource().getEmployer().getId()),
                    false,
                    DateFunc.isExpired(job.getToDate()),
                    false,
                    categoryResponse,
                    jobEmployerResponse,
                    jobHrResponse,
                    jobProcessResponse,
                    tags.stream().toList()
            );

            return ResponseEntity.ok(
                    new BaseResponse("Cập nhật công việc thành công", HttpStatus.OK.value(), jobResponse)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "update status", description = "", tags = {})
    @PatchMapping("/updateStatus-admin/{id}")
    public ResponseEntity<BaseResponse> updateJobStatusByAdmin(@RequestHeader("Authorization") String token, @PathVariable("id") String id, @RequestBody String status) {
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

            Map<String, String> jsonMap = objectMapper.readValue(status, new TypeReference<Map<String, String>>() {
            });

            String statusValue = jsonMap.get("status");
            EStatus statusEnum = EStatus.fromString(statusValue);
            Optional<Job> optionalJob = jobService.findById(id);

            if (optionalJob.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy công việc tương ứng", HttpStatus.NOT_FOUND.value(), null)
                );
            if (statusEnum == EStatus.DELETED)
                return ResponseEntity.ok(
                        new BaseResponse("Không được xóa", HttpStatus.FORBIDDEN.value(), null)
                );
            Job job = optionalJob.get();
            switch (statusEnum) {

                case ACTIVE:

                    if (job.getStatus().equals(EStatus.ACTIVE))
                        return ResponseEntity.ok(
                                new BaseResponse("Đã bật tuyển dụng", HttpStatus.BAD_REQUEST.value(), null)
                        );

                    if (job.getStatus().equals(EStatus.PENDING)) {
                        List<Candidate> candidates = candidateService.getCandidatesFollow(job.getHumanResource().getEmployer().getId());
                        List<String> emails = candidates.stream()
                                .map(candidate -> candidate.getUser().getEmail())
                                .collect(Collectors.toList());


                        CompletableFuture.runAsync(() -> {
                            emails.forEach(item -> {
                                try {
                                    String imageUrl = job.getHumanResource().getEmployer().getImage();
                                    if (imageUrl == null || imageUrl.isEmpty()) {
                                        imageUrl = "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695807392/DoAnNganh/non-user_lctzz5.jpg";
                                    }
                                    String category = job.getCategory().getName();
                                    if (category == null || category.isEmpty()) {
                                        category = "Khác";
                                    }
                                    mailService.sendEmailV2(item, item, job.getHumanResource().getEmployer().getName(),
                                            imageUrl, job.getId(), job.getName(), job.getLocation(),
                                            category,
                                            "EMAIL_TEMPLATE2");
                                } catch (MessagingException e) {
                                    System.out.println("Failed to send email to: " + item);
                                }
                            });
                        });
                    }
                    job.setStatus(EStatus.ACTIVE);
                    jobService.update(job);
                    return ResponseEntity.ok(
                            new BaseResponse("Bật tuyển công việc thành công", HttpStatus.OK.value(), null)
                    );


                case INACTIVE:

                    if (job.getStatus().equals(EStatus.INACTIVE))
                        return ResponseEntity.ok(
                                new BaseResponse("Đã tắt tuyển dụng công việc này", HttpStatus.BAD_REQUEST.value(), null)
                        );
                    job.setStatus(EStatus.INACTIVE);
                    jobService.update(job);

                    return ResponseEntity.ok(
                            new BaseResponse("Tắt tuyển dụng công việc thành công", HttpStatus.OK.value(), null));


                default:
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(new BaseResponse("Trạng thái không hợp lệ", HttpStatus.BAD_REQUEST.value(), null));
            }

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.ok(new BaseResponse("Không tìm thấy công việc cần duyệt!", HttpStatus.NOT_FOUND.value(), null));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "update status", description = "", tags = {})
    @PatchMapping("/updateStatus-employer/{id}")
    public ResponseEntity<BaseResponse> updateJobStatusByEmployer(@RequestHeader("Authorization") String token, @PathVariable("id") String id, @RequestBody String status) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission =
                    checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR) ||
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

            Map<String, String> jsonMap = objectMapper.readValue(status, new TypeReference<Map<String, String>>() {
            });

            String statusValue = jsonMap.get("status");
            EStatus statusEnum = EStatus.fromString(statusValue);
            Optional<Job> optionalJob = Optional.empty();

            if (optionalUser.get().getRole().equals(ERole.EMPLOYER)) {
                Optional<Employer> optionalEmployer = employerService.findByUserEmail(email);
                if (optionalEmployer.isEmpty())
                    return ResponseEntity.ok(
                            new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                    );

                optionalJob = jobService.findByIdAndEmployerId(id, optionalEmployer.get().getId());

            } else if (optionalUser.get().getRole().equals(ERole.HR)) {
                Optional<HumanResource> optionalHumanResource = humanResourceService.findByEmail(email);
                if (optionalHumanResource.isEmpty())
                    return ResponseEntity.ok(
                            new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                    );

                optionalJob = jobService.findByIdAndHRId(id, optionalHumanResource.get().getId());

            }
            if (optionalJob.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy công việc tương ứng", HttpStatus.NOT_FOUND.value(), null)
                );
            if (statusEnum == EStatus.DELETED)
                return ResponseEntity.ok(
                        new BaseResponse("Không được xóa", HttpStatus.FORBIDDEN.value(), null)
                );
            Job job = optionalJob.get();
            switch (statusEnum) {
                case PAUSED:

                    if (job.getStatus().equals(EStatus.PAUSED))
                        return ResponseEntity.ok(
                                new BaseResponse("Đang dừng tuyển dụng công việc này", HttpStatus.BAD_REQUEST.value(), null)
                        );

                    job.setStatus(EStatus.PAUSED);
                    jobService.update(job);

                    return ResponseEntity.ok(
                            new BaseResponse("Dừng tuyển công việc thành công", HttpStatus.OK.value(), null)
                    );
                case ACTIVE:

                    if (job.getStatus().equals(EStatus.ACTIVE))
                        return ResponseEntity.ok(
                                new BaseResponse("Đã bật tuyển dụng", HttpStatus.BAD_REQUEST.value(), null)
                        );
                    job.setStatus(EStatus.ACTIVE);
                    jobService.update(job);

                    return ResponseEntity.ok(
                            new BaseResponse("Bật tuyển công việc thành công", HttpStatus.OK.value(), null)
                    );

                default:
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(new BaseResponse("Trạng thái không hợp lệ", HttpStatus.BAD_REQUEST.value(), null));
            }

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.ok(new BaseResponse("Không tìm thấy công việc cần duyệt!", HttpStatus.NOT_FOUND.value(), null));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "update dealine", description = "", tags = {})
    @PatchMapping("/updateDateline/{id}")
    public ResponseEntity<BaseResponse> updateJobDateline(@RequestHeader("Authorization") String token, @PathVariable("id") String id, @RequestBody ChangeDealine toDate) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission =
                    checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR) ||
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

            Optional<Job> optionalJob = Optional.empty();

            if (optionalUser.get().getRole().equals(ERole.EMPLOYER)) {
                Optional<Employer> optionalEmployer = employerService.findByUserEmail(email);
                if (optionalEmployer.isEmpty())
                    return ResponseEntity.ok(
                            new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                    );

                optionalJob = jobService.findByIdAndEmployerId(id, optionalEmployer.get().getId());

            } else if (optionalUser.get().getRole().equals(ERole.HR)) {
                Optional<HumanResource> optionalHumanResource = humanResourceService.findByEmail(email);
                if (optionalHumanResource.isEmpty())
                    return ResponseEntity.ok(
                            new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                    );

                optionalJob = jobService.findByIdAndHRId(id, optionalHumanResource.get().getId());

            }
            if (optionalJob.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy công việc tương ứng!", HttpStatus.NOT_FOUND.value(), null)
                );

            Job job = optionalJob.get();
            job.setToDate(toDate.toDate());
            jobRepository.save(job);
            return ResponseEntity.ok(
                    new BaseResponse("Gia hạn công việc thành công", HttpStatus.OK.value(), job)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    @Operation(summary = "delete job", description = "", tags = {})
    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> deleteJob(@RequestHeader("Authorization") String token, @PathVariable("id") String id) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.ADMIN) ||
                    checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR) ||
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
            Optional<Job> optionalJob = Optional.empty();
            if (optionalUser.get().getRole().equals(ERole.ADMIN)) {
                optionalJob = jobService.findById(id);
            } else if (optionalUser.get().getRole().equals(ERole.EMPLOYER)) {
                Optional<Employer> optionalEmployer = employerService.findByUserEmail(email);
                if (optionalEmployer.isEmpty())
                    return ResponseEntity.ok(
                            new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                    );

                optionalJob = jobService.findByIdAndEmployerId(id, optionalEmployer.get().getId());

            } else if (optionalUser.get().getRole().equals(ERole.HR)) {
                Optional<HumanResource> optionalHumanResource = humanResourceService.findByEmail(email);
                if (optionalHumanResource.isEmpty())
                    return ResponseEntity.ok(
                            new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                    );

                optionalJob = jobService.findByIdAndHRId(id, optionalHumanResource.get().getId());

            }

            if (optionalJob.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy công việc", HttpStatus.NOT_FOUND.value(), null)
                );
            }

            Job job = optionalJob.get();
            if (job.getStatus().equals(EStatus.DELETED))
                return ResponseEntity.ok(
                        new BaseResponse("Công việc đã bị xóa trước đó", HttpStatus.OK.value(), null)
                );
            job.setStatus(EStatus.DELETED);
            jobService.update(job);
            return ResponseEntity.ok(
                    new BaseResponse("Xóa công việc thành công", HttpStatus.OK.value(), null)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "save job", description = "", tags = {})
    @PostMapping("/save-job/{id}")
    public ResponseEntity<BaseResponse> saveJob(@RequestHeader("Authorization") String token, @PathVariable("id") String id) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.CANDIDATE);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép!", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<Job> optionalJob = jobService.findById(id);
            if (optionalJob.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy công việc!", HttpStatus.NOT_FOUND.value(), null)
                );
            }

            Job job = optionalJob.get();
            if (!job.getStatus().equals(EStatus.ACTIVE))
                return ResponseEntity.ok(
                        new BaseResponse("Công việc không hoạt động!", HttpStatus.BAD_REQUEST.value(), null)
                );

            Optional<Candidate> candidate = candidateService.findByUserEmail(optionalUser.get().getEmail());
            if (candidate.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy ứng viên!", HttpStatus.NOT_FOUND.value(), null)
                );
            }

            if (!jobService.checkIsSaveJob(candidate.get().getId(), job.getId())) {
                jobService.saveJob(job.getId(), candidate.get().getId());
                return ResponseEntity.ok(
                        new BaseResponse("Lưu thành công", HttpStatus.OK.value(), false)
                );
            }

            return ResponseEntity.ok(
                    new BaseResponse("Công việc đã được lưu trước đó!", HttpStatus.BAD_REQUEST.value(), true)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn!", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "unsave job", description = "", tags = {})
    @DeleteMapping("/unsave-job/{id}")
    public ResponseEntity<BaseResponse> unSaveJob(@RequestHeader("Authorization") String token, @PathVariable("id") String id) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.CANDIDATE);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép!", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<Job> optionalJob = jobService.findById(id);
            if (optionalJob.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy công việc!", HttpStatus.NOT_FOUND.value(), null)
                );
            }

            Job job = optionalJob.get();
            if (!job.getStatus().equals(EStatus.ACTIVE))
                return ResponseEntity.ok(
                        new BaseResponse("Công việc không hoạt động!", HttpStatus.BAD_REQUEST.value(), null)
                );

            Optional<Candidate> candidate = candidateService.findByUserEmail(optionalUser.get().getEmail());
            if (candidate.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy ứng viên!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
            if (jobService.checkIsSaveJob(candidate.get().getId(), job.getId())) {
                jobService.deleteSavedJobByJobIdAndCandidateId(job.getId(), candidate.get().getId());
                return ResponseEntity.ok(
                        new BaseResponse("Bỏ lưu thành công", HttpStatus.OK.value(), false)
                );
            }

            return ResponseEntity.ok(
                    new BaseResponse("Công việc chưa được lưu trước đó!", HttpStatus.BAD_REQUEST.value(), true)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "get saved job", description = "", tags = {})
    @GetMapping("/jobsSaved")
    public ResponseEntity<BaseResponse> jobsSaved(@RequestHeader("Authorization") String token,
                                                  @RequestParam(required = false) String keyword,
                                                  @RequestParam(required = false) String location,
                                                  Pageable pageable) {
        try {

            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.CANDIDATE);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép!", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<Candidate> candidate = candidateService.findByUserEmail(optionalUser.get().getEmail());
            if (candidate.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy ứng viên!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
            ;

            Page<Job> jobs = jobService.getJobsSaved(candidate.get().getId(), keyword, location, pageable);
            if (jobs.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                List<JobResponse> jobResponses = jobs.getContent().stream().map(job -> {
                    List<StepResponse> stepResponses;

                    if (job.getProcess() != null) {
                        Page<Step> steps = stepService.findByProcessId(job.getProcess().getId(), null);

                        List<Step> stepList = steps.getContent();

                        stepResponses = stepList.stream()
                                .map(step -> new StepResponse(
                                        step.getId(),
                                        step.getName(),
                                        step.getNumber(),
                                        step.getDescription(),
                                        step.getProcess() != null ? step.getProcess().getId() : null
                                ))
                                .collect(Collectors.toList());
                    } else {
                        stepResponses = Collections.emptyList();
                    }
                    List<com.pth.taskbackend.model.meta.Tag> tagList = tagService.findByJobId(job.getId(), null).toList();

                    JobCategoryResponse categoryResponse = new JobCategoryResponse(
                            job.getCategory() != null ? job.getCategory().getId() : null,
                            job.getCategory() != null ? job.getCategory().getName() : null);

                    JobEmployerResponse jobEmployerResponse = new JobEmployerResponse(
                            job.getHumanResource().getEmployer().getName(),
                            job.getHumanResource().getEmployer().getId(),
                            job.getHumanResource().getEmployer().getUser().getEmail(),
                            job.getHumanResource().getEmployer().getImage(),
                            job.getHumanResource().getEmployer().getPhoneNumber());

                    JobProcessResponse jobProcessResponse = new JobProcessResponse(
                            job.getProcess() != null ? job.getProcess().getId() : null,
                            job.getProcess() != null ? job.getProcess().getName() : null,
                            stepResponses
                    );

                    JobHrResponse jobHrResponse = new JobHrResponse(
                            job.getHumanResource().getId(),
                            job.getHumanResource().getFirstName() + " " + job.getHumanResource().getLastName()
                    );


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
                            vipEmployerService.isVip(job.getHumanResource().getEmployer().getId()),
                            candidate != null && jobService.checkIsSaveJob(candidate.get().getId(), job.getId()),
                            DateFunc.isExpired(job.getToDate()),
                            candidate != null && candidate.filter(
                                    value -> applicationService.findByJobIdAndCandidateId(
                                            job.getId(), candidate.get().getId()
                                    ).isPresent()).isPresent(),
                            categoryResponse,
                            jobEmployerResponse,
                            jobHrResponse,
                            jobProcessResponse,
                            tagList
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
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "get new job", description = "", tags = {})
    @GetMapping("/new-jobs")
    public ResponseEntity<BaseResponse> getNewJobs(Pageable pageable) {
        try {

            Page<Job> jobs = jobService.getNewJob(pageable);
            if (jobs.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                List<HomeJobResponse> jobResponses = jobs.getContent().stream().map(job -> {
                    return new HomeJobResponse(
                            job.getId(),
                            job.getCreated(),
                            job.getUpdated(),
                            job.getName(),
                            job.getHumanResource().getEmployer()
                    );
                }).collect(Collectors.toList());

                Page<HomeJobResponse> jobResponsePage = new PageImpl<>(jobResponses, jobs.getPageable(), jobs.getTotalElements());
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc", HttpStatus.OK.value(), jobResponsePage)
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

    @Operation(summary = "get active job", description = "", tags = {})
    @GetMapping("/getActive-jobs")
    public ResponseEntity<BaseResponse> getActiveJob(@RequestHeader("Authorization") String token, Pageable pageable) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER) || checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép!", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );

            if (ERole.EMPLOYER == optionalUser.get().getRole()) {
                Optional<Employer> employer = employerService.findByUserEmail(optionalUser.get().getEmail());
                if (employer.isEmpty()) {
                    return ResponseEntity.ok(
                            new BaseResponse("Không tìm thấy nhà tuyển dụng!", HttpStatus.NOT_FOUND.value(), null)
                    );
                }
                ;
                Page<Job> jobs = jobService.findJobsActive_Employer(employer.get().getId(), pageable);

                List<HomeJobResponse> jobResponses = jobs.getContent().stream().map(job -> {
                    return new HomeJobResponse(
                            job.getId(),
                            job.getCreated(),
                            job.getToDate(),
                            job.getName(),
                            job.getHumanResource().getEmployer()
                    );
                }).collect(Collectors.toList());

                Page<HomeJobResponse> jobResponsePage = new PageImpl<>(jobResponses, jobs.getPageable(), jobs.getTotalElements());
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc", HttpStatus.OK.value(), jobResponsePage)
                );
            } else if (ERole.HR == optionalUser.get().getRole()) {
                Optional<HumanResource> humanResource = humanResourceService.findByEmail(optionalUser.get().getEmail());
                if (humanResource.isEmpty()) {
                    return ResponseEntity.ok(
                            new BaseResponse("Không tìm thấy nhà tuyển dụng!", HttpStatus.NOT_FOUND.value(), null)
                    );
                }
                ;
                Page<Job> jobs = jobService.findJobsActive_HR(humanResource.get().getId(), pageable);

                List<HomeJobResponse> jobResponses = jobs.getContent().stream().map(job -> {
                    return new HomeJobResponse(
                            job.getId(),
                            job.getCreated(),
                            job.getToDate(),
                            job.getName(),
                            job.getHumanResource().getEmployer()
                    );
                }).collect(Collectors.toList());

                Page<HomeJobResponse> jobResponsePage = new PageImpl<>(jobResponses, jobs.getPageable(), jobs.getTotalElements());
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc", HttpStatus.OK.value(), jobResponsePage)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép!", HttpStatus.FORBIDDEN.value(), null)
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

    @Operation(summary = "get pending job", description = "", tags = {})
    @GetMapping("/getPending-jobs")
    public ResponseEntity<BaseResponse> getJobPending(@RequestHeader("Authorization") String token, Pageable pageable) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER) || checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép!", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );

            if (ERole.EMPLOYER == optionalUser.get().getRole()) {
                Optional<Employer> employer = employerService.findByUserEmail(optionalUser.get().getEmail());
                if (employer.isEmpty()) {
                    return ResponseEntity.ok(
                            new BaseResponse("Không tìm thấy nhà tuyển dụng!", HttpStatus.NOT_FOUND.value(), null)
                    );
                }
                ;
                Page<Job> jobs = jobService.findPendingJobs_Employer(employer.get().getId(), pageable);

                List<HomeJobResponse> jobResponses = jobs.getContent().stream().map(job -> {
                    return new HomeJobResponse(
                            job.getId(),
                            job.getCreated(),
                            job.getToDate(),
                            job.getName(),
                            job.getHumanResource().getEmployer()
                    );
                }).collect(Collectors.toList());

                Page<HomeJobResponse> jobResponsePage = new PageImpl<>(jobResponses, jobs.getPageable(), jobs.getTotalElements());
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc", HttpStatus.OK.value(), jobResponsePage)
                );
            } else if (ERole.HR == optionalUser.get().getRole()) {
                Optional<HumanResource> humanResource = humanResourceService.findByEmail(optionalUser.get().getEmail());
                if (humanResource.isEmpty()) {
                    return ResponseEntity.ok(
                            new BaseResponse("Không tìm thấy nhà tuyển dụng!", HttpStatus.NOT_FOUND.value(), null)
                    );
                }
                ;
                Page<Job> jobs = jobService.findPendingJobs_HR(humanResource.get().getId(), pageable);

                List<HomeJobResponse> jobResponses = jobs.getContent().stream().map(job -> {
                    return new HomeJobResponse(
                            job.getId(),
                            job.getCreated(),
                            job.getToDate(),
                            job.getName(),
                            job.getHumanResource().getEmployer()
                    );
                }).collect(Collectors.toList());

                Page<HomeJobResponse> jobResponsePage = new PageImpl<>(jobResponses, jobs.getPageable(), jobs.getTotalElements());
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc", HttpStatus.OK.value(), jobResponsePage)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép!", HttpStatus.FORBIDDEN.value(), null)
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

    @Operation(summary = "get pending job", description = "", tags = {})
    @GetMapping("/getPendingJobs_Admin")
    public ResponseEntity<BaseResponse> getJobPendingAdmin(@RequestHeader("Authorization") String token, Pageable pageable) {
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
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );


            Page<Job> jobs = jobService.findJobsPending_Admin(pageable);

            List<HomeJobResponse> jobResponses = jobs.getContent().stream().map(job -> {
                return new HomeJobResponse(
                        job.getId(),
                        job.getCreated(),
                        job.getToDate(),
                        job.getName(),
                        job.getHumanResource().getEmployer()
                );
            }).collect(Collectors.toList());

            Page<HomeJobResponse> jobResponsePage = new PageImpl<>(jobResponses, jobs.getPageable(), jobs.getTotalElements());
            return ResponseEntity.ok(
                    new BaseResponse("Danh sách công việc", HttpStatus.OK.value(), jobResponsePage)
            );


        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get Suitable", description = "", tags = {})
    @GetMapping("/getSuitable")
    public ResponseEntity<BaseResponse> findSuitableJob(@RequestHeader(name = "Authorization", required = false) String token) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.CANDIDATE);
            Optional<Candidate> optionalCandidate = candidateService.findByUserEmail(email);
            if (optionalCandidate.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy ứng viên!", HttpStatus.NOT_FOUND.value(), null)
                );

            List<Job> jobs = jobService.findSuitableJob(optionalCandidate.get().getId());

            List<JobResponse> jobResponses = jobs.stream().map(job -> {
                JobCategoryResponse categoryResponse = new JobCategoryResponse(
                        job.getCategory() != null ? job.getCategory().getId() : null,
                        job.getCategory() != null ? job.getCategory().getName() : null);
                JobEmployerResponse jobEmployerResponse = new JobEmployerResponse(
                        job.getHumanResource().getEmployer().getName(),
                        job.getHumanResource().getEmployer().getId(),
                        job.getHumanResource().getEmployer().getUser().getEmail(),
                        job.getHumanResource().getEmployer().getImage(),
                        job.getHumanResource().getEmployer().getPhoneNumber());


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
                        vipEmployerService.isVip(job.getHumanResource().getEmployer().getId()),
                        jobService.checkIsSaveJob(optionalCandidate.get().getId(), job.getId()),
                        false,
                        false,
                        categoryResponse,
                        jobEmployerResponse,
                        null,
                        null,
                        null
                );
            }).collect(Collectors.toList());

            return ResponseEntity.ok(
                    new BaseResponse("Công việc phù hợp!", HttpStatus.OK.value(), jobResponses)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
}






