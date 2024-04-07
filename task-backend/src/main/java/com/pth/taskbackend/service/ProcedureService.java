package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.Procedure;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ProcedureService {
    Procedure create(Procedure procedure);
    Procedure update(Procedure procedure);
    void deleteById(String id);
    void delete(Procedure procedure);
    Optional<Procedure>findByJobId(String jobId);

    Page<Procedure>findByEmployerId(String employerId, Pageable pageable);
    Optional<Procedure>findByName(String name);
    Optional<Procedure>findById(String id);
}
