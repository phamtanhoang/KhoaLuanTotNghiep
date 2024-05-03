package com.pth.taskbackend.repository;

import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Job;
import com.pth.taskbackend.model.meta.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestHeader;

@Repository
public interface JobRepository extends JpaRepository<Job, String> {
    @Query("SELECT j FROM Job j " +
            "INNER JOIN j.humanResource hr " +
            "INNER JOIN hr.employer e " +
            "LEFT JOIN j.tags jt " +
            "WHERE (:keyword IS NULL OR " +
            "       (LOWER(j.name) LIKE %:keyword% " +
            "       OR LOWER(j.description) LIKE %:keyword% " +
            "       OR LOWER(e.name) LIKE %:keyword%)) " +
            "AND (:experience IS NULL OR :experience = '' OR j.experience = :experience) " +
            "AND (:location IS NULL OR :location = '' OR LOWER(j.location) LIKE %:location%) " +
            "AND (COALESCE(:categoryId, '') = '' OR j.category.id = :categoryId) " +
            "AND j.status = 'ACTIVE' " +
            "AND j.toDate > CURRENT_TIMESTAMP " +
            "AND (:fromDate IS NULL OR j.created >= :fromDate) " +
            "AND (:tag IS NULL OR :tag = '' OR jt.id = :tag) " +
            "AND (:isVip IS NULL  OR  :isVip = false OR e IN (SELECT DISTINCT e FROM Employer e " +
            "JOIN VipEmployer v ON e.id = v.employer.id " +
            "WHERE DATE(v.fromDate) <= CURRENT_DATE() AND DATE(v.toDate) >= CURRENT_DATE())) " +
            "ORDER BY j.created DESC")
    Page<Job> findBySorting(
            @Param("keyword") String keyword,
            @Param("location") String location,
            @Param("experience") String experience,
            @Param("fromDate") LocalDateTime fromDate,
            @Param("categoryId") String categoryId,
            @Param("isVip") boolean isVip,
            @Param("tag") String tag,
            Pageable pageable);


    @Query("SELECT j FROM Job j " +
            "WHERE (:keyword IS NULL OR " +
            "       (LOWER(j.name) LIKE %:keyword%)) " +
            "AND (COALESCE(:categoryId, '') = '' OR j.category.id = :categoryId) " +
            "AND j.status != 'DELETED' " +
            "AND (:status IS NULL OR:status = ''  OR j.status = :status) " +
            "AND j.toDate > CURRENT_TIMESTAMP " +
            "ORDER BY j.created DESC")
    Page<Job>findByNameContainingAndCategoryIdAndStatus(String keyword,String categoryId,EStatus status,Pageable pageable);


    @Query("SELECT j FROM Job j " +
            "WHERE (:status IS NULL OR j.status = :status) " +
            "And j.humanResource.employer.id=:employerId " +
            "ORDER BY j.created DESC")
    Page<Job>findByEmployerIdAndStatus(String employerId,EStatus status,Pageable pageable);
    Page<Job>findByStatusOrderByCreatedDesc(EStatus status, Pageable pageable);

    @Query("SELECT j FROM Job j " +
            "left JOIN j.category c " +
            "WHERE (:keyword IS NULL OR " +
            "       (LOWER(j.name) LIKE %:keyword% " +
            "       OR LOWER(j.description) LIKE %:keyword% " +
            "       OR LOWER(j.experience) LIKE %:keyword% " +
            "       OR LOWER(c.name) LIKE %:keyword%)) " +
            "AND (:status IS NULL OR :status = '' OR j.status = :status) " +
            "AND (COALESCE(:categoryId, '') = '' OR j.category.id = :categoryId) " +
            "AND j.humanResource.id = :hRId " +
            "AND j.status != 'DELETED' " +
            "ORDER BY j.created DESC")
    Page<Job> findByKeywordAndStatusAndCategoryIdAndHRId(
            @Param("keyword") String keyword,
            @Param("status") EStatus status,
            @Param("categoryId") String categoryId,
            @Param("hRId") String hRId,
            Pageable pageable);

    @Query("SELECT j FROM Job j " +
            "left JOIN j.category c " +
            "WHERE (:keyword IS NULL OR " +
            "       (LOWER(j.name) LIKE %:keyword% " +
            "       OR LOWER(j.description) LIKE %:keyword% " +
            "       OR LOWER(j.experience) LIKE %:keyword% " +
            "       OR LOWER(c.name) LIKE %:keyword%)) " +
            "AND (:categoryId IS NULL or (:categoryId = '') OR j.category.id = :categoryId) " +
            "And j.humanResource.id=:hRId " +
            "AND  j.status !='DELETED' " +
            "ORDER BY j.created DESC")
    Page<Job> findByKeywordAndCategoryIdAndHRId(
            @Param("keyword") String keyword,
            @Param("categoryId") String categoryId,
            @Param("hRId")String hRId,
            Pageable pageable);

