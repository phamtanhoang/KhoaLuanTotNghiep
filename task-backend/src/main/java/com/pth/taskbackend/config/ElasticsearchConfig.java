package com.pth.taskbackend.config;

import com.pth.taskbackend.util.func.LocalDateTimeReadConverter;
import com.pth.taskbackend.util.func.LocalDateTimeWriteConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.core.convert.ElasticsearchCustomConversions;

import java.util.Arrays;

@Configuration
public class ElasticsearchConfig {

    @Bean
    public ElasticsearchCustomConversions elasticsearchCustomConversions() {
        return new ElasticsearchCustomConversions(Arrays.asList(
                new LocalDateTimeReadConverter(),
                new LocalDateTimeWriteConverter()
        ));
    }
}
