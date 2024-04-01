package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.HumanResource;
import io.jsonwebtoken.io.IOException;

import java.util.Optional;

public interface HumanResourceService {
    Optional<HumanResource>findByEmail(String email) throws IOException;
}
