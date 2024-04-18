package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.Experience;
import io.jsonwebtoken.io.IOException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ExperienceService {
    Optional<Experience> findById(String id) throws IOException;
    public List<Experience> save(List<Experience> experiences)  throws IOException;

    Page<Experience> findByCandidateId(String id, Pageable pageable)throws IOException;
    void delete (Experience experience) throws IOException;
    void deleteById(String id) throws IOException;
    void deleteAllByCandidateId(String candidateId) throws IOException;

}
