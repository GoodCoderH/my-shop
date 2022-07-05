package com.example.backend.controller;

import com.example.backend.jwt.UserResponse;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/info")
    public ResponseEntity<UserResponse> getMyUserInfo() {
        return ResponseEntity.ok(userService.getMyInfo());
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserResponse> getUserInfo(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUserInfo(username));
    }
}
