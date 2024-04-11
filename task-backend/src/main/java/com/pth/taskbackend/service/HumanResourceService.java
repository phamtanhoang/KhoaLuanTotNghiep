package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.HumanResource;
import io.jsonwebtoken.io.IOException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface HumanResourceService {
    Optional<HumanResource>findByEmail(String email) throws IOException;
    Optional<HumanResource>findById(String id)throws IOException;
    Page<HumanResource>findByEmployerId(String id, Pageable pageable)throws IOException;
    HumanResource create(HumanResource humanResource)throws IOException;
    HumanResource update(HumanResource humanResource)throws IOException;
    HumanResource updateAvatar(HumanResource humanResource, MultipartFile avatar) throws IOException;
    void deleteById(String id)throws IOException;
    void delete(HumanResource humanResource)throws IOException;
}
