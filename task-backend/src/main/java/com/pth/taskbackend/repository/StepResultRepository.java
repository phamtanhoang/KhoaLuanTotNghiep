package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.StepResult;
import com.pth.taskbackend.model.meta.StepSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StepResultRepository  extends JpaRepository<StepResult,String> {
    @Query("SELECT s FROM StepResult s WHERE s.application.id = :id AND s.stepNumber = :number")
    Optional<StepResult> findByApplicationIdAndStepNumber(String id, int number);


    List<StepResult> findAllByApplicationId(String id);
    List<StepResult> findByApplicationId(String id);

}
