package com.pth.taskbackend.controller;
import com.pth.taskbackend.dto.request.CreateEmployerRequest;
import com.pth.taskbackend.dto.request.CreateHumanResourceRequest;
import com.pth.taskbackend.dto.request.UpdateCandidateRequest;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.*;
import com.pth.taskbackend.repository.UserRepository;
import com.pth.taskbackend.security.JwtService;
import com.pth.taskbackend.service.AuthService;
import com.pth.taskbackend.service.EmployerService;
import com.pth.taskbackend.service.HumanResourceService;
import com.pth.taskbackend.util.func.CheckPermission;
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
@Tag(name = "HumanResources", description = "Human Resource APIs")
@SecurityRequirement(name = "javainuseapi")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = {BASE_URL + "/hr"})
public class HumanResourceController {

    @Autowired
    private HumanResourceService humanResourceService;
    @Autowired
    private AuthService authService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    EmployerService employerService;
    @Autowired
    JwtService jwtService;
    @Autowired
    CheckPermission checkPermission;

    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getEmployerById(@PathVariable() String id) {
        try {
            Optional<HumanResource> humanResource = humanResourceService.findById(id);
            if (humanResource.isPresent()) {
                return ResponseEntity.ok(
                        new BaseResponse("nhà tuyển dụng được tìm thấy", HttpStatus.OK.value(), humanResource.get())
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy hr", HttpStatus.NOT_FOUND.value(), null)
                );
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    @Operation(summary = "Create", description = "", tags = {})
    @PostMapping("/create")
    public ResponseEntity<BaseResponse> createHumanResource(@RequestHeader("Authorization")String token, @RequestBody CreateHumanResourceRequest request
                                                       ) throws IOException {
        try {

        String email = jwtService.extractUsername(token.substring(7));
        boolean hasPermission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
        if (!hasPermission) {
            return ResponseEntity.ok(new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null));
        }

        Optional<Employer> optionalEmployer = employerService.findByUserEmail(email);
        if (optionalEmployer.isEmpty()) {
            return ResponseEntity.ok(new BaseResponse("Không tìm thấy nhà tuyển dụng ", HttpStatus.NOT_FOUND.value(), null));
        }


            if (userRepository.findByEmail(request.username()).isPresent())
                return ResponseEntity.ok(
                        new BaseResponse("Tên người dùng đã tồn tại!", 400, null)
                );


            Optional<User> user = authService.register(
                    request.username(),
                    request.password(),
                    ERole.HR);

            HumanResource hr = new HumanResource();
            hr.setFirstName(request.firstName());
            hr.setLastName(request.lastName());
            hr.setSex(request.sex());
            hr.setPhoneNumber(request.phoneNumber());
            hr.setUser(user.get());
            hr.setEmployer(optionalEmployer.get());
            humanResourceService.create(hr);

            return ResponseEntity.ok(
                    new BaseResponse("Tạo nhà tuyển dụng thành công", HttpStatus.OK.value(), hr)
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

//    @Operation(summary = "Get by id", description = "", tags = {})
//    @GetMapping("/update")
//    public ResponseEntity<BaseResponse> updateHumanResource(UpdateCandidateRequest request) {
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
//            if (!optionalCandidate.isPresent())
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

    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/updateAvatar")
    public ResponseEntity<BaseResponse> updateHumanResourceProfile(@RequestPart MultipartFile avatar) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null && !authentication.isAuthenticated())
                return ResponseEntity.ok(
                        new BaseResponse("xác thực không hợp lệ", HttpStatus.FORBIDDEN.value(), null)
                );

            String email = authentication.getName();
            Optional<HumanResource> optionalHumanResource = humanResourceService.findByEmail(email);
            if (!optionalHumanResource.isPresent())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy ứng viên tương ứng", HttpStatus.NOT_FOUND.value(), null)
                );

            HumanResource hr = optionalHumanResource.get();
            humanResourceService.updateAvatar(hr,avatar);
            return ResponseEntity.ok(
                    new BaseResponse( "Cập nhật ảnh đại diện ứng viên thành công", HttpStatus.OK.value(), hr)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "delete", description = "", tags = {})
    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> deleteHumanResource(@PathVariable("id") String id) {
        try {
            humanResourceService.deleteById(id);
            return ResponseEntity.ok(new BaseResponse("Xóa ứng viên thành công", HttpStatus.OK.value(), null));
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.ok(new BaseResponse("Không tìm thấy ứng viên cần xóa!", HttpStatus.NOT_FOUND.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


}
