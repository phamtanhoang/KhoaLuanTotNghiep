package com.pth.taskbackend.service;

import java.io.IOException;

public interface VipCandidateService {
    boolean isVip(String candidateId) throws IOException;
}
