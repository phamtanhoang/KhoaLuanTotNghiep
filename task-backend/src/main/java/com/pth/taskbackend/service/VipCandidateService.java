package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.VipCandidate;
import com.pth.taskbackend.model.meta.VipEmployer;

import java.io.IOException;
import java.util.Optional;

public interface VipCandidateService {
    boolean isVip(String candidateId) throws IOException;
    public Optional<VipCandidate> findByCandidateIdAndAvailable(String candidateId)throws IOException;

    VipCandidate create(VipCandidate vipCandidate)throws IOException;
}
