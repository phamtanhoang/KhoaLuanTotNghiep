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
        return  candidateRepository.findVipCandidates(pageable);
    }

    @Override
    public Page<Candidate> findVipCandidateByKeyword(String keyword, Pageable pageable) throws IOException {
        return candidateRepository.findVipCandidateByKeyword(keyword,pageable);
    }

    @Override
    public Long count() throws IOException {
        return candidateRepository.count();
    }
}
