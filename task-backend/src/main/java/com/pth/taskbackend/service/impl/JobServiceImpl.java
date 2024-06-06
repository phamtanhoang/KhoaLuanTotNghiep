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
    public Page<Job> findByEmployerIdAndNameAndLocation(String id,String keyword, String location, Pageable pageable) {
        return jobRepository.findByEmployerIdAndNameAndLocation(id, keyword,location,pageable);
    }

    @Override
    public Page<Job> findByProcessId(String id, Pageable pageable) {
        return jobRepository.findByProcessId(id,pageable);
    }



    @Override
    public Page<Job> findByNameContainingAndCategoryIdAndStatus(String name, String categoryId,EStatus status,boolean isExpired, Pageable pageable) throws IOException {
        return jobRepository.findByNameContainingAndCategoryIdAndStatus(name,categoryId,status,isExpired, pageable);
    }

    @Override
    public Page<Job> findByStatusOrderByCreatedDesc(EStatus status, Pageable pageable) throws IOException {
        return jobRepository.findByStatusOrderByCreatedDesc(status,pageable);
    }

    @Override
    public Page<Job> findVipJob(Pageable pageable) throws java.io.IOException {
        return jobRepository.findVipJob(pageable);
    }

    @Override
    public Page<Job> findAll(Pageable pageable) {
        return null;
    }

    @Override
    public Page<Job> searchJobs(String keyword, String location, String experience, LocalDateTime fromDate, String categoryId, String tagId, Pageable pageable) throws java.io.IOException {
        return jobRepository.findBySorting(keyword,location,experience,fromDate,categoryId,tagId,pageable);
    }



    @Override
    public Page<Job> findByKeywordAndStatusAndCategoryIdAndHRId(String keyword, EStatus status, String categoryId,String hRId,boolean isExpired, Pageable pageable) throws IOException {
        return jobRepository.findByKeywordAndStatusAndCategoryIdAndHRId(keyword,status,categoryId,hRId, isExpired,pageable);
    }

    @Override
    public Page<Job> findByKeywordAndStatusAndCategoryIdAndEmployerId(String keyword, EStatus status, String categoryId, String employerId,boolean isExpired, Pageable pageable) throws IOException {

        return jobRepository.findByKeywordAndStatusAndCategoryIdAndEmployerId(keyword,status,categoryId,employerId, isExpired,pageable);

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

    @Override
    public Page<Job> findByCandidateId(String candidateId, Pageable pageable) {
        return  jobRepository.findByCandidateId(candidateId,pageable);
    }

    @Override
    public Optional<Job> findByCandidateIdAndJobId(String candidateId, String jobId) {
        return jobRepository.findByCandidateIdAndJobId(candidateId,jobId);
    }

    @Override
    public void deleteSavedJobByJobIdAndCandidateId(String jobId, String candidateId) {
        jobRepository.deleteSavedJobByJobIdAndCandidateId(jobId,candidateId);
    }

    @Override
    public void saveJob(String jobId, String candidateId) {
        System.out.println(jobId + "     " + candidateId);
        jobRepository.saveJob(jobId,candidateId);
    }

    @Override
    public boolean checkIsSaveJob(String candidateId, String jobId) {
        return jobRepository.checkIsSavedJob(candidateId, jobId);
    }

    @Override
    public Page<Job> getJobsSaved(String CandidateId, String keyword, String location, Pageable pageable) {
        return jobRepository.getJobsSaved(CandidateId, keyword, location, pageable);
    }

    @Override
    public Page<Job> getNewJob(Pageable pageable) throws IOException {
        return jobRepository.findNewJobs(pageable);
    }

    @Override
    public Page<Job> findPendingJobs_Employer(String employerId, Pageable pageable) throws IOException {
        return jobRepository.findPendingJobs_Employer(employerId, pageable);
    }

    @Override
    public Page<Job> findPendingJobs_HR(String hrId, Pageable pageable) throws IOException {
        return jobRepository.findPendingJobs_HR(hrId, pageable);
    }

    @Override
    public Page<Job> findJobsActive_Employer(String employerId, Pageable pageable) throws IOException {
        return jobRepository.findJobsActive_Employer(employerId, pageable);
    }

    @Override
    public Page<Job> findJobsActive_HR(String hrId, Pageable pageable) throws IOException {
        return jobRepository.findJobsActive_HR(hrId, pageable);
    }

    @Override
    public Page<Job> findJobsPending_Admin(Pageable pageable) throws IOException {
        return jobRepository.findPendingJobs_ADMIN(pageable);
    }

    @Override
    public Integer countJobActive_Admin() {
        return jobRepository.countJobActive_Admin();
    }

    @Override
    public Integer countJobActive_Employer(String id) {
        return jobRepository.countJobActive_Employer(id);
    }

    @Override
    public Integer countJobActive_HR(String id) {
        return jobRepository.countJobActive_HR(id);
    }
    @Override
    public Integer countJobPending_Employer(String id) {
        return jobRepository.countJobPending_Employer(id);
    }

    @Override
    public Integer countJobPending_HR(String id) {
        return jobRepository.countJobPending_HR(id);
    }
}
