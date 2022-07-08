package com.example.backend.service;

import com.example.backend.domain.RefreshToken;
import com.example.backend.domain.User;
import com.example.backend.jwt.*;
import com.example.backend.repository.RefreshTokenRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CookieValue;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final RedisService redisService;

    @Transactional
    public UserResponse signUp(UserRequest userRequest) {
        if (userRepository.existsByUsername(userRequest.getUsername())) {
            throw new RuntimeException("Username already exist.");
        }

        User user = userRequest.toUser(passwordEncoder);
        return UserResponse.of(userRepository.save(user));
    }

    @Transactional
    public Token login(UserRequest userRequest, HttpServletResponse response) {

        UsernamePasswordAuthenticationToken authenticationToken = userRequest.toAuthentication();

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        Token token = tokenProvider.generateToken(authentication);

        response.addCookie(token.getRefreshToken());

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setKey(authentication.getName());
        refreshToken.setValue(token.getRefreshToken().getValue());

        redisService.setValues(authentication.getName(),
                refreshToken.getValue(), Duration.ofMillis(token.getRefreshTokenExpiresIn()));

        return token;
    }

    @Transactional
    public Token reissue(Cookie cookie, String accessToken, HttpServletResponse response) {

        System.out.println("accessToken = " + accessToken);

        String refreshToken = cookie.getValue();
        System.out.println("refreshToken = " + refreshToken);

        if (!tokenProvider.validateToken(refreshToken)) {
            throw new RuntimeException("Invalid token.");
        }

        Authentication authentication = tokenProvider.getAuthentication(accessToken);

        String values = redisService.getValues(authentication.getName());

        if (!values.equals(refreshToken)) {
            throw new RuntimeException("The token's user information does not match.");
        }

        Token token = tokenProvider.generateToken(authentication);

        redisService.setValues(authentication.getName(),
                token.getRefreshToken().getValue(), Duration.ofMillis(token.getRefreshTokenExpiresIn()));

        System.out.println(redisService.getValues(authentication.getName()));

//        response.addCookie(token.getRefreshToken());

        return token;

    }
}
