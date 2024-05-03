package com.pth.taskbackend.service;

import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.model.meta.HumanResource;
import com.pth.taskbackend.model.meta.Job;
import com.pth.taskbackend.model.meta.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface JobService {

    Job create(Job job)throws IOException;
    Job update(Job job)throws IOException;
    void deleteById(String jobId)throws IOException;
    void delete(Job job)throws IOException;
    Optional<Job> findById(String jobId)throws IOException;
    Page<Job>findByProcessId(String id, Pageable pageable)throws IOException;
    Page<Job>findByNameContainingAndCategoryIdAndStatus(String name,String categoryId,EStatus status,Pageable pageable)throws IOException;
    Page<Job>findByStatusOrderByCreatedDesc(EStatus status, Pageable pageable)throws IOException;

    Page<Job> findAll(Pageable pageable)throws IOException;

    Page<Job> searchJobs(String keyword, String address, String location, LocalDateTime fromDate, String categoryId, boolean isVip,String tag, Pageable pageable) throws java.io.IOException ;

    Page<Job>findByKeywordAndStatusAndCategoryIdAndHRId(String keyword, EStatus status,String categoryId,String hRId,Pageable pageable)throws IOException;
    Page<Job>findByKeywordAndStatusAndCategoryIdAndEmployerId(String keyword, EStatus status,String categoryId,String employerId,Pageable pageable)throws IOException;
    Page<Job>findByKeywordAndCategoryIdAndEmployerId(String keyword,String categoryId,String employerId,Pageable pageable)throws IOException;
    Page<Job>findByKeywordAndCategoryIdAndHRId(String keyword,String categoryId,String hrId,Pageable pageable)throws IOException;


    Optional<Job> findByIdAndEmployerId(String id,String employerId)throws  IOException;

    Optional<Job>findByIdAndHRId(String id,String hrId)throws  IOException;

    Optional<Job>findByIdAndStatus(String id,EStatus status)throws  IOException;
    Page<Job> findByEmployerId(String employerId, Pageable pageable)throws IOException;
    Page<Job>findByEmployerIdAndStatus(String employerId,EStatus status,Pageable pageable)throws  IOException;
    Page<Job>findByCategoryId(String id,Pageable pageable)throws IOException;
    Page<Job>findByEmployerId(String id)throws IOException;
    Page<Object[]>findActiveJobsWithApplicationCount(Pageable pageable);


    Long countAll()throws IOException;

}
