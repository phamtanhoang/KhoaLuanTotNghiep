package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.model.meta.Candidate;
import com.pth.taskbackend.model.meta.Employer;
import com.pth.taskbackend.repository.CandidateRepository;
import com.pth.taskbackend.service.CandidateService;
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
    public Page<Candidate> findByKeyword(String keyword, Pageable pageable) {
        return candidateRepository.findByKeyword(keyword,pageable);
    }

    @Override
    public Optional<Candidate> findById(String id) {
        return candidateRepository.findById(id);
    }

    @Override
    public Candidate create(Candidate candidate, MultipartFile avatar) throws IOException {

            if(avatar==null)
                candidate.setAvatar(new byte[0]);
            else
                candidate.setAvatar(ImageFunc.compressImage(avatar.getBytes()));

            candidateRepository.save(candidate);
            return candidate;
    }

    @Override
    public Candidate update(Candidate candidate) throws IOException {



        candidateRepository.save(candidate);
        return candidate;
    }

    @Override
    public Candidate updateAvatar(Candidate candidate, MultipartFile avatar) throws IOException {

        if (avatar != null) {
            candidate.setAvatar(ImageFunc.compressImage(avatar.getBytes()));
        }

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
}
