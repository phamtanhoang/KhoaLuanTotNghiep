package com.pth.taskbackend.service;

import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.dto.response.TokenResponse;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.User;
import com.pth.taskbackend.repository.UserRepository;
import com.pth.taskbackend.security.UserInfoDetails;
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

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    public BaseResponse login(String username, String password, HttpServletRequest request, HttpServletResponse response) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            UserInfoDetails authenticatedUser = (UserInfoDetails) authentication.getPrincipal();

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

            return new BaseResponse("Đăng nhập thành công", 200, tokenResponse);
        } catch (AuthenticationException e) {
            return new BaseResponse("Đăng nhập không thành công", 401, null);
        }
    }

    @Override
    public BaseResponse register(String username, String password) {
        try {
            if (userRepository.findByEmail(username).isPresent()) {
                return new BaseResponse("Tên người dùng đã tồn tại!", 400, null);
            }
            User newUser = new User();
            newUser.setEmail(username);
            newUser.setPassword(passwordEncoder.encode(password));
            newUser.setStatus(EStatus.ACTIVE);
            newUser.setRole(ERole.EMPLOYER);

            userRepository.save(newUser);

            return new BaseResponse("Đăng ký thành công", 200, newUser);
        } catch (Exception e) {
            return new BaseResponse("Lỗi khi đăng ký", 500, null);
        }
    }
    @Override
    public BaseResponse refresh(String refreshToken, HttpServletRequest request, HttpServletResponse response) {
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

            TokenResponse tokenResponse = new TokenResponse(
                    jwtTokenService.getTokenFromCookie(request, APP_ACCESS_TOKEN),
                    jwtTokenService.getTokenFromCookie(request, APP_REFRESH_TOKEN)
            );
            return new BaseResponse("Refresh Token thành công", 200, tokenResponse);
        }
        throw new BadCredentialsException("Phiên bản đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
    }

    @Override
    public BaseResponse logout(HttpServletRequest request, HttpServletResponse response) {
        removeAccessTokenAndRefreshTokenInCookies(request, response);
        return new BaseResponse("Đăng xuất thành công", 200, "");
    }

}
