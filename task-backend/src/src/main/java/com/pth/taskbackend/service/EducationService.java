package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.Education;
import io.jsonwebtoken.io.IOException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface EducationService {
    Optional<Education> findById(String id) throws IOException;
    public List<Education> save(List<Education> education)  throws IOException, java.io.IOException;

    Page<Education> findByCandidateId(String id, Pageable pageable);
    void delete (Education education) throws IOException;
    void deleteById(String id) throws IOException;
}
