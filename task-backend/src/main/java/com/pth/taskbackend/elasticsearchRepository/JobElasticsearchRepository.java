package com.pth.taskbackend.elasticsearchRepository;

import com.pth.taskbackend.model.meta.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface JobElasticsearchRepository extends ElasticsearchRepository<Job, String> {
    @Query("{\"multi_match\": {\"query\": \"?0\", \"fields\": [\"name\", \"experience\", \"description\"], \"fuzziness\": \"AUTO\"}}")
    Page<Job> searchByNameOrExperienceOrDescription(String keyword, Pageable pageable);

}


