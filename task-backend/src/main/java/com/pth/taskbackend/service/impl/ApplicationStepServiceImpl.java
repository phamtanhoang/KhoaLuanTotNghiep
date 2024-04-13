package com.pth.taskbackend.service.impl;


import com.pth.taskbackend.model.meta.ApplicationStep;
import com.pth.taskbackend.model.meta.Step;
import com.pth.taskbackend.repository.ApplicationStepRepository;
import com.pth.taskbackend.service.ApplicationStepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ApplicationStepServiceImpl  implements ApplicationStepService {
    @Autowired
    ApplicationStepRepository applicationStepRepository;

    @Override
    public ApplicationStep create(ApplicationStep applicationStep) {
        return null;
    }

    @Override
    public ApplicationStep update(ApplicationStep applicationStep) {
        return null;
    }

    @Override
    public List<ApplicationStep> findAllByApplicationId(String applicationId) throws IOException {
        return applicationStepRepository.findAllByApplicationId(applicationId);
    }


}
