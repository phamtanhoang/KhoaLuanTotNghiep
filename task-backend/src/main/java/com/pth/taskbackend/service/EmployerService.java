package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.Employer;
import com.pth.taskbackend.repository.EmployerRepository;
import io.jsonwebtoken.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface EmployerService {

    Page<Employer>findByKeyword(String keyword, Pageable pageable) throws IOException;
    Optional<Employer>findById(String id) throws IOException;
    Employer create(Employer employer, MultipartFile image, MultipartFile backgroundImage) throws IOException, java.io.IOException;
    Employer update(Employer employer, MultipartFile image, MultipartFile backgroundImage) throws IOException, java.io.IOException;
    void delete (Employer employer) throws IOException;
    void deleteById(String id) throws IOException;

}
