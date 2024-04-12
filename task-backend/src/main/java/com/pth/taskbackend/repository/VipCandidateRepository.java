package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.VipCandidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VipCandidateRepository extends JpaRepository<VipCandidate, String> {
    @Query("SELECT CASE WHEN COUNT(v) > 0 THEN true ELSE false END FROM VipCandidate v WHERE v.candidate.id = :candidateId AND v.toDate > CURRENT_DATE()")
    boolean isVip(@Param("candidateId") String candidateId);
}
