package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.model.meta.VipEmployer;
import com.pth.taskbackend.repository.VipEmployerRepository;
import com.pth.taskbackend.service.VipEmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class VipEmployerServiceImpl implements VipEmployerService {
    @Autowired
    VipEmployerRepository vipEmployerRepository;

    @Override
    public boolean isVip(String employerId) {
        return vipEmployerRepository.isVip(employerId);
    }

    @Override
    public Page<VipEmployer> findByVipId(String vipId, Pageable pageable) throws IOException {
        return null;
    }

    @Override
    public Page<VipEmployer> findByEmployerNameContaining(String name, Pageable pageable) throws IOException {
        return null;
    }

    @Override
    public List<VipEmployer> findByVipIdWithList(String vipId) throws IOException {
        return null;
    }

    @Override
    public Optional<VipEmployer> findById(String id) throws IOException {
        return Optional.empty();
    }

    @Override
    public Optional<VipEmployer> findByIdAndEmployerId(String id, String employerId) throws IOException {
        return Optional.empty();
    }

    @Override
    public VipEmployer save(VipEmployer vipEmployer) throws IOException {
        return null;
    }

    @Override
    public Optional<VipEmployer> findByEmployerIdAndAvailable(String employerId) throws IOException {
        return Optional.empty();
    }

    @Override
    public Page<VipEmployer> findByEmployerId(String employerId, Pageable pageable) throws IOException {
        return null;
    }

    @Override
    public void delete(String employerVipId) throws IOException {

    }

    @Override
    public float sumPrice() throws IOException {
        return 0;
    }
}
