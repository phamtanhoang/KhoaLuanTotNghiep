package com.pth.taskbackend.controller;
import com.pth.taskbackend.dto.request.UpdateVipRequest;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.enums.EType;
import com.pth.taskbackend.enums.EVipStatus;
import com.pth.taskbackend.model.meta.*;
import com.pth.taskbackend.repository.UserRepository;
import com.pth.taskbackend.security.JwtService;
import com.pth.taskbackend.service.VipService;
import com.pth.taskbackend.util.func.CheckPermission;
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

import java.util.Optional;

import static com.pth.taskbackend.util.constant.PathConstant.BASE_URL;

@CrossOrigin(origins = "*")
@Tag(name = "Vips", description = "Vip APIs")
@SecurityRequirement(name = "javainuseapi")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = {BASE_URL + "/vips"})
public class VipController {

    @Autowired
    VipService vipService;
    @Autowired
    private final CheckPermission checkPermission ;
    @Autowired
    UserRepository userRepository;
    @Autowired
    JwtService jwtService;

    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getVipById(@PathVariable String id) {
        try {
            Optional<Vip> vip = vipService.findById(id);
            return vip.map(value -> ResponseEntity.ok(
                    new BaseResponse("Vip được tìm thấy", HttpStatus.OK.value(), value)
            )).orElseGet(() -> ResponseEntity.ok(
                    new BaseResponse("Không tìm thấy Vip", HttpStatus.NOT_FOUND.value(), null)
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }




    @Operation(summary = "Get list by type and status", description = "", tags = {})
    @GetMapping
    public ResponseEntity<BaseResponse> getVips(@RequestParam(required = false)EType type, @RequestParam(required = false)EVipStatus status, Pageable pageable) {
        try {
            Page<Vip> vips = vipService.findByStatusAndType(type,status,pageable);

            if (vips.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách Vip rỗng", HttpStatus.NO_CONTENT.value(), null)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách Vip", HttpStatus.OK.value(), vips)
                );
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    @Operation(summary = "Create", description = "", tags = {})
    @PostMapping("")
    public ResponseEntity<BaseResponse> createVip(@RequestHeader("Authorization") String token,@RequestBody Vip vip) {
        try {

            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.ADMIN);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );
            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy quản trị viên", HttpStatus.NOT_FOUND.value(), null)
                );

          vipService.create(vip);
            return ResponseEntity.ok(
                    new BaseResponse("Tạo Vip thành công", HttpStatus.OK.value(), vip)
            );
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.ok(
                    new BaseResponse("Tên Vip đã tồn tại", HttpStatus.BAD_REQUEST.value(), null)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "update", description = "", tags = {})
    @PatchMapping("/{id}")
    public ResponseEntity<BaseResponse> updateCategory(@RequestHeader("Authorization")String token, @PathVariable("id") String id, @RequestBody UpdateVipRequest request) {
        try {

            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.ADMIN);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy quản trị viên", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<Vip> optionalVip = vipService.findById(id);
            if (optionalVip.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy Vip để cập nhật!", HttpStatus.NOT_FOUND.value(), null)
                );
            }

            if(request.status()==EVipStatus.DELETED)
                return ResponseEntity.ok(
                        new BaseResponse("Không được sử dụng trạng thái này", HttpStatus.BAD_REQUEST.value(), null)
                );
        Vip vip = optionalVip.get();
            vip.setName(request.name());
            vip.setMonth(request.month());
            vip.setStatus(request.status());
            vip.setPrice(request.price());
            vip.setColor(request.color());
         vipService.update(vip);
            return ResponseEntity.ok(
                    new BaseResponse("Cập nhật Vip thành công", HttpStatus.OK.value(), vip)
            );
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.ok(
                    new BaseResponse("Tên Vip đã tồn tại!", HttpStatus.BAD_REQUEST.value(), null)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "delete", description = "", tags = {})
    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> deleteCategory(@RequestHeader("Authorization")String token, @PathVariable("id") String id) {
        try {

            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.ADMIN);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );
            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy quản trị viên", HttpStatus.NOT_FOUND.value(), null)
                );
            Optional<Vip> optionalVip = vipService.findById(id);
            if (optionalVip.isPresent()) {
                if(optionalVip.get().getStatus()==EVipStatus.DELETED)
                    return ResponseEntity.ok(
                            new BaseResponse("Vip này đã được xóa trước đó", HttpStatus.BAD_REQUEST.value(), null)
                    );
                vipService.deleteById(optionalVip.get().getId());
                return ResponseEntity.ok(
                        new BaseResponse("Xóa Vip thành công", HttpStatus.OK.value(), null)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy Vip để xóa!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.ok(new BaseResponse("Không tìm thấy Vip cần xóa!", HttpStatus.NOT_FOUND.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

}
