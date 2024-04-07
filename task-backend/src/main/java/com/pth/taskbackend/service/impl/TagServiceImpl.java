package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.model.meta.Employer;
import com.pth.taskbackend.model.meta.Tag;
import com.pth.taskbackend.repository.CategoryRepository;
import com.pth.taskbackend.repository.TagRepository;
import com.pth.taskbackend.service.TagService;
import com.pth.taskbackend.util.func.ImageFunc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class TagServiceImpl implements TagService {
    @Autowired
    private TagRepository tagRepository;

    @Override
    public Optional<Tag> findById(String id) throws IOException {
        return tagRepository.findById(id);
    }

    @Override
    public Optional<Tag> findByName(String name) throws IOException {
        return tagRepository.findByName(name);
    }

    @Override
    public Page<Tag> findAll(Pageable pageable) throws IOException {
        return tagRepository.findAll(pageable);
    }

    @Override
    public Page<Tag> findByNameContaining(String name, Pageable pageable) throws IOException {
        return tagRepository.findByNameContaining(name, pageable);
    }

    @Override
    public Tag createTag(String name, String color) throws IOException {
        Tag tag = new Tag();
        tag.setName(name);
        tag.setColor(color);
        tagRepository.save(tag);
        return tag;
    }

    @Override
    public Tag updateTag(Tag tag, String name, String color) throws IOException {
        if (name != null && !name.isEmpty()) {
            tag.setName(name);
        }

        if (color != null) {
            tag.setColor(color);
        }
        tagRepository.save(tag);
        return tag;
    }

    @Override
    public void deleteTag(Tag tag) throws IOException {
        tagRepository.delete(tag);
    }
}
