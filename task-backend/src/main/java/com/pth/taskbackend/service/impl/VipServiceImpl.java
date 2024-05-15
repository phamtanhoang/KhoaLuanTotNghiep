package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.enums.EType;
import com.pth.taskbackend.enums.EVipStatus;
import com.pth.taskbackend.model.meta.Vip;
import com.pth.taskbackend.repository.VipRepository;
import com.pth.taskbackend.service.VipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class VipServiceImpl implements VipService {
    @Autowired
    VipRepository vipRepository;
    @Override
    public Page<Vip> findByNameContainingAndType(String name, EVipStatus status, Pageable pageable) {
        return vipRepository.findByNameContainingAndType(name,status,pageable);
    }
    @Override
    public List<Vip> findByEmployer() {
        return vipRepository.findByEmployer();
    }

    @Override
    public Optional<Vip> findById(String id) throws IOException {
        return vipRepository.findById(id);
    }

    @Override
    public Vip create(Vip vip) {
        return vipRepository.save(vip);
    }

    @Override
    public Vip update(Vip vip) {
        return vipRepository.save(vip);

    }

    @Override
    public void deleteById(Vip vip) {
        vip.setStatus(EVipStatus.DELETED);
        vipRepository.save(vip);
    }
}
