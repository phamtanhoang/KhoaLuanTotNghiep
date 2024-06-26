package com.pth.taskbackend.service;

import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.HumanResource;
import io.jsonwebtoken.io.IOException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface HumanResourceService {
    Optional<HumanResource>findByEmail(String email) throws IOException;
    Optional<HumanResource> findById(String id)throws IOException;
    Page<HumanResource>findByEmployerId(String id, Pageable pageable)throws IOException;
    Page<HumanResource>findByKeywordAndStatus(String keyword, EStatus status,Pageable pageable)throws IOException;
    Optional<HumanResource>findByIdAndEmployerId(String id, String employerId)throws IOException;

    Page<HumanResource>findByKeywordAndStatusAndEmployerId(String keyword,EStatus status,String employerId, Pageable pageable)throws IOException;
    HumanResource create(HumanResource humanResource,MultipartFile avatar)throws IOException;
    HumanResource update(HumanResource humanResource, MultipartFile avatar)throws IOException;
    HumanResource updateAvatar(HumanResource humanResource, MultipartFile avatar) throws IOException;
    void deleteById(String id)throws IOException;
    void delete(HumanResource humanResource)throws IOException;

    Integer countHR_Employer(String id);
}
