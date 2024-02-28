package com.pth.taskbackend.service;

import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.User;
import com.pth.taskbackend.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@Profile("dev")
@RequiredArgsConstructor
public class BootstrapService {

    private final UserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;
    @PostConstruct
    public void bootstrap() {

        String email = "admin@example.com";
        if (appUserRepository.findByEmail(email).isEmpty()) {
            User user = new User();
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode("password"));
            user.setStatus(EStatus.ACTIVE);
            user.setRole(ERole.ADMIN);
            this.appUserRepository.save(user);
        }

    }
}
