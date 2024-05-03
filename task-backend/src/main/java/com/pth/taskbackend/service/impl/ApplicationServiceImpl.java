package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.enums.EApplyStatus;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Application;
import com.pth.taskbackend.repository.ApplicationRepository;
import com.pth.taskbackend.service.ApplicationService;
import io.jsonwebtoken.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class ApplicationServiceImpl implements ApplicationService {
    @Autowired
    ApplicationRepository applicationRepository;
    @Override
    public Application create(Application application) {


        return applicationRepository.save(application);
    }

    @Override
    public Application Update(Application application) {
        return null;
    }

    @Override
    public void deleteById(String id) {

    }

    @Override
    public void delete(Application application) {

    }

    @Override
    public Optional<Application> findById(String id) {
        return applicationRepository.findById(id);
    }

    @Override
    public Optional<Application> findByJobIdAndCandidateId(String jobId, String candidateId) {
        return applicationRepository.findByJobIdAndCandidateId(jobId,candidateId);
    }

    @Override
    public Optional<Application> findByIdAndCandidateId(String id, String candidateId){
        return applicationRepository.findByIdAndCandidateId(id,candidateId);
    }

    @Override
    public Page<Application> findByCandidateId(String candidateId, Pageable pageable) {
        return applicationRepository.findByCandidateId(candidateId,pageable);
    }

    @Override
    public Page<Application> findByEmployerId(String employerId, Pageable pageable) {
        return applicationRepository.findByEmployerId(employerId,pageable);
    }

    @Override
    public Page<Application> findByHrId(String hrId, Pageable pageable) {
        return applicationRepository.findByHrId(hrId,pageable);
    }

    @Override
    public Page<Application> findByJobId(String jobId, Pageable pageable) {
        return applicationRepository.findByJobId(jobId,pageable);
    }

    @Override
    public Optional<Application> findByIdAndJobHumanResourceId(String id, String humanResourceId)  {
        return applicationRepository.findByIdAndJobHumanResourceId(id,humanResourceId);
    }

    @Override
    public Optional<Application> findByIdAndJobHumanResourceEmployerId(String id, String employerId)  {
        return applicationRepository.findByIdAndJobHumanResourceEmployerId(id,employerId);

    }

    @Override
    public Page<Application> findByEmployerIdAndStatus(String employerId, EApplyStatus status, Pageable pageable) {
        return applicationRepository.findByEmployerIdAndStatus(employerId,status,pageable);
    }

    @Override
    public Page<Application> findByEmployerIdAndStatusAndNameContaining(String employerId, EApplyStatus status, String keyword, Pageable pageable) {
        return applicationRepository.findByEmployerIdAndStatusAndNameContaining(employerId,status,keyword,pageable);
    }

    @Override
    public Page<Application> findByHRIdAndStatusAndNameContaining(String hrId, EApplyStatus status, String keyword, Pageable pageable)  {
        return applicationRepository.findByHRIdAndStatusAndNameContaining(hrId,status,keyword,pageable);
    }

    @Override
    public Page<Application> findByHrIdAndStatus(String hrId, EApplyStatus status, Pageable pageable) {
        return applicationRepository.findByHrIdAndStatus(hrId,status,pageable);
    }
}
