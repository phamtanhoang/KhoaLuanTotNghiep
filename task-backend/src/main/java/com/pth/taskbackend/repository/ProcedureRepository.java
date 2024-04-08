package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.Procedure;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ProcedureRepository extends JpaRepository<Procedure,String> {
    @Query("SELECT p FROM Procedure p JOIN Job j WHERE j.procedure.id = :procedureId")
    Optional<Procedure>findByJobId(String procedureId);
    Page<Procedure>findByEmployerId(String id, Pageable pageable);
    Optional<Procedure>findByName(String name);
}
