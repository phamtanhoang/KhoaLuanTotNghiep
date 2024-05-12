package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.enums.EApplyStatus;
import com.pth.taskbackend.enums.EStepStatus;
import com.pth.taskbackend.model.meta.Application;
import com.pth.taskbackend.model.meta.StepResult;
import com.pth.taskbackend.repository.StepResultRepository;
import com.pth.taskbackend.service.StepResultService;
import com.pth.taskbackend.service.StepResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class StepResultServiceImpl implements StepResultService {

    @Autowired
    StepResultRepository stepResultRepository;
    @Override
    public Optional<StepResult> findByApplicationIdAndStepNumber(String id, int number) throws IOException {
        return stepResultRepository.findByApplicationIdAndStepNumber(id, number);
    }

    @Override
    public Optional<StepResult> findById(String id) throws IOException {
        return stepResultRepository.findById(id);
    }

    @Override
    public StepResult create(String result, EStepStatus status, int stepNumber, Application application) throws IOException {
        StepResult StepResult = new StepResult();
        StepResult.setResult(result);
        StepResult.setStatus(status);
        StepResult.setStepNumber(stepNumber);
        StepResult.setApplication(application);
        return stepResultRepository.save(StepResult);
    }

    @Override
    public List<StepResult> findByApplicationId(String id) throws IOException {
        return stepResultRepository.findAllByApplicationId(id);
    }

}
