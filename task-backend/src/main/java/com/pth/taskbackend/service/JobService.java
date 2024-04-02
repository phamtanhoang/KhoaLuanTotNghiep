package com.pth.taskbackend.service;

import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.model.meta.HumanResource;
import com.pth.taskbackend.model.meta.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.io.IOException;
import java.time.LocalDateTime;

public interface JobService {
    Job create(String name, String description, LocalDateTime created, LocalDateTime toDate, String location, EStatus status, String fromSalary, String toSalary, String experience, Category category, HumanResource humanResource) throws IOException;

    Job update(String name, String description, LocalDateTime toDate, String location, EStatus status, String fromSalary, String toSalary, String experience, String hrId) throws IOException;

    void deleteById(Long jobId);

    void delete(Job job);

    Job findById(Long jobId);

    Page<Job> findAll(Pageable pageable);

    Page<Job> searchJobs(String keyword, String address, String fromSalary, String toSalary, String categoryId , Pageable pageable);

    Page<Job> findByEmployerId(String employerId, Pageable pageable);

    Page<Job>findByCategoryId(String id,Pageable pageable);
    Page<Job>findByEmployerId(String id);

}
