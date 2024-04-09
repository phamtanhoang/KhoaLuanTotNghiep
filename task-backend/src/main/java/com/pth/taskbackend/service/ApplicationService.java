package com.pth.taskbackend.service;

import com.pth.taskbackend.enums.EApplyStatus;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Application;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ApplicationService {

    Application create(Application application);

    Application Update(Application application);
    void deleteById(String id);
    void delete(Application application);
    Optional<Application> findByJobIdAndCandidateId(String jobId, String candidateId);

    Page<Application> findByCandidateId(String candidateId, Pageable pageable);

    Page<Application> findByEmployerId(String employerId, Pageable pageable);

    Page<Application> findByHrId(Long hrId, Pageable pageable);

    Page<Application> findByJobId(String jobId, Pageable pageable);


    Page<Application> findByEmployerIdAndStatusAndNameContaining(String employerId, EApplyStatus status, String keyword, Pageable pageable);

    Page<Application>findByEmployerIdAndStatus(String employerId, EApplyStatus status, Pageable pageable);
    Page<Application> findByHrIdAndStatus(Long hrId, EStatus status, Pageable pageable);
}
