package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.dto.response.TokenResponse;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.User;
import com.pth.taskbackend.repository.UserRepository;
import com.pth.taskbackend.security.UserInfoDetails;
import com.pth.taskbackend.service.AuthService;
import com.pth.taskbackend.security.JwtTokenService;
import com.pth.taskbackend.util.func.CookieFunc;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.pth.taskbackend.util.constant.TokenConstant.*;
import static com.pth.taskbackend.util.func.CookieFunc.*;

@RequiredArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenService jwtTokenService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    final Set<String> issuedRefreshTokens = Collections.synchronizedSet(new HashSet<>());

    @Value("${jwt.access-token.expires}")
    private long accessTokenValidityMs;

    @Value("${jwt.refresh-token.expires}")
    private long refreshTokenValidityMs;

    @Override
    public UserInfoDetails login(String username, String password,
                              HttpServletRequest request,
                              HttpServletResponse response) {

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            UserInfoDetails authenticatedUser = (UserInfoDetails) authentication.getPrincipal();

            return authenticatedUser;

    }

    @Override
    public Optional<User> register(String username, String password, ERole role) {
            User newUser = new User();
            newUser.setEmail(username);
            newUser.setPassword(passwordEncoder.encode(password));
            if (role == ERole.EMPLOYER) {
                newUser.setStatus(EStatus.PENDING);
            } else {
                newUser.setStatus(EStatus.ACTIVE);
            }
            newUser.setRole(role);

            userRepository.save(newUser);

            return Optional.of(newUser);
    }
    @Override
    public String refresh(String refreshToken,
                                HttpServletRequest request,
                                HttpServletResponse response) {
        issuedRefreshTokens.remove(refreshToken);
        Claims claims = jwtTokenService.getClaims(refreshToken).getPayload();
        String username = claims.getSubject();
        List<String> rolesNames = (List<String>) claims.get(ROLES);

        String accessToken = addAccessTokenToCookies(
                request,
                response,
                username,
                rolesNames,
                jwtTokenService,
                accessTokenValidityMs
        );

        return accessToken;
    }

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        removeAccessTokenAndRefreshTokenInCookies(request, response);
    }

    @Override
    public void changePassword(Optional<User> user, String newPassword) {
        user.ifPresent(u -> {
            u.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(u);
        });
    }

}
