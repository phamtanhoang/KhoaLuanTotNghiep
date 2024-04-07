package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.Experience;
import com.pth.taskbackend.model.meta.Skill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExperienceRepository extends JpaRepository<Experience,String> {
    Page<Experience> findByCandidateId(String id, Pageable pageable);

}
