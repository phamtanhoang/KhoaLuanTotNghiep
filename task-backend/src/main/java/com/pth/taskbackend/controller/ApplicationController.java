package com.pth.taskbackend.controller;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pth.taskbackend.dto.request.ApplicationRequest;
import com.pth.taskbackend.dto.request.StepResultRequest;
import com.pth.taskbackend.dto.request.StepScheduleRequest;
import com.pth.taskbackend.dto.response.*;
import com.pth.taskbackend.enums.EApplyStatus;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.enums.EStepStatus;
import com.pth.taskbackend.model.meta.*;
import com.pth.taskbackend.repository.ApplicationRepository;
import com.pth.taskbackend.repository.StepScheduleRepository;
import com.pth.taskbackend.repository.UserRepository;
import com.pth.taskbackend.security.JwtService;
import com.pth.taskbackend.service.*;
import com.pth.taskbackend.util.func.CheckPermission;
import com.pth.taskbackend.util.func.DateFunc;
import com.pth.taskbackend.util.func.FileUploadFunc;
import io.jsonwebtoken.ExpiredJwtException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static com.pth.taskbackend.util.constant.PathConstant.BASE_URL;

@CrossOrigin(origins = "*")
@Tag(name = "applications", description = "Applications APIs")
@SecurityRequirement(name = "javainuseapi")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = {BASE_URL + "/applications"})
public class ApplicationController {
    @Autowired
    CandidateService candidateService;
    @Autowired
    ApplicationService applicationService;
    @Autowired
    JobService jobService;
    @Autowired
    JwtService jwtService;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    EmployerService employerService;
    private final CheckPermission checkPermission;
    @Autowired
    StepService stepService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ApplicationRepository applicationRepository;
    FileUploadFunc fileUploadFunc = new FileUploadFunc();
    @Autowired
    HumanResourceService humanResourceService;
    @Autowired
    VipEmployerService vipEmployerService;
    @Autowired
    StepScheduleService stepScheduleService;
    @Autowired
    StepResultService stepResultService;

    @PostMapping("/applyWithCV/{id}")
    public ResponseEntity<BaseResponse> applyJobWithNewCV(
            @RequestHeader("Authorization") String token,
            @RequestParam("cVFile") MultipartFile cVFile,
            @RequestParam String fullName,
            @RequestParam String email,
            @RequestParam String phoneNumber,
            @RequestParam(required = false) String letter,
            @PathVariable("id") String id

    ) {

        try {

            String username = jwtService.extractUsername(token.substring(7));
            boolean hasPermission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.CANDIDATE);
            if (!hasPermission) {
                return ResponseEntity.ok(new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null));
            }

            Optional<Candidate> optionalCandidate = candidateService.findByUserEmail(username);
            if (optionalCandidate.isEmpty()) {
                return ResponseEntity.ok(new BaseResponse("Không tìm thấy ứng viên", HttpStatus.NOT_FOUND.value(), null));
            }

            Optional<Job> optionalJob = jobService.findById(id);
            if (optionalJob.isEmpty()) {
                return ResponseEntity.ok(new BaseResponse("Không tìm thấy công việc ", HttpStatus.NOT_FOUND.value(), null));
            }
            Job job = optionalJob.get();
            if (!job.getStatus().equals(EStatus.ACTIVE))
                return ResponseEntity.ok(new BaseResponse("Công việc đang không được tuyển ", HttpStatus.BAD_REQUEST.value(), null));

            if (cVFile.isEmpty() ||
                    (!Objects.equals(cVFile.getContentType(), "application/pdf") &&
                            !Objects.equals(cVFile.getContentType(), "application/vnd.openxmlformats-officedocument.wordprocessingml.document") &&
                            !Objects.equals(cVFile.getContentType(), "application/msword"))) {
                return ResponseEntity.ok(
                        new BaseResponse("Chưa có nhập file hoặc định dạng file không hợp lệ!!!", HttpStatus.UNSUPPORTED_MEDIA_TYPE.value(), null)
                );
            }


            if (applicationService.findByJobIdAndCandidateId(id, optionalCandidate.get().getId()).isPresent())
                return ResponseEntity.ok(
                        new BaseResponse("Đã ứng tuyển vào công việc này!!!", HttpStatus.BAD_REQUEST.value(), null)
                );

            Application application = new Application();

            String uploadCV = fileUploadFunc.uploadCV(cVFile);
            uploadCV = fileUploadFunc.getFullImagePath(uploadCV);
            application.setCV(uploadCV);

            application.setPhoneNumber(phoneNumber);
            application.setCandidate(optionalCandidate.get());
            application.setEmail(email);
            application.setLetter(letter);
            application.setStatus(EApplyStatus.PENDING);
            application.setJob(job);
            application.setFullName(fullName);
            application.setCurrentStep(0);
            applicationService.create(application);


