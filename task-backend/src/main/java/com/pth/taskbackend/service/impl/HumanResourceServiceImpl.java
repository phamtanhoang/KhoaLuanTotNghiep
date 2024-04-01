package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.model.meta.HumanResource;
import com.pth.taskbackend.repository.HumanResourceRepository;
import com.pth.taskbackend.service.HumanResourceService;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class HumanResourceServiceImpl implements HumanResourceService {
    @Autowired
    HumanResourceRepository humanResourceRepository;
    @Override
    public Optional<HumanResource> findByEmail(String email) {
        return humanResourceRepository.findByEmail(email);
    }
}
