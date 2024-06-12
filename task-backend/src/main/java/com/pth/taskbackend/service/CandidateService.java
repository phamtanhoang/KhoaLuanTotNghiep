package com.pth.taskbackend.service;

import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Candidate;
import com.pth.taskbackend.model.meta.Employer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface CandidateService {

    Page<Candidate> findByKeywordAndStatus(String keyword, EStatus status, Pageable pageable) throws IOException;

    Optional<Candidate> findById(String id) throws IOException;

    Candidate create(Candidate candidate, MultipartFile avatar) throws IOException;

    Candidate update(Candidate candidate) throws IOException;

    Candidate updateAvatar(Candidate candidate, MultipartFile avatar) throws IOException;

    void delete(Candidate candidate) throws IOException;

    void deleteById(String id) throws IOException;

    Optional<Candidate> findByUserEmail(String email) throws IOException;

    Page<Candidate> findVipCandidates(Pageable pageable) throws IOException;

    Page<Candidate> findVipCandidateByKeyword(String keyword, Pageable pageable) throws IOException;

    Page<Candidate> findCV(String job, String address, String skill, Pageable pageable) throws IOException;

    Long count() throws IOException;

    Integer countCandidate_Admin() throws IOException;

    Page<Candidate> getCandidatesFollow(String id, Pageable pageable) throws IOException;

    List<Candidate> getCandidatesFollow(String id) throws IOException;

    boolean checkIsFollow_Employer_Candidate(String employerId, String candidateId);

    void follow_Employer_Candidate(String employerId, String candidateId);

    void unfollow_Employer_Candidate(String employerId, String candidateId);

    Page<Candidate> getCandidatesSaved_Employer(String employerId, Pageable pageable);

    boolean checkIsFollow_HR_Candidate(String hrId, String candidateId);

    void follow_HR_Candidate(String hrId, String candidateId);

    void unfollow_HR_Candidate(String hrId, String candidateId);

    Page<Candidate> getCandidatesSaved_HR(String hrId, Pageable pageable);
}
