package com.pth.taskbackend.service;

import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Candidate;
import io.jsonwebtoken.io.IOException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface CandidateService {

    Page<Candidate>findByKeywordAndStatus(String keyword, EStatus status, Pageable pageable) throws IOException;
    Optional<Candidate>findById(String id) throws IOException;
    Candidate create(Candidate candidate, MultipartFile avatar) throws IOException, java.io.IOException;
    Candidate update(Candidate candidate) throws IOException, java.io.IOException;

    Candidate updateAvatar(Candidate candidate, MultipartFile avatar) throws java.io.IOException;
    void delete (Candidate candidate) throws IOException;
    void deleteById(String id) throws IOException;

    Optional<Candidate>findByUserEmail(String email);

}
