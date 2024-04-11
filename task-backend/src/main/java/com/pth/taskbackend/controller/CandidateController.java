package com.pth.taskbackend.controller;
import com.pth.taskbackend.dto.request.UpdateCandidateRequest;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.dto.response.CandidateResponse;
import com.pth.taskbackend.dto.response.EmployerResponse;
import com.pth.taskbackend.dto.response.GetCandidateProfileResponse;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Candidate;
import com.pth.taskbackend.model.meta.User;
import com.pth.taskbackend.repository.UserRepository;
import com.pth.taskbackend.security.JwtService;
import com.pth.taskbackend.service.CandidateService;
import com.pth.taskbackend.util.func.CheckPermission;
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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

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
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "update status", description = "", tags = {})
    @PatchMapping("/{id}")
    public ResponseEntity<BaseResponse> updateCandidate(@RequestHeader("Authorization")String token, @PathVariable("id") String id,@RequestParam EStatus status) {
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
                        new BaseResponse("Không tìm thấy ứng viên tương ứng", HttpStatus.NOT_FOUND.value(), null)
                );
            if(status==EStatus.DELETED)
                return ResponseEntity.ok(
                        new BaseResponse("Không được xóa", HttpStatus.NOT_FOUND.value(), null)
                );
            User candidate = optionalCandidate.get();
            candidate.setStatus(status);
            userRepository.save(candidate);
            return ResponseEntity.ok(new BaseResponse("Cập nhật ứng viên thành công", HttpStatus.OK.value(), null));
        } catch (EmptyResultDataAccessException e) {
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

            candidateService.deleteById(id);
            return ResponseEntity.ok(new BaseResponse("Xóa ứng viên thành công", HttpStatus.OK.value(), null));
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.ok(new BaseResponse("Không tìm thấy ứng viên cần xóa!", HttpStatus.NOT_FOUND.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getCandidateById(@PathVariable String id) {
        try {
            Optional<Candidate> candidate = candidateService.findById(id);
            if (candidate.isPresent()) {
                return ResponseEntity.ok(
                        new BaseResponse( "ứng viên được tìm thấy", HttpStatus.OK.value(), candidate.get())
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy ứng viên", HttpStatus.NOT_FOUND.value(), null)
                );
            }
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
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/profile")
    public ResponseEntity<BaseResponse> getCandidateProfile() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null && !authentication.isAuthenticated())
                return ResponseEntity.ok(
                        new BaseResponse("xác thực khng hợp lệ", HttpStatus.FORBIDDEN.value(), null)
                );

            String email = authentication.getName();
            Optional<Candidate> optionalCandidate = candidateService.findByUserEmail(email);
            if (optionalCandidate.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy ứng viên tương ứng", HttpStatus.NOT_FOUND.value(), null)
                );

                Candidate candidate = optionalCandidate.get();
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
                        candidate.getAvatar());

                return ResponseEntity.ok(
                        new BaseResponse( "Hiện thông tin ứng viên", HttpStatus.OK.value(), profile)
                );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
//    @Operation(summary = "Get by id", description = "", tags = {})
//    @PatchMapping("/{id}")
//    public ResponseEntity<BaseResponse> updateCandidateProfile(UpdateCandidateRequest request) {
//        try {
//            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//
//            if (authentication == null && !authentication.isAuthenticated())
//                return ResponseEntity.ok(
//                        new BaseResponse("xác thực khng hợp lệ", HttpStatus.FORBIDDEN.value(), null)
//                );
//
//            String email = authentication.getName();
//            Optional<Candidate> optionalCandidate = candidateService.findByUserEmail(email);
//            if (optionalCandidate.isEmpty())
//                return ResponseEntity.ok(
//                        new BaseResponse("Không tìm thấy ứng viên tương ứng", HttpStatus.NOT_FOUND.value(), null)
//                );
//
//            Candidate update = optionalCandidate.get();
//            update.setFirstName(request.firstName());
//            update.setLastName(request.lastName());
//            update.setAddress(request.address());
//            update.setPhoneNumber(request.phoneNumber());
//            update.setDateOfBirth(request.dateOfBirth());
//            update.setLink(request.link());
//            update.setJob(request.job());
//            update.setIntroduction(request.introduction());
//
//            candidateService.update(update);
//            return ResponseEntity.ok(
//                    new BaseResponse( "Cập nhật thông tin ứng viên thành công", HttpStatus.OK.value(), update)
//            );
//
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
//        }
//    }

//    @Operation(summary = "Get by id", description = "", tags = {})
//    @PostMapping("/updateAvatar")
//    public ResponseEntity<BaseResponse> updateCandidateProfile(@RequestPart MultipartFile avatar) {
//        try {
//            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//
//            if (authentication == null && !authentication.isAuthenticated())
//                return ResponseEntity.ok(
//                        new BaseResponse("xác thực không hợp lệ", HttpStatus.FORBIDDEN.value(), null)
//                );
//
//            String email = authentication.getName();
//            Optional<Candidate> optionalCandidate = candidateService.findByUserEmail(email);
//            if (optionalCandidate.isEmpty())
//                return ResponseEntity.ok(
//                        new BaseResponse("Không tìm thấy ứng viên tương ứng", HttpStatus.NOT_FOUND.value(), null)
//                );
//
//            Candidate update = optionalCandidate.get();
//            candidateService.updateAvatar(update,avatar);
//            return ResponseEntity.ok(
//                    new BaseResponse( "Cập nhật ảnh đại diện ứng viên thành công", HttpStatus.OK.value(), update)
//            );
//
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
//        }
//    }





}
