package com.pth.taskbackend.util.func;

import com.pth.taskbackend.service.JwtTokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.List;
import java.util.Set;

import static com.pth.taskbackend.util.constant.TokenConstants.*;

public class CookieFunc {
    public static void createAndAddCookies(HttpServletRequest request,
                                           HttpServletResponse response,
                                           String username,
                                           List<String> roleNames,
                                           JwtTokenService jwtTokenService,
                                           Set<String> issuedRefreshTokens,
                                           long accessTokenValidityMs,
                                           long refreshTokenValidityMs) {

        String accessToken = jwtTokenService.createToken(
                ACCESS_TOKEN_TYPE,
                username, roleNames,
                accessTokenValidityMs
        );
        String refreshToken = jwtTokenService.createToken(
                REFRESH_TOKEN_TYPE,
                username,
                roleNames,
                refreshTokenValidityMs
        );

        int secondsSpentOnProcessingRequest = 1;
        int accessTokenExpiresInSeconds = (int) (accessTokenValidityMs / 1000) - secondsSpentOnProcessingRequest;
        int refreshTokenExpiresInSeconds = (int) (refreshTokenValidityMs / 1000) - secondsSpentOnProcessingRequest;

        issuedRefreshTokens.add(refreshToken);

        // secure flag allows cookies to be transported only via https -> we turn it off on localhost
        boolean secureFlag = !LOCALHOST.equalsIgnoreCase(request.getServerName());

        response.addCookie(createCookie(APP_ACCESS_TOKEN, accessToken, secureFlag, accessTokenExpiresInSeconds));
        response.addCookie(createCookie(APP_REFRESH_TOKEN, refreshToken, secureFlag, refreshTokenExpiresInSeconds));
    }

    public static Cookie createCookie(String cookieName, String cookieValue, boolean secure, int expiresIn) {
        Cookie cookie = new Cookie(cookieName, cookieValue);
        cookie.setPath(DEFAULT_PATH);
        cookie.setHttpOnly(HTTP_ONLY);
        cookie.setSecure(secure);
        cookie.setMaxAge(expiresIn);
        return cookie;
    }
}
