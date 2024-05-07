package com.pth.taskbackend.controller;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pth.taskbackend.dto.request.ApplicationRequest;
import com.pth.taskbackend.dto.response.*;
import com.pth.taskbackend.enums.EApplyStatus;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.*;
import com.pth.taskbackend.repository.UserRepository;
import com.pth.taskbackend.security.JwtService;
import com.pth.taskbackend.service.*;
import com.pth.taskbackend.util.func.CheckPermission;
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
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
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
    private CandidateService candidateService;
    @Autowired
    ApplicationService applicationService;
    @Autowired
    JobService jobService;
    @Autowired
    CollectionService collectionService;
    @Autowired
    JwtService jwtService;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    EmployerService employerService;
    private final CheckPermission checkPermission;

    @Autowired
    ApplicationStepService applicationStepService;

    @Autowired
    StepService stepService;

    @Autowired
    UserRepository userRepository;
    FileUploadFunc fileUploadFunc = new FileUploadFunc();

    @Autowired
    HumanResourceService humanResourceService;

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
                    new BaseResponse("Ứng tuyển công việc thành công", HttpStatus.OK.value(), application)
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


            if (applicationService.findByJobIdAndCandidateId(id, optionalCandidate.get().getId()).isPresent())
                return ResponseEntity.ok(
                        new BaseResponse("Đã ứng tuyển vào công việc này!!!", HttpStatus.BAD_REQUEST.value(), null)
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
            applicationService.create(application);


            return ResponseEntity.ok(
                    new BaseResponse("Ứng tuyển công việc thành công", HttpStatus.OK.value(), application)
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
                    application.getCandidate().getId(),
                    application.getCandidate().getUser().getEmail(),
                    application.getCandidate().getFirstName() + application.getCandidate().getLastName(),
                    application.getCandidate().getAvatar(),
                    application.getCreated(),
                    application.getStatus(),
                    application.getJob().getId(),
                    application.getJob().getName(),
                    application.getJob().getHumanResource().getEmployer().getId(),
                    application.getJob().getHumanResource().getEmployer().getName(),
                    application.getCV()
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
    public ResponseEntity<?> getApplicationsByEmployer(
            Pageable pageable,
            @RequestHeader("Authorization") String token,
            @RequestParam("title") String title,
            @RequestParam("status") EApplyStatus status
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


            Page<ApplicationForEmployerResponse> responseList = applications.map(application -> new ApplicationForEmployerResponse(
                    application.getId(),
                    application.getCandidate().getFirstName() + " " + application.getCandidate().getLastName(),
                    application.getCandidate().getUser().getEmail(),
                    application.getCreated(),
                    application.getStatus(),
                    new JobApplicationResponse(
                            application.getJob().getId(),
                            application.getJob().getName(),
                            application.getJob().getFromSalary(),
                            application.getJob().getToSalary(),
                            application.getJob().getLocation(),

                            new CategoryApplicationResponse(
                                    application.getJob().getCategory().getId(),
                                    application.getJob().getCategory().getName()
                            )
                    )
            ));


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
    public ResponseEntity<?> getApplicationsByCandidate(
            Pageable pageable,
            @RequestHeader("Authorization") String token,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) EApplyStatus status,
            @RequestParam(required = false) String location
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
            Page<Application> applications = applicationService.findByCandidateId(optionalCandidate.get().getId(),title,location,status,pageable);
            if (applications.isEmpty())
                return ResponseEntity.ok(new BaseResponse("Bạn chưa ứng tuyển công việc nào", HttpStatus.OK.value(), null));

            Page<CandidateApplicationResponse> candidateApplications = applications.map(application -> new CandidateApplicationResponse(
                    application.getId(),
                    application.getCreated(),
                    new JobApplicationResponse(
                            application.getJob().getId(),
                            application.getJob().getName(),
                            application.getJob().getFromSalary(),
                            application.getJob().getFromSalary(),
                            application.getJob().getLocation(),
                            new CategoryApplicationResponse(
                                    application.getJob().getCategory().getId(),
                                    application.getJob().getCategory().getName() )),

                    new EmployerApplicationResponse( application.getJob().getHumanResource().getEmployer().getId(),
                            application.getJob().getHumanResource().getEmployer().getName())
            ));
            return ResponseEntity.ok(new BaseResponse("Danh sách đơn xin việc của ứng viên", HttpStatus.OK.value(), candidateApplications));

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
//    @GetMapping("/getApplications-admin")
//    public ResponseEntity<?> getApplicationsByAdmin(
//            Pageable pageable,
//            @RequestHeader("Authorization") String token
//    ) {
//        try {
//            String email = jwtService.extractUsername(token.substring(7));
//            boolean hasPermission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.CANDIDATE);
//            if (!hasPermission) {
//                return ResponseEntity.ok(new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null));
//            }
//
//            Optional<Candidate> optionalCandidate = candidateService.findByUserEmail(email);
//            if (optionalCandidate.isEmpty()) {
//                return ResponseEntity.ok(new BaseResponse("Không tìm thấy ứng viên", HttpStatus.NOT_FOUND.value(), null));
//            }
//            Page<Application> applications = applicationService.findAll( pageable);
//            if(applications.isEmpty())
//                return ResponseEntity.ok(new BaseResponse("Bạn chưa ứng tuyển công việc nào", HttpStatus.OK.value(), null));
//
//            Page<ApplicationResponse> candidateApplications = applications.map(application -> new ApplicationResponse(
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
//            ));
//            return ResponseEntity.ok(new BaseResponse("Danh sách đơn xin việc của ứng viên", HttpStatus.OK.value(), candidateApplications));
//
//        } catch (ExpiredJwtException e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
//        }catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
//        }
//    }

    @GetMapping("/getApplication-candidate/{id}")
    public ResponseEntity<?> getApplicationDetails(
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
            CandidateDetailApplicationResponse response = new CandidateDetailApplicationResponse(
                    application.getId(),
                    application.getFullName(),
                    application.getEmail(),
                    application.getPhoneNumber(),
                    application.getLetter(),
                    application.getCV(),
                    application.getApplicationSteps().stream().map(applicationStep ->
                            new ApplicationStepResponse(
                                    applicationStep.getId(),
                                    applicationStep.getName(),
                                    applicationStep.getNumber(),
                                    applicationStep.getStatus(),
                                    applicationStep.getResult(),
                                    applicationStep.getApplication().getId()
                            )).collect(Collectors.toList())

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
    public ResponseEntity<?> getApplicationDetailsEmployer(
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

            CandidateDetailApplicationResponse response = new CandidateDetailApplicationResponse(
                    application.getId(),
                    application.getFullName(),
                    application.getEmail(),
                    application.getPhoneNumber(),
                    application.getLetter(),
                    application.getCV(),
                    application.getApplicationSteps().stream().map(applicationStep ->
                            new ApplicationStepResponse(
                                    applicationStep.getId(),
                                    applicationStep.getName(),
                                    applicationStep.getNumber(),
                                    applicationStep.getStatus(),
                                    applicationStep.getResult(),
                                    applicationStep.getApplication().getId()
                            )).collect(Collectors.toList())

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
            CandidateDetailApplicationResponse response = new CandidateDetailApplicationResponse(
                    application.getId(),
                    application.getFullName(),
                    application.getEmail(),
                    application.getPhoneNumber(),
                    application.getLetter(),
                    application.getCV(),
                    application.getApplicationSteps().stream().map(applicationStep ->
                            new ApplicationStepResponse(
                                    applicationStep.getId(),
                                    applicationStep.getName(),
                                    applicationStep.getNumber(),
                                    applicationStep.getStatus(),
                                    applicationStep.getResult(),
                                    applicationStep.getApplication().getId()
                            )).collect(Collectors.toList())

            );
            return ResponseEntity.ok(
                    new BaseResponse("Chi tiết đơn ứng tuyển", HttpStatus.OK.value(), response)
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


            Page<ApplicationForEmployerResponse> responseList = applications.map(application -> new ApplicationForEmployerResponse(
                    application.getId(),
                    application.getCandidate().getFirstName() + " " + application.getCandidate().getLastName(),
                    application.getCandidate().getUser().getEmail(),
                    application.getCreated(),
                    application.getStatus(),
                    new JobApplicationResponse(
                            application.getJob().getId(),
                            application.getJob().getName(),
                            application.getJob().getFromSalary(),
                            application.getJob().getToSalary(),
                            application.getJob().getLocation(),

                            new CategoryApplicationResponse(
                                    application.getJob().getCategory().getId(),
                                    application.getJob().getCategory().getName()
                            )
                    )
            ));
            return ResponseEntity.ok(new BaseResponse("Danh sách đơn xin việc của ứng viên", HttpStatus.OK.value(), responseList));

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
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<HumanResource> humanResource = humanResourceService.findByEmail(email);
            if (humanResource.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<Application> optionalApplication = applicationService.findById(id);
            if (optionalApplication.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy đơn xin việc", HttpStatus.NOT_FOUND.value(), null)
                );

            Application application = optionalApplication.get();
            if (stepService.countAllByProcessId(application.getJob().getProcess().getId()) == application.getCurrentStep()) {
                return ResponseEntity.ok(
                        new BaseResponse("Đã tới bước cuối", HttpStatus.BAD_REQUEST.value(), null)
                );
            }
            System.out.println(application.getStatus());
            if (application.getStatus().equals(EApplyStatus.PENDING))
                application.setStatus(EApplyStatus.PROCESSING);
            application.setCurrentStep(application.getCurrentStep() + 1);

            ApplicationStep applicationStep = new ApplicationStep();
            applicationStep.setApplication(application);
            Optional<Step> optionalStep = stepService.findByProcessIdAndNumber(application.getJob().getProcess().getId(), application.getCurrentStep());
            if (optionalStep.isPresent()) {
                Step step = optionalStep.get();
                applicationStep.setName(step.getName());
                applicationStep.setNumber(step.getNumber());
                applicationStep.setResult(result);
                applicationStepService.create(applicationStep);

                System.out.println(applicationStep);
            } else {
                return ResponseEntity.ok(new BaseResponse("Không tìm thấy bước tiếp theo", HttpStatus.NOT_FOUND.value(), null));
            }
            System.out.println(applicationStep);
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
                                                                @RequestBody String status) {
        try {
            Map<String, String> jsonMap = objectMapper.readValue(status, new TypeReference<Map<String, String>>() {
            });

            String statusValue = jsonMap.get("status");
            EApplyStatus statusEnum = EApplyStatus.fromString(statusValue);
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<HumanResource> humanResource = humanResourceService.findByEmail(email);
            if (humanResource.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );


            Optional<Application> optionalApplication = applicationService.findByIdAndJobHumanResourceId(id,humanResource.get().getId());
            if (optionalApplication.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy đơn xin việc", HttpStatus.NOT_FOUND.value(), null)
                );

            Application application = optionalApplication.get();

            switch (statusEnum) {
                case PENDING:
                    return ResponseEntity.ok(
                            new BaseResponse("Không được sử dụng trạng thái này", HttpStatus.BAD_REQUEST.value(), null)
                    );
                case APPROVED:
                    if (stepService.countAllByProcessId(application.getJob().getProcess().getId()) != application.getCurrentStep())
                        return ResponseEntity.ok(
                                new BaseResponse("Chưa đủ quá trình duyệt đơn", HttpStatus.BAD_REQUEST.value(), null)
                        );
                    if (application.getStatus() == EApplyStatus.APPROVED)
                        return ResponseEntity.ok(
                                new BaseResponse("Không thể duyệt lại đơn đã nhận", HttpStatus.BAD_REQUEST.value(), null)
                        );
                    application.setStatus(EApplyStatus.APPROVED);
                    return ResponseEntity.ok(
                            new BaseResponse("Duyệt đơn thành công", HttpStatus.BAD_REQUEST.value(), null)
                    );
                case REJECTED:
                    if (application.getStatus() == EApplyStatus.REJECTED)
                        return ResponseEntity.ok(
                                new BaseResponse("Không thể duyệt lại đơn đã từ chối", HttpStatus.BAD_REQUEST.value(), null)
                        );
                    application.setStatus(EApplyStatus.REJECTED);
                case PROCESSING:
                    return ResponseEntity.ok(
                            new BaseResponse("Không được sử dụng trạng thái này", HttpStatus.BAD_REQUEST.value(), null)
                    );
                default:
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(new BaseResponse("Trạng thái không hợp lệ", HttpStatus.BAD_REQUEST.value(), null));
            }


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


    //
//
//    @PutMapping("/updateState")
//    public ResponseEntity<String> updateApplicationState(
//            @RequestHeader("Authorization") String token,
//            @RequestBody UpdateApplicationStateRequest updateRequest
//    ) {
//        try {
//            String employerName = jwtService.extractUsername(token.substring(7));
//            Employer employer = employerService.findByAccountUsername(employerName);
//
//            if (employer != null) {
//                Optional<Application> application = applicationService.findById(updateRequest.getApplicationId());
//
//                if (application.isPresent()) {
//                    Application existingApplication = application.get();
//
//                    if (existingApplication.getState().equals("pending")) {
//                        existingApplication.setState(updateRequest.getNewState());
//                        applicationService.save(existingApplication);
//                        Job optionalJob = jobRepository.getById(existingApplication.getJobId());
//                        emailSenderService.sendEmail( existingApplication.getEmail(), existingApplication.getName(),
//                                optionalJob.getTitle(), existingApplication.getJobId(), updateRequest.getNewState(), "MailForm");
//                        return ResponseEntity.ok("Cập nhật thành công");
//                    } else {
//                        return ResponseEntity.badRequest().body("Không thể cập nhật với trạng thái 'refused'");
//                    }
//                } else {
//                    return ResponseEntity.badRequest().body("Không tìm thấy ứng viên");
//                }
//            } else {
//                return ResponseEntity.notFound().build();
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi server vui lòng thử lại");
//        }
//    }
//
//
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


