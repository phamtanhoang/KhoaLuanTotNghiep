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
import java.util.Optional;

@Service
public class JobServiceImpl implements JobService {
    @Autowired
    JobRepository jobRepository;
    @Override
    public Job create(Job job){
        return jobRepository.save(job);
    }


    @Override
    public Job update(Job job){
        return jobRepository.save(job);
    }

    @Override
    public void deleteById(String id) {
        jobRepository.deleteById(id);

    }

    @Override
    public void delete(Job job) {
        jobRepository.delete(job);

    }

    @Override
    public Optional<Job> findById(String id) {
        return jobRepository.findById(id);
    }

    @Override
    public Page<Job> findAll(Pageable pageable) {
        return null;
    }

    @Override
    public Page<Job> searchJobs(String keyword, String location, String fromSalary, String toSalary, String categoryId , Pageable pageable) {
        return jobRepository.findBySorting(keyword,location,fromSalary,toSalary,categoryId,pageable);
    }

    @Override
    public Page<Job> findByEmployerId(String employerId, Pageable pageable) {
        return null;
    }

    @Override
    public Page<Job> findByCategoryId(String id, Pageable pageable) {
        return jobRepository.findByCategoryId(id, pageable);
    }

    @Override
    public Page<Job> findByEmployerId(String id) {
        return null;
    }
}