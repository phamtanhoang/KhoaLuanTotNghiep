package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.Tag;
import com.pth.taskbackend.model.meta.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, String> {
    Optional<Tag> findByName(String name);

    Page<Tag> findByNameContaining(String name, Pageable pageable);

    @Modifying
    @Query(value = "DELETE FROM job_tag WHERE job_id = :jobId", nativeQuery = true)
    void deleteJobTagsByJobId(@Param("jobId") String jobId);

    @Modifying
    @Query(value = "INSERT INTO job_tag(job_id, tag_id) VALUES (:jobId, :tagId)", nativeQuery = true)
    void saveTag(@Param("jobId") String jobId, @Param("tagId") String tagId);
}
