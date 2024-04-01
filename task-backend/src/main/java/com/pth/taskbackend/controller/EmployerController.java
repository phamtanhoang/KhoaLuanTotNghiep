package com.pth.taskbackend.controller;
import com.pth.taskbackend.dto.request.CreateEmployerRequest;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.enums.ERole;
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
    AuthService authService;
    @Autowired
    UserRepository userRepository;
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
            System.out.println(keyword + "test");
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

    @Operation(summary = "update", description = "", tags = {})
    @PatchMapping("/{id}")
    public ResponseEntity<BaseResponse> updateEmployer(@PathVariable("id") String id,
                                                       @RequestBody Employer employer,
                                                       @RequestParam MultipartFile image,
                                                       @RequestParam MultipartFile backgroundImage) {
        try {
            Optional<Employer> optionalEmployer = employerService.findById(id);
            if (!optionalEmployer.isPresent()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy nhà tuyển dụng để cập nhật!", HttpStatus.NOT_FOUND.value(), null)
                );
            }

            if (image != null) {
                if (!(ImageFunc.isImageFile(image)||ImageFunc.isImageFile(backgroundImage))) {
                    return ResponseEntity.ok(
                            new BaseResponse("Vui lòng chọn hình ảnh!", HttpStatus.BAD_REQUEST.value(), null)
                    );
                }
            }
            employer.setId(id);
            employerService.update(employer, image, backgroundImage);

            return ResponseEntity.ok(
                    new BaseResponse("Cập nhật nhà tuyển dụng thành công", HttpStatus.OK.value(), employer)
            );
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.ok(
                    new BaseResponse("Tên nhà tuyển dụng đã tồn tại!", HttpStatus.BAD_REQUEST.value(), null)
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
