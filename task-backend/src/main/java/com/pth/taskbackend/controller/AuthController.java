package com.pth.taskbackend.controller;

import com.pth.taskbackend.dto.request.AuthenticationRequest;
import com.pth.taskbackend.model.meta.UserDetail;
import com.pth.taskbackend.service.JwtTokenService;
import io.jsonwebtoken.Claims;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
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

import static com.pth.taskbackend.util.constant.PathConstant.BASE_URL;
import static com.pth.taskbackend.util.constant.TokenConstant.*;
import static com.pth.taskbackend.util.func.CookieFunc.*;

@CrossOrigin(origins = "*")
@Tag(name = "Auths", description = "Auth APIs")
@SecurityRequirement(name = "javainuseapi")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = {BASE_URL + "/auth"})
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenService jwtTokenService;

    final Set<String> issuedRefreshTokens = Collections.synchronizedSet(new HashSet<>());

    @Value("${jwt.access-token.expires}")
    private long accessTokenValidityMs;

    @Value("${jwt.refresh-token.expires}")
    private long refreshTokenValidityMs;

    @Operation(summary = "Login/Signin", description = "", tags = {})
    @PostMapping("login")
    public ResponseEntity<Void> login(@RequestBody AuthenticationRequest requestDto,
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
            UserDetail authenticatedUser = (UserDetail) authentication.getPrincipal();

            addAccessTokenToCookies(
                    request,
                    response,
                    authenticatedUser.getUsername(),
                    authenticatedUser.getRoleNames(),
                    jwtTokenService,
                    accessTokenValidityMs
            );

            addRefreshTokenToCookies(
                    request,
                    response,
                    authenticatedUser.getUsername(),
                    authenticatedUser.getRoleNames(),
                    jwtTokenService,
                    issuedRefreshTokens,
                    refreshTokenValidityMs
            );

            return ResponseEntity.ok().build();
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid Credentials");
        }
    }

    @Operation(summary = "Refresh Token", description = "", tags = {})
    @GetMapping("refresh")
    public ResponseEntity<Void> refresh(@CookieValue(value = APP_REFRESH_TOKEN) String refreshToken,
                                        HttpServletRequest request,
                                        HttpServletResponse response) {
        if (issuedRefreshTokens.contains(refreshToken) && jwtTokenService.validateRefreshToken(refreshToken)) {
            issuedRefreshTokens.remove(refreshToken);
            Claims claims = jwtTokenService.getClaims(refreshToken).getPayload();
            String username = claims.getSubject();
            List<String> rolesNames = (List<String>) claims.get(ROLES);

            addAccessTokenToCookies(
                    request,
                    response,
                    username,
                    rolesNames,
                    jwtTokenService,
                    accessTokenValidityMs
            );
            return ResponseEntity.ok().build();
        }
        throw new BadCredentialsException("Invalid refresh token");
    }

    @Operation(summary = "Logout/Signout", description = "", tags = {})
    @GetMapping("logout")
    public ResponseEntity<Void> logout(@CookieValue(value = APP_REFRESH_TOKEN) String refreshToken,
                                        HttpServletRequest request,
                                        HttpServletResponse response) {
        removeAccessTokenAndRefreshTokenInCookies(request, response);
        return ResponseEntity.ok().build();
    }
}
