package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.Collection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CollectionRepository  extends JpaRepository<Collection,String> {

    Page<Collection> findByCandidateId(String candidateId, Pageable pageable);

    @Query("SELECT c FROM Collection c WHERE c.id = :id AND c.candidate.id = :candidateId")
    Optional<Collection> findByIdAndCandidateId(String id, String candidateId);
}
