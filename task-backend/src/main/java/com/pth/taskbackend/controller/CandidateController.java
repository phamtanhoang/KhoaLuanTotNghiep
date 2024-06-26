package com.pth.taskbackend.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pth.taskbackend.dto.request.EducationRequest;
import com.pth.taskbackend.dto.request.ExperienceRequest;
import com.pth.taskbackend.dto.request.SkillRequest;
import com.pth.taskbackend.dto.request.UpdateCandidateRequest;
import com.pth.taskbackend.dto.response.*;
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
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import static com.pth.taskbackend.util.constant.PathConstant.BASE_URL;

@CrossOrigin(origins = "*")
@Tag(name = "Candidates", description = "Category APIs")
@SecurityRequirement(name = "javainuseapi")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = {BASE_URL + "/candidates"})
public class CandidateController {

    @Autowired
    private CandidateService candidateService;
    @Autowired
    JwtService jwtService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CheckPermission checkPermission;

    @Autowired
    ObjectMapper objectMapper;
//    @Autowired
//    VipCandidateService vipCandidateService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    ExperienceService experienceService;
    @Autowired
    EducationService educationService;
    @Autowired
    SkillService skillService;

    @Autowired
    VipEmployerService vipEmployerService;

    @Autowired
    FileUploadFunc fileUploadFunc;
    @Autowired
    EmployerService employerService;
    @Autowired
    HumanResourceService humanResourceService;

    @Autowired
    ApplicationService applicationService;
    @Autowired
    MailService mailService;

