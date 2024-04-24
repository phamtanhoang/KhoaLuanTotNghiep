package com.pth.taskbackend.repository;

import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<Job, String> {
    @Query("SELECT j FROM Job j " +
            "INNER JOIN j.humanResource hr " +
            "INNER JOIN hr.employer e " +
            "WHERE (:keyword IS NULL OR " +
            "       (LOWER(j.name) LIKE %:keyword% " +
            "       OR LOWER(j.description) LIKE %:keyword% " +
            "       OR LOWER(j.experience) LIKE %:keyword% " +
            "       OR LOWER(e.name) LIKE %:keyword%)) " +
            "AND (:location IS NULL OR LOWER(j.location) LIKE %:location%) " +
            "AND (:fromSalary IS NULL OR j.fromSalary = :fromSalary) " +
            "AND (:toSalary IS NULL OR j.toSalary = :toSalary) " +
            "AND (:categoryId IS NULL OR j.category.id = :categoryId) " +
            "AND j.status = 'ACTIVE' " +
            "AND j.toDate > CURRENT_TIMESTAMP " +
            "ORDER BY j.created DESC")
    Page<Job> findBySorting(
            @Param("keyword") String keyword,
            @Param("location") String location,
            @Param("fromSalary") String fromSalary,
            @Param("toSalary") String toSalary,
            @Param("categoryId") String categoryId,
            Pageable pageable);

    Page<Job>findByNameContainingAndCategoryIdAndStatus(String name,String categoryId,EStatus status,Pageable pageable);


    @Query("SELECT j FROM Job j " +
            "WHERE (:status IS NULL OR j.status = :status) " +

            "And j.humanResource.employer.id=:employerId " +
            "ORDER BY j.created DESC")
    Page<Job>findByEmployerIdAndStatus(String employerId,EStatus status,Pageable pageable);
    Page<Job>findByStatusOrderByCreatedDesc(EStatus status, Pageable pageable);

    @Query("SELECT j FROM Job j " +
            "INNER JOIN j.category c " +
            "WHERE (:keyword IS NULL OR " +
            "       (LOWER(j.name) LIKE %:keyword% " +
            "       OR LOWER(j.description) LIKE %:keyword% " +
            "       OR LOWER(j.experience) LIKE %:keyword% " +
            "       OR LOWER(c.name) LIKE %:keyword%)) " +
            "AND  j.status = :status " +
            "AND (:categoryId IS NULL OR j.category.id = :categoryId) " +
            "And j.humanResource.id=:hRId " +
            "AND  j.status !='DELETED' " +
            "ORDER BY j.created DESC")
    Page<Job> findByKeywordAndStatusAndCategoryIdAndHRId(
            @Param("keyword") String keyword,
            @Param("status") EStatus status,
            @Param("categoryId") String categoryId,
            @Param("hRId")String hRId,
            Pageable pageable);
    @Query("SELECT j FROM Job j " +
            "INNER JOIN j.category c " +
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
            "WHERE (:keyword IS NULL OR " +
            "       (LOWER(j.name) LIKE %:keyword% " +
            "       OR LOWER(j.description) LIKE %:keyword% " +
            "       OR LOWER(j.experience) LIKE %:keyword% " +
            "       OR LOWER(j.category.name) LIKE %:keyword%)) " +
            "AND (:status IS NULL OR :status = '' OR j.status = :status) " +
            "AND (:categoryId IS NULL OR :categoryId = '' OR j.category.id = :categoryId) " +
            "AND j.humanResource.employer.id = :employerId " +
            "AND  j.status != 'DELETED' " +
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
            "WHERE (:keyword IS NULL OR " +
            "       (LOWER(j.name) LIKE %:keyword% " +
            "       OR LOWER(j.description) LIKE %:keyword% " +
            "       OR LOWER(j.experience) LIKE %:keyword% " +
            "       OR LOWER(j.category.name) LIKE %:keyword%)) " +
            "AND (:categoryId IS NULL or (:categoryId = '')  OR j.category.id = :categoryId) " +
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
}

