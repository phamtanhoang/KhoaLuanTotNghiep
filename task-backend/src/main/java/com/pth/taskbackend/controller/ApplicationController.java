package com.pth.taskbackend.controller;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pth.taskbackend.dto.request.ApplicationRequest;
import com.pth.taskbackend.dto.response.ApplicationDetailResponse;
import com.pth.taskbackend.dto.response.ApplicationResponse;
import com.pth.taskbackend.dto.response.BaseResponse;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

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

    @Autowired ApplicationStepService applicationStepService;

    @Autowired StepService stepService;

    @Autowired
    UserRepository userRepository;
    FileUploadFunc fileUploadFunc = new FileUploadFunc();

    @Autowired HumanResourceService humanResourceService;
    @PostMapping("/{id}")
    public ResponseEntity<BaseResponse> applyJob(
            @RequestHeader("Authorization") String token,
            @RequestParam("cVFile") MultipartFile cVFile,
            @RequestParam String fullName,
            @RequestParam String email,
            @RequestParam String phoneNumber,
            @RequestParam(required = false) String letter,
            @RequestParam(required = false) String collectionId,
            @PathVariable("id")String id

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

            Job job = jobService.findById(id).orElse(null);

            if (cVFile.isEmpty() || !Objects.equals(cVFile.getContentType(), "application/pdf"))
                return ResponseEntity.ok(
                        new BaseResponse("Chưa có nhập file hoặc định dạng file sai!!!", HttpStatus.UNSUPPORTED_MEDIA_TYPE.value(), null)
                );

            if (applicationService.findByJobIdAndCandidateId(id, optionalCandidate.get().getId()).isPresent())
                return ResponseEntity.ok(
                        new BaseResponse("Đã ứng tuyển vào công việc này!!!", HttpStatus.OK.value(), null)
                );

            String cvPath = fileUploadFunc.uploadCV(cVFile);
            Application application = new Application();
            application.setCV(cvPath);
            application.setPhoneNumber(phoneNumber);
            application.setCandidate(optionalCandidate.get());
            application.setEmail(email);
            application.setLetter(letter);
            application.setStatus(EApplyStatus.PENDING);
            application.setJob(job);
            application.setFullName(fullName);
            application.setCurrentStep(0);
            applicationService.create(application);

            Collection collection = new Collection();
            collection.setCV(cvPath);
            collection.setEmail(email);
            collection.setLetter(letter);
            collection.setPhoneNumber(phoneNumber);
            collection.setFullName(fullName);
            collection.setCandidate(optionalCandidate.get());


            if (collectionId != null)
                collection.setId(collectionId);

            collectionService.create(collection);
            return ResponseEntity.ok(
                    new BaseResponse("Đã ứng tuyển công việc thành công", HttpStatus.OK.value(), application)
            );

        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @GetMapping("/pendingApplications")
    public ResponseEntity<BaseResponse> pendingApplications(Pageable pageable,
            @RequestHeader("Authorization") String token) {
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

            Page<Application> pendingApplications = applicationService.findByEmployerIdAndStatus(optionalEmployer.get().getId(), EApplyStatus.PENDING, pageable);

            Page<ApplicationResponse> responseList = pendingApplications.map(application -> {
                ApplicationResponse response = new ApplicationResponse(
                        application.getId(),
                        application.getCandidate().getId(),
                        application.getCandidate().getUser().getEmail(),
                        application.getCandidate().getFirstName()+application.getCandidate().getLastName() ,
                        application.getCandidate().getAvatar(),
                        application.getCreated(),
                        application.getStatus(),
                        application.getJob().getId(),
                        application.getJob().getName(),
                        application.getJob().getHumanResource().getEmployer().getId(),
                        application.getJob().getHumanResource().getEmployer().getName(),
                        application.getCV()
                );
                return response;
            });


            return ResponseEntity.ok(new BaseResponse("Danh sách đơn xin việc đang đợi duyệt", HttpStatus.OK.value(), responseList));

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    @GetMapping("/employerApplications")
    public ResponseEntity<?> employerApplications(
          Pageable pageable,
            @RequestHeader("Authorization") String token,
            @RequestParam("title") String title,
            @RequestParam("status")EApplyStatus status
    ) {

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


            Page<Application> applications = applicationService.findByEmployerIdAndStatusAndNameContaining(optionalEmployer.get().getId(),status,title,pageable);
        Page<ApplicationResponse> responseList = applications.map(application -> {
            ApplicationResponse response = new ApplicationResponse(
                    application.getId(),
                    application.getCandidate().getId(),
                    application.getCandidate().getUser().getEmail(),
                    application.getCandidate().getFirstName()+application.getCandidate().getLastName() ,
                    application.getCandidate().getAvatar(),
                    application.getCreated(),
                    application.getStatus(),
                    application.getJob().getId(),
                    application.getJob().getName(),
                    application.getJob().getHumanResource().getEmployer().getId(),
                    application.getJob().getHumanResource().getEmployer().getName(),
                    application.getCV()
            );
            return response;
        });

            return ResponseEntity.ok(new BaseResponse("Danh sách đơn xin việc cho nhà tuyển dụng", HttpStatus.OK.value(), responseList));

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    @GetMapping("/candidateApplications")
    public ResponseEntity<?> getCandidateApplications(
            Pageable pageable,
            @RequestHeader("Authorization") String token
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
            Page<Application> applications = applicationService.findByCandidateId(optionalCandidate.get().getId(), pageable);
            Page<ApplicationResponse> candidateApplications = applications.map(application -> {
                ApplicationResponse response = new ApplicationResponse(
                        application.getId(),
                        application.getCandidate().getId(),
                        application.getCandidate().getUser().getEmail(),
                        application.getFullName(),
                        application.getCandidate().getAvatar(),
                        application.getCreated(),
                        application.getStatus(),
                        application.getJob().getId(),
                        application.getJob().getName(),
                        application.getJob().getHumanResource().getEmployer().getId(),
                        application.getJob().getHumanResource().getEmployer().getName(),
                        application.getCV()
                );
                return response;
            });
            return ResponseEntity.ok(new BaseResponse("Danh sách đơn xin việc của ứng viên", HttpStatus.OK.value(), candidateApplications));

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
//

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
                                                              @RequestBody String result) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<Candidate> optionalCandidate = candidateService.findByUserEmail(email);
            if (optionalCandidate.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy ứng viên", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<Application> optionalApplication = applicationService.findById(id);
            if (optionalApplication.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy đơn xin việc", HttpStatus.NOT_FOUND.value(), null)
                );

            Application application = optionalApplication.get();
            if(stepService.countAllByProcessId(application.getJob().getProcess().getId())==application.getCurrentStep())
            {
                return ResponseEntity.ok(
                        new BaseResponse("Đã tới bước cuối", HttpStatus.BAD_REQUEST.value(), null)
                );
            }
            if(application.getStatus()==EApplyStatus.PENDING)
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
            } else {
                return ResponseEntity.ok(new BaseResponse("Không tìm thấy bước tiếp theo", HttpStatus.NOT_FOUND.value(), null));
            }

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
            Map<String, String> jsonMap = objectMapper.readValue(status, new TypeReference<Map<String, String>>() {});

            String statusValue = jsonMap.get("status");
            EApplyStatus statusEnum = EApplyStatus.fromString(statusValue);
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<Candidate> optionalCandidate = candidateService.findByUserEmail(email);
            if (optionalCandidate.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy ứng viên", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<Application> optionalApplication = applicationService.findById(id);
            if (optionalApplication.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy đơn xin việc", HttpStatus.NOT_FOUND.value(), null)
                );

            Application application = optionalApplication.get();

            switch (statusEnum)
            {
                case PENDING :
                    return ResponseEntity.ok(
                            new BaseResponse("Không tìm được sử dụng trạng thái này", HttpStatus.BAD_REQUEST.value(), null)
                    );
                case APPROVED:
                    if(stepService.countAllByProcessId(application.getJob().getProcess().getId())!=application.getCurrentStep())
                        return ResponseEntity.ok(
                                new BaseResponse("Chưa đủ quá trình duyệt đơn", HttpStatus.BAD_REQUEST.value(), null)
                        );
                    if(application.getStatus()==EApplyStatus.APPROVED)
                        return ResponseEntity.ok(
                                new BaseResponse("Không thể duyệt lại đơn đã nhận", HttpStatus.BAD_REQUEST.value(), null)
                        );
                    application.setStatus(EApplyStatus.APPROVED);
                    return ResponseEntity.ok(
                            new BaseResponse("Duyệt đơn thành công", HttpStatus.BAD_REQUEST.value(), null)
                    );
                case REJECTED:
                    if(application.getStatus()==EApplyStatus.REJECTED)
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


    @GetMapping("/getApplication-candidate/{id}")
    public ResponseEntity<?> getApplicationDetails(
            @RequestHeader("Authorization") String token,
            @PathVariable("id") String id
    ) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.CANDIDATE) ;
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<Candidate> optionalCandidate = candidateService.findByUserEmail(email);
            if (optionalCandidate.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm người dùng", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<Application> optionalApplication = applicationService.findByIdAndCandidateId(id,optionalCandidate.get().getId());
            if (optionalApplication.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy đơn xin việc", HttpStatus.NOT_FOUND.value(), null)
                );
            Application application = optionalApplication.get();
            ApplicationDetailResponse response = new ApplicationDetailResponse(
                    application.getJob().getName(), // jobName
                    application.getEmail(),
                    application.getFullName(), // firstName
                    application.getCandidate().getAvatar(),
                    application.getCandidate().getDateOfBirth(),
                    application.getCandidate().getSex(),
                    application.getCreated(),
                    application.getCV(),
                    application.getLetter(),
                    application.getStatus()
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

            ApplicationDetailResponse response = new ApplicationDetailResponse(
                    application.getJob().getName(),
                    application.getEmail(),
                    application.getFullName(),
                    application.getCandidate().getAvatar(),
                    application.getCandidate().getDateOfBirth(),
                    application.getCandidate().getSex(),
                    application.getCreated(),
                    application.getCV(),
                    application.getLetter(),
                    application.getStatus()
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
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.ADMIN) ;
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
            ApplicationDetailResponse response = new ApplicationDetailResponse(
                    application.getJob().getName(), // jobName
                    application.getEmail(),
                    application.getFullName(), // firstName
                    application.getCandidate().getAvatar(),
                    application.getCandidate().getDateOfBirth(),
                    application.getCandidate().getSex(),
                    application.getCreated(),
                    application.getCV(),
                    application.getLetter(),
                    application.getStatus()
            );
            return ResponseEntity.ok(
                    new BaseResponse("Chi tiết đơn ứng tuyển", HttpStatus.OK.value(), response)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
}

//
//
//    @GetMapping("/applicatonsJob")
//    public ResponseEntity<?> getApplicatonsOfJob(
//            @PageableDefault(page = 0, size = 10) Pageable pageable,
//            @RequestHeader("Authorization") String token,
//            @RequestParam("jobId") String jobId
//    ) {
//        try {
//            String employerName = jwtService.extractUsername(token.substring(7));
//            Employer employer = employerService.findByAccountUsername(employerName);
//            if (employer == null) {
//                return ResponseEntity.badRequest().body("vai");
//            }
//            Page<Application> applications = applicationService.findApplicationsByJobId(jobId, pageable);
//            Page<ApplicationResponse> employerApplications = applications.map(application -> {
//                ApplicationResponse dto = new ApplicationResponse();
//                dto.setId(application.getId());
//                dto.setAccountId(application.getCandidateId());
//                dto.setJobId(application.getJobId());
//                dto.setUserName(accountService.findById(candidateService.findById(application.getCandidateId()).get().getAccountId()).get().getUsername());
//                dto.setAccountName(candidateService.findById(application.getCandidateId()).get().getFirstName()+ " "+candidateService.findById(application.getCandidateId()).get().getLastName());
//                dto.setApplyDate(application.getApplyDate());
//                dto.setTitle(jobService.findById(application.getJobId()).get().getTitle());
//                dto.setExpiredDate(jobService.findById(application.getJobId()).get().getToDate());
//                dto.setState(application.getState());
//                dto.setImage(candidateService.findById(application.getCandidateId()).get().getAvatar());
//                return dto;
//            });
//            return ResponseEntity.ok(employerApplications);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Page.empty());
//        }
//    }
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
//    @GetMapping("/isApplied")
//    public ResponseEntity<?> isApplied(
//            @RequestHeader("Authorization") String token,
//            @RequestParam String jobId
//    ) {
//        try {
//            String email = jwtService.extractUsername(token.substring(7));
//            Candidate candidate = candidateService.findCandidateByAccountUsername(email).get();
//            Application isApplied = applicationService.findByJobIdAndCandidateId(jobId, candidate.getId());
//            return ResponseEntity.ok(isApplied);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("Failed to check application status: " + e.getMessage());
//        }

//    }


