package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.ApplicationStep;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationStepRepository extends JpaRepository<ApplicationStep,String> {
    List<ApplicationStep>findAllByApplicationId(String applicationId);
}
