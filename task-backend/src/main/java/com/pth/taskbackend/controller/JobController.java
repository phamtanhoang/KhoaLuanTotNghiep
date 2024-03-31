package com.pth.taskbackend.controller;
import com.pth.taskbackend.dto.request.CreateJobRequest;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.model.meta.Job;
import com.pth.taskbackend.repository.CategoryRepository;
import com.pth.taskbackend.service.CategoryService;
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
@Tag(name = "Jobs", description = "Job APIs")
@SecurityRequirement(name = "javainuseapi")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = {BASE_URL + "/jobs"})
public class JobController {

    @Autowired
    private JobService jobService;

    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getJobById(@PathVariable String id) {
        try {
            Optional<Job> optionalJob = jobService.findJobById(id);
            if (optionalJob.isPresent()) {
                return ResponseEntity.ok(
                        new BaseResponse("Công việc được tìm thấy", HttpStatus.OK.value(), optionalJob.get())
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy công việc", HttpStatus.NOT_FOUND.value(), null)
                );
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get list", description = "", tags = {})
    @GetMapping("")
    public ResponseEntity<BaseResponse> getJobs(@RequestParam(required = false) String keyword,
                                                @RequestParam(required = false) String address,
                                                @RequestParam(required = false) String fromSalary,
                                                @RequestParam(required = false) String toSalary,
                                                @RequestParam(required = false) String categoryId,

                                                Pageable pageable) {
        try {
            System.out.println(keyword+"");
            Page<Job> jobs = jobService.searchJobs(keyword, address, fromSalary, toSalary, categoryId , pageable);
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




//    @Operation(summary = "Get by name containing", description = "", tags = {})
//    @PreAuthorize("hasAnyRole('EMPLOYER','ADMIN')")
//    @GetMapping("/name={categoryName}")
//    public ResponseEntity<BaseResponse> getCategoryByNameContaining(@PathVariable String categoryName, Pageable pageable) {
//        try {
//            Page<Category> categories = categoryRepository.findByNameContaining(categoryName, pageable);
//            if (categories.isEmpty()) {
//                return ResponseEntity.ok(
//                        new BaseResponse("Không tìm thấy danh mục nào!", HttpStatus.NOT_FOUND.value(), null)
//                );
//            } else {
//                return ResponseEntity.ok(
//                        new BaseResponse("Danh sách danh mục được tìm thấy", HttpStatus.OK.value(), categories)
//                );
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
//        }
//    }
//
@Operation(summary = "Create", description = "", tags = {})
@PostMapping("/create")
public ResponseEntity<BaseResponse> createJob(@RequestBody CreateJobRequest request) throws IOException {
    String name = request.getName();
    String description = request.getDescription();
    LocalDateTime toDate = request.getToDate();
    String address = request.getAddress();
    String fromSalary = request.getFromSalary();
    String toSalary = request.getToSalary();
    String experience = request.getExperience();
    LocalDateTime created = LocalDateTime.now();

    try {
        if(name==null)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Không thể tạo công việc", HttpStatus.INTERNAL_SERVER_ERROR.value(), null));

        Job createdJob = jobService.createJob(name, description, created, toDate, address, EStatus.PENDING, fromSalary, toSalary, experience, "");

            return ResponseEntity.ok().body(new BaseResponse("Tạo công việc thành công", HttpStatus.OK.value(), createdJob));

    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
    }
}


//    @Operation(summary = "update", description = "", tags = {})
//    @PatchMapping("/{id}")
//    public ResponseEntity<BaseResponse> updateCategory(@PathVariable("id") String id, @RequestParam(required = false) String name,
//                                                       @RequestParam(required = false) MultipartFile image) {
//        try {
//            Optional<Job> optionalJob = jobService.findJobById(id);
//            if (!optionalJob.isPresent()) {
//                return ResponseEntity.ok(
//                        new BaseResponse("Không tìm thấy danh mục để cập nhật!", HttpStatus.NOT_FOUND.value(), null)
//                );
//            }
//
//            if (image != null) {
//                if (!ImageFunc.isImageFile(image)) {
//                    return ResponseEntity.ok(
//                            new BaseResponse("Vui lòng chọn hình ảnh!", HttpStatus.BAD_REQUEST.value(), null)
//                    );
//                }
//            }
//
//            Category category = categoryService.updateCategory(optionalCategory.get(), image, name);
//
//            return ResponseEntity.ok(
//                    new BaseResponse("Cập nhật danh mục thành công", HttpStatus.OK.value(), category)
//            );
//        } catch (DataIntegrityViolationException e) {
//            return ResponseEntity.ok(
//                    new BaseResponse("Tên danh mục đã tồn tại!", HttpStatus.BAD_REQUEST.value(), null)
//            );
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
//        }
//    }
//
//    @Operation(summary = "delete", description = "", tags = {})
//    @DeleteMapping("/{id}")
//    public ResponseEntity<BaseResponse> deleteCategory(@PathVariable("id") Long id) {
//        try {
//            categoryRepository.deleteById(id);
//            return ResponseEntity.ok(new BaseResponse("Xóa danh mục thành công", HttpStatus.OK.value(), null));
//        } catch (EmptyResultDataAccessException e) {
//            return ResponseEntity.ok(new BaseResponse("Không tìm thấy danh mục cần xóa!", HttpStatus.NOT_FOUND.value(), null));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
//        }
//    }

}
