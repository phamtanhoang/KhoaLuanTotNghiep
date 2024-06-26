package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.Step;
import io.jsonwebtoken.io.IOException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface StepService {
    Step create(Step step)throws IOException;
    Step update(Step step)throws IOException;
    void  deleteById(String id)throws IOException;
    void delete(Step step)throws IOException;
    void deleteAllByProcessId(String processId);
    Optional<Step>findById(String id)throws IOException;
    Page<Step> findByProcessId(String id, Pageable pageable)throws IOException;
    Optional<Step>findByProcessIdAndNumber(String processId,int number);

    Long countAllByProcessId(String processId);
    List<Step> findByProcessId(String processId);

}
