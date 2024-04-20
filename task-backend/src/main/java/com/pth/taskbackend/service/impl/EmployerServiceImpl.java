package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.model.meta.Employer;
import com.pth.taskbackend.repository.EmployerRepository;
import com.pth.taskbackend.service.EmployerService;
import com.pth.taskbackend.util.func.FileUploadFunc;
import com.pth.taskbackend.util.func.ImageFunc;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
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

    @Autowired
    private EntityManager entityManager;

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
    public Optional<Employer> findByIdAndStatus(String id, EStatus status) throws IOException {
        return employerRepository.findByIdAndUserStatus(id,status);
    }

    @Override
    public Page<Employer> findByKeywordAndStatus(String keyword, EStatus status, Pageable pageable)  {

        return employerRepository.findByKeywordAndUserStatus(keyword,status,pageable);

    }

    @Override
    public Page<Employer> findVipEmployers(Pageable pageable) throws IOException {
        return  employerRepository.findVipEmployers(pageable);
    }

    @Override
    public Employer create(Employer employer, MultipartFile image, MultipartFile backgroundImage) {
        FileUploadFunc fileUploadFunc = new FileUploadFunc();
        if(image!=null&&backgroundImage!=null) {
            String uploadImage = fileUploadFunc.uploadImage(image);
            uploadImage=fileUploadFunc.getFullImagePath(uploadImage);
            String uploadedBackground = fileUploadFunc.uploadImage(backgroundImage);
            uploadedBackground=fileUploadFunc.getFullImagePath(uploadedBackground);
            employer.setImage(uploadImage);
            employer.setBackgroundImage(uploadedBackground);

        }

        employerRepository.save(employer);
        return employer;
    }

    @Override
    public Employer update(Employer employer) {


        employerRepository.save(employer);
        return employer;
    }

    @Override
    public Employer updateImage(Employer employer, MultipartFile image)  {
        FileUploadFunc fileUploadFunc = new FileUploadFunc();
        String uploadImage = fileUploadFunc.uploadImage(image);
        uploadImage=fileUploadFunc.getFullImagePath(uploadImage);
        employer.setImage(uploadImage);

        employerRepository.save(employer);
        return employer;
    }

    @Override
    public Employer updateBackgroundImage(Employer employer, MultipartFile backgroundImage)  {
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

    @Override
    public Long countAll() throws IOException {
        return employerRepository.count();
    }
}
