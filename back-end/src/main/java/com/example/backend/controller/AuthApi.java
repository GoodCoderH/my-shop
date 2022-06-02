package com.example.backend.controller;

import com.example.backend.auth.AuthRequest;
import com.example.backend.domain.User;
import com.example.backend.jwt.JwtUtil;
import com.example.backend.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthApi {

    private final AuthenticationManager authenticationManager;
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @PostMapping("/create")
    public ResponseEntity<?> join(@RequestBody AuthRequest authRequest) {
        User user = new User();
        user.setUsername(authRequest.getUsername());
        user.setPassword(passwordEncoder.encode(authRequest.getPassword()));
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public void login(@RequestBody AuthRequest authRequest, HttpServletResponse response) throws IOException {
        try {
            Authentication authenticate = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );

            User user = (User) authenticate.getPrincipal();

            String accessToken = jwtUtil.generateAccessToken(user);
            Cookie refreshToken = jwtUtil.generateRefreshToken(user);

            response.setHeader("accessToken", accessToken);
            response.addCookie(refreshToken);
            response.setContentType(APPLICATION_JSON_VALUE);

            new ObjectMapper().writeValue(response.getOutputStream(), accessToken);

        } catch (BadCredentialsException e) {
            new ObjectMapper().writeValue(response.getOutputStream(), e);
        }
    }

    @GetMapping("/refreshToken")
    public void refreshToken(@CookieValue(name = "refreshToken") Cookie token) {

        System.out.println(token.getValue());

    }

}
