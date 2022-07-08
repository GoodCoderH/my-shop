package com.example.backend.controller;

import com.example.backend.jwt.Token;
import com.example.backend.jwt.TokenRequest;
import com.example.backend.jwt.UserRequest;
import com.example.backend.jwt.UserResponse;
import com.example.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<UserResponse> signup(@RequestBody UserRequest userRequest) {
        return ResponseEntity.ok(authService.signUp(userRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<Token> login(@RequestBody UserRequest userRequest, HttpServletResponse response) {
        return ResponseEntity.ok(authService.login(userRequest, response));
    }

    @PostMapping("/reissue")
    public ResponseEntity<Token> reissue(@CookieValue(value = "refreshToken") Cookie cookie, @RequestBody String accessToken, HttpServletResponse response) {
        return ResponseEntity.ok(authService.reissue(cookie, accessToken, response));
    }

}
