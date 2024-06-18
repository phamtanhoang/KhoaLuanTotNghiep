package com.pth.taskbackend.controller;

import com.pth.taskbackend.dto.request.TagRequest;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Tag;
import com.pth.taskbackend.model.meta.User;
import com.pth.taskbackend.repository.UserRepository;
import com.pth.taskbackend.security.JwtService;
import com.pth.taskbackend.service.TagService;
import com.pth.taskbackend.util.func.CheckPermission;
import io.jsonwebtoken.ExpiredJwtException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static com.pth.taskbackend.util.constant.PathConstant.BASE_URL;

@CrossOrigin(origins = "*")
@io.swagger.v3.oas.annotations.tags.Tag(name = "Tags", description = "Tag APIs")
@SecurityRequirement(name = "javainuseapi")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = {BASE_URL + "/tags"})
public class TagController {
    @Autowired
    private TagService tagService;
    @Autowired
    JwtService jwtService;
    @Autowired
    CheckPermission checkPermission;
    @Autowired
    UserRepository userRepository;
    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getTagById(@PathVariable String id) {
        try {
            Optional<Tag> tag = tagService.findById(id);
            return tag.map(value -> ResponseEntity.ok(
                    new BaseResponse("Nhãn được tìm thấy.", HttpStatus.OK.value(), value)
            )).orElseGet(() -> ResponseEntity.ok(
                    new BaseResponse("Không tìm thấy nhãn!", HttpStatus.NOT_FOUND.value(), null)
            ));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get by name", description = "", tags = {})
    @GetMapping("/name={name}")
    public ResponseEntity<BaseResponse> getTagByName( @PathVariable String name) {
        try {


            Optional<Tag> tag = tagService.findByName(name);
            return tag.map(value -> ResponseEntity.ok(
                    new BaseResponse("Nhãn được tìm thấy.", HttpStatus.OK.value(), value)
            )).orElseGet(() -> ResponseEntity.ok(
                    new BaseResponse("Không tìm thấy nhãn!", HttpStatus.NOT_FOUND.value(), null)
            ));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get list by name", description = "", tags = {})
    @GetMapping
    public ResponseEntity<BaseResponse> getTags(@RequestHeader("Authorization")String token, @RequestParam(required = false) String name, Pageable pageable) {
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

            Page<Tag> tags;
            if (name != null) {
                tags = tagService.findByNameContaining(name, pageable);
            } else {
                tags = tagService.findAll(pageable);
            }
            if (tags.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách nhãn rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách nhãn", HttpStatus.OK.value(), tags)
                );
            }
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "Get list by name", description = "", tags = {})
    @GetMapping("/getTags_Dropdown")
    public ResponseEntity<BaseResponse> getTagsDropdown() {
        try {

            List<Tag> tags = tagService.findAll(Pageable.unpaged()).toList();

            if (tags.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách nhãn rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách nhãn", HttpStatus.OK.value(), tags)
                );
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Create", description = "", tags = {})
    @PostMapping("create")
    public ResponseEntity<BaseResponse> createTag(@RequestHeader("Authorization")String token, @RequestBody TagRequest tagRequest) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.ADMIN)||checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );
            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );

            String name = tagRequest.name();
            String color = tagRequest.color();

            Optional<Tag> existedTag = tagService.findByName(name);
            if(existedTag.isPresent()){
                return ResponseEntity.ok(
                        new BaseResponse("Tên nhãn đã tồn tại", HttpStatus.BAD_REQUEST.value(), null)
                );
            }
            Tag tag = tagService.createTag(name, color);
            return ResponseEntity.ok(
                    new BaseResponse("Tạo nhãn thành công", HttpStatus.OK.value(), tag)
            );
        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.ok(
                    new BaseResponse("Tên nhãn đã tồn tại!", HttpStatus.BAD_REQUEST.value(), null)
            );
        }catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Update", description = "", tags = {})
    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse> updateTag(@RequestHeader("Authorization")String token, @PathVariable String id, @RequestBody Tag tag) {
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

            Optional<Tag> existingTag = tagService.findById(id);
            if (existingTag.isPresent()) {
                Tag updatedTag = tagService.updateTag(existingTag.get(), tag.getName(), tag.getColor());
                return ResponseEntity.ok(
                        new BaseResponse("Cập nhật nhãn thành công", HttpStatus.OK.value(), updatedTag)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy nhãn để cập nhật!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.ok(
                    new BaseResponse("Tên nhãn đã tồn tại!", HttpStatus.BAD_REQUEST.value(), null)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Delete", description = "", tags = {})
    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> deleteTag(@RequestHeader("Authorization")String token, @PathVariable String id) {
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
            Optional<Tag> existingTag = tagService.findById(id);
            if (existingTag.isPresent()) {
                tagService.deleteTag(existingTag.get());
                return ResponseEntity.ok(
                        new BaseResponse("Xóa nhãn thành công", HttpStatus.OK.value(), null)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy nhãn để xóa!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
}
