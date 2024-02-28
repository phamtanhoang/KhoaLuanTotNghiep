package com.pth.taskbackend.service;

import com.pth.taskbackend.dto.request.AuthenticationRequest;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.dto.response.LoginResponse;
import com.pth.taskbackend.dto.response.TokenResponse;
import com.pth.taskbackend.model.meta.UserDetail;
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
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CookieValue;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import static com.pth.taskbackend.util.constant.TokenConstant.APP_ACCESS_TOKEN;
import static com.pth.taskbackend.util.constant.TokenConstant.APP_REFRESH_TOKEN;
import static com.pth.taskbackend.util.func.CookieFunc.*;

@RequiredArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenService jwtTokenService;

    final Set<String> issuedRefreshTokens = Collections.synchronizedSet(new HashSet<>());

    @Value("${jwt.access-token.expires}")
    private long accessTokenValidityMs;

    @Value("${jwt.refresh-token.expires}")
    private long refreshTokenValidityMs;

    @Override
    public BaseResponse login(String username, String password, HttpServletRequest request, HttpServletResponse response) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            UserDetail authenticatedUser = (UserDetail) authentication.getPrincipal();

            addAccessTokenToCookies(request, response,
                    authenticatedUser.getUsername(),
                    authenticatedUser.getRoleNames(),
                    jwtTokenService, accessTokenValidityMs
            );
            addRefreshTokenToCookies(request, response,
                    authenticatedUser.getUsername(),
                    authenticatedUser.getRoleNames(),
                    jwtTokenService, issuedRefreshTokens,
                    refreshTokenValidityMs
            );

            TokenResponse tokenResponse = new TokenResponse(
                    jwtTokenService.getTokenFromCookie(request, APP_ACCESS_TOKEN),
                    jwtTokenService.getTokenFromCookie(request, APP_REFRESH_TOKEN)
            );

            LoginResponse loginResponse= new LoginResponse(
                    tokenResponse,null
            );

            return new BaseResponse("Đăng nhập thành công", 200, loginResponse);
        } catch (AuthenticationException e) {
            return new BaseResponse("Đăng nhập không thành công", 401, null);
        }
    }

}
