package com.pth.taskbackend.controller;
import com.pth.taskbackend.dto.request.CreateJobRequest;
import com.pth.taskbackend.dto.request.SkillRequest;
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
@Tag(name = "Skills", description = "Skills APIs")
@SecurityRequirement(name = "javainuseapi")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = {BASE_URL + "/skills"})
public class SkillController {

    @Autowired
    SkillService skillService;
    @Autowired
    CandidateService candidateService;

    @Operation(summary = "Create", description = "", tags = {})
    @PostMapping("/save")
    public ResponseEntity<BaseResponse> saveSkills(@RequestBody SkillRequest request) throws IOException {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null && !authentication.isAuthenticated())
                return ResponseEntity.ok(
                        new BaseResponse("xác thực không hợp lệ", HttpStatus.FORBIDDEN.value(), null)
                );

            String email = authentication.getName();
            System.out.println(email);
            Optional<Candidate> optionalCandidate = candidateService.findByUserEmail(email);
            if (!optionalCandidate.isPresent())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy ứng viên tương ứng", HttpStatus.NOT_FOUND.value(), null)
                );
            List<Skill>skillList = request.skills();
            for (Skill skill : skillList) {
                if (skill.getId() == null)
                    skill.setId(UUID.randomUUID().toString());
                skill.setCandidate(optionalCandidate.get());
            }
            skillService.save(skillList);

            return ResponseEntity.ok(
                    new BaseResponse( "Thêm danh sách kỹ năng thành công", HttpStatus.OK.value(),skillList)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get list", description = "", tags = {})
    @GetMapping("")
    public ResponseEntity<BaseResponse> getSkills(@RequestParam String candidateId, Pageable pageable) {
        try {
            Page<Skill> skills = skillService.findByCandidateId(candidateId, pageable);
            if (skills.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách kỹ năng của ứng viên rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách kỹ năng ", HttpStatus.OK.value(), skills)
                );
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
}






