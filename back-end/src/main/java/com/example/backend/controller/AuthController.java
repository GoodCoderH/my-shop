package com.example.backend.controller;

import com.example.backend.domain.RefreshToken;
import com.example.backend.jwt.JwtFilter;
import com.example.backend.jwt.Token;
import com.example.backend.jwt.TokenProvider;
import com.example.backend.jwt.UserRequest;
import com.example.backend.service.RedisService;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.Duration;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final TokenProvider tokenProvider;
    private final RedisService redisService;
    private final JwtFilter jwtFilter;



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserRequest userRequest, HttpServletResponse response) {

        try {
            userService.findByUsername(userRequest.getUsername());
        } catch (UsernameNotFoundException e) {
            log.info(e.getMessage());
            return ResponseEntity.status(401).body(e.getMessage());
        }

        UsernamePasswordAuthenticationToken authenticationToken = userRequest.toAuthentication();
        Authentication authentication = authenticationManagerBuilder
                .getObject().authenticate(authenticationToken);

        Token token = tokenProvider.generateToken(authentication);
        response.addCookie(token.getRefreshToken());

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setKey(authentication.getName());
        refreshToken.setValue(token.getRefreshToken().getValue());

        redisService.setValues(authentication.getName(),
                refreshToken.getValue(), Duration.ofMillis(token.getRefreshTokenExpiresIn()));

        return ResponseEntity.ok(token);
    }

    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(@CookieValue(value = "refreshToken") Cookie cookie, HttpServletRequest request, HttpServletResponse response) {

        String refreshToken = cookie.getValue();
        String accessToken = jwtFilter.resolveToken(request);

        if (!tokenProvider.validateToken(refreshToken) || !StringUtils.hasText(accessToken)) {
            return ResponseEntity.status(401).body("Invalid token.");
        }

        Authentication authentication = tokenProvider.getAuthentication(accessToken);

        String values = redisService.getValues(authentication.getName());

        if (!values.equals(refreshToken)) {
            return ResponseEntity.status(401).body("The token's user information does not match.");
        }

        Token token = tokenProvider.generateToken(authentication);

        redisService.setValues(authentication.getName(),
                token.getRefreshToken().getValue(), Duration.ofMillis(token.getRefreshTokenExpiresIn()));


        response.addCookie(token.getRefreshToken());

        return ResponseEntity.ok(token);
    }

}
