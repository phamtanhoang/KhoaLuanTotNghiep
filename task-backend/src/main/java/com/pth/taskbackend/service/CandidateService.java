package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.Candidate;
import io.jsonwebtoken.io.IOException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface CandidateService {

    Page<Candidate>findByKeyword(String keyword, Pageable pageable) throws IOException;
    Optional<Candidate>findById(String id) throws IOException;
    Candidate create(Candidate candidate, MultipartFile avatar) throws IOException, java.io.IOException;
    Candidate update(Candidate candidate, MultipartFile avatar) throws IOException, java.io.IOException;
    void delete (Candidate candidate) throws IOException;
    void deleteById(String id) throws IOException;

}
