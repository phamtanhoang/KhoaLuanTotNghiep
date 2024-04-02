package com.pth.taskbackend.controller;
import com.pth.taskbackend.dto.request.CreateJobRequest;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.model.meta.HumanResource;
import com.pth.taskbackend.model.meta.Job;
import com.pth.taskbackend.repository.CategoryRepository;
import com.pth.taskbackend.repository.JobRepository;
import com.pth.taskbackend.service.CategoryService;
import com.pth.taskbackend.service.HumanResourceService;
import com.pth.taskbackend.service.JobService;
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

import static com.pth.taskbackend.util.constant.PathConstant.BASE_URL;

@CrossOrigin(origins = "*")
@Tag(name = "Jobs", description = "Jobs APIs")
@SecurityRequirement(name = "javainuseapi")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = {BASE_URL + "/jobs"})
public class JobController {

    @Autowired
    JobService jobService;
    @Autowired
    JobRepository jobRepository;
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    HumanResourceService humanResourceService;

    @Operation(summary = "Create", description = "", tags = {})
    @PostMapping("/create")
    public ResponseEntity<BaseResponse> createJob(@RequestBody CreateJobRequest request) throws IOException {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated()) {
                String username = authentication.getName();
                Optional<Category> existedCategory = categoryRepository.findById(request.getCategoryId());
                Optional<HumanResource> existedHumanResource = humanResourceService.findByEmail(username);
                String name = request.getName();
                String description = request.getDescription();
                String location = request.getLocation();
                String fromSalary = request.getFromSalary();
                String toSalary = request.getToSalary();
                LocalDateTime toDate = request.getToDate();
                String experience = request.getExperience();

                System.out.println(existedHumanResource.get().getFirstName());
                Job job = jobService.create(name, description, LocalDateTime.now(), toDate, location, EStatus.PENDING, fromSalary, toSalary, experience, existedCategory.get(), null
                );
                return ResponseEntity.ok(
                        new BaseResponse("Tạo danh mục thành công", HttpStatus.OK.value(), job)
                );
            } else return ResponseEntity.ok(
                    new BaseResponse("Bạn phải đăng nhập ", HttpStatus.FORBIDDEN.value(), null)
            );

        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.ok(
                    new BaseResponse("Tên danh mục đã tồn tại", HttpStatus.BAD_REQUEST.value(), null)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get list", description = "", tags = {})
    @GetMapping("")
    public ResponseEntity<BaseResponse> getJobs(@RequestParam(required = false) String keyword,
                                                @RequestParam(required = false) String location,
                                                @RequestParam(required = false) String fromSalary,
                                                @RequestParam(required = false) String toSalary,
                                                @RequestParam(required = false) String categoryId,
                                                Pageable pageable) {
        try {
            Page<Job> jobs = jobService.searchJobs(keyword, location, fromSalary, toSalary, categoryId, pageable);
            if (jobs.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc", HttpStatus.OK.value(), jobs)
                );
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
}






