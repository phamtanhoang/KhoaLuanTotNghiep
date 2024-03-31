package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.model.meta.Job;
import jakarta.persistence.QueryHint;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface JobRepository extends JpaRepository<Job, String> {


    @Query("SELECT j FROM Job j " +
            "INNER JOIN j.humanResource hr " +
            "INNER JOIN hr.employer e " +
            "WHERE ((:keyword IS NULL OR :keyword = '') " +
            "       OR lower(j.name) LIKE %:keyword% " +
            "       OR lower(j.description) LIKE %:keyword% " +
            "       OR lower(j.experience) LIKE %:keyword% " +
            "       OR lower(e.name) LIKE %:keyword%) " +
            "AND (:address IS NULL OR :address = '' OR lower(j.address) LIKE %:address%) " +
            "AND (:fromSalary IS NULL OR :fromSalary = '' OR j.fromSalary = :fromSalary) " +
            "AND (:toSalary IS NULL OR :toSalary = '' OR j.toSalary = :toSalary) " +
            "AND (:categoryId IS NULL OR :categoryId = '' OR j.category.id = :categoryId) " +
            "AND j.status = 'ACTIVE' " +
            "AND j.toDate > CURRENT_TIMESTAMP " +
            "ORDER BY j.created DESC")
    Page<Job> findJobs(@Param("keyword") String keyword,
                       @Param("address") String address,
                       @Param("fromSalary") String fromSalary,
                       @Param("toSalary") String toSalary,
                       @Param("categoryId") String categoryId,
                       Pageable pageable);

    @Query("SELECT j FROM Job j " +
            "JOIN j.humanResource hr " +
            "JOIN hr.employer e " +
            "WHERE e.id = :employerId " +
            "AND j.status = 'ACTIVE' " +
            "AND j.toDate < CURRENT_TIMESTAMP " +
            "ORDER BY j.created DESC")
    Page<Job>findAllByEmployerId(String employerId,Pageable pageable);
    Optional<Job> findByName(String name);

    Optional<Job> findById(String id);
}
