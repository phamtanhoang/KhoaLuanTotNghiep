package com.pth.taskbackend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

import static com.pth.taskbackend.utils.constants.PathConstants.ResourcePaths.*;

@RestController
@RequestMapping(value = {RESOURCE_PATH})
public class ResourceController {

    @GetMapping
    public String welcome() {
        return "Hello World %s".formatted(LocalDateTime.now());
    }
}
