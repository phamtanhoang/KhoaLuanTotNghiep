package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.Process;
import io.jsonwebtoken.io.IOException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ProcessService {
    Process create(Process process)throws IOException;
    Process update(Process process)throws IOException;
    void deleteById(String id)throws IOException;
    void delete(Process process)throws IOException;
    Optional<Process>findByJobId(String jobId)throws IOException;

    Page<Process>findByEmployerId(String employerId, Pageable pageable)throws IOException;
    Optional<Process>findByName(String name)throws IOException;
    Optional<Process>findById(String id)throws IOException;
}
