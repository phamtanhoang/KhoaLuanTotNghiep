package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.model.meta.Step;
import com.pth.taskbackend.repository.StepRepository;
import com.pth.taskbackend.service.StepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service

public class StepServiceImpl implements StepService {

    @Autowired
    StepRepository stepRepository;
    @Override
    public Step create(Step step) {
        return null;
    }

    @Override
    public Step update(Step step) {
        return null;
    }

    @Override
    public void deleteById(String id) {

    }

    @Override
    public void delete(Step step) {

    }

    @Override
    public Optional<Step> findById(String id) {
        return stepRepository.findById(id);
    }

    @Override
    public Page<Step> findByProcedureId(String id, Pageable pageable) {
        return stepRepository.findByProcessId(id,pageable);
    }
}
