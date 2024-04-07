package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.model.meta.Education;
import com.pth.taskbackend.model.meta.Experience;
import com.pth.taskbackend.repository.EducationRepository;
import com.pth.taskbackend.repository.ExperienceRepository;
import com.pth.taskbackend.service.EducationService;
import io.jsonwebtoken.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class EducationServiceImpl implements EducationService {

    @Autowired
    EducationRepository educationRepository;
    @Override
    public Optional<Education> findById(String id) throws IOException {
        return educationRepository.findById(id);
    }

    @Override
    public List<Education> save(List<Education> educations) throws IOException, java.io.IOException {
        return educationRepository.saveAll(educations);
    }

    @Override
    public Page<Education> findByCandidateId(String id, Pageable pageable) {
        return educationRepository.findByCandidateId(id, pageable);
    }

    @Override
    public void delete(Education Experience) throws IOException {
        educationRepository.delete(Experience);
    }

    @Override
    public void deleteById(String id) throws IOException {
        educationRepository.deleteById(id);
    }
}
