package com.pth.taskbackend.service;

import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Candidate;
import com.pth.taskbackend.model.meta.Employer;
import com.pth.taskbackend.repository.EmployerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface EmployerService {

    Page<Employer>findByKeyword(String keyword, Pageable pageable) throws IOException;
    Optional<Employer>findByUserEmail(String email);
    Optional<Employer>findById(String id) throws IOException;
    Optional<Employer>findByIdAndStatus(String id ,EStatus status)throws IOException;
    Page<Employer>findByKeywordAndStatus(String keyword, EStatus status, Pageable pageable) throws IOException;
    Page<Employer> findVipEmployers(Pageable pageable)throws  IOException;
    Employer create(Employer employer, MultipartFile image, MultipartFile backgroundImage) throws IOException;
    Employer update(Employer employer) throws IOException;
    Employer updateImage(Employer employer, MultipartFile image) throws IOException;
    Employer updateBackgroundImage(Employer employer, MultipartFile backgroundImage) throws IOException;
    void delete (Employer employer) throws IOException;
    void deleteById(String id) throws IOException;

    Long countAll()throws IOException;

    Page<Employer>findTopEmployer(Pageable pageable) throws IOException;

    Page<Employer>findPendingEmployer_admin(Pageable pageable) throws IOException;

    Integer countEmployer_Admin();
    Integer countEmployerVip_Admin();

    boolean checkIsFollowEmployer(String candidateId, String id);
    void followEmployer(String candidateId, String id);
    void unfollowEmployer(String candidateId, String id);
    Page<Employer> getEmployersFollowed(String id, Pageable pageable) throws  IOException;

}
