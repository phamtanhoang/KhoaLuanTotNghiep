package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.Step;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface StepService {
    Step create(Step step);
    Step update(Step step);
    void  deleteById(String id);
    void delete(Step step);
    Optional<Step>findById(String id);
    Page<Step> findByProcedureId(String id, Pageable pageable);
}
