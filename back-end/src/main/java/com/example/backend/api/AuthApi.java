package com.example.backend.api;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.SignatureGenerationException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.example.backend.auth.AuthRequest;
import com.example.backend.domain.User;
import com.example.backend.jwt.JwtUtil;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
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
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest, HttpServletResponse response, @CookieValue(name = "refreshToken", required = false) Cookie cookie) throws IOException {

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

            return ResponseEntity.ok(accessToken);

        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/refreshToken")
    public ResponseEntity<?> refreshToken(
            HttpServletRequest request, HttpServletResponse response,
            @CookieValue(name = "refreshToken") Cookie cookie) {

        log.info("Refresh Token={}", cookie.getValue());

        String refreshToken = cookie.getValue();

        try {
            String username = jwtUtil.getSubject(refreshToken);
            log.info("username={}",username);

            User user = userRepository.findByUsername(username).get();

            String accessToken = jwtUtil.generateAccessToken(user);
            response.setHeader("accessToken", accessToken);
            response.setContentType(APPLICATION_JSON_VALUE);
            return ResponseEntity.ok(accessToken);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(403).body("Please login again");
        }

    }

}
