package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface JobRepository extends JpaRepository<Job, Long> {
    @Query("SELECT j FROM Job j " +
            "join HumanResource hr "+
            "WHERE j.status = 'ACTIVE' " +
            "AND j.toDate > CURRENT_TIMESTAMP " +
            "ORDER BY j.created DESC")
    Page<Job> findByKeyword(@Param("keyword") String keyword,Pageable pageable);
}

