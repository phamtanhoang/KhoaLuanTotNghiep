package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

public interface CategoryService {
    Category create(Category category, MultipartFile file) throws IOException;
    Category update(Category category, MultipartFile image) throws IOException;
    void delete(Category category);
    void deleteById(String id);

    Page<Object[]>findCategoriesByJobCount(Pageable pageable);

    Optional<Category>findById(String id);
}
