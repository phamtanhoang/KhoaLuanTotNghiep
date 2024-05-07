package com.pth.taskbackend.repository;

import com.pth.taskbackend.enums.EApplyStatus;
import com.pth.taskbackend.model.meta.Application;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, String> {

    @Query("SELECT app FROM Application app " +
            "JOIN FETCH app.job job " +
            "JOIN FETCH app.candidate c " +
            "WHERE c.id = :candidateId " +
            "And job.id = :jobId " +
            "And app.status!='DELETED' " +
            "ORDER BY app.created DESC")
    Optional<Application>findByJobIdAndCandidateId(String jobId, String candidateId);


    @Query("SELECT app FROM Application app " +
            "JOIN FETCH app.candidate c " +
            "WHERE c.id = :candidateId " +
            "And app.status!='DELETED' " +
            "ORDER BY app.created DESC")
    Page<Application> findByCandidateId(String candidateId, Pageable pageable);

    @Query("SELECT app FROM Application app " +
            "JOIN FETCH app.job job " +
            "JOIN FETCH job.humanResource hr " +
            "JOIN FETCH hr.employer employer " +
            "WHERE employer.id = :employerId " +
            "And app.status!='DELETED' " +
            "ORDER BY app.created DESC")
    Page<Application> findByEmployerId(String employerId, Pageable pageable);

    @Query("SELECT app FROM Application app " +
            "JOIN FETCH app.job job " +
            "JOIN FETCH job.humanResource hr " +
            "WHERE hr.id = :hrId " +
            "And app.status!='DELETED' " +
            "ORDER BY app.created DESC")
    Page<Application> findByHrId(String hrId, Pageable pageable);

    @Query("SELECT app FROM Application app " +
            "JOIN FETCH app.job job " +
            "WHERE job.id = :jobId " +
            "And app.status!='DELETED' " +
            "ORDER BY app.created DESC")
    Page<Application> findByJobId(String jobId, Pageable pageable);

    @Query("SELECT app FROM Application app " +
            "JOIN FETCH app.job job " +
            "JOIN FETCH job.humanResource hr " +
            "JOIN FETCH hr.employer employer " +
            "WHERE employer.id = :employerId " +
            "AND (:status IS NULL OR :status = '' OR app.status = :status) " +
            "AND job.name LIKE %:keyword% "+
            "And app.status!='DELETED' " +
            "ORDER BY app.created DESC")
    Page<Application> findByEmployerIdAndStatusAndNameContaining(@Param("employerId") String employerId,
                                                                 @Param("status") EApplyStatus status,
                                                                 @Param("keyword") String keyword,
                                                                 Pageable pageable);
    @Query("SELECT app FROM Application app " +
            "JOIN FETCH app.candidate c " +
            "JOIN FETCH app.job j " +
            "WHERE c.id = :candidateId " +
            "AND (:status IS NULL OR app.status = :status) " +
            "AND j.name LIKE %:keyword% " +
            "AND j.location LIKE %:location% " +
            "AND app.status != 'DELETED' " +
            "ORDER BY app.created DESC")
    Page<Application> findByCandidateIdAndNameContainingAndLocationContainingAndStatus(
            @Param("candidateId") String candidateId,
            @Param("status") EApplyStatus status,
            @Param("keyword") String keyword,
            @Param("location") String location,
            Pageable pageable);

    @Query("SELECT app FROM Application app " +
            "JOIN FETCH app.job job " +
            "JOIN FETCH job.humanResource hr " +
            "WHERE hr.id = :hrId " +
            "AND (:status IS NULL OR :status = '' OR app.status = :status) " +
            "AND job.name LIKE %:keyword% "+
            "And app.status!='DELETED' " +
            "ORDER BY app.created DESC")
    Page<Application> findByHRIdAndStatusAndNameContaining(@Param("hrId") String hrId,
                                                                 @Param("status") EApplyStatus status,
                                                                 @Param("keyword") String keyword,
                                                                 Pageable pageable);
    @Query("SELECT app FROM Application app " +
            "JOIN FETCH app.job job " +
            "JOIN FETCH job.humanResource hr " +
            "JOIN FETCH hr.employer employer " +
            "WHERE employer.id = :employerId " +
            "AND (:status IS NULL OR :status = '' OR app.status = :status) " +
            "And app.status!='DELETED' " +
            "ORDER BY app.created DESC")
    Page<Application> findByEmployerIdAndStatus(@Param("employerId") String employerId,
                                                @Param("status") EApplyStatus status,
                                                Pageable pageable);

    @Query("SELECT app FROM Application app " +
            "JOIN FETCH app.job job " +
            "JOIN FETCH job.humanResource hr " +
            "WHERE hr.id = :hrId " +
            "AND (:status IS NULL OR :status = '' OR app.status = :status) " +
            "And app.status!='DELETED' " +
            "ORDER BY app.created DESC")
    Page<Application> findByHrIdAndStatus(String hrId, EApplyStatus status, Pageable pageable);

    Optional<Application>findByIdAndJobHumanResourceId(String id, String humanResourceId);
    Optional<Application>findByIdAndCandidateId(String id, String candidateId);
    Optional<Application>findByIdAndJobHumanResourceEmployerId(String id, String employerId);


}
