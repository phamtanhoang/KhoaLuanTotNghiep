package com.pth.taskbackend.service;

import com.pth.taskbackend.enums.EApplyStatus;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Application;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.Optional;

public interface ApplicationService {

    Application create(Application application) throws IOException;

    Application Update(Application application)throws IOException;
    void deleteById(String id)throws IOException;
    void delete(Application application)throws IOException;
    Optional<Application>findById(String id);
    Optional<Application> findByJobIdAndCandidateId(String jobId, String candidateId)throws IOException;
    Optional<Application> findByIdAndCandidateId(String id, String candidateId)throws IOException;

    Page<Application> findByCandidateId(String candidateId,String name, String location, EApplyStatus status, Pageable pageable)throws IOException;

    Page<Application> findByEmployerId(String employerId, Pageable pageable)throws IOException;

    Page<Application> findByHrId(String hrId, Pageable pageable)throws IOException;

    Page<Application> findByJobId(String jobId, Pageable pageable)throws IOException;
    Optional<Application>findByIdAndJobHumanResourceId(String id, String humanResourceId)throws IOException;
    Optional<Application>findByIdAndJobHumanResourceEmployerId(String id, String employerId)throws IOException;

    Page<Application> findByEmployerIdAndStatusAndNameContaining(String employerId, EApplyStatus status, String keyword, Pageable pageable)throws IOException;
    Page<Application> findByHRIdAndStatusAndNameContaining(String hrId, EApplyStatus status, String keyword, Pageable pageable) throws  IOException;
    Page<Application>findByEmployerIdAndStatus(String employerId, EApplyStatus status, Pageable pageable)throws IOException;
    Page<Application> findByHrIdAndStatus(String hrId, EApplyStatus status, Pageable pageable)throws IOException;
}
