package com.pth.taskbackend.controller;
import com.pth.taskbackend.dto.request.CreateEmployerRequest;
import com.pth.taskbackend.dto.request.UpdateCandidateRequest;
import com.pth.taskbackend.dto.request.UpdateEmployerRequest;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.dto.response.GetCandidateProfileResponse;
import com.pth.taskbackend.dto.response.GetEmployerProfileResponse;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.model.meta.Candidate;
import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.model.meta.Employer;
import com.pth.taskbackend.model.meta.User;
import com.pth.taskbackend.repository.UserRepository;
import com.pth.taskbackend.service.AuthService;
import com.pth.taskbackend.service.EmployerService;
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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

import static com.pth.taskbackend.util.constant.PathConstant.BASE_URL;

@CrossOrigin(origins = "*")
@Tag(name = "Employers", description = "Employer APIs")
@SecurityRequirement(name = "javainuseapi")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = {BASE_URL + "/employers"})
public class EmployerController {

    @Autowired
    private EmployerService employerService;
    @Autowired
    private AuthService authService;
    @Autowired
    private UserRepository userRepository;

    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getEmployerById(@PathVariable() String id) {
        try {
            Optional<Employer> employer = employerService.findById(id);
            if (employer.isPresent()) {
                return ResponseEntity.ok(
                        new BaseResponse("nhà tuyển dụng được tìm thấy", HttpStatus.OK.value(), employer.get())
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null)
                );
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get list", description = "", tags = {})
    @GetMapping("")
    public ResponseEntity<BaseResponse> getEmployers(@RequestParam(required = false) String keyword, Pageable pageable) {
        try {
            Page<Employer> employers = employerService.findByKeyword(keyword, pageable);
            if (employers.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách nhà tuyển dụng rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách nhà tuyển dụng", HttpStatus.OK.value(), employers)
                );
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Create", description = "", tags = {})
    @PostMapping
    public ResponseEntity<BaseResponse> createEmployer(@RequestBody CreateEmployerRequest createEmployerRequest,
                                                       @RequestParam("image") MultipartFile image,
                                                       @RequestParam("backgroundImage") MultipartFile backgroundImage) throws IOException {
        if (userRepository.findByEmail(createEmployerRequest.username()).isPresent()) {
            return ResponseEntity.ok(
                    new BaseResponse("Tên người dùng đã tồn tại!", 400, null)
            );
        };
        try {
            if (!(ImageFunc.isImageFile(image)||ImageFunc.isImageFile(backgroundImage))) {
                return ResponseEntity.ok(
                        new BaseResponse("Vui lòng chọn hình ảnh!", HttpStatus.BAD_REQUEST.value(), null)
                );
            }
            Optional<User> user = authService.register(
                    createEmployerRequest.username(),
                    createEmployerRequest.password(),
                    ERole.EMPLOYER);

            Employer employer = new Employer();
            employer.setName(createEmployerRequest.name());
            employer.setLocation(createEmployerRequest.location());
            employer.setDescription(createEmployerRequest.description());
            employer.setBusinessCode(createEmployerRequest.businessCode());
            employer.setPhoneNumber(createEmployerRequest.phoneNumber());
            employer.setUser(user.get());
            employerService.create(employer,image,backgroundImage);

            return ResponseEntity.ok(
                    new BaseResponse("Tạo nhà tuyển dụng thành công", HttpStatus.OK.value(), employer)
            );
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.ok(
                    new BaseResponse("Tên nhà tuyển dụng đã tồn tại", HttpStatus.BAD_REQUEST.value(), null)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/profile")
    public ResponseEntity<BaseResponse> getEmployerProfile() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null && !authentication.isAuthenticated())
                return ResponseEntity.ok(
                        new BaseResponse("xác thực không hợp lệ", HttpStatus.FORBIDDEN.value(), null)
                );

            String email = authentication.getName();
            Optional<Employer> optionalEmployer = employerService.findByUserEmail(email);
            if (!optionalEmployer.isPresent())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy nhà tuyển dụng tương ứng", HttpStatus.NOT_FOUND.value(), null)
                );

            Employer employer = optionalEmployer.get();
            GetEmployerProfileResponse profile = new GetEmployerProfileResponse(
                    employer.getId(),
                    authentication.getName(),
                    employer.getName(),
                    employer.getDescription(),
                    employer.getLocation(),
                    employer.getPhoneNumber(),
                    employer.getBusinessCode(),
                    employer.getImage(),
                    employer.getBackgroundImage());

            return ResponseEntity.ok(
                    new BaseResponse( "Hiện thông tin nhà tuyển dụng", HttpStatus.OK.value(), profile)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/update")
    public ResponseEntity<BaseResponse> updateEmployerProfile(UpdateEmployerRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null && !authentication.isAuthenticated())
                return ResponseEntity.ok(
                        new BaseResponse("xác thực không hợp lệ", HttpStatus.FORBIDDEN.value(), null)
                );

            String email = authentication.getName();
            Optional<Employer> optionalEmployer = employerService.findByUserEmail(email);
            if (!optionalEmployer.isPresent())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy nhà tuyển dụng tương ứng", HttpStatus.NOT_FOUND.value(), null)
                );

            Employer employer = optionalEmployer.get();
            employer.setName(request.name());
            employer.setDescription(request.description());
            employer.setLocation(request.location());
            employer.setPhoneNumber(request.phoneNumber());
            employer.setBusinessCode(request.businessCode());

            employerService.update(employer);
            return ResponseEntity.ok(
                    new BaseResponse( "Cập nhật thông tin nhà tuyển dụng", HttpStatus.OK.value(), employer)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/updateImage")
    public ResponseEntity<BaseResponse> updateEmployerImage(@RequestPart MultipartFile image) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null && !authentication.isAuthenticated())
                return ResponseEntity.ok(
                        new BaseResponse("xác thực không hợp lệ", HttpStatus.FORBIDDEN.value(), null)
                );

            String email = authentication.getName();
            Optional<Employer> optionalEmployer = employerService.findByUserEmail(email);
            if (!optionalEmployer.isPresent())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy ứng viên tương ứng", HttpStatus.NOT_FOUND.value(), null)
                );

            Employer employer = optionalEmployer.get();
            employerService.updateImage(employer,image);
            return ResponseEntity.ok(
                    new BaseResponse( "Cập nhật ảnh đại diện ứng viên thành công", HttpStatus.OK.value(), employer)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/updateBackgroundImage")
    public ResponseEntity<BaseResponse> updateEmployerBackgroundImage(@RequestPart MultipartFile backgroundImage) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null && !authentication.isAuthenticated())
                return ResponseEntity.ok(
                        new BaseResponse("xác thực không hợp lệ", HttpStatus.FORBIDDEN.value(), null)
                );

            String email = authentication.getName();
            Optional<Employer> optionalEmployer = employerService.findByUserEmail(email);
            if (!optionalEmployer.isPresent())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy ứng viên tương ứng", HttpStatus.NOT_FOUND.value(), null)
                );

            Employer employer = optionalEmployer.get();
            employerService.updateBackgroundImage(employer,backgroundImage);
            return ResponseEntity.ok(
                    new BaseResponse( "Cập nhật ảnh đại diện ứng viên thành công", HttpStatus.OK.value(), employer)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }



    @Operation(summary = "delete", description = "", tags = {})
    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> deleteEmployer(@PathVariable("id") String id) {
        try {
            employerService.deleteById(id);
            return ResponseEntity.ok(new BaseResponse("Xóa nhà tuyển dụng thành công", HttpStatus.OK.value(), null));
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.ok(new BaseResponse("Không tìm thấy nhà tuyển dụng cần xóa!", HttpStatus.NOT_FOUND.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


}
