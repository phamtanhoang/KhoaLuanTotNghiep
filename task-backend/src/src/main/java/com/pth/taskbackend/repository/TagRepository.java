package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.Tag;
import com.pth.taskbackend.model.meta.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, String> {
    Optional<Tag> findByName(String name);

    Page<Tag> findByNameContaining(String name, Pageable pageable);
}
