package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.model.meta.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

public interface CategoryService {
    Optional<Category> findById(String id) throws IOException;
    Optional<Category> findByName(String name) throws IOException;
    Page<Category> findAll(Pageable pageable) throws IOException;
    Page<Category> findByNameContaining(String name, Pageable pageable) throws IOException;
    Category createCategory(String name, MultipartFile file) throws IOException;
    Category updateCategory(Category category, String name, MultipartFile file) throws IOException;
    void deleteCategory(Category category) throws IOException;
    Page<Object[]>findCategoriesByJobCount(Pageable pageable);
//    Category create(Category category, MultipartFile file) throws IOException;
//    Category update(Category category, MultipartFile image) throws IOException;
//    void deleteCategory(Category category);
//    void deleteById(String id);



//    Optional<Category>findById(String id);
}
