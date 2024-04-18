package com.pth.taskbackend.controller;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pth.taskbackend.dto.request.EducationRequest;
import com.pth.taskbackend.dto.request.ExperienceRequest;
import com.pth.taskbackend.dto.request.SkillRequest;
import com.pth.taskbackend.dto.request.UpdateCandidateRequest;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.dto.response.CandidateResponse;
import com.pth.taskbackend.dto.response.EmployerResponse;
import com.pth.taskbackend.dto.response.GetCandidateProfileResponse;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.ESex;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.*;
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
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

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
    @Autowired
    VipCandidateService vipCandidateService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    ExperienceService experienceService;
    @Autowired
    EducationService educationService;
    @Autowired
    SkillService skillService;
    @Operation(summary = "Get list", description = "", tags = {})
    @GetMapping("getCandidates-admin")
    public ResponseEntity<BaseResponse> getCandidatesByAdmin(@RequestHeader("Authorization") String token,@RequestParam(required = false)String keyword,@RequestParam(required = false)EStatus status, Pageable pageable) {
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

            Page<Candidate> candidates = candidateService.findByKeywordAndStatus(keyword,status,pageable);
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
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "update status", description = "", tags = {})
    @PatchMapping("/{id}")
    public ResponseEntity<BaseResponse> updateCandidate(@RequestHeader("Authorization")String token, @PathVariable("id") String id,@RequestBody String status) {
        try {
            Map<String, String> jsonMap = objectMapper.readValue(status, new TypeReference<Map<String, String>>() {});

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
            if(statusEnum==EStatus.DELETED)
                return ResponseEntity.ok(
                        new BaseResponse("Không được xóa", HttpStatus.NOT_FOUND.value(), null)
                );
            User candidate = optionalCandidate.get();
            switch (statusEnum)
            {
                case ACTIVE :
                    if(candidate.getStatus().equals(EStatus.ACTIVE))
                        return ResponseEntity.ok(
                                new BaseResponse("Đã duyệt ứng viên này rồi", HttpStatus.OK.value(), null)
                        );
                    candidate.setStatus(EStatus.ACTIVE);
                    userRepository.save(candidate);

                    return ResponseEntity.ok(
                            new BaseResponse("Duyệt ứng viên dụng thành công", HttpStatus.OK.value(), null)
                    );
                case INACTIVE:
                    if(candidate.getStatus().equals(EStatus.INACTIVE))
                        return ResponseEntity.ok(
                                new BaseResponse("Đã khóa ứng viên này rồi", HttpStatus.OK.value(), null)
                        );
                    candidate.setStatus(EStatus.INACTIVE);
                    userRepository.save(candidate);

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
        }catch (EmptyResultDataAccessException e) {
            return ResponseEntity.ok(new BaseResponse("Không tìm thấy ứng viên cần xóa!", HttpStatus.NOT_FOUND.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "delete", description = "", tags = {})
    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> deleteCandidate(@RequestHeader("Authorization")String token, @PathVariable("id") String id) {
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
        }catch (EmptyResultDataAccessException e) {
            return ResponseEntity.ok(new BaseResponse("Không tìm thấy ứng viên cần xóa!", HttpStatus.NOT_FOUND.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getCandidateByAdmin(@RequestHeader("Authorization")String token, @PathVariable() String id) {
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
                    candidate.getUser().getStatus(),
                    candidate.getUser().getEmail(),
                    candidate.getUser().getId());
            return ResponseEntity.ok(
                    new BaseResponse("Chi tiết ứng viên", HttpStatus.OK.value(), response)
            );
        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    @Operation(summary = "Get list", description = "", tags = {})
    @GetMapping("")
    public ResponseEntity<BaseResponse> getCandidates(@RequestHeader("Authorization") String token,@RequestParam(required = false)String keyword, Pageable pageable) {
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

            Page<Candidate> candidates = candidateService.findByKeywordAndStatus(keyword,EStatus.ACTIVE,pageable);
            if (candidates.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách ứng viên rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách ứng viên", HttpStatus.OK.value(), candidates)
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
    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/profile")
    public ResponseEntity<BaseResponse> getCandidateProfile(@RequestHeader("Authorization")String token) {
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
                boolean isVip = vipCandidateService.isVip(candidate.getId());
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
                        isVip);

                return ResponseEntity.ok(
                        new BaseResponse( "Hiện thông tin ứng viên", HttpStatus.OK.value(), profile)
                );

        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    @Operation(summary = "update by token", description = "", tags = {})
    @PatchMapping("/updateProfile/")
    public ResponseEntity<BaseResponse> updateCandidateProfile(@RequestHeader("Authorization")String token, @RequestBody UpdateCandidateRequest request
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
            System.out.println("Da vao day");
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
            if(!passwordEncoder.matches(request.password(), optionalCandidate.get().getUser().getPassword())&&!request.password().isEmpty())
                optionalCandidate.get().getUser().setPassword(passwordEncoder.encode(request.password()));
            candidateService.update(update );
            return ResponseEntity.ok(
                    new BaseResponse( "Cập nhật thông tin ứng viên thành công", HttpStatus.OK.value(), update)
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

    @Operation(summary = "Get by id", description = "", tags = {})
    @PatchMapping("/updateAvatar")
    public ResponseEntity<BaseResponse> updateCandidateAvatar(@RequestHeader("Authorization")String token,@RequestPart MultipartFile avatar) {
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
            if(avatar.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Vui lòng chọn ảnh đại diện", HttpStatus.BAD_REQUEST.value(), null)
                );
            Candidate update = optionalCandidate.get();
            candidateService.updateAvatar(update,avatar);
            return ResponseEntity.ok(
                    new BaseResponse( "Cập nhật ảnh đại diện ứng viên thành công", HttpStatus.OK.value(), update)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }




    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/extraProfile")
    public ResponseEntity<BaseResponse> getCandidateExtraProfile(@RequestHeader("Authorization")String token) {
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
            Map<String,Object>response= new HashMap<>();
            response.put("skills",candidate.getSkills());
            response.put("experiences",candidate.getExperiences());
            response.put("educations",candidate.getEducations());

            return ResponseEntity.ok(
                    new BaseResponse( "Hiện thông tin thêm của ứng viên", HttpStatus.OK.value(), response)
            );

        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Create", description = "", tags = {})
    @PostMapping("/saveExperiences")
    public ResponseEntity<BaseResponse> saveExperiences(@RequestHeader("Authorization")String token, @RequestBody ExperienceRequest request) throws IOException {
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
            experienceService.deleteAllByCandidateId(optionalCandidate.get().getId());
            List<Experience>experienceList = request.experiences();

            for (Experience experience : experienceList) {
                if (experience.getId() == null)
                    experience.setId(UUID.randomUUID().toString());
                experience.setCandidate(optionalCandidate.get());
            }
            experienceService.save(experienceList);

            return ResponseEntity.ok(
                    new BaseResponse( "Thêm danh sách kinh nghiệm thành công", HttpStatus.OK.value(),experienceList)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "Create", description = "", tags = {})
    @PostMapping("/saveSkills")
    public ResponseEntity<BaseResponse> saveSkills(@RequestHeader("Authorization")String token, @RequestBody SkillRequest request) throws IOException {
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
            skillService.deleteAllByCandidateId(optionalCandidate.get().getId());
            List<Skill>skills = request.skills();

            for (Skill skill : skills) {
                if (skill.getId() == null)
                    skill.setId(UUID.randomUUID().toString());
                skill.setCandidate(optionalCandidate.get());
            }
            skillService.save(skills);

            return ResponseEntity.ok(
                    new BaseResponse( "Thêm danh sách kỹ năng thành công", HttpStatus.OK.value(),skills)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Create", description = "", tags = {})
    @PostMapping("/saveEducations")
    public ResponseEntity<BaseResponse> saveEducations(@RequestHeader("Authorization")String token, @RequestBody EducationRequest request) throws IOException {
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
            educationService.deleteAllByCandidateId(optionalCandidate.get().getId());
            List<Education>educationList = request.educationList();

            for (Education education : educationList) {
                if (education.getId() == null)
                    education.setId(UUID.randomUUID().toString());
                education.setCandidate(optionalCandidate.get());
            }
            educationService.save(educationList);

            return ResponseEntity.ok(
                    new BaseResponse( "Thêm danh sách học vấn thành công", HttpStatus.OK.value(),educationList)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }





}
