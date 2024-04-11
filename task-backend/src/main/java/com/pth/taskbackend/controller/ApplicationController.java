package com.pth.taskbackend.controller;
import com.pth.taskbackend.dto.request.ApplicationRequest;
import com.pth.taskbackend.dto.response.ApplicationResponse;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.enums.EApplyStatus;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.*;
import com.pth.taskbackend.security.JwtService;
import com.pth.taskbackend.service.*;
import com.pth.taskbackend.util.func.CheckPermission;
import com.pth.taskbackend.util.func.FileUploadFunc;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
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
    EmployerService employerService;
    private final CheckPermission checkPermission;
    FileUploadFunc fileUploadFunc = new FileUploadFunc();
    @PostMapping("/apply")
    public ResponseEntity<BaseResponse> applyJob(
            @RequestHeader("Authorization") String token,
            @RequestPart("cVFile") MultipartFile cVFile,
            @RequestPart("application") ApplicationRequest applicationRequest

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

            Job job = jobService.findById(applicationRequest.jobId()).orElse(null);

            if (cVFile.isEmpty() || Objects.equals(cVFile.getContentType(), "application/pdf"))
                return ResponseEntity.ok(
                        new BaseResponse("Chưa có nhập file hoặc định dạng file sai!!!", HttpStatus.UNSUPPORTED_MEDIA_TYPE.value(), null)
                );

            if (applicationService.findByJobIdAndCandidateId(applicationRequest.jobId(), optionalCandidate.get().getId()).isPresent())
                return ResponseEntity.ok(
                        new BaseResponse("Đã ứng tuyển vào công việc này!!!", HttpStatus.OK.value(), null)
                );

            String cvPath = fileUploadFunc.uploadCV(cVFile);
            Application application = new Application();
            application.setCV(cvPath);
            application.setPhoneNumber(applicationRequest.phoneNumber());
            application.setCandidate(optionalCandidate.get());
            application.setEmail(email);
            application.setLetter(applicationRequest.letter());
            application.setStatus(EApplyStatus.PENDING);
            application.setJob(job);
            application.setFullName(applicationRequest.fullName());
            applicationService.create(application);

            Collection collection = new Collection();
            collection.setCV(cvPath);
            collection.setEmail(email);
            collection.setLetter(applicationRequest.letter());
            collection.setPhoneNumber(applicationRequest.phoneNumber());
            collection.setFullName(applicationRequest.fullName());
            collection.setCandidate(optionalCandidate.get());


            if (applicationRequest.collectionId() != null)
                collection.setId(applicationRequest.collectionId());

            collectionService.create(collection);
            return ResponseEntity.ok(
                    new BaseResponse("Đã ứng tuyển công việc thành công", HttpStatus.OK.value(), application)
            );

        } catch (Exception e) {
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

        } catch (Exception e) {
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

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

//    @PutMapping("/updateApplication/{id}")
//    public ResponseEntity<BaseResponse>updateApplication(@RequestHeader("Authorization")String token,@PathVariable String id, )

    @GetMapping("/candidateApplications")
    public ResponseEntity<?> getCandidateApplications(
            Pageable pageable,
            @RequestHeader("Authorization") String token,
            @RequestParam String state
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
            return ResponseEntity.ok(new BaseResponse("Danh sách đơn xin việc của ứng viên", HttpStatus.OK.value(), candidateApplications));

        } catch (Exception e) {
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
//
//
//    @GetMapping("/applicationDetails")
//    public ResponseEntity<?> getApplicationDetails(
//            @RequestHeader("Authorization") String token,
//            @RequestParam String applicationId
//    ) {
//        try {
//            String employerName = jwtService.extractUsername(token.substring(7));
//            Employer employer = employerService.findByAccountUsername(employerName);
//            if (employer != null) {
//
//                Optional<Application> applicationOptional = applicationService.findByIdAndEmployerId(applicationId,employer.getId());
//
//                if (applicationOptional.isEmpty())
//                    return ResponseEntity.badRequest().body("Không tìm thấy application tương ứng");
//
//                Application application = applicationOptional.get();
//
//                return ResponseEntity.ok(application);
//            }
//
//            else
//                return ResponseEntity.badRequest().body("Không tìm thấy employer");
//        }
//        catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
//    @GetMapping("/applicationDetailsByCandidateId")
//    public ResponseEntity<?> getApplicationDetailsByCandidateId(
//            @RequestHeader("Authorization") String token,
//            @RequestParam String applicationId
//    ) {
//        try {
//            String candidateName = jwtService.extractUsername(token.substring(7));
//            Candidate candidate = candidateService.findCandidateByAccountUsername(candidateName).get();
//            if (candidate != null) {
//
//                Optional<Application> applicationOptional = applicationService.findByIdAndCandidateId(applicationId,candidate.getId());
//
//                if (applicationOptional.isEmpty())
//                    return ResponseEntity.badRequest().body("Không tìm thấy application tương ứng");
//
//                Application application = applicationOptional.get();
//
//                return ResponseEntity.ok(application);
//            }
//
//            else
//                return ResponseEntity.badRequest().body("Không tìm thấy employer");
//        }
//        catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
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
//
//    @GetMapping("/candidateApplicationDetails")
//    public ResponseEntity<?> getCandidateApplicationDetails(
//            @RequestHeader("Authorization") String token,
//            @RequestParam String applicationId
//    ) {
//        try {
//            String candidateEmail = jwtService.extractUsername(token.substring(7));
//            Candidate candidate = candidateService.findCandidateByAccountUsername(candidateEmail).get();
//            if (candidate != null) {
//
//                Optional<Application> applicationOptional = applicationService.findByIdAndCandidateId(applicationId,candidate.getId());
//
//                if (applicationOptional.isEmpty())
//                    return ResponseEntity.badRequest().body("Không tìm thấy application tương ứng");
//
//                Application application = applicationOptional.get();
//
//                return ResponseEntity.ok(application);
//            }
//
//            else
//                return ResponseEntity.badRequest().body("Không tìm thấy employer");
//        }
//        catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }

    }
