package com.pth.taskbackend.controller;
import com.pth.taskbackend.dto.request.UpdateCandidateRequest;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.dto.response.GetCandidateProfileResponse;
import com.pth.taskbackend.model.meta.Candidate;
import com.pth.taskbackend.service.CandidateService;
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
    public ResponseEntity<BaseResponse> getCandidates(@RequestParam(required = false)String keyword, Pageable pageable) {
        try {
            Page<Candidate> candidates = candidateService.findByKeyword(keyword,pageable);
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
            if (!optionalCandidate.isPresent())
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
    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/update")
    public ResponseEntity<BaseResponse> updateCandidateProfile(UpdateCandidateRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null && !authentication.isAuthenticated())
                return ResponseEntity.ok(
                        new BaseResponse("xác thực khng hợp lệ", HttpStatus.FORBIDDEN.value(), null)
                );

            String email = authentication.getName();
            Optional<Candidate> optionalCandidate = candidateService.findByUserEmail(email);
            if (!optionalCandidate.isPresent())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy ứng viên tương ứng", HttpStatus.NOT_FOUND.value(), null)
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

            candidateService.update(update);
            return ResponseEntity.ok(
                    new BaseResponse( "Cập nhật thông tin ứng viên thành công", HttpStatus.OK.value(), update)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/updateAvatar")
    public ResponseEntity<BaseResponse> updateCandidateProfile(@RequestPart MultipartFile avatar) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null && !authentication.isAuthenticated())
                return ResponseEntity.ok(
                        new BaseResponse("xác thực không hợp lệ", HttpStatus.FORBIDDEN.value(), null)
                );

            String email = authentication.getName();
            Optional<Candidate> optionalCandidate = candidateService.findByUserEmail(email);
            if (!optionalCandidate.isPresent())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy ứng viên tương ứng", HttpStatus.NOT_FOUND.value(), null)
                );

            Candidate update = optionalCandidate.get();
            candidateService.updateAvatar(update,avatar);
            return ResponseEntity.ok(
                    new BaseResponse( "Cập nhật ảnh đại diện ứng viên thành công", HttpStatus.OK.value(), update)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    @Operation(summary = "delete", description = "", tags = {})
    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> deleteCandidate(@PathVariable("id") String id) {
        try {
            candidateService.deleteById(id);
            return ResponseEntity.ok(new BaseResponse("Xóa ứng viên thành công", HttpStatus.OK.value(), null));
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.ok(new BaseResponse("Không tìm thấy ứng viên cần xóa!", HttpStatus.NOT_FOUND.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

}
