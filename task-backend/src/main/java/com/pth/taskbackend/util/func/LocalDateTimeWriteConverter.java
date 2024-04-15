package com.pth.taskbackend.util.func;

import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.WritingConverter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@WritingConverter
public class LocalDateTimeWriteConverter implements Converter<LocalDateTime, String> {

    @Override
    public String convert(LocalDateTime source) {
        return source.format(DateTimeFormatter.ISO_DATE_TIME);
        // Hoặc sử dụng định dạng tùy chỉnh của bạn
        // return source.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }
}
