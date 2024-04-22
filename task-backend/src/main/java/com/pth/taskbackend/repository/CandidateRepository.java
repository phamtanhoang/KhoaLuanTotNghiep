package com.pth.taskbackend.repository;

import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Candidate;
import com.pth.taskbackend.model.meta.Employer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, String> {
    @Query("SELECT c FROM Candidate c, User u " +
            "WHERE (c.user = u) " +
            "AND (:keyword IS NULL OR c.firstName LIKE %:keyword% OR u.email LIKE %:keyword% OR c.lastName LIKE %:keyword%) " +
            "AND (:status IS NULL OR u.status = :status) " +
            "AND u.status <> 'DELETED'")
    Page<Candidate> findByKeywordAndUserStatus(String keyword, EStatus status, Pageable pageable);

    Optional<Candidate>findByUserEmail(String email);
    @Query("SELECT distinct c FROM Candidate c " +
            "JOIN  User a on c.user.id=a.id "+
            "JOIN VipCandidate v ON c.id = v.candidate.id " +
            "WHERE DATE(v.fromDate) <= CURRENT_DATE() AND DATE(v.toDate) >= CURRENT_DATE()" +
            "And a.status='ACTIVE'")
    Page<Candidate> findVipCandidates(Pageable pageable);

}
