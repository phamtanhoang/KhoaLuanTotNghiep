package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.model.meta.Application;
import com.pth.taskbackend.model.meta.Schedule;
import com.pth.taskbackend.repository.ScheduleRepository;
import com.pth.taskbackend.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ScheduleServiceImpl implements ScheduleService {

    @Autowired
    ScheduleRepository scheduleRepository;
    @Override
    public Optional<Schedule> findByApplicationIdAndStepNumber(String id, int number) throws IOException {
//        return stepScheduleRepository.findByApplicationIdAndStepNumber(id, number);
        return null;
    }

    @Override
    public Optional<Schedule> findById(String id) throws IOException {
        return scheduleRepository.findById(id);
    }

    @Override
    public Schedule create(String name, String description, LocalDateTime startDate, LocalDateTime endDate, String color, Application application) throws IOException {
        Schedule schedule = new Schedule();
        schedule.setName(name);
        schedule.setDescription(description);
        schedule.setStartDate(startDate);
        schedule.setEndDate(endDate);
        schedule.setColor(color);
        schedule.setApplication(application);
        return scheduleRepository.save(schedule);
    }

    @Override
    public Schedule update(Schedule schedule, String name, LocalDateTime startDate, LocalDateTime endDate, String color,String description) throws IOException {
        schedule.setName(name);
        schedule.setStartDate(startDate);
        schedule.setEndDate(endDate);
        schedule.setColor(color);
        schedule.setDescription(description);
        return scheduleRepository.save(schedule);
    }

    @Override
    public void delete(Schedule schedule) throws IOException {
        scheduleRepository.deleteById(schedule.getId());
    }

    @Override
    public List<Schedule> findByApplicationId(String id) throws IOException {
        return scheduleRepository.findAllByApplicationId(id);
    }

    @Override
    public List<Schedule> getDataScheduleByCandidateId(String id) throws IOException {
        return scheduleRepository.getDataScheduleByCandidateId(id);
    }

    @Override
    public List<Schedule> getDataScheduleByHRId(String id) throws IOException {
        return scheduleRepository.getDataScheduleByHRId(id);
    }

    @Override
    public List<Schedule> getDataScheduleByEmployerId(String id) throws IOException {
        return scheduleRepository.getDataScheduleByEmployerId(id);
    }
}
