package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.repository.VipCandidateRepository;
import com.pth.taskbackend.service.VipCandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class VipCandidateServiceImpl implements VipCandidateService {
    @Autowired
    VipCandidateRepository vipCandidateRepository;
    @Override
    public boolean isVip(String candidateId) throws IOException {
        return vipCandidateRepository.isVip(candidateId);
    }
}
