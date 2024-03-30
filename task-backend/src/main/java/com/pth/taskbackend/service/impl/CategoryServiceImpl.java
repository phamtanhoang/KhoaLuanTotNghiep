package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.repository.CategoryRepository;
import com.pth.taskbackend.service.CategoryService;
import com.pth.taskbackend.util.func.ImageFunc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category createCategory(MultipartFile file, String name) throws IOException {
        Category category = new Category();
        category.setName(name);
        category.setImage(ImageFunc.compressImage(file.getBytes()));
        categoryRepository.save(category);
        return category;
    }

    @Override
    public Category updateCategory(Category category, MultipartFile image, String name) throws IOException {
        if (name != null && !name.isEmpty()) {
            category.setName(name);
        }

        if (image != null) {
            category.setImage(ImageFunc.compressImage(image.getBytes()));
        }
        categoryRepository.save(category);
        return category;
    }

}
