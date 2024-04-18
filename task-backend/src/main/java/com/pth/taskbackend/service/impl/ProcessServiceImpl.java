package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.model.meta.Process;
import com.pth.taskbackend.repository.ProcessRepository;
import com.pth.taskbackend.service.ProcessService;
import io.jsonwebtoken.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProcessServiceImpl implements ProcessService
{
    @Autowired
    ProcessRepository processRepository;
    @Override
    public Process create(Process process) {
        return processRepository.save(process);
    }

    @Override
    public Process update(Process process) {
        return processRepository.save(process);

    }

    @Override
    public void deleteById(String id) {

    }

    @Override
    public void delete(Process process) {
        processRepository.delete(process);
    }

    @Override
    public Optional<Process> findByJobId(String jobId) {
        return processRepository.findByJobId(jobId);
    }

    @Override
    public Page<Process> findByEmployerId(String employerId, Pageable pageable) {
        return processRepository.findByEmployerId(employerId,pageable);
    }

    @Override
    public Optional<Process> findByName(String name) {
        return processRepository.findByName(name);
    }

    @Override
    public Optional<Process> findById(String id) {
        return processRepository.findById(id);
    }

    @Override
    public Page<Process> findByNameContaining(String name, Pageable pageable) {
        return processRepository.findByNameContaining(name,pageable);
    }

    @Override
    public Optional<Process> findByNameAndEmployerId(String name, String employerId ) throws IOException {
        return processRepository.findByNameAndEmployerId(name,employerId);
    }
    @Override
    public Optional<Process> findByIdAndEmployerId(String id, String employerId ) throws IOException {
        return processRepository.findByIdAndEmployerId(id,employerId);
    }

    @Override
    public List<Process> findProcessesWithIdInJob(String id ) throws IOException {
        return processRepository.findProcessesWithIdInJob(id);
    }

    @Override
    public Page<Object[]> findProcessWithStepCountByNameContainingAndEmployerId(String name, String employerId, Pageable pageable) {
        return processRepository.findProcessWithStepCountByNameContainingAndEmployerId(name,employerId,pageable);

    }


}
