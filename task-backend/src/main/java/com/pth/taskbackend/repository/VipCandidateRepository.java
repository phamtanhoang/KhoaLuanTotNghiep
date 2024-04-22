package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.VipCandidate;
import com.pth.taskbackend.model.meta.VipEmployer;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public interface VipCandidateRepository extends JpaRepository<VipCandidate, String> {
    @Query("SELECT CASE WHEN COUNT(v) > 0 THEN true ELSE false END FROM VipCandidate v WHERE v.candidate.id = :candidateId AND v.toDate > CURRENT_DATE()")
    boolean isVip(@Param("candidateId") String candidateId);

    @Query("SELECT v FROM VipCandidate v WHERE v.candidate.id = :candidateId AND DATE(v.toDate) >= CURRENT_DATE() AND v.toDate = (SELECT MAX(v.toDate) FROM VipCandidate v WHERE v.candidate.id = :candidateId)")
    Optional<VipCandidate> findLatestByCandidateId(@Param("candidateId") String candidateId);

    @Query("SELECT COALESCE(SUM(c.price), 0) FROM VipCandidate c ")
    float sumPrice();

    @Query("SELECT COUNT(v) FROM VipCandidate v " +
            "WHERE v.id IN (" +
            "   SELECT MAX(v2.id) FROM VipCandidate v2 " +
            "   WHERE v2.candidate = v.candidate AND v2.toDate > CURRENT_DATE()" +
            "   GROUP BY v2.candidate" +
            ")")
    Long countValidVipCandidates();
}
