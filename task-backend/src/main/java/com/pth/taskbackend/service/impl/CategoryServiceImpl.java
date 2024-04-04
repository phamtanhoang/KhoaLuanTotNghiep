package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.repository.CategoryRepository;
import com.pth.taskbackend.service.CategoryService;
import com.pth.taskbackend.util.func.ImageFunc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category create(Category category, MultipartFile file) throws IOException {
        if (file != null) {
            category.setImage(ImageFunc.compressImage(file.getBytes()));
        }
        category.setImage(ImageFunc.compressImage(file.getBytes()));
        categoryRepository.save(category);
        return category;
    }

    @Override
    public Category update(Category category, MultipartFile image) throws IOException {

        if (image != null) {
            category.setImage(ImageFunc.compressImage(image.getBytes()));
        }
        categoryRepository.save(category);
        return category;
    }

    @Override
    public void delete(Category category) {
         categoryRepository.delete(category);
    }

    @Override
    public void deleteById(String id) {
          categoryRepository.deleteById(id);
    }

    @Override
    public Page<Object[]> findCategoriesByJobCount(Pageable pageable) {
        return categoryRepository.findCategoriesOrderedByJobCount(pageable);
    }

    @Override
    public Optional<Category> findById(String id) {
        return categoryRepository.findById(id);
    }

}
