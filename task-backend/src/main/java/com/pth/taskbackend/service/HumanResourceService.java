package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.HumanResource;
import io.jsonwebtoken.io.IOException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface HumanResourceService {
    Optional<HumanResource>findByEmail(String email) throws IOException;
    Optional<HumanResource>findById(String id);
    Page<HumanResource>findByEmployerId(String id, Pageable pageable);
    HumanResource create(HumanResource humanResource) throws java.io.IOException;
    HumanResource update(HumanResource humanResource);
    HumanResource updateAvatar(HumanResource humanResource, MultipartFile avatar) throws java.io.IOException;
    void deleteById(String id);
    void delete(HumanResource humanResource);
}
