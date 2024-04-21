package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.Process;
import io.jsonwebtoken.io.IOException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
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
    Page<Process>findByNameContaining(String name, Pageable pageable);
    Optional<Process>findByNameAndEmployerId(String name, String employerId )throws  IOException;
     Optional<Process> findByIdAndEmployerId(String id, String employerId ) throws  IOException;
    List<Process> findProcessesWithIdInJob(String id) throws  IOException;

    List<Object[]> findByEmployerId( String employerId)throws IOException;
    List<Object[]> findByHrId( String hrId)throws IOException;

    Page<Object[]>findProcessWithStepCountByNameContainingAndEmployerId(String name, String employerId, Pageable pageable);
}
