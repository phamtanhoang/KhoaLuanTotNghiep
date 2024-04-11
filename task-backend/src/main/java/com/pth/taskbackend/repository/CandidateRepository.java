package com.pth.taskbackend.repository;

import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Candidate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CandidateRepository extends JpaRepository<Candidate, String> {
    @Query("SELECT c FROM Candidate c JOIN c.user u " +
            "WHERE (:keyword IS NULL OR c.firstName LIKE %:keyword%) " +
            "OR (:keyword IS NULL OR u.email LIKE %:keyword%) " +
            "OR (:keyword IS NULL OR c.lastName LIKE %:keyword%) " +
            "AND (:status IS NULL OR u.status = :status) "+
            "AND u.status <> 'DELETED'")
    Page<Candidate> findByKeywordAndUserStatus(String keyword, EStatus status, Pageable pageable);

    Optional<Candidate>findByUserEmail(String email);
}
