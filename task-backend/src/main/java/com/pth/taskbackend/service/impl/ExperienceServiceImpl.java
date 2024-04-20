package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.model.meta.Experience;
import com.pth.taskbackend.model.meta.Experience;
import com.pth.taskbackend.repository.EmployerRepository;
import com.pth.taskbackend.repository.ExperienceRepository;
import com.pth.taskbackend.service.ExperienceService;
import io.jsonwebtoken.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExperienceServiceImpl implements ExperienceService {
    @Autowired
    ExperienceRepository experienceRepository;
    @Override
    public Optional<Experience> findById(String id) throws IOException {
        return experienceRepository.findById(id);
    }

    @Override
    public List<Experience> save(List<Experience> Experiences) throws IOException {
        return experienceRepository.saveAll(Experiences);
    }

    @Override
    public Page<Experience> findByCandidateId(String id, Pageable pageable) {
        return experienceRepository.findByCandidateIdOrderBySequenceAsc(id, pageable);
    }

    @Override
    public void delete(Experience Experience) throws IOException {
        experienceRepository.delete(Experience);
    }

    @Override
    public void deleteById(String id) throws IOException {
        experienceRepository.deleteById(id);
    }
    @Override
    public void deleteAllByCandidateId(String candidateId){
        experienceRepository.deleteAllByCandidateId(candidateId);
    }
}
