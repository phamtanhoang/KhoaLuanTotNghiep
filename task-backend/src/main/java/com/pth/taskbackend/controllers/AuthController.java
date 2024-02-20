package com.pth.taskbackend.controllers;

import com.pth.taskbackend.dto.requests.AuthenticationRequestDto;
import com.pth.taskbackend.models.AppUserDetails;
import com.pth.taskbackend.services.JwtTokenService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static com.pth.taskbackend.utils.constants.PathConstants.AuthPaths.*;
import static com.pth.taskbackend.utils.constants.TokenConstants.*;
import static com.pth.taskbackend.utils.common.CookieCommon.createAndAddCookies;


@RequiredArgsConstructor
@RestController
@RequestMapping(value = {AUTH_PATH})
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenService jwtTokenService;

    final Set<String> issuedRefreshTokens = Collections.synchronizedSet(new HashSet<>());

    @Value("${jwt.access-token.expires:60000}")
    private long accessTokenValidityMs;

    @Value("${jwt.refresh-token.expires:86400000}")
    private long refreshTokenValidityMs;


    @PostMapping(value = {AUTH_LOGIN_PATH})
    public ResponseEntity<Void> login(@RequestBody AuthenticationRequestDto requestDto,
                                      HttpServletRequest request,
                                      HttpServletResponse response) {
        try {
            String username = requestDto.username();
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            username,
                            requestDto.password()
                    )
            );
            AppUserDetails authenticatedUser = (AppUserDetails) authentication.getPrincipal();

            createAndAddCookies(
                    request,
                    response,
                    authenticatedUser.getUsername(),
                    authenticatedUser.getRoleNames(), jwtTokenService,
                    issuedRefreshTokens,
                    accessTokenValidityMs,
                    refreshTokenValidityMs
            );

            return ResponseEntity.noContent().build();
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid Credentials");
        }
    }

    @GetMapping(value = {AUTH_REFRESH_PATH})
    public ResponseEntity<Void> refresh(@CookieValue(value = APP_REFRESH_TOKEN) String refreshToken,
                                        HttpServletRequest request,
                                        HttpServletResponse response) {
        if (issuedRefreshTokens.contains(refreshToken) && jwtTokenService.validateRefreshToken(refreshToken)) {
            issuedRefreshTokens.remove(refreshToken);
            Claims claims = jwtTokenService.getClaims(refreshToken).getPayload();
            String username = claims.getSubject();
            List<String> rolesNames = (List<String>) claims.get(ROLES);

            createAndAddCookies(
                    request,
                    response,
                    username,
                    rolesNames,
                    jwtTokenService,
                    issuedRefreshTokens,
                    accessTokenValidityMs,
                    refreshTokenValidityMs);
            return ResponseEntity.noContent().build();
        }
        throw new BadCredentialsException("Invalid refresh token");
    }
}
