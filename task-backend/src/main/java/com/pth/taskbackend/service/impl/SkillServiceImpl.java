package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.model.meta.Skill;
import com.pth.taskbackend.repository.SkillRepository;
import com.pth.taskbackend.service.SkillService;
import io.jsonwebtoken.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class SkillServiceImpl implements SkillService {
    @Autowired
    SkillRepository skillRepository;
    @Override
    public Optional<Skill> findById(String id) throws IOException {
        return skillRepository.findById(id);
    }

    @Override
    public List<Skill> save(List<Skill> skills) throws IOException, java.io.IOException {
        return skillRepository.saveAll(skills);
    }

    @Override
    public Page<Skill> findByCandidateId(String id, Pageable pageable) {
        return skillRepository.findByCandidateId(id, pageable);
    }

    @Override
    public void delete(Skill skill) throws IOException {
        skillRepository.delete(skill);
    }

    @Override
    public void deleteById(String id) throws IOException {
        skillRepository.deleteById(id);
    }

    @Override
    public void deleteAllByCandidateId(String candidateId){
        skillRepository.deleteAllByCandidateId(candidateId);
    }

}
