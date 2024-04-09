package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.Process;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ProcessService {
    Process create(Process process);
    Process update(Process process);
    void deleteById(String id);
    void delete(Process process);
    Optional<Process>findByJobId(String jobId);

    Page<Process>findByEmployerId(String employerId, Pageable pageable);
    Optional<Process>findByName(String name);
    Optional<Process>findById(String id);
}
