package com.pth.taskbackend.service;

import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Role;
import com.pth.taskbackend.model.meta.User;
import com.pth.taskbackend.repository.RoleRepository;
import com.pth.taskbackend.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
//@Profile("dev")
@RequiredArgsConstructor
public class BootstrapService {

    private final UserRepository appUserRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void bootstrap() {
        if (roleRepository.findAll().isEmpty()) {
            this.roleRepository.save(new Role("USER"));
        }

        String email = "test@example.com";
        if (appUserRepository.findByEmail(email).isEmpty()) {
            Role userRole = roleRepository.findByName("USER");
            User user = new User(
                    email,
                    passwordEncoder.encode("password"),
                    "name",
                    "surname",
                    EStatus.ACTIVE,
                    Set.of(userRole)
            );
            this.appUserRepository.save(user);
        }
    }
}
