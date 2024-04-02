package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface JobRepository extends JpaRepository<Job, String> {
    @Query("SELECT j FROM Job j " +
            "INNER JOIN j.humanResource hr " +
            "INNER JOIN hr.employer e " +
            "WHERE (:keyword IS NULL OR " +
            "       (LOWER(j.name) LIKE %:keyword% " +
            "       OR LOWER(j.description) LIKE %:keyword% " +
            "       OR LOWER(j.experience) LIKE %:keyword% " +
            "       OR LOWER(e.name) LIKE %:keyword%)) " +
            "AND (:location IS NULL OR LOWER(j.location) LIKE %:location%) " +
            "AND (:fromSalary IS NULL OR j.fromSalary = :fromSalary) " +
            "AND (:toSalary IS NULL OR j.toSalary = :toSalary) " +
            "AND (:categoryId IS NULL OR j.category.id = :categoryId) " +
            "AND j.status = 'ACTIVE' " +
            "AND j.toDate > CURRENT_TIMESTAMP " +
            "ORDER BY j.created DESC")
    Page<Job> findBySorting(
            @Param("keyword") String keyword,
            @Param("location") String location,
            @Param("fromSalary") String fromSalary,
            @Param("toSalary") String toSalary,
            @Param("categoryId") String categoryId,
            Pageable pageable);
}

