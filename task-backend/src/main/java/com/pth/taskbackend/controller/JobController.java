package com.pth.taskbackend.controller;
import com.pth.taskbackend.dto.request.JobRequest;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.model.meta.HumanResource;
import com.pth.taskbackend.model.meta.Job;
import com.pth.taskbackend.repository.JobRepository;
import com.pth.taskbackend.service.CategoryService;
import com.pth.taskbackend.service.HumanResourceService;
import com.pth.taskbackend.service.JobService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
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
    CategoryService categoryService;
    @Autowired
    HumanResourceService humanResourceService;


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

    @Operation(summary = "Create", description = "", tags = {})
    @PostMapping("/create")
    public ResponseEntity<BaseResponse> createJob(@RequestBody JobRequest request) throws IOException {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new BaseResponse("Bạn phải đăng nhập", HttpStatus.UNAUTHORIZED.value(), null));
            }

            String username = authentication.getName();
            HumanResource humanResource=null;
            EStatus status = EStatus.ACTIVE;

            boolean hasHRAuthority = authentication.getAuthorities().stream()
                    .anyMatch(authority -> authority.getAuthority().equals("HR"));
            if (hasHRAuthority) {

                Optional<HumanResource> optionalHumanResource = humanResourceService.findByEmail(username);
                if (optionalHumanResource.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(new BaseResponse("Không tìm thấy HR", HttpStatus.NOT_FOUND.value(), null));
                }
                humanResource= optionalHumanResource.get();
                status =EStatus.PENDING;
            }


            Optional<Category> existedCategory = categoryService.findById(request.categoryId());
            if (existedCategory.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new BaseResponse("Danh mục không hợp lệ", HttpStatus.BAD_REQUEST.value(), null));
            }
            Job job = new Job();
            job.setName(request.name());
            job.setStatus(status);
            job.setExperience(request.experience());
            job.setDescription(request.description());
            job.setCategory(existedCategory.get());
            job.setFromSalary(request.fromSalary());
            job.setToSalary(request.toSalary());
            job.setToDate(request.toDate());
            job.setLocation(request.location());
            job.setHumanResource(humanResource);
            jobService.create(job);

            return ResponseEntity.ok(
                    new BaseResponse("Tạo công việc thành công", HttpStatus.OK.value(), job)
            );
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new BaseResponse("Tên công việc đã tồn tại", HttpStatus.BAD_REQUEST.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }



    @Operation(summary = "update", description = "", tags = {})
    @PatchMapping("/{id}")
    public ResponseEntity<BaseResponse> updateJob(@PathVariable("id") String id, @RequestBody JobRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new BaseResponse("Bạn phải đăng nhập", HttpStatus.UNAUTHORIZED.value(), null));
            }

            String username = authentication.getName();

            boolean hasHRAuthority = authentication.getAuthorities().stream()
                    .anyMatch(authority -> authority.getAuthority().equals("HR"));
            if (hasHRAuthority) {

                Optional<HumanResource> optionalHumanResource = humanResourceService.findByEmail(username);
                if (optionalHumanResource.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(new BaseResponse("Không tìm thấy HR", HttpStatus.NOT_FOUND.value(), null));
                }

            }


            Optional<Job> optionalJob = jobService.findById(id);
            if (optionalJob.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new BaseResponse("Không tìm thấy công việc", HttpStatus.NOT_FOUND.value(), null));
            }

            Job job = optionalJob.get();

            job.setName(request.name());
            job.setDescription(request.description());
            job.setLocation(request.location());
            job.setFromSalary(request.fromSalary());
            job.setToSalary(request.toSalary());
            job.setToDate(request.toDate());
            job.setExperience(request.experience());
            job.setHumanResource(humanResourceService.findByEmail(username).get());
            if (request.categoryId() != null) {
                Optional<Category> optionalCategory = categoryService.findById(request.categoryId());
                if (optionalCategory.isPresent()) {
                    job.setCategory(optionalCategory.get());
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(new BaseResponse("Danh mục không hợp lệ", HttpStatus.BAD_REQUEST.value(), null));
                }
            }
            if (request.humanResourceId() != null) {
                Optional<HumanResource> optionalHumanResource = humanResourceService.findById(request.humanResourceId());
                if (optionalHumanResource.isPresent()) {
                    job.setHumanResource(optionalHumanResource.get());
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(new BaseResponse("HR không hợp lệ", HttpStatus.BAD_REQUEST.value(), null));
                }
            }

         jobService.update(job);


            return ResponseEntity.ok(
                    new BaseResponse("Cập nhật công việc thành công", HttpStatus.OK.value(), job)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    @Operation(summary = "delete job", description = "", tags = {})
    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> deleteJob(@PathVariable("id") String id) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (!(authentication != null && authentication.isAuthenticated())) {
                return ResponseEntity.ok(
                        new BaseResponse("Bạn phải đăng nhập ", HttpStatus.FORBIDDEN.value(), null)
                );
            }

            boolean hasHRAuthority = authentication.getAuthorities().stream()
                    .anyMatch(authority -> authority.getAuthority().equals("HR"));

            if (!hasHRAuthority) {
                return ResponseEntity.ok(
                        new BaseResponse("Bạn không có quyền thực hiện thao tác này", HttpStatus.FORBIDDEN.value(), null)
                );
            }

            String username = authentication.getName();
            Optional<HumanResource> optionalHumanResource = humanResourceService.findByEmail(username);
            if (optionalHumanResource.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy hr", HttpStatus.OK.value(), null)
                );
            }

            HumanResource hr = optionalHumanResource.get();

            Optional<Job> optionalJob = jobService.findById(id);
            if (optionalJob.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy công việc", HttpStatus.NOT_FOUND.value(), null)
                );
            }

            Job job = optionalJob.get();


            if (!job.getHumanResource().getId().equals(hr.getId())) {
                return ResponseEntity.ok(
                        new BaseResponse("Bạn không có quyền xóa công việc này", HttpStatus.FORBIDDEN.value(), null)
                );
            }

            jobService.delete(job);

            return ResponseEntity.ok(
                    new BaseResponse("Xóa công việc thành công", HttpStatus.OK.value(), null)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

}






