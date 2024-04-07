package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.model.meta.Procedure;
import com.pth.taskbackend.repository.ProcedureRepository;
import com.pth.taskbackend.service.ProcedureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProcedureServiceImpl implements ProcedureService
{
    @Autowired
    ProcedureRepository procedureRepository;
    @Override
    public Procedure create(Procedure procedure) {
        return procedureRepository.save(procedure);
    }

    @Override
    public Procedure update(Procedure procedure) {
        return procedureRepository.save(procedure);

    }

    @Override
    public void deleteById(String id) {

    }

    @Override
    public void delete(Procedure procedure) {

    }

    @Override
    public Optional<Procedure> findByJobId(String jobId) {
        return procedureRepository.findByJobId(jobId);
    }

    @Override
    public Page<Procedure> findByEmployerId(String employerId, Pageable pageable) {
        return procedureRepository.findByEmployerId(employerId,pageable);
    }

    @Override
    public Optional<Procedure> findByName(String name) {
        return procedureRepository.findByName(name);
    }

    @Override
    public Optional<Procedure> findById(String id) {
        return procedureRepository.findById(id);
    }
}
