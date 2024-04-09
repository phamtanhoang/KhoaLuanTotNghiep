package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.Step;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StepRepository extends JpaRepository<Step,String> {
    Page<Step> findByProcessId(String processId, Pageable pageable);
}
