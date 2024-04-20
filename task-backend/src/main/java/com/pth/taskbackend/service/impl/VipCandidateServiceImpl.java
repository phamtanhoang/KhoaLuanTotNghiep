package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.model.meta.VipCandidate;
import com.pth.taskbackend.repository.VipCandidateRepository;
import com.pth.taskbackend.service.VipCandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
public class VipCandidateServiceImpl implements VipCandidateService {
    @Autowired
    VipCandidateRepository vipCandidateRepository;
    @Override
    public boolean isVip(String candidateId) throws IOException {
        return vipCandidateRepository.isVip(candidateId);
    }

    @Override
    public Optional<VipCandidate> findByCandidateIdAndAvailable(String candidateId) throws IOException {
        return vipCandidateRepository.findLatestByCandidateId(candidateId);
    }

    @Override
    public VipCandidate create(VipCandidate vipCandidate) throws IOException {
        return vipCandidateRepository.save(vipCandidate);
    }

    @Override
    public float sum() throws IOException {
        return  vipCandidateRepository.sumPrice();
    }

    @Override
    public Long countValidVipCandidates() throws IOException {
        return  vipCandidateRepository.countValidVipCandidates();
    }
}
