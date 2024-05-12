package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.model.meta.Application;
import com.pth.taskbackend.model.meta.StepSchedule;
import com.pth.taskbackend.repository.StepScheduleRepository;
import com.pth.taskbackend.service.StepScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class StepScheduleServiceImpl implements StepScheduleService {

    @Autowired
    StepScheduleRepository stepScheduleRepository;
    @Override
    public Optional<StepSchedule> findByApplicationIdAndStepNumber(String id, int number) throws IOException {
        return stepScheduleRepository.findByApplicationIdAndStepNumber(id, number);
    }

    @Override
    public Optional<StepSchedule> findById(String id) throws IOException {
        return stepScheduleRepository.findById(id);
    }

    @Override
    public StepSchedule create(String name, LocalDateTime startDate, LocalDateTime endDate, String color, int stepNumber, Application application) throws IOException {
        StepSchedule stepSchedule = new StepSchedule();
        stepSchedule.setName(name);
        stepSchedule.setStartDate(startDate);
        stepSchedule.setEndDate(endDate);
        stepSchedule.setColor(color);
        stepSchedule.setStepNumber(stepNumber);
        stepSchedule.setApplication(application);
        return stepScheduleRepository.save(stepSchedule);
    }

    @Override
    public StepSchedule update(StepSchedule stepSchedule, String name, LocalDateTime startDate, LocalDateTime endDate, String color) throws IOException {
        stepSchedule.setName(name);
        stepSchedule.setStartDate(startDate);
        stepSchedule.setEndDate(endDate);
        stepSchedule.setColor(color);
        return stepScheduleRepository.save(stepSchedule);
    }

    @Override
    public void delete(StepSchedule stepSchedule) throws IOException {
        stepScheduleRepository.deleteById(stepSchedule.getId());
    }

    @Override
    public List<StepSchedule> findByApplicationId(String id) throws IOException {
        return stepScheduleRepository.findAllByApplicationId(id);
    }

    @Override
    public List<StepSchedule> getDataScheduleByCandidateId(String id, LocalDate fromDate, LocalDate toDate) throws IOException {
        LocalDateTime fromDateTime = LocalDateTime.of(fromDate, LocalTime.MIN);
        LocalDateTime toDateTime = LocalDateTime.of(toDate, LocalTime.MAX);
        return stepScheduleRepository.getDataScheduleByCandidateId(id);
    }

    @Override
    public List<StepSchedule> getDataScheduleByHRId(String id, LocalDate fromDate, LocalDate toDate) throws IOException {
        LocalDateTime fromDateTime = LocalDateTime.of(fromDate, LocalTime.MIN);
        LocalDateTime toDateTime = LocalDateTime.of(toDate, LocalTime.MAX);

        return stepScheduleRepository.getDataScheduleByHRId(id);
    }

    @Override
    public List<StepSchedule> getDataScheduleByEmployerId(String id, LocalDate fromDate, LocalDate toDate) throws IOException {
        LocalDateTime fromDateTime = LocalDateTime.of(fromDate, LocalTime.MIN);
        LocalDateTime toDateTime = LocalDateTime.of(toDate, LocalTime.MAX);
        return stepScheduleRepository.getDataScheduleByEmployerId(id);
    }
}
