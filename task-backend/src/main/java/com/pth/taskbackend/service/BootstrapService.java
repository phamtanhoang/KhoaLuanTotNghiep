package com.pth.taskbackend.service;

import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.model.meta.User;
import com.pth.taskbackend.repository.CategoryRepository;
import com.pth.taskbackend.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Profile("dev")
@RequiredArgsConstructor
public class BootstrapService {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final PasswordEncoder passwordEncoder;
    @PostConstruct
    public void bootstrap() {

        String email = "admin@gmail.com";
        if (userRepository.findByEmail(email).isEmpty()) {
            User user = new User();
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode("123"));
            user.setStatus(EStatus.ACTIVE);
            user.setRole(ERole.ADMIN);
            this.userRepository.save(user);
        }
    }
}
