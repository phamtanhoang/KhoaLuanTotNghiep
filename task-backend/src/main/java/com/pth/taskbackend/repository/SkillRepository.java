package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.Skill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<Skill,String> {
    Page<Skill>findByCandidateId(String id, Pageable pageable);
    void deleteAllByCandidateId(String candidateId);
}
