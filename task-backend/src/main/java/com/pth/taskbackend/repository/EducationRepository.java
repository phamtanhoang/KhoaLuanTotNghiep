package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.Education;
import com.pth.taskbackend.model.meta.Experience;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EducationRepository extends JpaRepository<Education,String> {
    Page<Education> findByCandidateIdOrderBySequenceAsc(String id, Pageable pageable);
    void deleteAllByCandidateId(String candidateId);

}
