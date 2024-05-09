package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.HumanResource;
import com.pth.taskbackend.repository.HumanResourceRepository;
import com.pth.taskbackend.service.HumanResourceService;
import com.pth.taskbackend.util.func.FileUploadFunc;
import io.jsonwebtoken.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
        return humanResourceRepository.findByEmployerId(id,pageable);
    }

    @Override
    public Page<HumanResource> findByKeywordAndStatus(String keyword, EStatus status, Pageable pageable) throws IOException {
        return humanResourceRepository.findByKeywordAndStatus(keyword,status,pageable);
    }

    @Override
    public Optional<HumanResource> findByIdAndEmployerId(String id, String employerId) throws IOException {
        return  humanResourceRepository.findByIdAndEmployerId(id,employerId);
    }

    @Override
    public Page<HumanResource> findByKeywordAndStatusAndEmployerId(String keyword, EStatus status, String employerId, Pageable pageable) throws IOException {
        return humanResourceRepository.findByKeywordAndStatusAndEmployerId(keyword,status,employerId,pageable);
    }

    @Override
    public HumanResource create(HumanResource humanResource,MultipartFile avatar) {
        if(avatar!=null) {
            String uploadImage = fileUploadFunc.uploadImage(avatar);
            uploadImage=fileUploadFunc.getFullImagePath(uploadImage);
            humanResource.setAvatar(uploadImage);

        }
        humanResourceRepository.save(humanResource);
        return humanResource;
    }

    @Override
    public HumanResource update(HumanResource humanResource, MultipartFile avatar) {
        if(avatar!=null) {
            String uploadImage = fileUploadFunc.uploadImage(avatar);
            uploadImage=fileUploadFunc.getFullImagePath(uploadImage);
            humanResource.setAvatar(uploadImage);

        }
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
