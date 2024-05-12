package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.Application;
import com.pth.taskbackend.model.meta.StepSchedule;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface StepScheduleService {

    Optional<StepSchedule> findByApplicationIdAndStepNumber(String id, int number) throws IOException;
    Optional<StepSchedule> findById(String id) throws IOException;
    StepSchedule create(String name, LocalDateTime startDate, LocalDateTime endDate, String color, int stepNumber, Application application) throws IOException;

    StepSchedule update(StepSchedule stepSchedule, String name, LocalDateTime startDate, LocalDateTime endDate, String color ) throws IOException;
    void delete(StepSchedule stepSchedule) throws IOException;

    List<StepSchedule> findByApplicationId(String id) throws IOException;

    List<StepSchedule> getDataScheduleByCandidateId(String id, LocalDate fromDateTime, LocalDate toDateTime) throws IOException;
    List<StepSchedule> getDataScheduleByHRId(String id, LocalDate fromDateTime, LocalDate toDateTime) throws IOException;
    List<StepSchedule> getDataScheduleByEmployerId(String id, LocalDate fromDateTime, LocalDate toDateTime) throws IOException;
}
