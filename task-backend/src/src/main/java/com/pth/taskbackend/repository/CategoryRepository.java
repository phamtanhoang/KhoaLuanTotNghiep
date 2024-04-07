package com.pth.taskbackend.repository;

import com.pth.taskbackend.dto.response.TopCategoriesResponse;
import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.model.meta.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, String> {
    Optional<Category> findByName(String name);

    Page<Category> findByNameContaining(String name, Pageable pageable);


//    @Query("SELECT c, COUNT(j.id) as count " +
//            "FROM Category c " +
//            "LEFT JOIN Job j ON c.id = j.category.id " +
//            "GROUP BY c " +
//            "ORDER BY count DESC")
//    Page<Object[]> findCategoriesOrderedByJobCount(Pageable pageable);

    @Query("SELECT c, COUNT(j.id) as count " +
            "FROM Category c " +
            "LEFT JOIN Job j ON c.id = j.category.id " +
            "GROUP BY c " +
            "HAVING COUNT(j.id) > 0 " +
            "ORDER BY count DESC")
    Page<Object[]> findCategoriesOrderedByJobCount(Pageable pageable);
}
