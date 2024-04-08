package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.Education;
import com.pth.taskbackend.model.meta.Experience;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EducationRepository extends JpaRepository<Education,String> {
    Page<Education> findByCandidateId(String id, Pageable pageable);

}