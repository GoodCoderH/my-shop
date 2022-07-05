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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public UserResponse signUp(UserRequest userRequest) {
        if (userRepository.existsByUsername(userRequest.getUsername())) {
            throw new RuntimeException("Username already exist.");
        }

        User user = userRequest.toUser(passwordEncoder);
        return UserResponse.of(userRepository.save(user));
    }

    @Transactional
    public Token login(UserRequest userRequest) {

        UsernamePasswordAuthenticationToken authenticationToken = userRequest.toAuthentication();

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        Token token = tokenProvider.generateToken(authentication);

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setKey(authentication.getName());
        refreshToken.setValue(token.getRefreshToken());

        refreshTokenRepository.save(refreshToken);

        return token;
    }

    @Transactional
    public Token reissue(TokenRequest tokenRequest) {

        if (!tokenProvider.validateToken(tokenRequest.getRefreshToken())) {
            throw new RuntimeException("Invalid token.");
        }

        Authentication authentication = tokenProvider.getAuthentication(tokenRequest.getAccessToken());

        RefreshToken refreshToken = refreshTokenRepository.findByKey(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Logged out user."));

        if (!refreshToken.getValue().equals(tokenRequest.getRefreshToken())) {
            throw new RuntimeException("The token's user information does not match.");
        }

        Token token = tokenProvider.generateToken(authentication);

        RefreshToken newRefreshToken = refreshToken.updateValue(token.getRefreshToken());
        refreshTokenRepository.save(newRefreshToken);

        return token;

    }
}