    @Operation(summary = "Get list", description = "", tags = {})
    @GetMapping("getCandidates-admin")
    public ResponseEntity<BaseResponse> getCandidatesByAdmin(@RequestHeader("Authorization") String token, @RequestParam(required = false) String keyword, @RequestParam(required = false) EStatus status, Pageable pageable) {
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

            Page<Candidate> candidates = candidateService.findByKeywordAndStatus(keyword, status, pageable);
            Page<CandidateResponse> responseList = candidates.map(candidate -> new CandidateResponse(
                    candidate.getId(),
                    candidate.getCreated(),
                    candidate.getUpdated(),
                    candidate.getFirstName(),
                    candidate.getLastName(),
                    candidate.getPhoneNumber(),
                    candidate.getSex(),
                    candidate.getAvatar(),
                    candidate.getDateOfBirth(),
                    candidate.getIntroduction(),
                    candidate.getJob(),
                    candidate.getLink(),
                    candidate.getIsFindJob(),
                    candidate.getUser().getStatus(),
                    candidate.getUser().getEmail(),
                    candidate.getUser().getId()
            ));
            if (candidates.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách ứng viên rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách ứng viên", HttpStatus.OK.value(), responseList)
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

    @Operation(summary = "update status", description = "", tags = {})
    @PatchMapping("/updateIsFindJob")
    public ResponseEntity<BaseResponse> updateIsFindJob(@RequestHeader("Authorization") String token) {
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


            Candidate candidate = optionalCandidate.get();
            if (candidate.getIsFindJob() == null) {
                candidate.setIsFindJob(false);
            }
            candidate.setIsFindJob(!candidate.getIsFindJob());
            candidateService.update(candidate);
            return ResponseEntity.ok(
                    new BaseResponse("Thao tác thành công", HttpStatus.OK.value(), null)
            );


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
    @PatchMapping("/{id}")
    public ResponseEntity<BaseResponse> updateCandidate(@RequestHeader("Authorization") String token, @PathVariable("id") String id, @RequestBody String status) {
        try {
            Map<String, String> jsonMap = objectMapper.readValue(status, new TypeReference<Map<String, String>>() {
            });

            String statusValue = jsonMap.get("status");
            EStatus statusEnum = EStatus.fromString(statusValue);
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

            Optional<User> optionalCandidate = userRepository.findByCandidateId(id);
            if (optionalCandidate.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy ứng viên tương ứng", HttpStatus.NOT_FOUND.value(), null)
                );
            if (statusEnum == EStatus.DELETED)
                return ResponseEntity.ok(
                        new BaseResponse("Không được xóa", HttpStatus.NOT_FOUND.value(), null)
                );
            User candidate = optionalCandidate.get();
            switch (statusEnum) {
                case ACTIVE:
                    if (candidate.getStatus().equals(EStatus.ACTIVE))
                        return ResponseEntity.ok(
                                new BaseResponse("Đã duyệt ứng viên này rồi", HttpStatus.OK.value(), null)
                        );
                    candidate.setStatus(EStatus.ACTIVE);
                    userRepository.save(candidate);
                    CompletableFuture.runAsync(() -> {
                        try {
                            mailService.sendEmail(candidate.getEmail(), candidate.getEmail(), "Tài khoản của bạn đã được duyệt.",
                                    "EMAIL_TEMPLATE");
                        } catch (MessagingException e) {
                            System.out.println("Failed to send email to: " + candidate.getEmail());
                        }
                    });
                    return ResponseEntity.ok(
                            new BaseResponse("Duyệt ứng viên thành công", HttpStatus.OK.value(), null)
                    );
                case INACTIVE:
                    if (candidate.getStatus().equals(EStatus.INACTIVE))
                        return ResponseEntity.ok(
                                new BaseResponse("Đã khóa ứng viên này rồi", HttpStatus.OK.value(), null)
                        );
                    candidate.setStatus(EStatus.INACTIVE);
                    userRepository.save(candidate);
                    CompletableFuture.runAsync(() -> {
                        try {
                            mailService.sendEmail(candidate.getEmail(), candidate.getEmail(), "Tài khoản của bạn đã bị khóa.",
                                    "EMAIL_TEMPLATE");
                        } catch (MessagingException e) {
                            System.out.println("Failed to send email to: " + candidate.getEmail());
                        }
                    });
                    return ResponseEntity.ok(
                            new BaseResponse("Khóa ứng viên dụng thành công", HttpStatus.OK.value(), null)
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

    @Operation(summary = "delete", description = "", tags = {})
    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> deleteCandidate(@RequestHeader("Authorization") String token, @PathVariable("id") String id) {
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
            Optional<User> optionalCandidate = userRepository.findByCandidateId(id);
            if (optionalCandidate.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy ứng viên", HttpStatus.NOT_FOUND.value(), null)
                );

            User candidate = optionalCandidate.get();
            if (candidate.getStatus().equals(EStatus.DELETED))
                return ResponseEntity.ok(
                        new BaseResponse("Đã xóa ứng viên này", HttpStatus.OK.value(), null)
                );
            candidate.setStatus(EStatus.DELETED);
            userRepository.save(candidate);
            return ResponseEntity.ok(new BaseResponse("Xóa ứng viên thành công", HttpStatus.OK.value(), null));
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

    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getCandidateByAdmin(@RequestHeader("Authorization") String token, @PathVariable() String id) {
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


            Optional<Candidate> optionalCandidate = candidateService.findById(id);
            if (optionalCandidate.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy ứng viên", HttpStatus.NOT_FOUND.value(), null)
                );
            if (optionalCandidate.get().getUser().getStatus().equals(EStatus.DELETED))
                return ResponseEntity.ok(
                        new BaseResponse("Không thể truy cập thông tin ứng viên đã xóa", HttpStatus.NO_CONTENT.value(), null)
                );
            Candidate candidate = optionalCandidate.get();

            CandidateResponse response = new CandidateResponse(
                    candidate.getId(),
                    candidate.getCreated(),
                    candidate.getUpdated(),
                    candidate.getFirstName(),
                    candidate.getLastName(),
                    candidate.getPhoneNumber(),
                    candidate.getSex(),
                    candidate.getAvatar(),
                    candidate.getDateOfBirth(),
                    candidate.getIntroduction(),
                    candidate.getJob(),
                    candidate.getLink(),
                    candidate.getIsFindJob(),
                    candidate.getUser().getStatus(),
                    candidate.getUser().getEmail(),
                    candidate.getUser().getId());
            return ResponseEntity.ok(
                    new BaseResponse("Chi tiết ứng viên", HttpStatus.OK.value(), response)
            );
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get info for employer", description = "", tags = {})
    @GetMapping("/getInfo_Employer/{id}")
    public ResponseEntity<BaseResponse> getInfo_Employer(@RequestHeader("Authorization") String token, @PathVariable String id) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER)
                    || checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<Candidate> optionalCandidate = candidateService.findById(id);
            if (optionalCandidate.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy ứng viên!", HttpStatus.NOT_FOUND.value(), null)
                );
            if (optionalCandidate.get().getUser().getStatus().equals(EStatus.DELETED))
                return ResponseEntity.ok(
                        new BaseResponse("Tài khoản ứng viên không còn tồn tại!", HttpStatus.NOT_FOUND.value(), null)
                );

            String ID;
            if (optionalUser.get().getRole() == ERole.EMPLOYER) {
                ID = employerService.findByUserEmail(email).get().getId();
            } else {
                ID = humanResourceService.findByEmail(email).get().getId();
            }

            Candidate candidate = optionalCandidate.get();
            List<Education> educationList = educationService.findByCandidateId(optionalCandidate.get().getId(), Pageable.unpaged()).stream().toList();
            List<EducationResponse> educationResponses = educationList.stream()
                    .map(education -> new EducationResponse(
                            education.getId(),
                            education.getCreated(),
                            education.getUpdated(),
                            education.getFromDate(),
                            education.getToDate(),
                            education.getEducation(),
                            education.getSequence(),
                            education.getDescription(),
                            education.getCandidate().getId()
                    ))
                    .toList();

            List<Experience> experiences = experienceService.findByCandidateId(optionalCandidate.get().getId(), Pageable.unpaged()).stream().toList();

            List<ExperienceResponse> experienceResponses = experiences.stream()
                    .map(experience -> new ExperienceResponse(
                            experience.getId(),
                            experience.getCreated(),
                            experience.getUpdated(),
                            experience.getFromDate(),
                            experience.getToDate(),
                            experience.getExperience(),
                            experience.getSequence(),
                            experience.getDescription(),
                            experience.getCandidate().getId()
                    ))
                    .collect(Collectors.toList());


            List<Skill> skills = skillService.findByCandidateId(optionalCandidate.get().getId(), Pageable.unpaged()).stream().toList();

            List<SkillResponse> skillResponses = skills.stream()
                    .map(skill -> new SkillResponse(
                            skill.getId(),
                            skill.getCreated(),
                            skill.getUpdated(),
                            skill.getSkill(),
                            skill.getSequence(),
                            skill.getDescription(),
                            skill.getCandidate().getId()
                    ))
                    .collect(Collectors.toList());

            Map<String, Object> response = new HashMap<>();
            response.put("skills", skillResponses);
            response.put("experiences", experienceResponses);
            response.put("educations", educationResponses);
            CandidateDetailResponse responses = new CandidateDetailResponse(
                    candidate.getId(),
                    candidate.getFirstName(),
                    candidate.getLastName(),
                    candidate.getPhoneNumber(),
                    candidate.getSex(),
                    candidate.getAvatar(),
                    candidate.getDateOfBirth(),
                    candidate.getIntroduction(),
                    candidate.getJob(),
                    candidate.getLink(),
                    candidate.getCV(),
                    candidate.getUser().getEmail(),
                    candidate.getUser().getId(),
                    candidate.getAddress(),
                    optionalUser.get().getRole() == ERole.EMPLOYER ?
                            candidateService.checkIsFollow_Employer_Candidate(ID, id) :
                            candidateService.checkIsFollow_HR_Candidate(ID, id),
                    response
            );
            return ResponseEntity.ok(
                    new BaseResponse("Chi tiết ứng viên", HttpStatus.OK.value(), responses)
            );
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get info for candidate", description = "", tags = {})
    @GetMapping("/getInfo_Candidate")
    public ResponseEntity<BaseResponse> getInfo_Candidate(@RequestHeader("Authorization") String token) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.CANDIDATE);

            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<Candidate> optionalCandidate = candidateService.findByUserEmail(email);
            if (optionalCandidate.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy ứng viên!", HttpStatus.NOT_FOUND.value(), null)
                );
            if (optionalCandidate.get().getUser().getStatus().equals(EStatus.DELETED))
                return ResponseEntity.ok(
                        new BaseResponse("Tài khoản ứng viên không còn tồn tại!", HttpStatus.NOT_FOUND.value(), null)
                );

            Candidate candidate = optionalCandidate.get();
            List<Education> educationList = educationService.findByCandidateId(optionalCandidate.get().getId(), Pageable.unpaged()).stream().toList();
            List<EducationResponse> educationResponses = educationList.stream()
                    .map(education -> new EducationResponse(
                            education.getId(),
                            education.getCreated(),
                            education.getUpdated(),
                            education.getFromDate(),
                            education.getToDate(),
                            education.getEducation(),
                            education.getSequence(),
                            education.getDescription(),
                            education.getCandidate().getId()
                    ))
                    .toList();

            List<Experience> experiences = experienceService.findByCandidateId(optionalCandidate.get().getId(), Pageable.unpaged()).stream().toList();

            List<ExperienceResponse> experienceResponses = experiences.stream()
                    .map(experience -> new ExperienceResponse(
                            experience.getId(),
                            experience.getCreated(),
                            experience.getUpdated(),
                            experience.getFromDate(),
                            experience.getToDate(),
                            experience.getExperience(),
                            experience.getSequence(),
                            experience.getDescription(),
                            experience.getCandidate().getId()
                    ))
                    .collect(Collectors.toList());


            List<Skill> skills = skillService.findByCandidateId(optionalCandidate.get().getId(), Pageable.unpaged()).stream().toList();

            List<SkillResponse> skillResponses = skills.stream()
                    .map(skill -> new SkillResponse(
                            skill.getId(),
                            skill.getCreated(),
                            skill.getUpdated(),
                            skill.getSkill(),
                            skill.getSequence(),
                            skill.getDescription(),
                            skill.getCandidate().getId()
                    ))
                    .collect(Collectors.toList());

            Map<String, Object> response = new HashMap<>();
            response.put("skills", skillResponses);
            response.put("experiences", experienceResponses);
            response.put("educations", educationResponses);
            CandidateDetailResponse responses = new CandidateDetailResponse(
                    candidate.getId(),
                    candidate.getFirstName(),
                    candidate.getLastName(),
                    candidate.getPhoneNumber(),
                    candidate.getSex(),
                    candidate.getAvatar(),
                    candidate.getDateOfBirth(),
                    candidate.getIntroduction(),
                    candidate.getJob(),
                    candidate.getLink(),
                    candidate.getCV(),
                    candidate.getUser().getEmail(),
                    candidate.getUser().getId(),
                    candidate.getAddress(),
                    false,
                    response
            );
            return ResponseEntity.ok(
                    new BaseResponse("Chi tiết ứng viên", HttpStatus.OK.value(), responses)
            );
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    @Operation(summary = "Get list", description = "", tags = {})
    @GetMapping("/findCV")
    public ResponseEntity<BaseResponse> findCV(@RequestHeader("Authorization") String token,
                                               @RequestParam(required = false) String job,
                                               @RequestParam(required = false) String location,
                                               @RequestParam(required = false) String skill,
                                               Pageable pageable) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER) ||
                    checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );
            Optional<User> user = userRepository.findByEmail(email);

            if (user.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );
            Optional<Employer> optionalEmployer = Optional.empty();
            if (user.get().getRole().equals(ERole.EMPLOYER)) {
                optionalEmployer = employerService.findByUserEmail(email);
            }
            if (user.get().getRole().equals(ERole.HR)) {
                optionalEmployer = employerService.findById(humanResourceService.findByEmail(email).get().getEmployer().getId());
            }
            boolean isVip = vipEmployerService.isVip(optionalEmployer.get().getId());

            if (!isVip)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép sử dụng chức năng này", HttpStatus.FORBIDDEN.value(), null)
                );

            Page<Candidate> candidates = candidateService.findCV(job, location, skill, pageable);

            Page<CandidateDetailResponse> responses = candidates.map(candidate -> {
                List<Education> educationList = educationService.findByCandidateId(candidate.getId(), Pageable.unpaged()).stream().toList();
                List<EducationResponse> educationResponses = educationList.stream()
                        .map(education -> new EducationResponse(
                                education.getId(),
                                education.getCreated(),
                                education.getUpdated(),
                                education.getFromDate(),
                                education.getToDate(),
                                education.getEducation(),
                                education.getSequence(),
                                education.getDescription(),
                                education.getCandidate().getId()
                        ))
                        .toList();

                List<Experience> experiences = experienceService.findByCandidateId(candidate.getId(), Pageable.unpaged()).stream().toList();

                List<ExperienceResponse> experienceResponses = experiences.stream()
                        .map(experience -> new ExperienceResponse(
                                experience.getId(),
                                experience.getCreated(),
                                experience.getUpdated(),
                                experience.getFromDate(),
                                experience.getToDate(),
                                experience.getExperience(),
                                experience.getSequence(),
                                experience.getDescription(),
                                experience.getCandidate().getId()
                        ))
                        .collect(Collectors.toList());


                List<Skill> skills = skillService.findByCandidateId(candidate.getId(), Pageable.unpaged()).stream().toList();

                List<SkillResponse> skillResponses = skills.stream()
                        .map(s -> new SkillResponse(
                                s.getId(),
                                s.getCreated(),
                                s.getUpdated(),
                                s.getSkill(),
                                s.getSequence(),
                                s.getDescription(),
                                s.getCandidate().getId()
                        ))
                        .collect(Collectors.toList());

                Map<String, Object> response = new HashMap<>();
                response.put("skills", skillResponses);
                response.put("experiences", experienceResponses);
                response.put("educations", educationResponses);
                return new CandidateDetailResponse(
                        candidate.getId(),
                        candidate.getFirstName(),
                        candidate.getLastName(),
                        candidate.getPhoneNumber(),
                        candidate.getSex(),
                        candidate.getAvatar(),
                        candidate.getDateOfBirth(),
                        candidate.getIntroduction(),
                        candidate.getJob(),
                        candidate.getLink(),
                        candidate.getCV(),
                        candidate.getUser().getEmail(),
                        candidate.getUser().getId(),
                        candidate.getAddress(),
                        false,
                        response);
            });


            return ResponseEntity.ok(new BaseResponse("Danh sách ứng viên", HttpStatus.OK.value(), responses));

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/profile")
    public ResponseEntity<BaseResponse> getCandidateProfile(@RequestHeader("Authorization") String token) {
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
                        new BaseResponse("Không tìm thấy ứng viên ", HttpStatus.NOT_FOUND.value(), null)
                );
            Candidate candidate = optionalCandidate.get();
//                boolean isVip = vipCandidateService.isVip(candidate.getId());
            GetCandidateProfileResponse profile = new GetCandidateProfileResponse(
                    candidate.getId(),
                    candidate.getUser().getEmail(),
                    candidate.getFirstName(),
                    candidate.getLastName(),
                    candidate.getAddress(),
                    candidate.getPhoneNumber(),
                    candidate.getDateOfBirth(),
                    candidate.getLink(),
                    candidate.getJob(),
                    candidate.getIntroduction(),
                    candidate.getAvatar(),
                    candidate.getSex(),
                    candidate.getIsFindJob(),
                    candidate.getCV());

            return ResponseEntity.ok(
                    new BaseResponse("Hiện thông tin ứng viên", HttpStatus.OK.value(), profile)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    @Operation(summary = "update by token", description = "", tags = {})
    @PatchMapping("/updateProfile")
    public ResponseEntity<BaseResponse> updateCandidateProfile(@RequestHeader("Authorization") String token, @RequestBody UpdateCandidateRequest request
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
                        new BaseResponse("Không tìm thấy ứng viên ", HttpStatus.NOT_FOUND.value(), null)
                );
            Candidate update = optionalCandidate.get();
            update.setFirstName(request.firstName());
            update.setLastName(request.lastName());
            update.setAddress(request.address());
            update.setPhoneNumber(request.phoneNumber());
            update.setDateOfBirth(request.dateOfBirth());
            update.setLink(request.link());
            update.setJob(request.job());
            update.setIntroduction(request.introduction());
            update.setSex(request.sex());

            candidateService.update(update);
            return ResponseEntity.ok(
                    new BaseResponse("Cập nhật thông tin ứng viên thành công", HttpStatus.OK.value(), update)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Update Avatar", description = "", tags = {})
    @PatchMapping("/updateAvatar")
    public ResponseEntity<BaseResponse> updateCandidateAvatar(@RequestHeader("Authorization") String token, @RequestPart MultipartFile avatar) {
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
                        new BaseResponse("Không tìm thấy ứng viên ", HttpStatus.NOT_FOUND.value(), null)
                );
            if (avatar.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Vui lòng chọn ảnh đại diện", HttpStatus.BAD_REQUEST.value(), null)
                );
            Candidate update = optionalCandidate.get();
            candidateService.updateAvatar(update, avatar);
            return ResponseEntity.ok(
                    new BaseResponse("Cập nhật ảnh đại diện ứng viên thành công", HttpStatus.OK.value(), update)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Update Avatar", description = "", tags = {})
    @PatchMapping("/uploadCV")
    public ResponseEntity<BaseResponse> uploadCandidateCV(@RequestHeader("Authorization") String token, @RequestPart MultipartFile cVFile) {
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
                        new BaseResponse("Không tìm thấy ứng viên ", HttpStatus.NOT_FOUND.value(), null)
                );

            if (cVFile.isEmpty() ||
                    (!Objects.equals(cVFile.getContentType(), "application/pdf") &&
                            !Objects.equals(cVFile.getContentType(), "application/vnd.openxmlformats-officedocument.wordprocessingml.document") &&
                            !Objects.equals(cVFile.getContentType(), "application/msword"))) {
                return ResponseEntity.ok(
                        new BaseResponse("File không hợp lệ", HttpStatus.UNSUPPORTED_MEDIA_TYPE.value(), null)
                );
            }

            Candidate update = optionalCandidate.get();

            String uploadCV = fileUploadFunc.uploadCV(cVFile);
            String fullPath = fileUploadFunc.getFullImagePath(uploadCV);
            System.out.println(fullPath);
            update.setCV(fullPath);
            candidateService.update(update);
            return ResponseEntity.ok(
                    new BaseResponse("Cập nhật CV thành công", HttpStatus.OK.value(), update)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Update Avatar", description = "", tags = {})
    @PatchMapping("/deleteCV")
    public ResponseEntity<BaseResponse> deleteCandidateCV(@RequestHeader("Authorization") String token) {
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
                        new BaseResponse("Không tìm thấy ứng viên ", HttpStatus.NOT_FOUND.value(), null)
                );

            Candidate update = optionalCandidate.get();
            update.setCV(null);
            candidateService.update(update);
            return ResponseEntity.ok(
                    new BaseResponse("Xóa CV thành công", HttpStatus.OK.value(), update)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/extraProfile")
    public ResponseEntity<BaseResponse> getCandidateExtraProfile(@RequestHeader("Authorization") String token) {
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
                        new BaseResponse("Không tìm thấy ứng viên ", HttpStatus.NOT_FOUND.value(), null)
                );

            List<Education> educationList = educationService.findByCandidateId(optionalCandidate.get().getId(), Pageable.unpaged()).stream().toList();
            List<EducationResponse> educationResponses = educationList.stream()
                    .map(education -> new EducationResponse(
                            education.getId(),
                            education.getCreated(),
                            education.getUpdated(),
                            education.getFromDate(),
                            education.getToDate(),
                            education.getEducation(),
                            education.getSequence(),
                            education.getDescription(),
                            education.getCandidate().getId()
                    ))
                    .toList();

            List<Experience> experiences = experienceService.findByCandidateId(optionalCandidate.get().getId(), Pageable.unpaged()).stream().toList();

            List<ExperienceResponse> experienceResponses = experiences.stream()
                    .map(experience -> new ExperienceResponse(
                            experience.getId(),
                            experience.getCreated(),
                            experience.getUpdated(),
                            experience.getFromDate(),
                            experience.getToDate(),
                            experience.getExperience(),
                            experience.getSequence(),
                            experience.getDescription(),
                            experience.getCandidate().getId()
                    ))
                    .collect(Collectors.toList());


            List<Skill> skills = skillService.findByCandidateId(optionalCandidate.get().getId(), Pageable.unpaged()).stream().toList();

            List<SkillResponse> skillResponses = skills.stream()
                    .map(skill -> new SkillResponse(
                            skill.getId(),
                            skill.getCreated(),
                            skill.getUpdated(),
                            skill.getSkill(),
                            skill.getSequence(),
                            skill.getDescription(),
                            skill.getCandidate().getId()
                    ))
                    .collect(Collectors.toList());

            if (educationList.isEmpty() && experiences.isEmpty() && skills.isEmpty())

                return ResponseEntity.ok(
                        new BaseResponse("Thông tin thêm của ứng viên rỗng", HttpStatus.OK.value(), null)
                );

            Map<String, Object> response = new HashMap<>();
            response.put("skills", skillResponses);
            response.put("experiences", experienceResponses);
            response.put("educations", educationResponses);

            return ResponseEntity.ok(
                    new BaseResponse("Hiện thông tin thêm của ứng viên", HttpStatus.OK.value(), response)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/getSkills")
    public ResponseEntity<BaseResponse> getCandidateSkills(@RequestHeader("Authorization") String token) {
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
                        new BaseResponse("Không tìm thấy ứng viên ", HttpStatus.NOT_FOUND.value(), null)
                );


            List<Skill> skills = skillService.findByCandidateId(optionalCandidate.get().getId(), Pageable.unpaged()).stream().toList();
            if (skills.isEmpty())

                return ResponseEntity.ok(
                        new BaseResponse("Thông tin kỹ năng của ứng viên rỗng", HttpStatus.OK.value(), null)
                );

            List<SkillResponse> skillResponses = skills.stream()
                    .map(skill -> new SkillResponse(
                            skill.getId(),
                            skill.getCreated(),
                            skill.getUpdated(),
                            skill.getSkill(),
                            skill.getSequence(),
                            skill.getDescription(),
                            skill.getCandidate().getId()
                    ))
                    .collect(Collectors.toList());


            return ResponseEntity.ok(
                    new BaseResponse("Hiện thông tin kỹ năng của ứng viên", HttpStatus.OK.value(), skillResponses)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/getExperiences")
    public ResponseEntity<BaseResponse> getCandidateExperiences(@RequestHeader("Authorization") String token) {
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
                        new BaseResponse("Không tìm thấy ứng viên ", HttpStatus.NOT_FOUND.value(), null)
                );


            List<Experience> experiences = experienceService.findByCandidateId(optionalCandidate.get().getId(), Pageable.unpaged()).stream().toList();

            if (experiences.isEmpty())

                return ResponseEntity.ok(
                        new BaseResponse("Thông tin kinh nghiệm của ứng viên rỗng", HttpStatus.OK.value(), null)
                );

            List<ExperienceResponse> experienceResponses = experiences.stream()
                    .map(experience -> new ExperienceResponse(
                            experience.getId(),
                            experience.getCreated(),
                            experience.getUpdated(),
                            experience.getFromDate(),
                            experience.getToDate(),
                            experience.getExperience(),
                            experience.getSequence(),
                            experience.getDescription(),
                            experience.getCandidate().getId()
                    ))
                    .collect(Collectors.toList());


            return ResponseEntity.ok(
                    new BaseResponse("Hiện thông tin kinh nghiệm ứng viên", HttpStatus.OK.value(), experienceResponses)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/getEducations")
    public ResponseEntity<BaseResponse> getCandidateEducations(@RequestHeader("Authorization") String token) {
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
                        new BaseResponse("Không tìm thấy ứng viên ", HttpStatus.NOT_FOUND.value(), null)
                );

            List<Education> educationList = educationService.findByCandidateId(optionalCandidate.get().getId(), Pageable.unpaged()).stream().toList();


            if (educationList.isEmpty())

                return ResponseEntity.ok(
                        new BaseResponse("Thông tin học vấn của ứng viên rỗng", HttpStatus.OK.value(), null)
                );
            List<EducationResponse> educationResponses = educationList.stream()
                    .map(education -> new EducationResponse(
                            education.getId(),
                            education.getCreated(),
                            education.getUpdated(),
                            education.getFromDate(),
                            education.getToDate(),
                            education.getEducation(),
                            education.getSequence(),
                            education.getDescription(),
                            education.getCandidate().getId()
                    ))
                    .toList();


            return ResponseEntity.ok(
                    new BaseResponse("Hiện thông tin học vấn của ứng viên", HttpStatus.OK.value(), educationResponses)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    @Operation(summary = "Create", description = "", tags = {})
    @PostMapping("/saveExperiences")
    public ResponseEntity<BaseResponse> saveExperiences(@RequestHeader("Authorization") String token, @RequestBody ExperienceRequest request) throws IOException {
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
                        new BaseResponse("Không tìm thấy ứng viên ", HttpStatus.NOT_FOUND.value(), null)
                );

            List<Experience> deleteExperiences = experienceService.findByCandidateId(optionalCandidate.get().getId(), Pageable.unpaged()).stream().toList();
            for (Experience experience : deleteExperiences)
                experienceService.delete(experience);

            List<Experience> experiences = request.experiences();

            for (Experience experience : experiences) {
                experience.setCandidate(optionalCandidate.get());
            }
            experienceService.save(experiences);

            List<Employer> employers = candidateService.getEmployersSavedMe(optionalCandidate.get().getId());
            List<HumanResource> humanResources = candidateService.getHRsSavedMe(optionalCandidate.get().getId());

            List<String> emails = employers.stream()
                    .map(employer -> employer.getUser().getEmail())
                    .collect(Collectors.toList());

            emails.addAll(humanResources.stream()
                    .map(humanResource -> humanResource.getUser().getEmail())
                    .collect(Collectors.toList()));

            String fullName = optionalCandidate.get().getFirstName() + " " + optionalCandidate.get().getLastName();
            CompletableFuture.runAsync(() -> {
                emails.forEach(item -> {
                    try {
                        mailService.sendEmail(item, item,
                                "Tài khoản ứng viên " + fullName + " (" + optionalCandidate.get().getUser().getEmail() +
                                        ") vừa cập nhật thông tin có thể bạn sẽ quan tâm.",
                                "EMAIL_TEMPLATE");
                    } catch (MessagingException e) {
                        System.out.println("Failed to send email to: " + item);
                    }
                });
            });

            return ResponseEntity.ok(
                    new BaseResponse("Thêm danh sách kinh nghiệm thành công", HttpStatus.OK.value(), emails)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Create", description = "", tags = {})
    @PostMapping("/saveSkills")
    public ResponseEntity<BaseResponse> saveSkills(@RequestHeader("Authorization") String token, @RequestBody SkillRequest request) throws IOException {
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
                        new BaseResponse("Không tìm thấy ứng viên ", HttpStatus.NOT_FOUND.value(), null)
                );
            List<Skill> deleteSKills = skillService.findByCandidateId(optionalCandidate.get().getId(), Pageable.unpaged()).stream().toList();
            for (Skill skill : deleteSKills)
                skillService.delete(skill);

            List<Skill> skills = request.skills();

            for (Skill skill : skills) {
                skill.setCandidate(optionalCandidate.get());
            }
            skillService.save(skills);
            List<Employer> employers = candidateService.getEmployersSavedMe(optionalCandidate.get().getId());
            List<HumanResource> humanResources = candidateService.getHRsSavedMe(optionalCandidate.get().getId());

            List<String> emails = employers.stream()
                    .map(employer -> employer.getUser().getEmail())
                    .collect(Collectors.toList());

            emails.addAll(humanResources.stream()
                    .map(humanResource -> humanResource.getUser().getEmail())
                    .collect(Collectors.toList()));

            String fullName = optionalCandidate.get().getFirstName() + " " + optionalCandidate.get().getLastName();
            CompletableFuture.runAsync(() -> {
                emails.forEach(item -> {
                    try {
                        mailService.sendEmail(item, item,
                                "Tài khoản ứng viên " + fullName + " (" + optionalCandidate.get().getUser().getEmail() +
                                        ") vừa cập nhật thông tin có thể bạn sẽ quan tâm.",
                                "EMAIL_TEMPLATE");
                    } catch (MessagingException e) {
                        System.out.println("Failed to send email to: " + item);
                    }
                });
            });
            return ResponseEntity.ok(
                    new BaseResponse("Thêm danh sách kỹ năng thành công", HttpStatus.OK.value(), null)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Create", description = "", tags = {})
    @PostMapping("/saveEducations")
    public ResponseEntity<BaseResponse> saveEducations(@RequestHeader("Authorization") String token, @RequestBody EducationRequest request) throws IOException {
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
                        new BaseResponse("Không tìm thấy ứng viên ", HttpStatus.NOT_FOUND.value(), null)
                );

            List<Education> deleteEducations = educationService.findByCandidateId(optionalCandidate.get().getId(), null).stream().toList();

            for (Education education : deleteEducations)
                educationService.delete(education);
            System.out.println(request);
            List<Education> educationList = request.educations();

            for (Education education : educationList) {
                education.setCandidate(optionalCandidate.get());
            }
            educationService.save(educationList);

            List<Employer> employers = candidateService.getEmployersSavedMe(optionalCandidate.get().getId());
            List<HumanResource> humanResources = candidateService.getHRsSavedMe(optionalCandidate.get().getId());

            List<String> emails = employers.stream()
                    .map(employer -> employer.getUser().getEmail())
                    .collect(Collectors.toList());

            emails.addAll(humanResources.stream()
                    .map(humanResource -> humanResource.getUser().getEmail())
                    .collect(Collectors.toList()));

            String fullName = optionalCandidate.get().getFirstName() + " " + optionalCandidate.get().getLastName();
            CompletableFuture.runAsync(() -> {
                emails.forEach(item -> {
                    try {
                        mailService.sendEmail(item, item,
                                "Tài khoản ứng viên " + fullName + " (" + optionalCandidate.get().getUser().getEmail() +
                                        ") vừa cập nhật thông tin có thể bạn sẽ quan tâm.",
                                "EMAIL_TEMPLATE");
                    } catch (MessagingException e) {
                        System.out.println("Failed to send email to: " + item);
                    }
                });
            });
            return ResponseEntity.ok(
                    new BaseResponse("Thêm danh sách học vấn thành công", HttpStatus.OK.value(), null)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "get list candidate follow", description = "", tags = {})
    @GetMapping("/getCandidatesFollow")
    public ResponseEntity<BaseResponse> getCandidatesFollow(@RequestHeader("Authorization") String token, Pageable pageable) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép!", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );
            Optional<Employer> employer = employerService.findByUserEmail(optionalUser.get().getEmail());
            if (employer.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy nhà tuyển dụng!", HttpStatus.NOT_FOUND.value(), null)
                );
            }

            Page<Candidate> candidates = candidateService.getCandidatesFollow(employer.get().getId(), pageable);

            return ResponseEntity.ok(
                    new BaseResponse("Danh sách ứng viên theo dõi", HttpStatus.OK.value(), candidates)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "follow candidate employer", description = "", tags = {})
    @PostMapping("/followCandidate_Employer/{id}")
    public ResponseEntity<BaseResponse> followCandidate_Employer(@RequestHeader("Authorization") String token, @PathVariable("id") String id) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép!", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<Employer> optionalEmployer = employerService.findByUserEmail(optionalUser.get().getEmail());
            if (optionalEmployer.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy nhà tuyển dụng!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
            Optional<Candidate> optionalCandidate = candidateService.findById(id);
            if (optionalCandidate.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy ứng viên!", HttpStatus.NOT_FOUND.value(), null)
                );
            }

            Employer employer = optionalEmployer.get();
            Candidate candidate = optionalCandidate.get();

            if (!candidateService.checkIsFollow_Employer_Candidate(employer.getId(), candidate.getId())) {
                candidateService.follow_Employer_Candidate(employer.getId(), candidate.getId());
                return ResponseEntity.ok(
                        new BaseResponse("Lưu ứng viên thành công", HttpStatus.OK.value(), false)
                );
            }

            return ResponseEntity.ok(
                    new BaseResponse("Bạn đã lưu ứng viên này trước đó!", HttpStatus.BAD_REQUEST.value(), true)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn!", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "unfollow candidate employer", description = "", tags = {})
    @DeleteMapping("/unfollowCandidate_Employer/{id}")
    public ResponseEntity<BaseResponse> unfollowCandidate_Employer(@RequestHeader("Authorization") String token, @PathVariable("id") String id) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép!", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<Employer> optionalEmployer = employerService.findByUserEmail(optionalUser.get().getEmail());
            if (optionalEmployer.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy nhà tuyển dụng!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
            Optional<Candidate> optionalCandidate = candidateService.findById(id);
            if (optionalCandidate.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy ứng viên!", HttpStatus.NOT_FOUND.value(), null)
                );
            }

            Employer employer = optionalEmployer.get();
            Candidate candidate = optionalCandidate.get();

            if (candidateService.checkIsFollow_Employer_Candidate(employer.getId(), candidate.getId())) {
                candidateService.unfollow_Employer_Candidate(employer.getId(), candidate.getId());
                return ResponseEntity.ok(
                        new BaseResponse("Bỏ lưu ứng viên thành công", HttpStatus.OK.value(), false)
                );
            }

            return ResponseEntity.ok(
                    new BaseResponse("Bạn chưa lưu ứng viên này trước đó!", HttpStatus.BAD_REQUEST.value(), true)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn!", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "get list candidates saved for employer", description = "", tags = {})
    @GetMapping("/getCandidatesSaved_Employer")
    public ResponseEntity<BaseResponse> getCandidatesSaved_Employer(@RequestHeader("Authorization") String token, Pageable pageable) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép!", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );
            Optional<Employer> employer = employerService.findByUserEmail(optionalUser.get().getEmail());
            if (employer.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy nhà tuyển dụng!", HttpStatus.NOT_FOUND.value(), null)
                );
            }

            Page<Candidate> candidates = candidateService.getCandidatesSaved_Employer(employer.get().getId(), pageable);
            Page<CandidateDetailResponse> responses = candidates.map(candidate -> {
                List<Education> educationList = educationService.findByCandidateId(candidate.getId(), Pageable.unpaged()).stream().toList();
                List<EducationResponse> educationResponses = educationList.stream()
                        .map(education -> new EducationResponse(
                                education.getId(),
                                education.getCreated(),
                                education.getUpdated(),
                                education.getFromDate(),
                                education.getToDate(),
                                education.getEducation(),
                                education.getSequence(),
                                education.getDescription(),
                                education.getCandidate().getId()
                        ))
                        .toList();

                List<Experience> experiences = experienceService.findByCandidateId(candidate.getId(), Pageable.unpaged()).stream().toList();

                List<ExperienceResponse> experienceResponses = experiences.stream()
                        .map(experience -> new ExperienceResponse(
                                experience.getId(),
                                experience.getCreated(),
                                experience.getUpdated(),
                                experience.getFromDate(),
                                experience.getToDate(),
                                experience.getExperience(),
                                experience.getSequence(),
                                experience.getDescription(),
                                experience.getCandidate().getId()
                        ))
                        .collect(Collectors.toList());


                List<Skill> skills = skillService.findByCandidateId(candidate.getId(), Pageable.unpaged()).stream().toList();

                List<SkillResponse> skillResponses = skills.stream()
                        .map(s -> new SkillResponse(
                                s.getId(),
                                s.getCreated(),
                                s.getUpdated(),
                                s.getSkill(),
                                s.getSequence(),
                                s.getDescription(),
                                s.getCandidate().getId()
                        ))
                        .collect(Collectors.toList());

                Map<String, Object> response = new HashMap<>();
                response.put("skills", skillResponses);
                response.put("experiences", experienceResponses);
                response.put("educations", educationResponses);
                return new CandidateDetailResponse(
                        candidate.getId(),
                        candidate.getFirstName(),
                        candidate.getLastName(),
                        candidate.getPhoneNumber(),
                        candidate.getSex(),
                        candidate.getAvatar(),
                        candidate.getDateOfBirth(),
                        candidate.getIntroduction(),
                        candidate.getJob(),
                        candidate.getLink(),
                        candidate.getCV(),
                        candidate.getUser().getEmail(),
                        candidate.getUser().getId(),
                        candidate.getAddress(),
                        true,
                        response);
            });

            return ResponseEntity.ok(
                    new BaseResponse("Danh sách ứng viên đã lưu", HttpStatus.OK.value(), responses)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "follow candidate hr", description = "", tags = {})
    @PostMapping("/followCandidate_HR/{id}")
    public ResponseEntity<BaseResponse> followCandidate_HR(@RequestHeader("Authorization") String token, @PathVariable("id") String id) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép!", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<HumanResource> optionalHumanResource = humanResourceService.findByEmail(optionalUser.get().getEmail());
            if (optionalHumanResource.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy tài khoản nhân sự!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
            Optional<Candidate> optionalCandidate = candidateService.findById(id);
            if (optionalCandidate.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy ứng viên!", HttpStatus.NOT_FOUND.value(), null)
                );
            }

            HumanResource humanResource = optionalHumanResource.get();
            Candidate candidate = optionalCandidate.get();

            if (!candidateService.checkIsFollow_HR_Candidate(humanResource.getId(), candidate.getId())) {
                candidateService.follow_HR_Candidate(humanResource.getId(), candidate.getId());
                return ResponseEntity.ok(
                        new BaseResponse("Lưu ứng viên thành công", HttpStatus.OK.value(), false)
                );
            }

            return ResponseEntity.ok(
                    new BaseResponse("Bạn đã lưu ứng viên này trước đó!", HttpStatus.BAD_REQUEST.value(), true)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn!", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "unfollow candidate HR", description = "", tags = {})
    @DeleteMapping("/unfollowCandidate_HR/{id}")
    public ResponseEntity<BaseResponse> unfollowCandidate_HR(@RequestHeader("Authorization") String token, @PathVariable("id") String id) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép!", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<HumanResource> optionalHumanResource = humanResourceService.findByEmail(optionalUser.get().getEmail());
            if (optionalHumanResource.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy tài khoản nhân sự!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
            Optional<Candidate> optionalCandidate = candidateService.findById(id);
            if (optionalCandidate.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy ứng viên!", HttpStatus.NOT_FOUND.value(), null)
                );
            }


            HumanResource humanResource = optionalHumanResource.get();
            Candidate candidate = optionalCandidate.get();

            if (candidateService.checkIsFollow_HR_Candidate(humanResource.getId(), candidate.getId())) {
                candidateService.unfollow_HR_Candidate(humanResource.getId(), candidate.getId());
                return ResponseEntity.ok(
                        new BaseResponse("Bỏ ứng viên thành công", HttpStatus.OK.value(), false)
                );
            }

            return ResponseEntity.ok(
                    new BaseResponse("Bạn chưa lưu ứng viên này trước đó!", HttpStatus.BAD_REQUEST.value(), true)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn!", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "get list candidates saved for HR", description = "", tags = {})
    @GetMapping("/getCandidatesSaved_HR")
    public ResponseEntity<BaseResponse> getCandidatesSaved_HR(@RequestHeader("Authorization") String token, Pageable pageable) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép!", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<HumanResource> optionalHumanResource = humanResourceService.findByEmail(optionalUser.get().getEmail());
            if (optionalHumanResource.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy tài khoản nhân sự!", HttpStatus.NOT_FOUND.value(), null)
                );
            }

            Page<Candidate> candidates = candidateService.getCandidatesSaved_HR(optionalHumanResource.get().getId(), pageable);
            Page<CandidateDetailResponse> responses = candidates.map(candidate -> {
                List<Education> educationList = educationService.findByCandidateId(candidate.getId(), Pageable.unpaged()).stream().toList();
                List<EducationResponse> educationResponses = educationList.stream()
                        .map(education -> new EducationResponse(
                                education.getId(),
                                education.getCreated(),
                                education.getUpdated(),
                                education.getFromDate(),
                                education.getToDate(),
                                education.getEducation(),
                                education.getSequence(),
                                education.getDescription(),
                                education.getCandidate().getId()
                        ))
                        .toList();

                List<Experience> experiences = experienceService.findByCandidateId(candidate.getId(), Pageable.unpaged()).stream().toList();

                List<ExperienceResponse> experienceResponses = experiences.stream()
                        .map(experience -> new ExperienceResponse(
                                experience.getId(),
                                experience.getCreated(),
                                experience.getUpdated(),
                                experience.getFromDate(),
                                experience.getToDate(),
                                experience.getExperience(),
                                experience.getSequence(),
                                experience.getDescription(),
                                experience.getCandidate().getId()
                        ))
                        .collect(Collectors.toList());


                List<Skill> skills = skillService.findByCandidateId(candidate.getId(), Pageable.unpaged()).stream().toList();

                List<SkillResponse> skillResponses = skills.stream()
                        .map(s -> new SkillResponse(
                                s.getId(),
                                s.getCreated(),
                                s.getUpdated(),
                                s.getSkill(),
                                s.getSequence(),
                                s.getDescription(),
                                s.getCandidate().getId()
                        ))
                        .collect(Collectors.toList());

                Map<String, Object> response = new HashMap<>();
                response.put("skills", skillResponses);
                response.put("experiences", experienceResponses);
                response.put("educations", educationResponses);
                return new CandidateDetailResponse(
                        candidate.getId(),
                        candidate.getFirstName(),
                        candidate.getLastName(),
                        candidate.getPhoneNumber(),
                        candidate.getSex(),
                        candidate.getAvatar(),
                        candidate.getDateOfBirth(),
                        candidate.getIntroduction(),
                        candidate.getJob(),
                        candidate.getLink(),
                        candidate.getCV(),
                        candidate.getUser().getEmail(),
                        candidate.getUser().getId(),
                        candidate.getAddress(),
                        true,
                        response);
            });

            return ResponseEntity.ok(
                    new BaseResponse("Danh sách ứng viên đã lưu", HttpStatus.OK.value(), responses)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
}
