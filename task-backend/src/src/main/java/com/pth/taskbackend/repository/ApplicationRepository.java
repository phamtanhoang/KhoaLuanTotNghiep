package com.pth.taskbackend.repository;

import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Application;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    Optional<Application>findByJobIdAndCandidateId(String jobId, String candidateId);
    Page<Application> findByCandidateId(String candidate_id, Pageable pageable);


    @Query("SELECT app FROM Application app " +
            "JOIN FETCH app.job job " +
            "JOIN FETCH job.humanResource hr " +
            "JOIN FETCH hr.employer employer " +
            "WHERE employer.id = :employerId " +
            "ORDER BY app.created DESC")
    Page<Application> findByEmployerId(String employerId, Pageable pageable);

    @Query("SELECT app FROM Application app " +
            "JOIN FETCH app.job job " +
            "JOIN FETCH job.humanResource hr " +
            "WHERE hr.id = :hrId " +
            "ORDER BY app.created DESC")
    Page<Application> findByHrId(Long hrId, Pageable pageable);

    Page<Application> findByJobId(String jobId, Pageable pageable);

    @Query("SELECT app FROM Application app " +
            "JOIN FETCH app.job job " +
            "JOIN FETCH job.humanResource hr " +
            "JOIN FETCH hr.employer employer " +
            "WHERE employer.id = :employerId " +
            "AND app.status = :status " +
            "ORDER BY app.created DESC")
    Page<Application> findByEmployerIdAndStatus(String employerId, EStatus status, Pageable pageable);

    @Query("SELECT app FROM Application app " +
            "JOIN FETCH app.job job " +
            "JOIN FETCH job.humanResource hr " +
            "WHERE hr.id = :hrId " +
            "AND app.status = :status " +
            "ORDER BY app.created DESC")
    Page<Application> findByHrIdAndStatus(Long hrId, EStatus status, Pageable pageable);


}
