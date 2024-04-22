package com.pth.taskbackend.repository;

import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Candidate;
import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.model.meta.HumanResource;
import com.pth.taskbackend.service.HumanResourceService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public interface HumanResourceRepository extends JpaRepository<HumanResource, String> {

    Optional<HumanResource>findByUserEmail(String email);

    @Query("SELECT hr FROM HumanResource hr " +
            "WHERE (:keyword IS NULL OR hr.firstName LIKE %:keyword% " +
            "OR hr.lastName LIKE %:keyword% " +
            "OR hr.user.email LIKE %:keyword%) " +
            "AND (:status IS NULL OR hr.user.status = :status)" +
            "AND hr.user.status <> 'DELETED' " )
    Page<HumanResource> findByKeywordAndStatus(String keyword, EStatus status, Pageable pageable);

    @Query("SELECT hr FROM HumanResource hr " +
            "WHERE (:keyword IS NULL OR hr.firstName LIKE %:keyword% " +
            "OR hr.lastName LIKE %:keyword% " +
            "OR hr.user.email LIKE %:keyword%) " +
            "AND (:status IS NULL OR hr.user.status = :status) " +
            "AND hr.user.status <> 'DELETED' " +
            "AND hr.employer.id = :employerId")
    Page<HumanResource> findByKeywordAndStatusAndEmployerId(String keyword, EStatus status, String employerId, Pageable pageable);

    Page<HumanResource>findByEmployerId(String id, Pageable pageable);
    Optional<HumanResource>findByIdAndEmployerId(String id, String employerId);
}
