package com.pth.taskbackend.repository;

import com.pth.taskbackend.dto.response.TopCategoriesResponse;
import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.model.meta.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
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
            "LEFT JOIN Job j ON c.id = j.category.id AND j.toDate > CURRENT_TIMESTAMP " +
            "GROUP BY c " +
            "ORDER BY count DESC")
    Page<Object[]> findCategoriesOrderedByJobCount(Pageable pageable);

    @Query("SELECT new map(c.name as category, count(j) as count) FROM Job j JOIN j.category c WHERE YEAR(j.created) <= :year AND YEAR(j.toDate) >= :year GROUP BY c.name ORDER BY count(j) DESC")
    List<Map<String, Object>> findStatisticInYear(@Param("year") int year);
}