    @Query("SELECT j FROM Job j " +
            "LEFT JOIN j.category c " +
            "WHERE (:keyword IS NULL OR " +
            "       (LOWER(j.name) LIKE %:keyword% " +
            "       OR LOWER(j.description) LIKE %:keyword% " +
            "       OR LOWER(j.experience) LIKE %:keyword% " +
            "       OR LOWER(c.name) LIKE %:keyword%)) " +
            "AND (:status IS NULL OR :status = '' OR j.status = :status) " +
            "AND (COALESCE(:categoryId, '') = '' OR j.category.id = :categoryId) " +
            "AND j.humanResource.employer.id = :employerId " +
            "AND j.status != 'DELETED' " +
            "ORDER BY j.created DESC")
    Page<Job> findByKeywordAndStatusAndCategoryIdAndEmployerId(
            @Param("keyword") String keyword,
            @Param("status") EStatus status,
            @Param("categoryId") String categoryId,
            @Param("employerId") String employerId,
            Pageable pageable);


    @Query("SELECT j FROM Job j " +
            "WHERE j.id = :id " +
            "AND j.humanResource.employer.id = :employerId " +
            "AND j.status != 'DELETED'")
    Optional<Job> findByIdAndEmployerId(@Param("id") String id, @Param("employerId") String employerId);

    @Query("SELECT j FROM Job j " +
            "WHERE j.id = :id " +
            "AND j.humanResource.id = :hrId " +
            "AND j.status != 'DELETED'")
    Optional<Job>findByIdAndHRId(String id,String hrId);

    @Query("SELECT j FROM Job j " +
            "WHERE j.id = :id " +
            "AND (:status IS NULL OR :status = '' OR j.status = :status) " +
            "AND j.status != 'DELETED'")
    Optional<Job>findByIdAndStatus(String id,EStatus status);
    @Query("SELECT j FROM Job j " +
            "LEFT JOIN j.category c " +
            "WHERE (:keyword IS NULL OR " +
            "       (LOWER(j.name) LIKE %:keyword% " +
            "       OR LOWER(j.description) LIKE %:keyword% " +
            "       OR LOWER(j.experience) LIKE %:keyword% " +
            "       OR LOWER(j.category.name) LIKE %:keyword%)) " +
            "AND (COALESCE(:categoryId, '') = '' OR j.category.id = :categoryId) " +
            "AND j.humanResource.employer.id = :employerId " +
            "AND  j.status !='DELETED' " +
            "ORDER BY j.created DESC")
    Page<Job> findByKeywordAndCategoryIdAndEmployerId(
            @Param("keyword") String keyword,
            @Param("categoryId") String categoryId,
            @Param("employerId") String employerId,
            Pageable pageable);

    Page<Job>findByCategoryId(String id, Pageable pageable);

    Page<Job>findByProcessId(String id, Pageable pageable);

    @Query("SELECT j, (SELECT COUNT(a) FROM Application a WHERE a.job.id = j.id) AS applicationCount " +
            "FROM Job j " +
            "WHERE j.status = 'ACTIVE' " +
            "ORDER BY j.created DESC")
    Page<Object[]> findActiveJobsWithApplicationCount(Pageable pageable);
    @Query("SELECT COUNT(e) FROM Job e")
    Long countAll();


    @Query("SELECT j FROM Job j INNER JOIN j.candidates c WHERE c.id = :candidateId")
    Page<Job> findByCandidateId(String candidateId, Pageable pageable);
    @Query("SELECT j FROM Job j INNER JOIN j.candidates c WHERE c.id = :candidateId and j.id = :jobId")
    Optional<Job> findByCandidateIdAndJobId(String candidateId,String jobId);
    @Modifying
    @Query(value = "DELETE FROM saved_job WHERE job_id = :jobId and candidate_id = :candidateId ", nativeQuery = true)
    void deleteSavedJobByJobIdAndCandidateId(@Param("jobId") String jobId,@Param("candidateId")String candidateId);

    @Modifying
    @Query(value = "INSERT INTO saved_job(job_id, candidate_id) VALUES (:jobId, :candidateId)", nativeQuery = true)
    void saveJob(@Param("jobId") String jobId, @Param("candidateId") String candidateId);
}

