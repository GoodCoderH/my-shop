package com.example.backend.controller;

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
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
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

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserRequest userRequest, HttpServletResponse response) {

        if (userRequest.getUsername().isBlank() || userRequest.getPassword().isBlank()) {
            return ResponseEntity.status(400).build();
        }

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

    @GetMapping("/reissue")
    public ResponseEntity<?> reissue(@CookieValue("refreshToken") Cookie cookie, HttpServletResponse response) {
        String refreshToken = cookie.getValue();

//        log.info("refreshToken: " + refreshToken);

        Authentication authentication = tokenProvider.getAuthentication(refreshToken);

        String values = redisService.getValues(authentication.getName());

        if (values == null) {
            return ResponseEntity.status(500).body("The token is missing.");
        }

        if (!tokenProvider.validateToken(refreshToken)) {
            return ResponseEntity.status(401).body("Invalid token.");
        }

        if (!values.equals(refreshToken)) {
            return ResponseEntity.status(401).body("The token's user information does not match.");
        }

        Token token = tokenProvider.generateToken(authentication);

        redisService.setValues(authentication.getName(),
                token.getRefreshToken().getValue(), Duration.ofMillis(token.getRefreshTokenExpiresIn()));


        response.addCookie(token.getRefreshToken());

        String accessToken = token.getAccessToken();

        return ResponseEntity.ok(accessToken);
    }

    @GetMapping("/logout")
    public void logout(@CookieValue("refreshToken") Cookie cookie) {
        String refreshToken = cookie.getValue();

        Authentication authentication = tokenProvider.getAuthentication(refreshToken);
        redisService.deleteValues(authentication.getName());
    }

}
