package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.Process;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ProcessRepository extends JpaRepository<Process,String> {
    @Query("SELECT p FROM Process p JOIN Job j WHERE j.process.id = :processId")
    Optional<Process>findByJobId(String processId);
    Page<Process>findByEmployerId(String id, Pageable pageable);
    Optional<Process>findByName(String name);
    Optional<Process>findByNameAndEmployerId(String name, String employerId);

    @Query("SELECT p FROM Process p WHERE (:name IS NULL OR p.name LIKE %:name%)")
    Page<Process> findByNameContaining(String name, Pageable pageable);
}