            return ResponseEntity.ok(
                    new BaseResponse("Ứng tuyển công việc thành công", HttpStatus.OK.value(), null)
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
    @PostMapping("/applyWithLink/{id}")
    public ResponseEntity<BaseResponse> applyJobWithOldCV(
            @RequestHeader("Authorization") String token,
            @RequestParam("cVFile") String cVFile,
            @RequestParam String fullName,
            @RequestParam String email,
            @RequestParam String phoneNumber,
            @RequestParam(required = false) String letter,
            @PathVariable("id") String id

    ) {

        try {

            String username = jwtService.extractUsername(token.substring(7));
            boolean hasPermission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.CANDIDATE);
            if (!hasPermission) {
                return ResponseEntity.ok(new BaseResponse("Người dùng không được phép!", HttpStatus.FORBIDDEN.value(), null));
            }

            Optional<Candidate> optionalCandidate = candidateService.findByUserEmail(username);
            if (optionalCandidate.isEmpty()) {
                return ResponseEntity.ok(new BaseResponse("Không tìm thấy ứng viên!", HttpStatus.NOT_FOUND.value(), null));
            }

            Optional<Job> optionalJob = jobService.findById(id);
            if (optionalJob.isEmpty()) {
                return ResponseEntity.ok(new BaseResponse("Không tìm thấy công việc!", HttpStatus.NOT_FOUND.value(), null));
            }
            Job job = optionalJob.get();
            if (!job.getStatus().equals(EStatus.ACTIVE))
                return ResponseEntity.ok(new BaseResponse("Công việc đang không được tuyển!", HttpStatus.BAD_REQUEST.value(), null));


            if (applicationService.findByJobIdAndCandidateId(id, optionalCandidate.get().getId()).isPresent())
                return ResponseEntity.ok(
                        new BaseResponse("Đã ứng tuyển vào công việc này!", HttpStatus.BAD_REQUEST.value(), null)
                );

            Application application = new Application();

            application.setCV(cVFile);
            application.setPhoneNumber(phoneNumber);
            application.setCandidate(optionalCandidate.get());
            application.setEmail(email);
            application.setLetter(letter);
            application.setStatus(EApplyStatus.PENDING);
            application.setJob(job);
            application.setFullName(fullName);
            application.setCurrentStep(0);
            System.out.println(application);
            applicationService.create(application);


            return ResponseEntity.ok(
                    new BaseResponse("Ứng tuyển công việc thành công", HttpStatus.OK.value(), null)
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

    @GetMapping("/pendingApplications-employer")
    public ResponseEntity<BaseResponse> pendingApplications(Pageable pageable,
                                                            @RequestHeader("Authorization") String token) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean hasPermission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER) || checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
            if (!hasPermission) {
                return ResponseEntity.ok(new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null));
            }

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty()) {
                return ResponseEntity.ok(new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null));
            }

            Page<Application> pendingApplications = Page.empty();

            if (optionalUser.get().getRole().equals(ERole.EMPLOYER)) {
                Optional<Employer> optionalEmployer = employerService.findByUserEmail(email);
                if (optionalEmployer.isEmpty()) {
                    return ResponseEntity.ok(new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null));
                }
                pendingApplications = applicationService.findByEmployerIdAndStatus(optionalEmployer.get().getId(), EApplyStatus.PENDING, pageable);
                if (pendingApplications.isEmpty())
                    return ResponseEntity.ok(new BaseResponse("Không tìm thấy đơn ứng tuyển", HttpStatus.OK.value(), null));
            }
            if (optionalUser.get().getRole().equals(ERole.HR)) {
                Optional<HumanResource> optionalHumanResource = humanResourceService.findByEmail(email);
                if (optionalHumanResource.isEmpty()) {
                    return ResponseEntity.ok(new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null));
                }
                pendingApplications = applicationService.findByHrIdAndStatus(optionalHumanResource.get().getId(), EApplyStatus.PENDING, pageable);
                if (pendingApplications.isEmpty())
                    return ResponseEntity.ok(new BaseResponse("Không tìm thấy đơn ứng tuyển", HttpStatus.OK.value(), null));
            }


            Page<ApplicationResponse> responseList = pendingApplications.map(application -> new ApplicationResponse(
                    application.getId(),
                    application.getCreated(),
                    application.getCV(),
                    application.getCurrentStep(),

                    application.getEmail(),
                    application.getFullName(),
                    application.getLetter(),
                    application.getPhoneNumber(),
                    application.getStatus(),
                    null,null
            ));


            return ResponseEntity.ok(new BaseResponse("Danh sách đơn xin việc đang đợi duyệt", HttpStatus.OK.value(), responseList));

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @GetMapping("/getApplications-employer")
    public ResponseEntity<BaseResponse> getApplicationsByEmployer(
            @RequestHeader("Authorization") String token,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) EApplyStatus status,
            Pageable pageable
    ) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean hasPermission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER) ||
                    checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
            if (!hasPermission) {
                return ResponseEntity.ok(new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null));
            }


            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty()) {
                return ResponseEntity.ok(new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null));
            }

            Page<Application> applications = Page.empty();
            if (optionalUser.get().getRole().equals(ERole.EMPLOYER)) {
                Optional<Employer> optionalEmployer = employerService.findByUserEmail(email);
                if (optionalEmployer.isEmpty()) {
                    return ResponseEntity.ok(new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null));
                }
                applications = applicationService.findByEmployerIdAndStatusAndNameContaining(optionalEmployer.get().getId(), status, title, pageable);
                if (applications.isEmpty())
                    return ResponseEntity.ok(new BaseResponse("Không tìm thấy đơn ứng tuyển", HttpStatus.OK.value(), null));
            }
            if (optionalUser.get().getRole().equals(ERole.HR)) {
                Optional<HumanResource> optionalHumanResource = humanResourceService.findByEmail(email);
                if (optionalHumanResource.isEmpty()) {
                    return ResponseEntity.ok(new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null));
                }
                applications = applicationService.findByHRIdAndStatusAndNameContaining(optionalHumanResource.get().getId(), status, title, pageable);

                if (applications.isEmpty())
                    return ResponseEntity.ok(new BaseResponse("Không tìm thấy đơn ứng tuyển", HttpStatus.OK.value(), null));
            }


            Page<ApplicationResponse> responseList = applications.map(application -> {

                CandidateResponse candidateResponse = new CandidateResponse(
                        application.getCandidate().getId(),
                        application.getCandidate().getCreated(),
                        application.getCandidate().getUpdated(),
                        application.getCandidate().getFirstName(),
                        application.getCandidate().getLastName(),
                        application.getCandidate().getPhoneNumber(),
                        application.getCandidate().getSex(),
                        application.getCandidate().getAvatar(),
                        application.getCandidate().getDateOfBirth(),
                        application.getCandidate().getIntroduction(),
                        application.getCandidate().getJob(),
                        application.getCandidate().getLink(),
                        application.getCandidate().getIsFindJob(),
                        application.getCandidate().getUser().getStatus(),
                        application.getCandidate().getUser().getEmail(),
                        application.getCandidate().getUser().getId()
                        );
                JobResponse jobResponse = new JobResponse(
                        application.getJob().getId(),
                        application.getJob().getCreated(),
                        application.getJob().getUpdated(),
                        application.getJob().getToDate(),
                        application.getJob().getName(),
                        application.getJob().getDescription(),
                        application.getJob().getExperience(),
                        application.getJob().getFromSalary(),
                        application.getJob().getToSalary(),
                        application.getJob().getLocation(),
                        application.getJob().getStatus(),
                        false,
                        false,
                        DateFunc.isExpired(application.getJob().getToDate()),
                        true,
                        null,
                        null,
                        null,
                        null,
                        null
                );
                ApplicationResponse response = new ApplicationResponse(
                        application.getId(),
                        application.getCreated(),
                        application.getCV(),
                        application.getCurrentStep(),
                        application.getEmail(),
                        application.getFullName(),
                        application.getLetter(),
                        application.getPhoneNumber(),
                        application.getStatus(),
                        candidateResponse,jobResponse
                );
                return response;
            });

            return ResponseEntity.ok(new BaseResponse("Danh sách đơn xin việc cho nhà tuyển dụng", HttpStatus.OK.value(), responseList));

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @GetMapping("/getApplications-candidate")
    public ResponseEntity<BaseResponse> getApplicationsByCandidate(
            @RequestHeader("Authorization") String token,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) EApplyStatus status,
            Pageable pageable
    ) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean hasPermission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.CANDIDATE);
            if (!hasPermission) {
                return ResponseEntity.ok(new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null));
            }

            Optional<Candidate> optionalCandidate = candidateService.findByUserEmail(email);
            if (optionalCandidate.isEmpty()) {
                return ResponseEntity.ok(new BaseResponse("Không tìm thấy ứng viên", HttpStatus.NOT_FOUND.value(), null));
            }
            Page<Application> applications = applicationService.findByCandidateIdAndNameContainingAndLocationContainingAndStatus(optionalCandidate.get().getId(), status,title,location, pageable);
            if (applications.isEmpty())
                return ResponseEntity.ok(new BaseResponse("Bạn chưa ứng tuyển công việc nào", HttpStatus.OK.value(), null));

            Page<ApplicationResponse> responseList = applications.map(application -> {
                JobEmployerResponse employerResponse= new JobEmployerResponse(
                        application.getJob().getHumanResource().getEmployer().getName(),
                        application.getJob().getHumanResource().getEmployer().getId(),
                        application.getJob().getHumanResource().getEmployer().getUser().getEmail(),
                        application.getJob().getHumanResource().getEmployer().getImage(),
                        application.getJob().getHumanResource().getEmployer().getPhoneNumber()
                        );


                JobCategoryResponse categoryResponse;
                if(application.getJob().getCategory()==null){
                    categoryResponse=null;
                }else{
                    categoryResponse=new JobCategoryResponse(
                        application.getJob().getCategory().getId(),
                        application.getJob().getCategory().getName()
                    );
                }
                JobResponse jobResponse = new JobResponse(
                        application.getJob().getId(),
                        application.getJob().getCreated(),
                        application.getJob().getUpdated(),
                        application.getJob().getToDate(),
                        application.getJob().getName(),
                        application.getJob().getDescription(),
                        application.getJob().getExperience(),
                        application.getJob().getFromSalary(),
                        application.getJob().getToSalary(),
                        application.getJob().getLocation(),
                        application.getJob().getStatus(),
                        vipEmployerService.isVip(application.getJob().getHumanResource().getEmployer().getId()),
                        optionalCandidate.filter(value -> jobService.findByCandidateIdAndJobId(value.getId(), application.getJob().getId()).isPresent()).isPresent(),
                        DateFunc.isExpired(application.getJob().getToDate()),
                        false,
                        categoryResponse,
                        employerResponse,
                        null,
                        null,
                        null
                );
                ApplicationResponse response = new ApplicationResponse(
                        application.getId(),
                        application.getCreated(),
                        application.getCV(),
                        application.getCurrentStep(),
                        application.getEmail(),
                        application.getFullName(),
                        application.getLetter(),
                        application.getPhoneNumber(),
                        application.getStatus(),
                        null,jobResponse
                );
                return response;
            });
            return ResponseEntity.ok(new BaseResponse("Danh sách đơn xin việc của ứng viên", HttpStatus.OK.value(), responseList));

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @GetMapping("/getApplication-candidate/{id}")
    public ResponseEntity<BaseResponse> getApplicationDetails(
            @RequestHeader("Authorization") String token,
            @PathVariable("id") String id
    ) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.CANDIDATE);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<Candidate> optionalCandidate = candidateService.findByUserEmail(email);
            if (optionalCandidate.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<Application> optionalApplication = applicationService.findByIdAndCandidateId(id, optionalCandidate.get().getId());
            if (optionalApplication.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy đơn xin việc", HttpStatus.NOT_FOUND.value(), null)
                );
            Application application = optionalApplication.get();
            CandidateResponse candidateResponse = new CandidateResponse(
                    application.getCandidate().getId(),
                    application.getCandidate().getCreated(),
                    application.getCandidate().getUpdated(),
                    application.getCandidate().getFirstName(),
                    application.getCandidate().getLastName(),
                    application.getCandidate().getPhoneNumber(),
                    application.getCandidate().getSex(),
                    application.getCandidate().getAvatar(),
                    application.getCandidate().getDateOfBirth(),
                    application.getCandidate().getIntroduction(),
                    application.getCandidate().getJob(),
                    application.getCandidate().getLink(),
                    application.getCandidate().getIsFindJob(),
                    application.getCandidate().getUser().getStatus(),
                    application.getCandidate().getUser().getEmail(),
                    application.getCandidate().getUser().getId()
            );

            List<StepResponse> stepResponses;
            if (application.getJob().getProcess() != null) {
                Page<Step> steps = stepService.findByProcessId(application.getJob().getProcess().getId(), Pageable.unpaged());

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
                stepResponses.sort(Comparator.comparingInt(StepResponse::number));
            } else {
                stepResponses = Collections.emptyList();
            }
            JobProcessResponse processResponse =new JobProcessResponse(
                    application.getJob().getProcess().getId(),
                    application.getJob().getProcess().getDescription(),
                    stepResponses
            );

            JobResponse jobResponse = new JobResponse(
                    application.getJob().getId(),
                    application.getJob().getCreated(),
                    application.getJob().getUpdated(),
                    application.getJob().getToDate(),
                    application.getJob().getName(),
                    application.getJob().getDescription(),
                    application.getJob().getExperience(),
                    application.getJob().getFromSalary(),
                    application.getJob().getToSalary(),
                    application.getJob().getLocation(),
                    application.getJob().getStatus(),
                    vipEmployerService.isVip(application.getJob().getHumanResource().getEmployer().getId()),
                    optionalCandidate.filter(value -> jobService.findByCandidateIdAndJobId(value.getId(), application.getJob().getId()).isPresent()).isPresent(),
                    DateFunc.isExpired(application.getJob().getToDate()),
                    true,
                    null,
                    null,
                    null,
                    processResponse,
                    null
            );

            ApplicationDetailResponse response = new ApplicationDetailResponse(
                    application.getId(),
                    application.getCreated(),
                    application.getCV(),
                    application.getCurrentStep(),
                    application.getEmail(),
                    application.getFullName(),
                    application.getLetter(),
                    application.getPhoneNumber(),
                    application.getStatus(),
                    candidateResponse,
                    jobResponse,
                    stepResultService.findByApplicationId(application.getId()),
                    stepScheduleService.findByApplicationId(application.getId())
            );
            return ResponseEntity.ok(
                    new BaseResponse("Chi tiết đơn ứng tuyển", HttpStatus.OK.value(), response)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @GetMapping("/getApplication-employer/{id}")
    public ResponseEntity<BaseResponse> getApplicationDetailsEmployer(
            @RequestHeader("Authorization") String token,
            @PathVariable("id") String id
    ) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR) || checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!permission) {
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );
            }

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm người dùng", HttpStatus.NOT_FOUND.value(), null)
                );
            }

            Application application;
            switch (optionalUser.get().getRole()) {
                case HR: {
                    Optional<HumanResource> humanResource = humanResourceService.findByEmail(email);
                    if (humanResource.isEmpty()) {
                        return ResponseEntity.ok(
                                new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null)
                        );
                    }
                    Optional<Application> optionalApplication = applicationService.findByIdAndJobHumanResourceId(id, humanResource.get().getId());
                    if (optionalApplication.isEmpty()) {
                        return ResponseEntity.ok(
                                new BaseResponse("Không tìm thấy đơn xin việc", HttpStatus.NOT_FOUND.value(), null)
                        );
                    }
                    application = optionalApplication.get();
                    break;
                }
                case EMPLOYER: {
                    Optional<Employer> employer = employerService.findByUserEmail(email);
                    if (employer.isEmpty()) {
                        return ResponseEntity.ok(
                                new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null)
                        );
                    }

                    Optional<Application> optionalApplication = applicationService.findByIdAndJobHumanResourceEmployerId(id, employer.get().getId());

                    if (optionalApplication.isEmpty()) {
                        return ResponseEntity.ok(
                                new BaseResponse("Không tìm thấy đơn xin việc", HttpStatus.NOT_FOUND.value(), null)
                        );
                    }
                    application = optionalApplication.get();
                    break;
                }
                default:
                    return ResponseEntity.ok(
                            new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                    );
            }

            CandidateResponse candidateResponse = new CandidateResponse(
                    application.getCandidate().getId(),
                    application.getCandidate().getCreated(),
                    application.getCandidate().getUpdated(),
                    application.getCandidate().getFirstName(),
                    application.getCandidate().getLastName(),
                    application.getCandidate().getPhoneNumber(),
                    application.getCandidate().getSex(),
                    application.getCandidate().getAvatar(),
                    application.getCandidate().getDateOfBirth(),
                    application.getCandidate().getIntroduction(),
                    application.getCandidate().getJob(),
                    application.getCandidate().getLink(),
                    application.getCandidate().getIsFindJob(),
                    application.getCandidate().getUser().getStatus(),
                    application.getCandidate().getUser().getEmail(),
                    application.getCandidate().getUser().getId()
            );

            List<StepResponse> stepResponses;
            if (application.getJob().getProcess() != null) {
                Page<Step> steps = stepService.findByProcessId(application.getJob().getProcess().getId(), Pageable.unpaged());

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
                stepResponses.sort(Comparator.comparingInt(StepResponse::number));
            } else {
                stepResponses = Collections.emptyList();
            }
            JobProcessResponse processResponse =new JobProcessResponse(
                    application.getJob().getProcess().getId(),
                    application.getJob().getProcess().getDescription(),
                    stepResponses
            );

            JobResponse jobResponse = new JobResponse(
                    application.getJob().getId(),
                    application.getJob().getCreated(),
                    application.getJob().getUpdated(),
                    application.getJob().getToDate(),
                    application.getJob().getName(),
                    application.getJob().getDescription(),
                    application.getJob().getExperience(),
                    application.getJob().getFromSalary(),
                    application.getJob().getToSalary(),
                    application.getJob().getLocation(),
                    application.getJob().getStatus(),
                    false,
                    false,
                    DateFunc.isExpired(application.getJob().getToDate()),
                    false,
                    null,
                    null,
                    null,
                    processResponse,
                    null
            );


            ApplicationDetailResponse response = new ApplicationDetailResponse(
                    application.getId(),
                    application.getCreated(),
                    application.getCV(),
                    application.getCurrentStep(),
                    application.getEmail(),
                    application.getFullName(),
                    application.getLetter(),
                    application.getPhoneNumber(),
                    application.getStatus(),
                    candidateResponse,
                    jobResponse,
                    stepResultService.findByApplicationId(application.getId()),
                    stepScheduleService.findByApplicationId(application.getId())
            );
            return ResponseEntity.ok(
                    new BaseResponse("Chi tiết đơn ứng tuyển", HttpStatus.OK.value(), response)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @GetMapping("/getApplication-admin/{id}")
    public ResponseEntity<?> getApplicationDetailsAdmin(
            @RequestHeader("Authorization") String token,
            @PathVariable("id") String id
    ) {
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
                        new BaseResponse("Không tìm người dùng", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<Application> optionalApplication = applicationService.findById(id);
            if (optionalApplication.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy đơn xin việc", HttpStatus.NOT_FOUND.value(), null)
                );
            Application application = optionalApplication.get();
//            ApplicationDetailResponse response = new ApplicationDetailResponse(
//                    application.getJob().getName(),
//                    application.getEmail(),
//                    application.getFullName(),
//                    application.getCandidate().getAvatar(),
//                    application.getCandidate().getDateOfBirth(),
//                    application.getCandidate().getSex(),
//                    application.getCreated(),
//                    application.getCV(),
//                    application.getLetter(),
//                    application.getStatus()
//            );
            return ResponseEntity.ok(
                    new BaseResponse("Chi tiết đơn ứng tuyển", HttpStatus.OK.value(), null)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    @GetMapping("/getApplications-job/{id}")
    public ResponseEntity<?> getApplicationsByJobId(
            Pageable pageable,
            @RequestHeader("Authorization") String token,
            @PathVariable("id") String jobId
    ) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean hasPermission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER) ||
                    checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
            if (!hasPermission) {
                return ResponseEntity.ok(new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null));
            }

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty()) {
                return ResponseEntity.ok(new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null));
            }

            Page<Application> applications = Page.empty();
            if (optionalUser.get().getRole().equals(ERole.EMPLOYER)) {
                Optional<Employer> optionalEmployer = employerService.findByUserEmail(email);
                if (optionalEmployer.isEmpty()) {
                    return ResponseEntity.ok(new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null));
                }
                Optional<Job> optionalJob = jobService.findByIdAndEmployerId(jobId, optionalEmployer.get().getId());
                if (optionalJob.isEmpty()) {
                    return ResponseEntity.ok(new BaseResponse("Không tìm thấy công việc", HttpStatus.NOT_FOUND.value(), null));
                }

                applications = applicationService.findByJobId(jobId, pageable);

                if (applications.isEmpty())
                    return ResponseEntity.ok(new BaseResponse("Không tìm thấy đơn ứng tuyển", HttpStatus.OK.value(), null));
            }
            if (optionalUser.get().getRole().equals(ERole.HR)) {
                Optional<HumanResource> optionalHumanResource = humanResourceService.findByEmail(email);
                if (optionalHumanResource.isEmpty()) {
                    return ResponseEntity.ok(new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null));
                }
                Optional<Job> optionalJob = jobService.findByIdAndHRId(jobId, optionalHumanResource.get().getId());
                if (optionalJob.isEmpty()) {
                    return ResponseEntity.ok(new BaseResponse("Không tìm thấy công việc", HttpStatus.NOT_FOUND.value(), null));
                }
                applications = applicationService.findByJobId(jobId, pageable);

                if (applications.isEmpty())
                    return ResponseEntity.ok(new BaseResponse("Không tìm thấy đơn ứng tuyển", HttpStatus.OK.value(), null));
            }


            Page<ApplicationResponse> candidateApplications = applications.map(application -> new ApplicationResponse(
//                    application.getId(),
//                    application.getCandidate().getId(),
//                    application.getCandidate().getUser().getEmail(),
//                    application.getFullName(),
//                    application.getCandidate().getAvatar(),
//                    application.getCreated(),
//                    application.getStatus(),
//                    application.getJob().getId(),
//                    application.getJob().getName(),
//                    application.getJob().getHumanResource().getEmployer().getId(),
//                    application.getJob().getHumanResource().getEmployer().getName(),
//                    application.getCV()
                    application.getId(),
                    application.getCreated(),
                    application.getCV(),
                    application.getCurrentStep(),

                    application.getEmail(),
                    application.getFullName(),
                    application.getLetter(),
                    application.getPhoneNumber(),
                    application.getStatus(),
                    null,null
            ));
            return ResponseEntity.ok(new BaseResponse("Danh sách đơn xin việc của ứng viên", HttpStatus.OK.value(), candidateApplications));

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @GetMapping("/download")
    public ResponseEntity<?> downloadFile(@RequestParam String fileName) {
        try {
            byte[] fileData = fileUploadFunc.download(fileName);
            if (fileData != null) {
                HttpHeaders headers = new HttpHeaders();
                String contentType = fileName.endsWith(".pdf") ? MediaType.APPLICATION_PDF_VALUE : MediaType.TEXT_PLAIN_VALUE;
                headers.setContentType(MediaType.parseMediaType(contentType));
                headers.setContentDispositionFormData("attachment", fileName);

                ByteArrayResource resource = new ByteArrayResource(fileData);

                return ResponseEntity.ok()
                        .headers(headers)
                        .contentLength(fileData.length)
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new BaseResponse("Không tìm thấy tệp", HttpStatus.NOT_FOUND.value(), null));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "update step", description = "", tags = {})
    @PatchMapping("/updateStep/{id}")
    public ResponseEntity<BaseResponse> updateApplicationStep(@RequestHeader("Authorization") String token,
                                                              @PathVariable("id") String id,
                                                              @RequestParam String result) {
        try {
//            String email = jwtService.extractUsername(token.substring(7));
//            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
//            if (!permission)
//                return ResponseEntity.ok(
//                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
//                );
//
//            Optional<HumanResource> humanResource = humanResourceService.findByEmail(email);
//            if (humanResource.isEmpty())
//                return ResponseEntity.ok(
//                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
//                );
//
//            Optional<Application> optionalApplication = applicationService.findById(id);
//            if (optionalApplication.isEmpty())
//                return ResponseEntity.ok(
//                        new BaseResponse("Không tìm thấy đơn xin việc", HttpStatus.NOT_FOUND.value(), null)
//                );
//
//            Application application = optionalApplication.get();
//            if (stepService.countAllByProcessId(application.getJob().getProcess().getId()) == application.getCurrentStep()) {
//                return ResponseEntity.ok(
//                        new BaseResponse("Đã tới bước cuối", HttpStatus.BAD_REQUEST.value(), null)
//                );
//            }
//            System.out.println(application.getStatus());
//            if (application.getStatus().equals(EApplyStatus.PENDING))
//                application.setStatus(EApplyStatus.PROCESSING);
//            application.setCurrentStep(application.getCurrentStep() + 1);
//
//            ApplicationStep applicationStep = new ApplicationStep();
//            applicationStep.setApplication(application);
//            Optional<Step> optionalStep = stepService.findByProcessIdAndNumber(application.getJob().getProcess().getId(), application.getCurrentStep());
//            if (optionalStep.isPresent()) {
//                Step step = optionalStep.get();
//                applicationStep.setName(step.getName());
//                applicationStep.setNumber(step.getNumber());
//                applicationStep.setResult(result);
//                applicationStepService.create(applicationStep);
//
//                System.out.println(applicationStep);
//            } else {
//                return ResponseEntity.ok(new BaseResponse("Không tìm thấy bước tiếp theo", HttpStatus.NOT_FOUND.value(), null));
//            }
//            System.out.println(applicationStep);
            return ResponseEntity.ok(new BaseResponse("Cập nhật bước thành công", HttpStatus.OK.value(), null));

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.ok(new BaseResponse("Không tìm thấy ứng viên cần xóa!", HttpStatus.NOT_FOUND.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "update status", description = "", tags = {})
    @PatchMapping("/updateStatus/{id}")
    public ResponseEntity<BaseResponse> updateApplicationStatus(@RequestHeader("Authorization") String token,
                                                                @PathVariable("id") String id,
                                                                @RequestBody StepResultRequest stepResultRequest) {
        try {
            EApplyStatus statusEnum=stepResultRequest.status();
            String result=stepResultRequest.result();

            String email = jwtService.extractUsername(token.substring(7));


            Optional<User> userOptional = userRepository.findByEmail(email);
            if (userOptional.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
            User user = userOptional.get();

            Optional<Application> applicationOptional = applicationService.findById(id);
            if (applicationOptional.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy đơn ứng  tuyển!", HttpStatus.NOT_FOUND.value(), null)
                );
            }

            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR) || checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Bạn không có quyền!", HttpStatus.FORBIDDEN.value(), null)
                );
            Application application = applicationOptional.get();
            if (Objects.equals(user.getId(), application.getJob().getHumanResource().getUser().getId())
                    || Objects.equals(user.getId(), application.getJob().getHumanResource().getEmployer().getUser().getId())) {
                if (application.getStatus() == EApplyStatus.DELETED) {
                    return ResponseEntity.ok(
                            new BaseResponse("Đơn ứng tuyển đã bị xóa!", HttpStatus.FORBIDDEN.value(), null)
                    );
                }
                if (application.getStatus() == EApplyStatus.APPROVED) {
                    return ResponseEntity.ok(
                            new BaseResponse("Đơn ứng tuyển đã được duyệt!", HttpStatus.FORBIDDEN.value(), null)
                    );
                }
                if (application.getStatus() == EApplyStatus.REJECTED) {
                    return ResponseEntity.ok(
                            new BaseResponse("Đơn ứng tuyển đã bị từ chối!", HttpStatus.FORBIDDEN.value(), null)
                    );
                }

                int totalStep = Math.toIntExact(stepService.countAllByProcessId(application.getJob().getProcess().getId()));
                int currentStep = application.getCurrentStep();
                System.out.println("Total step: " + totalStep);
                System.out.println("Current step: " + currentStep);
                System.out.println("application, " + application);

                if (currentStep == 0) {

                    if (currentStep == totalStep - 1) {
                        if (statusEnum != EApplyStatus.REJECTED && statusEnum != EApplyStatus.APPROVED) {
                            return ResponseEntity.ok(
                                    new BaseResponse("Trạng thái không hợp lệ!", HttpStatus.FORBIDDEN.value(), application)
                            );
                        }
                        System.out.println("so 1");
                        application.setStatus(statusEnum);
                        applicationRepository.save(application);

                        stepResultService.create(
                                result,
                                statusEnum == EApplyStatus.REJECTED ? EStepStatus.FAIL : EStepStatus.PASS,
                                currentStep,
                                application);
                        return ResponseEntity.ok(
                                new BaseResponse("Cập nhật thành công!", HttpStatus.OK.value(), application)
                        );
                    }
                    if (statusEnum != EApplyStatus.REJECTED && statusEnum != EApplyStatus.PROCESSING) {
                        return ResponseEntity.ok(
                                new BaseResponse("Trạng thái không hợp lệ!", HttpStatus.FORBIDDEN.value(), application)
                        );
                    }
                    System.out.println("so 2");
                    application.setStatus(statusEnum);
                    application.setCurrentStep(statusEnum != EApplyStatus.REJECTED ? application.getCurrentStep() + 1 : application.getCurrentStep());
                    applicationRepository.save(application);
                    stepResultService.create(
                            result,
                            statusEnum == EApplyStatus.REJECTED ? EStepStatus.FAIL : EStepStatus.PASS,
                            currentStep,
                            application);
                    return ResponseEntity.ok(
                            new BaseResponse("Cập nhật thành công!", HttpStatus.OK.value(), application)
                    );

                }

                if (currentStep == totalStep - 1) {
                    if (statusEnum != EApplyStatus.REJECTED && statusEnum != EApplyStatus.APPROVED) {
                        return ResponseEntity.ok(
                                new BaseResponse("Trạng thái không hợp lệ!", HttpStatus.FORBIDDEN.value(), application)
                        );
                    }

                    System.out.println("so 3");
                    application.setStatus(statusEnum);
                    applicationRepository.save(application);
                    stepResultService.create(
                            result,
                            statusEnum == EApplyStatus.REJECTED ? EStepStatus.FAIL : EStepStatus.PASS,
                            currentStep,
                            application);
                    return ResponseEntity.ok(
                            new BaseResponse("Cập nhật thành công!", HttpStatus.OK.value(), application)
                    );
                }

                if (statusEnum != EApplyStatus.REJECTED && statusEnum != EApplyStatus.PROCESSING) {
                    return ResponseEntity.ok(
                            new BaseResponse("Trạng thái không hợp lệ!", HttpStatus.FORBIDDEN.value(), application)
                    );
                }
                System.out.println("so 4");
                application.setStatus(statusEnum);
                application.setCurrentStep(statusEnum != EApplyStatus.REJECTED ? application.getCurrentStep() + 1 : application.getCurrentStep());
                applicationRepository.save(application);
                stepResultService.create(
                        result,
                        statusEnum == EApplyStatus.REJECTED ? EStepStatus.FAIL : EStepStatus.PASS,
                        currentStep,
                        application);
                return ResponseEntity.ok(
                        new BaseResponse("Cập nhật thành công!", HttpStatus.OK.value(), application)
                );
            }

            return ResponseEntity.ok(
                    new BaseResponse("Bạn không có quyền!", HttpStatus.FORBIDDEN.value(), null)
            );
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "create step status", description = "", tags = {})
    @PostMapping("/createStepSchedule/{id}")
    public ResponseEntity<BaseResponse> createSchedule(@RequestHeader("Authorization") String token,
                                                       @PathVariable("id") String id,
                                                       @RequestBody StepScheduleRequest stepScheduleRequest
                                                       ) {
        try {
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR) || checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Bạn không có quyền!", HttpStatus.FORBIDDEN.value(), null)
                );

            String email = jwtService.extractUsername(token.substring(7));


            Optional<User> userOptional = userRepository.findByEmail(email);
            if (userOptional.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
            User user = userOptional.get();

            Optional<Application> applicationOptional = applicationService.findById(id);
            if (applicationOptional.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy đơn ứng  tuyển!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
            Application application = applicationOptional.get();
            int totalStep = Math.toIntExact(stepService.countAllByProcessId(application.getJob().getProcess().getId()));
            if (Objects.equals(user.getId(), application.getJob().getHumanResource().getUser().getId())
                    || Objects.equals(user.getId(), application.getJob().getHumanResource().getEmployer().getUser().getId())) {



                Optional<StepSchedule> stepSchedule = stepScheduleService.findByApplicationIdAndStepNumber(id, stepScheduleRequest.stepNumber());
                if(stepSchedule.isPresent()){
                    return ResponseEntity.ok(
                            new BaseResponse("Lịch hẹn của bước này đã được tạo!", HttpStatus.BAD_REQUEST.value(), null)
                    );
                }
                if(stepScheduleRequest.stepNumber()>=totalStep){
                    return ResponseEntity.ok(
                            new BaseResponse("Số bước không hợp lệ!", HttpStatus.OK.value(), application)
                    );
                }
                LocalDateTime endDate = stepScheduleRequest.startDate().plusHours(stepScheduleRequest.hour());
                StepSchedule stepSchedule1 = stepScheduleService.create(
                        stepScheduleRequest.name(),
                        stepScheduleRequest.startDate(),
                        endDate,stepScheduleRequest.color(),
                        stepScheduleRequest.stepNumber(),
                        application);

                return ResponseEntity.ok(
                        new BaseResponse("Tạo lịch hẹn thành công!", HttpStatus.OK.value(), stepSchedule1)
                );
            }

            return ResponseEntity.ok(
                    new BaseResponse("Bạn không có quyền!", HttpStatus.FORBIDDEN.value(), null)
            );
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "detail step status", description = "", tags = {})
    @GetMapping("/detailStepSchedule/{id}")
    public ResponseEntity<BaseResponse> getDetailStepSchedule(@RequestHeader("Authorization") String token,
                                                       @PathVariable("id") String id) {
        try {
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR)
                    || checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER)
                    || checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.CANDIDATE);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Bạn không có quyền!", HttpStatus.FORBIDDEN.value(), null)
                );
            String email = jwtService.extractUsername(token.substring(7));


            Optional<User> userOptional = userRepository.findByEmail(email);
            if (userOptional.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
            User user = userOptional.get();

            Optional<StepSchedule> stepScheduleOptional = stepScheduleService.findById(id);
            if(stepScheduleOptional.isEmpty()){
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy lịch hẹn!", HttpStatus.BAD_REQUEST.value(), null)
                );
            }

            StepSchedule stepSchedule = stepScheduleOptional.get();

            if (Objects.equals(user.getId(), stepSchedule.getApplication().getJob().getHumanResource().getUser().getId())
                    || Objects.equals(user.getId(), stepSchedule.getApplication().getJob().getHumanResource().getEmployer().getUser().getId())
                    || Objects.equals(user.getId(), stepSchedule.getApplication().getCandidate().getUser().getId())) {

                List<StepResponse> stepResponses;
                if (stepSchedule.getApplication().getJob().getProcess() != null) {
                    Page<Step> steps = stepService.findByProcessId(stepSchedule.getApplication().getJob().getProcess().getId(), Pageable.unpaged());

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
                    stepResponses.sort(Comparator.comparingInt(StepResponse::number));
                } else {
                    stepResponses = Collections.emptyList();
                }
                JobProcessResponse processResponse =new JobProcessResponse(
                        stepSchedule.getApplication().getJob().getProcess().getId(),
                        stepSchedule.getApplication().getJob().getProcess().getDescription(),
                        stepResponses
                );

                JobResponse jobResponse = new JobResponse(
                        stepSchedule.getApplication().getJob().getId(),
                        stepSchedule.getApplication().getJob().getCreated(),
                        stepSchedule.getApplication().getJob().getUpdated(),
                        stepSchedule.getApplication().getJob().getToDate(),
                        stepSchedule.getApplication().getJob().getName(),
                        stepSchedule.getApplication().getJob().getDescription(),
                        stepSchedule.getApplication().getJob().getExperience(),
                        stepSchedule.getApplication().getJob().getFromSalary(),
                        stepSchedule.getApplication().getJob().getToSalary(),
                        stepSchedule.getApplication().getJob().getLocation(),
                        stepSchedule.getApplication().getJob().getStatus(),
                        false,
                        false,
                        DateFunc.isExpired(stepSchedule.getApplication().getJob().getToDate()),
                        false,
                        null,
                        null,
                        null,
                        processResponse,
                        null
                );

                StepScheduleResponse  stepScheduleResponse = new StepScheduleResponse(
                        stepSchedule.getId(),
                        stepSchedule.getName(),
                        stepSchedule.getStepNumber(),
                        stepSchedule.getColor(),
                        stepSchedule.getStartDate(),
                        stepSchedule.getEndDate(),
                        stepSchedule.getApplication(),
                        jobResponse
                );
                return ResponseEntity.ok(
                        new BaseResponse("Chi tiết lịch hẹn!", HttpStatus.OK.value(), stepScheduleResponse)
                );
            }

            return ResponseEntity.ok(
                    new BaseResponse("Bạn không có quyền!", HttpStatus.FORBIDDEN.value(), null)
            );
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "update step status", description = "", tags = {})
    @PatchMapping("/updateStepSchedule/{id}")
    public ResponseEntity<BaseResponse> updateSchedule(@RequestHeader("Authorization") String token,
                                                                @PathVariable("id") String id,
                                                                @RequestBody StepScheduleRequest stepScheduleRequest
                                                                ) {
        try {
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR) || checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Bạn không có quyền!", HttpStatus.FORBIDDEN.value(), null)
                );

            String email = jwtService.extractUsername(token.substring(7));


            Optional<User> userOptional = userRepository.findByEmail(email);
            if (userOptional.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
            User user = userOptional.get();

            Optional<StepSchedule> stepScheduleOptional = stepScheduleService.findById(id);
            if(stepScheduleOptional.isEmpty()){
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy lịch hẹn!", HttpStatus.BAD_REQUEST.value(), null)
                );
            }
            StepSchedule stepSchedule = stepScheduleOptional.get();
            if (Objects.equals(user.getId(), stepSchedule.getApplication().getJob().getHumanResource().getUser().getId())
                    || Objects.equals(user.getId(), stepSchedule.getApplication().getJob().getHumanResource().getEmployer().getUser().getId())) {

                LocalDateTime endDate = stepScheduleRequest.startDate().plusHours(stepScheduleRequest.hour());
                StepSchedule stepSchedule1 = stepScheduleService.update(stepScheduleOptional.get(),stepScheduleRequest.name(), stepScheduleRequest.startDate(),endDate,stepScheduleRequest.color());

                return ResponseEntity.ok(
                        new BaseResponse("Cập nhật lịch hẹn thành công thành công!", HttpStatus.OK.value(), stepSchedule1)
                );
            }

            return ResponseEntity.ok(
                    new BaseResponse("Bạn không có quyền!", HttpStatus.FORBIDDEN.value(), null)
            );
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "delete step status", description = "", tags = {})
    @DeleteMapping("/deleteStepSchedule/{id}")
    public ResponseEntity<BaseResponse> deleteSchedule(@RequestHeader("Authorization") String token, @PathVariable("id") String id) {
        try {
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR) || checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Bạn không có quyền!", HttpStatus.FORBIDDEN.value(), null)
                );

            String email = jwtService.extractUsername(token.substring(7));


            Optional<User> userOptional = userRepository.findByEmail(email);
            if (userOptional.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
            User user = userOptional.get();

            Optional<StepSchedule> stepScheduleOptional = stepScheduleService.findById(id);
            if(stepScheduleOptional.isEmpty()){
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy lịch hẹn!", HttpStatus.BAD_REQUEST.value(), null)
                );
            }
            StepSchedule stepSchedule = stepScheduleOptional.get();
            if (Objects.equals(user.getId(), stepSchedule.getApplication().getJob().getHumanResource().getUser().getId())
                    || Objects.equals(user.getId(), stepSchedule.getApplication().getJob().getHumanResource().getEmployer().getUser().getId())) {
                stepScheduleService.delete(stepSchedule);
                return ResponseEntity.ok(
                        new BaseResponse("Xóa lịch hẹn thành công thành công!", HttpStatus.OK.value(), null)
                );
            }

            return ResponseEntity.ok(
                    new BaseResponse("Bạn không có quyền!", HttpStatus.FORBIDDEN.value(), null)
            );
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @GetMapping("/isApplied/{id}")
    public ResponseEntity<?> isApplied(
            @RequestHeader("Authorization") String token,
            @PathVariable("id") String jobId
    ) {
        try {
            String username = jwtService.extractUsername(token.substring(7));
            boolean hasPermission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.CANDIDATE);
            if (!hasPermission) {
                return ResponseEntity.ok(new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null));
            }

            Optional<Candidate> optionalCandidate = candidateService.findByUserEmail(username);
            if (optionalCandidate.isEmpty()) {
                return ResponseEntity.ok(new BaseResponse("Không tìm thấy ứng viên", HttpStatus.NOT_FOUND.value(), null));
            }

            Optional<Job> optionalJob = jobService.findById(jobId);
            if (optionalJob.isEmpty()) {
                return ResponseEntity.ok(new BaseResponse("Không tìm thấy công việc ", HttpStatus.NOT_FOUND.value(), null));
            }


            if (applicationService.findByJobIdAndCandidateId(jobId, optionalCandidate.get().getId()).isPresent())
                return ResponseEntity.ok(
                        new BaseResponse("Đã ứng tuyển ", HttpStatus.BAD_REQUEST.value(), true)
                );
            else
                return ResponseEntity.ok(
                        new BaseResponse("Chưa ứng tuyển ", HttpStatus.BAD_REQUEST.value(), false)
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

//    }


