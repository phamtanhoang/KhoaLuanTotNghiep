package com.pth.taskbackend.controller;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.repository.CategoryRepository;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getCategoryById(@PathVariable String id) {
        try {
            Optional<Category> category = categoryRepository.findById(id);
            if (category.isPresent()) {
                return ResponseEntity.ok(new BaseResponse("Danh mục được tìm thấy", 200, category.get()));
            } else {
                return ResponseEntity.ok(new BaseResponse("Không tìm thấy danh mục", 404, null));
            }
        } catch (Exception e) {
            return ResponseEntity.ok(new BaseResponse("Có lỗi xảy ra khi lấy danh mục", 500, null));
        }
    }

    @GetMapping("/name/{categoryName}")
    public ResponseEntity<BaseResponse> getCategoryByNameContaining(@PathVariable String categoryName, Pageable pageable) {
        try {
            Page<Category> categories = categoryRepository.findByNameContaining(categoryName, pageable);
            if (categories.isEmpty()) {
                return ResponseEntity.ok(new BaseResponse("Không tìm thấy danh mục nào", 404, null));
            } else {
                return ResponseEntity.ok(new BaseResponse("Danh sách danh mục được tìm thấy", 200, categories));
            }
        } catch (Exception e) {
            return ResponseEntity.ok(new BaseResponse("Có lỗi xảy ra khi lấy danh sách danh mục", 500, null));
        }
    }

}
