package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.Skill;
import io.jsonwebtoken.io.IOException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface SkillService {
    Optional<Skill> findById(String id) throws IOException;
    public List<Skill> save(List<Skill> skills)  throws IOException, java.io.IOException;

    Page<Skill>findByCandidateId(String id, Pageable pageable)throws IOException;
    void delete (Skill Skill) throws IOException;
    void deleteById(String id) throws IOException;

}
