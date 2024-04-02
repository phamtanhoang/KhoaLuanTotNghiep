package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface CategoryService {
    Category create(MultipartFile file, String name) throws IOException;
    Category update(Category category, MultipartFile image, String name) throws IOException;

    Page<Object[]>findCategoriesByJobCount(Pageable pageable);
}
