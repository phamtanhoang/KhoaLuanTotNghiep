package com.pth.taskbackend.services;

import com.pth.taskbackend.enums.Status;
import com.pth.taskbackend.models.AppRole;
import com.pth.taskbackend.models.AppUser;
import com.pth.taskbackend.repositories.AppRoleRepository;
import com.pth.taskbackend.repositories.AppUserRepository;
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

    private final AppUserRepository appUserRepository;
    private final AppRoleRepository appRoleRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void bootstrap() {
        if (appRoleRepository.findAll().isEmpty()) {
            this.appRoleRepository.save(new AppRole("USER"));
        }

        String email = "test@example.com";
        if (appUserRepository.findByEmail(email).isEmpty()) {
            AppRole userRole = appRoleRepository.findByName("USER");
            AppUser user = new AppUser(
                    email,
                    passwordEncoder.encode("password"),
                    "name",
                    "surname",
                    Status.ACTIVE,
                    Set.of(userRole)
            );
            this.appUserRepository.save(user);
        }
    }
}
