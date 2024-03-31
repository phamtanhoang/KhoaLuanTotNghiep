package com.pth.taskbackend.service;

import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;

public interface JobService {
    Job createJob(String name, String description, LocalDateTime created, LocalDateTime toDate, String address, EStatus status, String fromSalary, String toSalary, String experience, String hrId) throws IOException;

    Job updateJob(Job job, String name, String description, LocalDateTime toDate, String address,  EStatus status, String fromSalary, String toSalary, String experience, String hrId) throws IOException;

    void deleteJobById(String jobId);

    Optional<Job> findJobById(String jobId);

    Page<Job> findAllJobs(Pageable pageable);

    Page<Job> searchJobs(String keyword, String address, String fromSalary, String toSalary, String categoryId, Pageable pageable);

    Page<Job> findJobsByEmployerId(String employerId, Pageable pageable);
}
