package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Candidate;
import com.pth.taskbackend.model.meta.Employer;
import com.pth.taskbackend.repository.CandidateRepository;
import com.pth.taskbackend.service.CandidateService;
import com.pth.taskbackend.util.func.FileUploadFunc;
import com.pth.taskbackend.util.func.ImageFunc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
@Service
public class CandidateServiceImpl implements CandidateService {
    @Autowired
    CandidateRepository candidateRepository;
    @Override
    public Page<Candidate> findByKeywordAndStatus(String keyword, EStatus status, Pageable pageable) {
        return candidateRepository.findByKeywordAndUserStatus(keyword,status,pageable);
    }

    @Override
    public Optional<Candidate> findById(String id) {
        return candidateRepository.findById(id);
    }

    @Override
    public Candidate create(Candidate candidate, MultipartFile avatar)  {

        FileUploadFunc fileUploadFunc = new FileUploadFunc();
        if(avatar!=null) {
            String uploadImage = fileUploadFunc.uploadImage(avatar);
            uploadImage = fileUploadFunc.getFullImagePath(uploadImage);
            candidate.setAvatar(uploadImage);
        }
            candidateRepository.save(candidate);
            return candidate;
    }

    @Override
    public Candidate update(Candidate candidate)  {



        candidateRepository.save(candidate);
        return candidate;
    }

    @Override
    public Candidate updateAvatar(Candidate candidate, MultipartFile avatar)  {

        FileUploadFunc fileUploadFunc = new FileUploadFunc();
        String uploadImage = fileUploadFunc.uploadImage(avatar);
        uploadImage=fileUploadFunc.getFullImagePath(uploadImage);
        candidate.setAvatar(uploadImage);

        candidateRepository.save(candidate);
        return candidate;
    }



    @Override
    public void delete(Candidate candidate) {
        candidateRepository.delete(candidate);
    }

    @Override
    public void deleteById(String id) {
        candidateRepository.deleteById(id);
    }

    @Override
    public Optional<Candidate> findByUserEmail(String email) {
        return candidateRepository.findByUserEmail(email);
    }

    @Override
    public Page<Candidate> findVipCandidates(Pageable pageable) throws IOException {
        return  null;
//        return  candidateRepository.findVipCandidates(pageable);
    }

    @Override
    public Page<Candidate> findVipCandidateByKeyword(String keyword, Pageable pageable) throws IOException {
        return null;
//        return candidateRepository.findVipCandidateByKeyword(keyword,pageable);
    }

    @Override
    public Page<Candidate> findCV(String job, String address, String skill, Pageable pageable) throws IOException {
        return candidateRepository.findCV(job, address, skill,pageable);
    }

    @Override
    public Long count() throws IOException {
        return candidateRepository.count();
    }
    @Override
    public Integer countCandidate_Admin() throws IOException {
        return candidateRepository.countCandidate_Admin();
    }

    @Override
    public Page<Candidate> getCandidatesFollow(String id, Pageable pageable) throws IOException {
        return candidateRepository.getCandidatesFollow(id, pageable);
    }
    @Override
    public List<Candidate> getCandidatesFollow(String id) throws IOException {
        return candidateRepository.getCandidatesFollow(id);
    }

    @Override
    public boolean checkIsFollow_Employer_Candidate(String employerId, String candidateId) {
        return candidateRepository.checkIsFollow_Employer_Candidate(employerId, candidateId);
    }

    @Override
    public void follow_Employer_Candidate(String employerId, String candidateId) {
        candidateRepository.follow_Employer_Candidate(employerId, candidateId);
    }

    @Override
    public void unfollow_Employer_Candidate(String employerId, String candidateId) {
        candidateRepository.unfollow_Employer_Candidate(employerId, candidateId);
    }

    @Override
    public Page<Candidate> getCandidatesSaved_Employer(String employerId, Pageable pageable) {
        return candidateRepository.getCandidatesSaved_Employer(employerId, pageable);
    }

    @Override
    public boolean checkIsFollow_HR_Candidate(String hrId, String candidateId) {
        return candidateRepository.checkIsFollow_HR_Candidate(hrId, candidateId);
    }
    @Override
    public void follow_HR_Candidate(String hrId, String candidateId) {
        candidateRepository.follow_HR_Candidate(hrId, candidateId);
    }
    @Override
    public void unfollow_HR_Candidate(String hrId, String candidateId) {
        candidateRepository.unfollow_HR_Candidate(hrId, candidateId);
    }
    @Override
    public Page<Candidate> getCandidatesSaved_HR(String hrId, Pageable pageable) {
        return candidateRepository.getCandidatesSaved_HR(hrId, pageable);
    }
}
