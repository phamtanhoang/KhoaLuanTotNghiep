package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.model.meta.Job;
import com.pth.taskbackend.repository.CategoryRepository;
import com.pth.taskbackend.repository.JobRepository;
import com.pth.taskbackend.service.CategoryService;
import com.pth.taskbackend.service.JobService;
import com.pth.taskbackend.util.func.ImageFunc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class JobServiceImpl implements JobService {
    @Autowired
    private JobRepository jobRepository;


    @Override
    public Job createJob(String name, String description, LocalDateTime created, LocalDateTime toDate, String address, EStatus status, String fromSalary, String toSalary, String experience, String hrId) throws IOException {
        Job job = new Job();
        job.setName(name);
        job.setDescription(description);
        job.setCreated(created);
        job.setToDate(toDate);
        job.setAddress(address);
        job.setStatus(status);
        job.setFromSalary(fromSalary);
        job.setToSalary(toSalary);
        job.setExperience(experience);


        jobRepository.save(job);
        return jobRepository.save(job);
    }


    @Override
    public Job updateJob(Job job,String name, String description, LocalDateTime toDate, String address,  EStatus status, String fromSalary, String toSalary, String experience, String hrId) throws IOException {
        if (name != null && !name.isEmpty()) {
            job.setName(name);
            job.setDescription(description);
            job.setToDate(toDate);
            job.setAddress(address);
            job.setStatus(status);
            job.setFromSalary(fromSalary);
            job.setToSalary(toSalary);
            job.setExperience(experience);

        }

        jobRepository.save(job);
        return job;

    }

    @Override
    public void deleteJobById(String jobId) {
        jobRepository.deleteById(jobId);
    }

    @Override
    public Optional<Job> findJobById(String jobId) {
        return jobRepository.findById(jobId);
    }

    @Override
    public Page<Job> findAllJobs(Pageable pageable) {
        return jobRepository.findAll(pageable);
    }

    @Override
    public Page<Job> searchJobs(String keyword, String address, String fromSalary, String toSalary, String categoryId, Pageable pageable) {
        return jobRepository.findJobs(keyword,address,fromSalary,toSalary,categoryId,pageable);
    }

    @Override
    public Page<Job> findJobsByEmployerId(String employerId, Pageable pageable) {
        return jobRepository.findAllByEmployerId(employerId, pageable);
    }
}
