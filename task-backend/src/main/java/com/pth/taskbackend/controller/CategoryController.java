package com.pth.taskbackend.controller;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.dto.response.TopCategoriesResponse;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.model.meta.Employer;
import com.pth.taskbackend.model.meta.Job;
import com.pth.taskbackend.model.meta.User;
import com.pth.taskbackend.repository.CategoryRepository;
import com.pth.taskbackend.repository.JobRepository;
import com.pth.taskbackend.repository.UserRepository;
import com.pth.taskbackend.security.JwtService;
import com.pth.taskbackend.service.CategoryService;
import com.pth.taskbackend.service.JobService;
import com.pth.taskbackend.util.func.CheckPermission;
import com.pth.taskbackend.util.func.ImageFunc;
import io.jsonwebtoken.ExpiredJwtException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.checkerframework.checker.units.qual.C;
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
import java.util.List;
import java.util.Optional;

import static com.pth.taskbackend.util.constant.PathConstant.BASE_URL;

@CrossOrigin(origins = "*")
@Tag(name = "Categories", description = "Category APIs")
@SecurityRequirement(name = "javainuseapi")
@RequiredArgsConstructor
@RestController
    @RequestMapping(value = {BASE_URL + "/categories"})
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private JobRepository jobRepository;
    private final CheckPermission checkPermission ;
@Autowired
    UserRepository userRepository;
    @Autowired
    JwtService jwtService;
    @Autowired JobService jobService;
    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getCategoryById(@PathVariable String id) {
        try {
            Optional<Category> category = categoryService.findById(id);
            return category.map(value -> ResponseEntity.ok(
                    new BaseResponse("Danh mục được tìm thấy", HttpStatus.OK.value(), value)
            )).orElseGet(() -> ResponseEntity.ok(
                    new BaseResponse("Không tìm thấy danh mục", HttpStatus.NOT_FOUND.value(), null)
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get by name", description = "", tags = {})
    @GetMapping("/name={name}")
    public ResponseEntity<BaseResponse> getCategoryByName(@PathVariable String name) {
        try {
            Optional<Category> category = categoryService.findByName(name);
            return category.map(value -> ResponseEntity.ok(
                    new BaseResponse("Danh mục được tìm thấy.", HttpStatus.OK.value(), value)
            )).orElseGet(() -> ResponseEntity.ok(
                    new BaseResponse("Không tìm thấy danh mục!", HttpStatus.NOT_FOUND.value(), null)
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    @Operation(summary = "Get list by name", description = "", tags = {})
    @GetMapping
    public ResponseEntity<BaseResponse> getCategories(@RequestHeader("Authorization")String token, @RequestParam(required = false) String name, Pageable pageable) {
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

            Page<Category> categories;
            if (name != null) {
                categories = categoryService.findByNameContaining(name, pageable);
            } else {
                categories = categoryService.findAll(pageable);
            }
            if (categories.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách danh mục rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách danh mục", HttpStatus.OK.value(), categories)
                );
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "Get list top down", description = "", tags = {})
    @GetMapping("/getCategories_Dropdown")
    public ResponseEntity<BaseResponse> getCategoriesDropDown(@RequestParam(required = false) String name ) throws IOException {
        try {
            List<Category> categories = categoryService.findAll(Pageable.unpaged()).toList();

            if (categories.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách danh mục rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách danh mục", HttpStatus.OK.value(), categories)
                );
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    @Operation(summary = "Create", description = "", tags = {})
    @PostMapping("/create")
    public ResponseEntity<BaseResponse> createCategory(@RequestHeader("Authorization") String token,@RequestParam("name") String name,
                                 @RequestParam("image") MultipartFile image) throws IOException {
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

            Category category = categoryService.createCategory(name, image);
            return ResponseEntity.ok(
                    new BaseResponse("Tạo danh mục thành công", HttpStatus.OK.value(), category)
            );
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        }catch (DataIntegrityViolationException e) {
            return ResponseEntity.ok(
                    new BaseResponse("Tên danh mục đã tồn tại", HttpStatus.BAD_REQUEST.value(), null)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "update", description = "", tags = {})
    @PatchMapping("/{id}")
public ResponseEntity<BaseResponse> updateCategory(@RequestHeader("Authorization")String token, @PathVariable("id") String id, @RequestPart String name,
                                                   @RequestPart(required = false) MultipartFile image) {
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

            Optional<Category> optionalCategory = categoryService.findById(id);
            if (optionalCategory.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy danh mục để cập nhật!", HttpStatus.NOT_FOUND.value(), null)
                );
            }


            Category  category = categoryService.updateCategory(optionalCategory.get(), name, image);
            return ResponseEntity.ok(
                    new BaseResponse("Cập nhật danh mục thành công", HttpStatus.OK.value(), category)
            );
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        }catch (DataIntegrityViolationException e) {
            return ResponseEntity.ok(
                    new BaseResponse("Tên danh mục đã tồn tại!", HttpStatus.BAD_REQUEST.value(), null)
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
            Optional<Category> existingCategory = categoryService.findById(id);
            if (existingCategory.isPresent()) {
                List<Job> jobs = jobService.findByCategoryId(id,null).toList();
                for(Job job :jobs){
                    job.setCategory(null);
                    jobService.update(job);
                }
                categoryService.deleteCategory(existingCategory.get());
                return ResponseEntity.ok(
                        new BaseResponse("Xóa danh mục thành công", HttpStatus.OK.value(), null)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy danh mục để xóa!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.ok(new BaseResponse("Không tìm thấy danh mục cần xóa!", HttpStatus.NOT_FOUND.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get top categories", description = "", tags = {})
    @GetMapping("/topCategoies")
    public ResponseEntity<BaseResponse> getTopCategories(Pageable pageable) {
        try {
           Page<Object[]> categories = categoryService.findCategoriesByJobCount(pageable);
            Page<TopCategoriesResponse> topCategoriesResponses = categories.map(result -> {
                Category category = (Category) result[0];
                Long count = (Long) result[1];

                TopCategoriesResponse dto = new TopCategoriesResponse(category.getId(),category.getName(),category.getImage(),count);
                return dto;
            });
            if (categories.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách danh mục rỗng", HttpStatus.OK.value(), null)
                );
//
            return ResponseEntity.ok(
                    new BaseResponse("Danh sách danh mục", HttpStatus.OK.value(), topCategoriesResponses)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

}
