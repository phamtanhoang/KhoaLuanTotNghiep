package com.pth.taskbackend.controller;

import com.pth.taskbackend.dto.request.AuthenticationRequest;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.service.AuthService;
import com.pth.taskbackend.service.JwtTokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashSet;
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

    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenService jwtTokenService;

    final Set<String> issuedRefreshTokens = Collections.synchronizedSet(new HashSet<>());

    @Value("${jwt.access-token.expires}")
    private long accessTokenValidityMs;

    @Value("${jwt.refresh-token.expires}")
    private long refreshTokenValidityMs;

    @Operation(summary = "Login/Signin", description = "", tags = {})
    @PostMapping("login")
    public ResponseEntity<BaseResponse> login(@RequestBody AuthenticationRequest requestDto,
                              HttpServletRequest request,
                              HttpServletResponse response) {
        return ResponseEntity.ok(
                authService.login(requestDto.username(), requestDto.password(), request, response)
        );
    }

    @Operation(summary = "Refresh Token", description = "", tags = {})
    @GetMapping("refresh")
    public ResponseEntity<BaseResponse> refresh(@CookieValue(value = APP_REFRESH_TOKEN) String refreshToken,
                                                HttpServletRequest request,
                                                HttpServletResponse response) {
        return ResponseEntity.ok(
                authService.refresh(refreshToken, request, response)
        );
    }

    @Operation(summary = "Logout/Signout", description = "", tags = {})
    @GetMapping("logout")
    public ResponseEntity<BaseResponse> logout(HttpServletRequest request,
                                        HttpServletResponse response) {

        return ResponseEntity.ok(
                authService.logout(request, response)
        );
    }
}
