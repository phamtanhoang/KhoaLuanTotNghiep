package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.Step;
import io.jsonwebtoken.io.IOException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface StepService {
    Step create(Step step)throws IOException;
    Step update(Step step)throws IOException;
    void  deleteById(String id)throws IOException;
    void delete(Step step)throws IOException;
    Optional<Step>findById(String id)throws IOException;
    Page<Step> findByProcedureId(String id, Pageable pageable)throws IOException;
}
