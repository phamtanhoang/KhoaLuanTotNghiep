package com.pth.taskbackend.util.func;

import com.pth.taskbackend.security.JwtTokenService;
import com.pth.taskbackend.util.constant.TokenConstant;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.CookieValue;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import static com.pth.taskbackend.util.constant.TokenConstant.*;

public class CookieFunc {
    public static String addAccessTokenToCookies(HttpServletRequest request,
                                           HttpServletResponse response,
                                           String username,
                                           List<String> roleNames,
                                           JwtTokenService jwtTokenService,
                                           long accessTokenValidityMs) {

        String accessToken = jwtTokenService.createToken(
                ACCESS_TOKEN_TYPE,
                username, roleNames,
                accessTokenValidityMs
        );

        int secondsSpentOnProcessingRequest = 1;
        int accessTokenExpiresInSeconds = (int) (accessTokenValidityMs / 1000) - secondsSpentOnProcessingRequest;

        // secure flag allows cookies to be transported only via https -> we turn it off on localhost
        boolean secureFlag = !LOCALHOST.equalsIgnoreCase(request.getServerName());
        response.addCookie(createCookie(APP_ACCESS_TOKEN, accessToken, secureFlag, accessTokenExpiresInSeconds));

        return accessToken;
    }
    public static String addRefreshTokenToCookies(HttpServletRequest request,
                                           HttpServletResponse response,
                                           String username,
                                           List<String> roleNames,
                                           JwtTokenService jwtTokenService,
                                           Set<String> issuedRefreshTokens,
                                           long refreshTokenValidityMs) {

        String refreshToken = jwtTokenService.createToken(
                REFRESH_TOKEN_TYPE,
                username,
                roleNames,
                refreshTokenValidityMs
        );

        int secondsSpentOnProcessingRequest = 1;
        int refreshTokenExpiresInSeconds = (int) (refreshTokenValidityMs / 1000) - secondsSpentOnProcessingRequest;

        issuedRefreshTokens.add(refreshToken);

        boolean secureFlag = !LOCALHOST.equalsIgnoreCase(request.getServerName());
        response.addCookie(createCookie(APP_REFRESH_TOKEN, refreshToken, secureFlag, refreshTokenExpiresInSeconds));

        return refreshToken;
    }

    public static Cookie createCookie(String cookieName, String cookieValue, boolean secure, int expiresIn) {
        Cookie cookie = new Cookie(cookieName, cookieValue);
        cookie.setPath(DEFAULT_PATH);
        cookie.setHttpOnly(HTTP_ONLY);
        cookie.setSecure(secure);
        cookie.setMaxAge(expiresIn);
        return cookie;
    }

    public static void removeAccessTokenAndRefreshTokenInCookies(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (APP_ACCESS_TOKEN.equals(cookie.getName()) || APP_REFRESH_TOKEN.equals(cookie.getName())) {
                    cookie.setValue("");
                    cookie.setPath("/");
                    cookie.setMaxAge(0);
                    response.addCookie(cookie);
                }
            }
        }
    }

    public static Optional<String> getCookieValue(HttpServletRequest request, String cookieName) {
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                System.out.println("cookie: "+cookie);
                if (cookieName.equals(cookie.getName())) {
                    return Optional.ofNullable(cookie.getValue());
                }
            }
        }

        return Optional.empty();
    }
}
