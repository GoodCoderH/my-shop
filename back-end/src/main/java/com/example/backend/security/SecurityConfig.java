package com.example.backend.security;

import com.example.backend.config.CorsConfig;
import com.example.backend.jwt.JwtAuthenticationFilter;
import com.example.backend.jwt.JwtAuthorizationFilter;
import com.example.backend.jwt.JwtProperties;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import com.example.backend.config.CorsConfig.*;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CorsConfig corsConfig;
    private final UserRepository userRepository;
    private final JwtProperties jwtProperties;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .addFilter(corsConfig.corsFilter())
                .addFilter(new JwtAuthenticationFilter(authenticationManager(), jwtProperties))
                .addFilter(new JwtAuthorizationFilter(authenticationManager(), userRepository, jwtProperties))
                .authorizeRequests()
                .antMatchers("/product/**", "/cart")
                .access("hasRole('ROLE_USER') or hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
                .antMatchers("/dashboard/**")
                .access("hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
                .anyRequest().permitAll();
    }
}
