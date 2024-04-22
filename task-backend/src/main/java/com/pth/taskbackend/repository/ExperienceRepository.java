package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.Experience;
import com.pth.taskbackend.model.meta.Skill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience,String> {
    Page<Experience> findByCandidateIdOrderBySequenceAsc(String id, Pageable pageable);
    void deleteAllByCandidateId(String candidateId);

}
