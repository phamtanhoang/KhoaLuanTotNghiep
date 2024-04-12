package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.VipCandidate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VipCandidateRepository extends JpaRepository<VipCandidate, String> {
}
