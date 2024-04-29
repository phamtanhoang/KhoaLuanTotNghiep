package com.pth.taskbackend.service;
import com.pth.taskbackend.model.meta.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.Optional;

public interface TagService {
    Optional<Tag> findById(String id) throws IOException;
    Optional<Tag> findByName(String name) throws IOException;
    Page<Tag> findAll(Pageable pageable) throws IOException;
    Page<Tag> findByNameContaining(String name, Pageable pageable) throws IOException;
    Tag createTag(String name, String color) throws IOException;
    Tag updateTag(Tag tag, String name, String color) throws IOException;
    void deleteTag(Tag tag) throws IOException;
    Page<Tag> findByJobId(String jobId, Pageable pageable) ;

    void deleteTagByJobId(String jobId)throws  IOException;
    void saveTag(String jobId, String tagId);
}
