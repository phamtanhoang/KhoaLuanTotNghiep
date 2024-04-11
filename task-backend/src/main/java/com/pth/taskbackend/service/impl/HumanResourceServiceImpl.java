package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.model.meta.HumanResource;
import com.pth.taskbackend.repository.HumanResourceRepository;
import com.pth.taskbackend.service.HumanResourceService;
import com.pth.taskbackend.util.func.FileUploadFunc;
import com.pth.taskbackend.util.func.ImageFunc;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
@Service
public class HumanResourceServiceImpl implements HumanResourceService {
    @Autowired
    HumanResourceRepository humanResourceRepository;
    @Autowired
    FileUploadFunc fileUploadFunc;
    @Override
    public Optional<HumanResource> findByEmail(String email) {
        return humanResourceRepository.findByUserEmail(email);
    }

    @Override
    public Optional<HumanResource> findById(String id) {
        return humanResourceRepository.findById(id);
    }

    @Override
    public Page<HumanResource> findByEmployerId(String id, Pageable pageable) {
        return null;
    }

    @Override
    public HumanResource create(HumanResource humanResource) {

        humanResourceRepository.save(humanResource);
        return humanResource;
    }

    @Override
    public HumanResource update(HumanResource humanResource) {

        humanResourceRepository.save(humanResource);
        return humanResource;
    }

    @Override
    public HumanResource updateAvatar(HumanResource humanResource, MultipartFile avatar) {

        if(avatar!=null) {
            String uploadImage = fileUploadFunc.uploadImage(avatar);
            uploadImage=fileUploadFunc.getFullImagePath(uploadImage);
            humanResource.setAvatar(uploadImage);

        }
        humanResourceRepository.save(humanResource);
        return humanResource;

    }

    @Override
    public void deleteById(String id) {
        humanResourceRepository.deleteById(id);
    }

    @Override
    public void delete(HumanResource humanResource) {
        humanResourceRepository.delete(humanResource);

    }
}
