package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.model.meta.Employer;
import com.pth.taskbackend.repository.EmployerRepository;
import com.pth.taskbackend.service.EmployerService;
import com.pth.taskbackend.util.func.FileUploadFunc;
import com.pth.taskbackend.util.func.ImageFunc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class EmployerServiceImpl implements EmployerService {
    @Autowired
    EmployerRepository employerRepository;
    @Override
    public Page<Employer> findByKeyword(String keyword, Pageable pageable) {
        return employerRepository.findByKeyword(keyword,pageable);
    }

    @Override
    public Optional<Employer> findByUserEmail(String email) {
        return employerRepository.findByUserEmail(email);
    }

    @Override
    public Optional<Employer> findById(String id) {
        return employerRepository.findById(id);
    }

    @Override
    public Page<Employer> findByKeywordAndStatus(String keyword, EStatus status, Pageable pageable) throws io.jsonwebtoken.io.IOException {
        return employerRepository.findByKeywordAndUserStatus(keyword,status,pageable);

    }

    @Override
    public Employer create(Employer employer, MultipartFile image, MultipartFile backgroundImage) throws IOException {
        FileUploadFunc fileUploadFunc = new FileUploadFunc();
        String uploadImage = fileUploadFunc.uploadImage(image);
    uploadImage=fileUploadFunc.getFullImagePath(uploadImage);
    String uploadedBackground = fileUploadFunc.uploadImage(backgroundImage);
    uploadedBackground=fileUploadFunc.getFullImagePath(uploadedBackground);
    employer.setImage(uploadImage);
    employer.setBackgroundImage(uploadedBackground);

        employerRepository.save(employer);
        return employer;
    }

    @Override
    public Employer update(Employer employer) throws IOException {


        employerRepository.save(employer);
        return employer;
    }

    @Override
    public Employer updateImage(Employer employer, MultipartFile image) throws IOException {
        FileUploadFunc fileUploadFunc = new FileUploadFunc();
        String uploadImage = fileUploadFunc.uploadImage(image);
        uploadImage=fileUploadFunc.getFullImagePath(uploadImage);
        employer.setImage(uploadImage);

        employerRepository.save(employer);
        return employer;
    }

    @Override
    public Employer updateBackgroundImage(Employer employer, MultipartFile backgroundImage) throws IOException {
        FileUploadFunc fileUploadFunc = new FileUploadFunc();
        String uploadBackground = fileUploadFunc.uploadImage(backgroundImage);
        uploadBackground=fileUploadFunc.getFullImagePath(uploadBackground);
        employer.setBackgroundImage(uploadBackground);

        employerRepository.save(employer);
        return  employer;
    }


    @Override
    public void delete(Employer employer) {
        employerRepository.delete(employer);
    }

    @Override
    public void deleteById(String id) {
        employerRepository.deleteById(id);
    }
}
