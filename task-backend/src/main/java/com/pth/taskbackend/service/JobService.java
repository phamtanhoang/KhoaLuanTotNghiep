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
    Job createJob(String name, String description, LocalDateTime created, LocalDateTime toDate, String location, EStatus status, String fromSalary, String toSalary, String experience, Category category, HumanResource humanResource) throws IOException;

    Job updateJob(String name, String description, LocalDateTime toDate, String location, EStatus status, String fromSalary, String toSalary, String experience, String hrId) throws IOException;

    void deleteJobById(Long jobId);

    Job findJobById(Long jobId);

    Page<Job> findAllJobs(Pageable pageable);

    Page<Job> searchJobs(String keyword, String address, String fromSalary, String toSalary, String categoryId, LocalDateTime toDate, Pageable pageable);

    Page<Job> findJobsByEmployerId(String employerId, Pageable pageable);
}
