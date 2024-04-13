package com.pth.taskbackend.service;

import com.pth.taskbackend.enums.EApplyStatus;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Application;
import io.jsonwebtoken.io.IOException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ApplicationService {

    Application create(Application application) throws IOException;

    Application Update(Application application)throws IOException;
    void deleteById(String id)throws IOException;
    void delete(Application application)throws IOException;
    Optional<Application>findById(String id);
    Optional<Application> findByJobIdAndCandidateId(String jobId, String candidateId)throws IOException;

    Page<Application> findByCandidateId(String candidateId, Pageable pageable)throws IOException;

    Page<Application> findByEmployerId(String employerId, Pageable pageable)throws IOException;

    Page<Application> findByHrId(String hrId, Pageable pageable)throws IOException;

    Page<Application> findByJobId(String jobId, Pageable pageable)throws IOException;


    Page<Application> findByEmployerIdAndStatusAndNameContaining(String employerId, EApplyStatus status, String keyword, Pageable pageable)throws IOException;

    Page<Application>findByEmployerIdAndStatus(String employerId, EApplyStatus status, Pageable pageable)throws IOException;
    Page<Application> findByHrIdAndStatus(String hrId, EStatus status, Pageable pageable)throws IOException;
}
