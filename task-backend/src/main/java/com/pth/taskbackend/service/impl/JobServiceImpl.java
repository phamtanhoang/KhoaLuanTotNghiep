package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Job;
import com.pth.taskbackend.model.meta.Tag;
import com.pth.taskbackend.repository.JobRepository;
import com.pth.taskbackend.service.JobService;
import io.jsonwebtoken.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
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
    public Page<Job> findByProcessId(String id, Pageable pageable) {
        return jobRepository.findByProcessId(id,pageable);
    }



    @Override
    public Page<Job> findByNameContainingAndCategoryIdAndStatus(String name, String categoryId,EStatus status, Pageable pageable) throws IOException {
        return jobRepository.findByNameContainingAndCategoryIdAndStatus(name,categoryId,status,pageable);
    }

    @Override
    public Page<Job> findByStatusOrderByCreatedDesc(EStatus status, Pageable pageable) throws IOException {
        return jobRepository.findByStatusOrderByCreatedDesc(status,pageable);
    }

    @Override
    public Page<Job> findAll(Pageable pageable) {
        return null;
    }

    @Override
    public Page<Job> searchJobs(String keyword, String address, String location, LocalDateTime fromDate, String categoryId, boolean isVip, List<String> tags, Pageable pageable) throws java.io.IOException {
       System.out.println(tags);
        return jobRepository.findBySorting(keyword,address,location,fromDate,categoryId,isVip,tags,pageable);
    }



    @Override
    public Page<Job> findByKeywordAndStatusAndCategoryIdAndHRId(String keyword, EStatus status, String categoryId,String hRId, Pageable pageable) throws IOException {
        return jobRepository.findByKeywordAndStatusAndCategoryIdAndHRId(keyword,status,categoryId,hRId,pageable);
    }

    @Override
    public Page<Job> findByKeywordAndStatusAndCategoryIdAndEmployerId(String keyword, EStatus status, String categoryId, String employerId, Pageable pageable) throws IOException {

        return jobRepository.findByKeywordAndStatusAndCategoryIdAndEmployerId(keyword,status,categoryId,employerId,pageable);

    }

    @Override
    public Page<Job> findByKeywordAndCategoryIdAndEmployerId(String keyword, String categoryId, String employerId, Pageable pageable) throws IOException {
        return jobRepository.findByKeywordAndCategoryIdAndEmployerId(keyword,categoryId,employerId,pageable);
    }

    @Override
    public Page<Job> findByKeywordAndCategoryIdAndHRId(String keyword, String categoryId, String hrId, Pageable pageable) throws IOException {
        return jobRepository.findByKeywordAndCategoryIdAndHRId(keyword,categoryId,hrId,pageable);
    }

    @Override
    public Optional<Job> findByIdAndEmployerId(String id, String employerId) throws IOException {
        return jobRepository.findByIdAndEmployerId(id,employerId);
    }

    @Override
    public Optional<Job> findByIdAndHRId(String id, String hrId) throws IOException {
        return jobRepository.findByIdAndHRId(id,hrId);
    }

    @Override
    public Optional<Job> findByIdAndStatus(String id, EStatus status) throws IOException {
        return jobRepository.findByIdAndStatus(id,status);
    }

    @Override
    public Page<Job> findByEmployerId(String employerId, Pageable pageable) {
        return null;
    }

    @Override
    public Page<Job> findByEmployerIdAndStatus(String employerId, EStatus status,Pageable pageable) throws IOException {
        return jobRepository.findByEmployerIdAndStatus(employerId,status, pageable);
    }

    @Override
    public Page<Job> findByCategoryId(String id, Pageable pageable) {
        return jobRepository.findByCategoryId(id, pageable);
    }

    @Override
    public Page<Job> findByEmployerId(String id) {
        return null;
    }

    @Override
    public Page<Object[]> findActiveJobsWithApplicationCount(Pageable pageable) {
        return jobRepository.findActiveJobsWithApplicationCount(pageable);
    }

    @Override
    public Long countAll() throws IOException {
        return jobRepository.countAll();
    }
}
