package com.pth.taskbackend.controller;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.repository.CategoryRepository;
import com.pth.taskbackend.service.CategoryService;
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
    private CategoryRepository categoryRepository;
    @Autowired
    private CategoryService categoryService;

    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getCategoryById(@PathVariable String id) {
        try {
            Optional<Category> category = categoryRepository.findById(id);
            if (category.isPresent()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh mục được tìm thấy", HttpStatus.OK.value(), category.get())
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy danh mục", HttpStatus.NOT_FOUND.value(), null)
                );
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get list", description = "", tags = {})
    @PreAuthorize("*")
    @GetMapping("")
    public ResponseEntity<BaseResponse> getCategories() {
        try {
            List<Category> categories = categoryRepository.findAll();
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

    @Operation(summary = "Get by name containing", description = "", tags = {})
    @PreAuthorize("*")
    @GetMapping("/name={categoryName}")
    public ResponseEntity<BaseResponse> getCategoryByNameContaining(@PathVariable String categoryName, Pageable pageable) {
        try {
            Page<Category> categories = categoryRepository.findByNameContaining(categoryName, pageable);
            if (categories.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy danh mục nào!", HttpStatus.NOT_FOUND.value(), null)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách danh mục được tìm thấy", HttpStatus.OK.value(), categories)
                );
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Create", description = "", tags = {})
    @PostMapping
    public ResponseEntity<BaseResponse> createCategory(@RequestParam("name") String name,
                                 @RequestParam("image") MultipartFile image) throws IOException {
        try {

            Optional<Category> existedCategory = categoryRepository.findByName(name);
            if (!ImageFunc.isImageFile(image)) {
                return ResponseEntity.ok(
                        new BaseResponse("Vui lòng chọn hình ảnh!", HttpStatus.BAD_REQUEST.value(), null)
                );
            }
            Category category = categoryService.createCategory(image, name);
            return ResponseEntity.ok(
                    new BaseResponse("Tạo danh mục thành công", HttpStatus.OK.value(), category)
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

    @Operation(summary = "update", description = "", tags = {})
    @PatchMapping("/{id}")
    public ResponseEntity<BaseResponse> updateCategory(@PathVariable("id") String id, @RequestParam(required = false) String name,
                                                       @RequestParam(required = false) MultipartFile image) {
        try {
            Optional<Category> optionalCategory = categoryRepository.findById(id);
            if (!optionalCategory.isPresent()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy danh mục để cập nhật!", HttpStatus.NOT_FOUND.value(), null)
                );
            }

            if (image != null) {
                if (!ImageFunc.isImageFile(image)) {
                    return ResponseEntity.ok(
                            new BaseResponse("Vui lòng chọn hình ảnh!", HttpStatus.BAD_REQUEST.value(), null)
                    );
                }
            }

            Category category = categoryService.updateCategory(optionalCategory.get(), image, name);

            return ResponseEntity.ok(
                    new BaseResponse("Cập nhật danh mục thành công", HttpStatus.OK.value(), category)
            );
        } catch (DataIntegrityViolationException e) {
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
    public ResponseEntity<BaseResponse> deleteCategory(@PathVariable("id") Long id) {
        try {
            categoryRepository.deleteById(id);
            return ResponseEntity.ok(new BaseResponse("Xóa danh mục thành công", HttpStatus.OK.value(), null));
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.ok(new BaseResponse("Không tìm thấy danh mục cần xóa!", HttpStatus.NOT_FOUND.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

}
