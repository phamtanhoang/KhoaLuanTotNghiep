package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.model.meta.Tag;
import com.pth.taskbackend.repository.CategoryRepository;
import com.pth.taskbackend.service.CategoryService;
import com.pth.taskbackend.util.func.FileUploadFunc;
import com.pth.taskbackend.util.func.ImageFunc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Optional<Category> findById(String id) throws IOException {
        return categoryRepository.findById(id);
    }

    @Override
    public Optional<Category> findByName(String name) throws IOException {
        return categoryRepository.findByName(name);
    }

    @Override
    public Page<Category> findAll(Pageable pageable) throws IOException {
        return categoryRepository.findAll(pageable);
    }

    @Override
    public Page<Category> findByNameContaining(String name, Pageable pageable) throws IOException {
        return categoryRepository.findByNameContaining(name, pageable);
    }

    @Override
    public Category createCategory(String name, MultipartFile file) throws IOException {
        Category category = new Category();
        category.setName(name);
        FileUploadFunc fileUploadFunc = new FileUploadFunc();
        String path = fileUploadFunc.uploadImage(file);
        category.setImage(fileUploadFunc.getFullImagePath(path));
        categoryRepository.save(category);
        return category;
    }

    @Override
    public Category updateCategory(Category category, String name, MultipartFile file) throws IOException {
        if (name != null && !name.isEmpty()) {
            category.setName(name);
        }
        if(file!=null)
        {
            FileUploadFunc fileUploadFunc = new FileUploadFunc();
            String path = fileUploadFunc.uploadImage(file);
            category.setImage(fileUploadFunc.getFullImagePath(path));

        }

        categoryRepository.save(category);
        return category;
    }

    @Override
    public void deleteCategory(Category category) throws IOException {
        categoryRepository.delete(category);
    }

//    @Override
//    public Category create(Category category, MultipartFile file) throws IOException {
//        if (file != null) {
//            category.setImage(ImageFunc.compressImage(file.getBytes()));
//        }
//        category.setImage(ImageFunc.compressImage(file.getBytes()));
//        categoryRepository.save(category);
//        return category;
//    }
//
//    @Override
//    public Category update(Category category, MultipartFile image) throws IOException {
//
//        if (image != null) {
//            category.setImage(ImageFunc.compressImage(image.getBytes()));
//        }
//        categoryRepository.save(category);
//        return category;
//    }
//
//    @Override
//    public void delete(Category category) {
//         categoryRepository.delete(category);
//    }
//
//    @Override
//    public void deleteById(String id) {
//          categoryRepository.deleteById(id);
//    }

    @Override
    public Page<Object[]> findCategoriesByJobCount(Pageable pageable) {
        return categoryRepository.findCategoriesOrderedByJobCount(pageable);
    }

    @Override
    public List<Map<String, Object>> findStatisticInYear(int year) {
        List<Map<String, Object>> statistics = categoryRepository.findStatisticInYear(year);

        // Calculate total jobs
        long totalJobs = statistics.stream()
                .mapToLong(stat -> (long) stat.get("count"))
                .sum();

        // Calculate percentage for each category
        for (Map<String, Object> stat : statistics) {
            long count = (long) stat.get("count");
            double percentage = (double) count / totalJobs * 100;
            stat.put("percentage", percentage);
        }

        if (statistics.size() > 10) {
            List<Map<String, Object>> top4Categories = statistics.subList(0, 4);

            double totalPercentageTop4 = top4Categories.stream()
                    .mapToDouble(cat -> (double) cat.get("percentage"))
                    .sum();

            long totalCountOthers = statistics.subList(4, statistics.size()).stream()
                    .mapToLong(cat -> (long) cat.get("count"))
                    .sum();

            Map<String, Object> otherCategory = new HashMap<>();
            otherCategory.put("percentage", 100.0 - totalPercentageTop4);
            otherCategory.put("count", totalCountOthers);
            otherCategory.put("category", "Khác");

            statistics = new ArrayList<>(top4Categories);
            statistics.add(otherCategory);
        } else {
            statistics = new ArrayList<>(statistics);
        }

        return statistics;
    }


}
