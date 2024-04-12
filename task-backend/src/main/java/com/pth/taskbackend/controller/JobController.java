package com.pth.taskbackend.controller;
import com.pth.taskbackend.dto.request.JobRequest;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.dto.response.JobResponse;
import com.pth.taskbackend.dto.response.StepResponse;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.model.meta.HumanResource;
import com.pth.taskbackend.model.meta.Job;
import com.pth.taskbackend.model.meta.User;
import com.pth.taskbackend.repository.JobRepository;
import com.pth.taskbackend.repository.UserRepository;
import com.pth.taskbackend.security.JwtService;
import com.pth.taskbackend.service.CategoryService;
import com.pth.taskbackend.service.HumanResourceService;
import com.pth.taskbackend.service.JobService;
import com.pth.taskbackend.util.func.CheckPermission;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    @Autowired
    JwtService jwtService;
    @Autowired
    CheckPermission checkPermission;

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
                        new BaseResponse("Danh sách công việc rỗng", HttpStatus.NOT_FOUND.value(), null)
                );
            } else {
                List<JobResponse> jobResponses = jobs.getContent().stream().map(job -> {
                    List<StepResponse> stepResponses;
                    if (job.getProcess() != null) {
                        stepResponses = job.getProcess().getSteps().stream()
                                .map(step -> new StepResponse(
                                        step.getId(),
                                        step.getName(),
                                        step.getNumber(),
                                        step.getProcess() != null ? step.getProcess().getId() : null
                                ))
                                .collect(Collectors.toList());
                    } else {
                        stepResponses = Collections.emptyList();
                    }

                    return new JobResponse(
                            job.getId(),
                            job.getCreated(),
                            job.getUpdated(),
                            job.getToDate(),
                            job.getName(),
                            job.getDescription(),
                            job.getExperience(),
                            job.getFromSalary(),
                            job.getToSalary(),
                            job.getLocation(),
                            job.getStatus(),
                            job.getCategory().getId(),
                            job.getCategory().getName(),
                            job.getHumanResource().getId(),
                            job.getHumanResource().getFirstName() + " " + job.getHumanResource().getLastName(),
                            job.getHumanResource().getEmployer().getName(),
                            job.getHumanResource().getEmployer().getId(),
                            job.getHumanResource().getEmployer().getUser().getEmail(),
                            job.getProcess() != null ? job.getProcess().getId() : null,
                            stepResponses
                    );
                }).collect(Collectors.toList());

                Page<JobResponse> jobResponsePage = new PageImpl<>(jobResponses, jobs.getPageable(), jobs.getTotalElements());
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách công việc", HttpStatus.OK.value(), jobResponsePage)
                );

            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }

    }

