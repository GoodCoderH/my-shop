package com.example.backend.controller;

import com.example.backend.jwt.JwtFilter;
import com.example.backend.jwt.UserResponse;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final JwtFilter jwtFilter;

    @GetMapping("/info")
    public ResponseEntity<UserResponse> getMyUserInfo(HttpServletRequest request) {
        jwtFilter.resolveToken(request);
        return ResponseEntity.ok(userService.getMyInfo());
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserResponse> getUserInfo(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUserInfo(username));
    }
    @GetMapping("/admin")
    public String testAdmin() {
        return "ok";
    }


}
