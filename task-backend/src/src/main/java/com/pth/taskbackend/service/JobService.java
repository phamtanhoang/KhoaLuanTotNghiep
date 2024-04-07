package com.pth.taskbackend.service;

import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.model.meta.HumanResource;
import com.pth.taskbackend.model.meta.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;

public interface JobService {

    Job create(Job job);
    Job update(Job job);
    void deleteById(String jobId);

    void delete(Job job);
    Optional<Job> findById(String jobId);

    Page<Job> findAll(Pageable pageable);

    Page<Job> searchJobs(String keyword, String address, String fromSalary, String toSalary, String categoryId , Pageable pageable);

    Page<Job> findByEmployerId(String employerId, Pageable pageable);

    Page<Job>findByCategoryId(String id,Pageable pageable);
    Page<Job>findByEmployerId(String id);

}
