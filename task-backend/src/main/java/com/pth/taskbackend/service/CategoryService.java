package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.Category;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface CategoryService {
    Category createCategory(MultipartFile file, String name) throws IOException;
    Category updateCategory(Category category, MultipartFile image, String name) throws IOException;
}
