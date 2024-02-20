package com.pth.taskbackend.utils.common;

import com.pth.taskbackend.services.JwtTokenService;
import com.pth.taskbackend.utils.constants.PathConstants;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.List;
import java.util.Set;

import static com.pth.taskbackend.utils.constants.PathConstants.*;
import static com.pth.taskbackend.utils.constants.TokenConstants.*;

public class CookieCommon {
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
        cookie.setPath(PathConstants.DEFAULT_PATH);
        cookie.setHttpOnly(PathConstants.HTTP_ONLY);
        cookie.setSecure(secure);
        cookie.setMaxAge(expiresIn);
        return cookie;
    }
}
