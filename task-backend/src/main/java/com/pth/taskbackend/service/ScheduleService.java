package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.Application;
import com.pth.taskbackend.model.meta.Schedule;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ScheduleService {

    Optional<Schedule> findByApplicationIdAndStepNumber(String id, int number) throws IOException;
    Optional<Schedule> findById(String id) throws IOException;
    Schedule create(String name, String description, LocalDateTime startDate, LocalDateTime endDate, String color, Application application) throws IOException;

    Schedule update(Schedule schedule, String name, LocalDateTime startDate, LocalDateTime endDate, String color, String description ) throws IOException;
    void delete(Schedule schedule) throws IOException;

    List<Schedule> findByApplicationId(String id) throws IOException;

    List<Schedule> getDataScheduleByCandidateId(String id) throws IOException;
    List<Schedule> getDataScheduleByHRId(String id) throws IOException;
    List<Schedule> getDataScheduleByEmployerId(String id) throws IOException;


}
