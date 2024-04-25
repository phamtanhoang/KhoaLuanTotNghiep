package com.pth.taskbackend.controller;
import com.pth.taskbackend.dto.request.ApplicationRequest;
import com.pth.taskbackend.dto.request.UpdateCandidateRequest;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.dto.response.GetCandidateProfileResponse;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Application;
import com.pth.taskbackend.model.meta.Candidate;
import com.pth.taskbackend.model.meta.Collection;
import com.pth.taskbackend.model.meta.Job;
import com.pth.taskbackend.security.JwtService;
import com.pth.taskbackend.service.ApplicationService;
import com.pth.taskbackend.service.CandidateService;
import com.pth.taskbackend.service.CollectionService;
import com.pth.taskbackend.service.JobService;
import com.pth.taskbackend.util.func.FileUploadFunc;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

import static com.pth.taskbackend.util.constant.PathConstant.BASE_URL;

@CrossOrigin(origins = "*")
@Tag(name = "applications", description = "Category APIs")
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
    FileUploadFunc fileUploadFunc = new FileUploadFunc();
    @PostMapping("/apply")
    public ResponseEntity<BaseResponse> applyJob(
            @RequestHeader("Authorization") String token,
            @RequestPart("cVFile") MultipartFile cVFile,
            @RequestPart("application") ApplicationRequest applicationRequest,
            HttpServletRequest request
    ) {

        try {

            String email = jwtService.extractUsername(token.substring(7));
            Candidate candidate = candidateService.findByUserEmail(email).orElse(null);
            Job job = jobService.findById(applicationRequest.jobId()).orElse(null);

            if (cVFile.isEmpty()||cVFile.getContentType().equals("application/pdf"))
                return ResponseEntity.ok(
                        new BaseResponse("Chưa có nhập file hoặc định dạng file sai!!!", HttpStatus.UNSUPPORTED_MEDIA_TYPE.value(), null)
                );

            if (applicationService.findByJobIdAndCandidateId(applicationRequest.jobId(), candidate.getId()).isPresent())
                return ResponseEntity.ok(
                        new BaseResponse("Đã ứng tuyển vào công việc này!!!", HttpStatus.OK.value(), null)
                    );

            String cvPath = fileUploadFunc.upload(cVFile);
            Application application = new Application();
            application.setCV(cvPath);
            application.setPhoneNumber(applicationRequest.phoneNumber());
            application.setCandidate(candidate);
            application.setEmail(applicationRequest.email());
            application.setLetter(applicationRequest.letter());
            application.setStatus(EStatus.PENDING);
            application.setJob(job);
            application.setFullName(applicationRequest.fullName());
            applicationService.create(application);

            Collection collection = new Collection();
            collection.setCV(cvPath);
            collection.setEmail(email);
            collection.setLetter(applicationRequest.letter());
            collection.setPhoneNumber(applicationRequest.phoneNumber());
            collection.setFullName(applicationRequest.fullName());
            collection.setCandidate(candidate);


            if(applicationRequest.collectionId()!=null)
                collection.setId(applicationRequest.collectionId());

            collectionService.create(collection);
            return ResponseEntity.ok(
                       new BaseResponse("Đã ứng tuyển công việc thành công", HttpStatus.OK.value(), application)
            );

        }  catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
    }
//
//    @GetMapping("/pendingApplications")
//    public ResponseEntity<?> pendingApplications(
//            @PageableDefault(page = 0, size = 10) Pageable pageable,
//            @RequestHeader("Authorization") String token
//    ) {
//        try {
//            String employerName = jwtService.extractUsername(token.substring(7));
//            Employer employer = employerService.findByAccountUsername(employerName);
//
//            if (employer == null) {
//                return ResponseEntity.badRequest().body("Không tìm thấy người sử dụng");
//            }
//
//            Page<Application> pendingApplications = applicationService.findPendingApplicationsByEmployerName(employer.getName(), pageable);
//
//            Page<ApplicationResponse> responseList = pendingApplications.map(application -> {
//                ApplicationResponse dto = new ApplicationResponse();
//                dto.setId(application.getId());
//                dto.setAccountId(application.getCandidateId());
//                dto.setJobId(application.getJobId());
//                dto.setUserName(accountService.findById(candidateService.findById(application.getCandidateId()).get().getAccountId()).get().getUsername());
//                dto.setAccountName(candidateService.findById(application.getCandidateId()).get().getFirstName() + " " + candidateService.findById(application.getCandidateId()).get().getLastName());
//                dto.setApplyDate(application.getApplyDate());
//                dto.setTitle(jobService.findById(application.getJobId()).get().getTitle());
//                dto.setState(application.getState());
//                dto.setImage(candidateService.findById(application.getCandidateId()).get().getAvatar());
//                return dto;
//            });
//
//            return ResponseEntity.ok(responseList);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi server vui lòng thử lại");
//        }
//    }
//
//
//    @GetMapping("/employerApplications")
//    public ResponseEntity<?> employerApplications(
//            @PageableDefault(page = 0, size = 10) Pageable pageable,
//            @RequestHeader("Authorization") String token,
//            @RequestParam("title") String title
//    ) {
//        try {
//            String employerName = jwtService.extractUsername(token.substring(7));
//            Employer employer = employerService.findByAccountUsername(employerName);
//            if (employer == null) {
//                return ResponseEntity.badRequest().body("vai");
//            }
//            Page<Application> applications = applicationService.findApplicationsByEmployerIdAndContainingTitle(employer.getId(), pageable,title);
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
//    @GetMapping("/candidateApplications")
//    public ResponseEntity<?> getCandidateApplications(
//            @PageableDefault(page = 0, size = 10) Pageable pageable,
//            @RequestHeader("Authorization") String token,
//            @RequestParam String state
//    ) {
//        try {
//            String canidateEmail = jwtService.extractUsername(token.substring(7));
//            Candidate candidate = candidateService.findCandidateByAccountUsername(canidateEmail).get();
//            if (candidate == null) {
//                return ResponseEntity.badRequest().body("vai");
//            }
//            Page<Application> applications = applicationService.findAllByCandidateId(candidate.getId(),state, pageable);
//            Page<ApplicationResponse> candidateApplications = applications.map(application -> {
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
//                dto.setImage(employerService.findById(jobService.findById(application.getJobId()).get().getEmployerId()).get().getImage());
//                dto.setEmployerId(employerService.findById(jobService.findById(application.getJobId()).get().getEmployerId()).get().getId());
//                dto.setEmployerName(employerService.findById(jobService.findById(application.getJobId()).get().getEmployerId()).get().getName());
//                return dto;
//            });
//            return ResponseEntity.ok(candidateApplications);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Page.empty());
//        }
//    }
//
//    @GetMapping("/download")
//    public ResponseEntity<Resource> downloadCV(@RequestParam String fileName) {
//        try {
//            byte[] pdfData = fileUploader.download(fileName);
//            if (pdfData != null) {
//                ByteArrayResource resource = new ByteArrayResource(pdfData);
//
//                HttpHeaders headers = new HttpHeaders();
//                headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName);
//
//                return ResponseEntity.ok()
//                        .headers(headers)
//                        .contentLength(pdfData.length)
//                        .contentType(MediaType.APPLICATION_PDF)
//                        .body(resource);
//            } else {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//        }
//    }
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
}
