package com.pth.taskbackend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

import static com.pth.taskbackend.util.constant.PathConstant.BASE_URL;

@CrossOrigin(origins = "*")
@Tag(name = "Resource", description = "Test APIs")
@SecurityRequirement(name = "javainuseapi")
@RestController
@RequestMapping(value = {BASE_URL + "/resource"})
public class ResourceController {

    @Operation(summary = "Test Auth", description = "", tags = {})
    @GetMapping
    public String welcome() {
        return "Hello World %s".formatted(LocalDateTime.now());
    }
}