//    @Operation(summary = "Get list", description = "", tags = {})
//    @GetMapping("/getJobs-hr")
//    public ResponseEntity<BaseResponse> getJobsByHR(@RequestHeader("Authorization")String token,@RequestParam(required = false) String keyword,
//                                                Pageable pageable) {
//        try {
//            String email = jwtService.extractUsername(token.substring(7));
//            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
//            if (!permission)
//                return ResponseEntity.ok(
//                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
//                );
//
//            Optional<User> optionalUser = userRepository.findByEmail(email);
//            if (optionalUser.isEmpty())
//                return ResponseEntity.ok(
//                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
//                );
//
//            if(status==EStatus.DELETED)
//                return ResponseEntity.ok(
//                        new BaseResponse("Không được sử dụng trạng thái này", HttpStatus.BAD_REQUEST.value(), null)
//                );
//            Page<Job> jobs = jobService.searchJobs(keyword, location, fromSalary, toSalary, categoryId, pageable);
//
//            if (jobs.isEmpty()) {
//                return ResponseEntity.ok(
//                        new BaseResponse("Danh sách công việc rỗng", HttpStatus.NOT_FOUND.value(), null)
//                );
//            } else {
//                List<JobResponse> jobResponses = jobs.getContent().stream().map(job -> {
//                    List<StepResponse> stepResponses;
//                    if (job.getProcess() != null) {
//                        stepResponses = job.getProcess().getSteps().stream()
//                                .map(step -> new StepResponse(
//                                        step.getId(),
//                                        step.getName(),
//                                        step.getNumber(),
//                                        step.getProcess() != null ? step.getProcess().getId() : null
//                                ))
//                                .collect(Collectors.toList());
//                    } else {
//                        stepResponses = Collections.emptyList();
//                    }
//
//                    return new JobResponse(
//                            job.getId(),
//                            job.getCreated(),
//                            job.getUpdated(),
//                            job.getToDate(),
//                            job.getName(),
//                            job.getDescription(),
//                            job.getExperience(),
//                            job.getFromSalary(),
//                            job.getToSalary(),
//                            job.getLocation(),
//                            job.getStatus(),
//                            job.getCategory().getId(),
//                            job.getCategory().getName(),
//                            job.getHumanResource().getId(),
//                            job.getHumanResource().getFirstName() + " " + job.getHumanResource().getLastName(),
//                            job.getHumanResource().getEmployer().getName(),
//                            job.getHumanResource().getEmployer().getId(),
//                            job.getHumanResource().getEmployer().getUser().getEmail(),
//                            job.getProcess() != null ? job.getProcess().getId() : null,
//                            stepResponses
//                    );
//                }).collect(Collectors.toList());
//
//                Page<JobResponse> jobResponsePage = new PageImpl<>(jobResponses, jobs.getPageable(), jobs.getTotalElements());
//                return ResponseEntity.ok(
//                        new BaseResponse("Danh sách công việc", HttpStatus.OK.value(), jobResponsePage)
//                );
//
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
//        }
//
//    }

    @Operation(summary = "Create", description = "", tags = {})
    @PostMapping("/create")
    public ResponseEntity<BaseResponse> createJob(@RequestHeader("Authorization")String token, @RequestBody JobRequest request) throws IOException {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<HumanResource> optionalHumanResource = humanResourceService.findByEmail(email);
            if (optionalHumanResource.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy HR ", HttpStatus.NOT_FOUND.value(), null)
                );


            Optional<Category> existedCategory = categoryService.findById(request.categoryId());
            if (existedCategory.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new BaseResponse("Danh mục không hợp lệ", HttpStatus.BAD_REQUEST.value(), null));
            }
            Job job = new Job();
            job.setName(request.name());
            job.setStatus(EStatus.PENDING);
            job.setExperience(request.experience());
            job.setDescription(request.description());
            job.setCategory(existedCategory.get());
            job.setFromSalary(request.fromSalary());
            job.setToSalary(request.toSalary());
            job.setToDate(request.toDate());
            job.setLocation(request.location());
            job.setHumanResource(optionalHumanResource.get());

            job.setTags(request.tags());
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
    public ResponseEntity<BaseResponse> updateJob(@RequestHeader("Authorization")String token,@PathVariable("id") String id, @RequestBody JobRequest request) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<HumanResource> optionalHumanResource = humanResourceService.findByEmail(email);
            if (optionalHumanResource.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy HR ", HttpStatus.NOT_FOUND.value(), null)
                );

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
            job.setHumanResource(optionalHumanResource.get());

            if (request.categoryId() != null) {
                Optional<Category> optionalCategory = categoryService.findById(request.categoryId());
                if (optionalCategory.isPresent()) {
                    job.setCategory(optionalCategory.get());
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(new BaseResponse("Danh mục không hợp lệ", HttpStatus.BAD_REQUEST.value(), null));
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
    public ResponseEntity<BaseResponse> deleteJob(@RequestHeader("Authorization")String token, @PathVariable("id") String id) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<HumanResource> optionalHumanResource = humanResourceService.findByEmail(email);
            if (optionalHumanResource.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy HR ", HttpStatus.NOT_FOUND.value(), null)
                );

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






