package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.model.meta.HumanResource;
import com.pth.taskbackend.model.meta.Job;
import com.pth.taskbackend.repository.JobRepository;
import com.pth.taskbackend.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
@Service
public class JobServiceImpl implements JobService {
    @Autowired
    JobRepository jobRepository;
    @Override
    public Job createJob(String name, String description, LocalDateTime created, LocalDateTime toDate, String location, EStatus status, String fromSalary, String toSalary, String experience, Category category, HumanResource humanResource) throws IOException {
        Job job = new Job();
        job.setName(name);
        job.setDescription(description);
        job.setCreated(created);
        job.setToDate(toDate);
        job.setLocation(location);
        job.setStatus(EStatus.PENDING);
        job.setFromSalary(fromSalary);
        job.setToSalary(toSalary);
        job.setExperience(experience);
        job.setCategory(category);
        job.setHumanResource(humanResource);
        return jobRepository.save(job);
    }


    @Override
    public Job updateJob(String name, String description, LocalDateTime toDate, String location, EStatus status, String fromSalary, String toSalary, String experience, String hrId) throws IOException {
        return null;
    }

    @Override
    public void deleteJobById(Long jobId) {

    }

    @Override
    public Job findJobById(Long jobId) {
        return null;
    }

    @Override
    public Page<Job> findAllJobs(Pageable pageable) {
        return null;
    }

    @Override
    public Page<Job> searchJobs(String keyword, String location, String fromSalary, String toSalary, String categoryId,  LocalDateTime toDate, Pageable pageable) {
        return jobRepository.findByKeyword(keyword,pageable);
    }

    @Override
    public Page<Job> findJobsByEmployerId(String employerId, Pageable pageable) {
        return null;
    }
}
