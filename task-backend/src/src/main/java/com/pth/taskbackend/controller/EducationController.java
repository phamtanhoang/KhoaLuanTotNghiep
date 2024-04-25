package com.pth.taskbackend.controller;
import com.pth.taskbackend.dto.request.EducationRequest;
import com.pth.taskbackend.dto.request.ExperienceRequest;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.*;
import com.pth.taskbackend.repository.CategoryRepository;
import com.pth.taskbackend.repository.JobRepository;
import com.pth.taskbackend.service.*;
import com.pth.taskbackend.util.func.ImageFunc;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.pth.taskbackend.util.constant.PathConstant.BASE_URL;

@CrossOrigin(origins = "*")
@Tag(name = "Educations", description = "Educations APIs")
@SecurityRequirement(name = "javainuseapi")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = {BASE_URL + "/educations"})
public class EducationController {

    @Autowired
    EducationService educationService;
    @Autowired
    CandidateService candidateService;

    @Operation(summary = "Create", description = "", tags = {})
    @PostMapping("/save")
    public ResponseEntity<BaseResponse> saveEducations(@RequestBody EducationRequest request) throws IOException {
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

    @Operation(summary = "Get list", description = "", tags = {})
    @GetMapping("")
    public ResponseEntity<BaseResponse> getEducations(@RequestParam String candidateId, Pageable pageable) {
        try {
            Page<Education> educations = educationService.findByCandidateId(candidateId, pageable);
            if (educations.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách học vấn của ứng viên rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách học vấn ", HttpStatus.OK.value(), educations)
                );
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
}






