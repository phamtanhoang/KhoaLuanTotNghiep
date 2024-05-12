package com.pth.taskbackend.service;

import com.pth.taskbackend.enums.EStepStatus;
import com.pth.taskbackend.model.meta.Application;
import com.pth.taskbackend.model.meta.StepResult;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface StepResultService {

    Optional<StepResult> findByApplicationIdAndStepNumber(String id, int number) throws IOException;
    Optional<StepResult> findById(String id) throws IOException;
    StepResult create(String result, EStepStatus status, int stepNumber, Application application) throws IOException;

    List<StepResult> findByApplicationId(String id) throws IOException;

}
