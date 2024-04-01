package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.model.meta.Employer;
import com.pth.taskbackend.repository.EmployerRepository;
import com.pth.taskbackend.service.EmployerService;
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
    public Optional<Employer> findById(String id) {
        return employerRepository.findById(id);
    }

    @Override
    public Employer create(Employer employer, MultipartFile image, MultipartFile backgroundImage) throws IOException {
        if(image==null||backgroundImage==null){
            employer.setImage(new byte[0]);
            employer.setBackgroundImage(new byte[0]);
        }
        else {
            employer.setImage(ImageFunc.compressImage(image.getBytes()));
            employer.setBackgroundImage(ImageFunc.compressImage(backgroundImage.getBytes()));

        }
        employerRepository.save(employer);
        return employer;
    }

    @Override
    public Employer update(Employer employer, MultipartFile image, MultipartFile backgroundImage) throws IOException {

        if (image != null) {
            employer.setImage(ImageFunc.compressImage(image.getBytes()));
        }
        if (backgroundImage != null) {
            employer.setImage(ImageFunc.compressImage(backgroundImage.getBytes()));
        }
        employerRepository.save(employer);
        return employer;
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
