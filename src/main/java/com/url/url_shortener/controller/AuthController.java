package com.url.url_shortener.controller;

import com.url.url_shortener.dtos.LoginRequest;
import com.url.url_shortener.dtos.RegistterRequest;
import com.url.url_shortener.models.User;
import com.url.url_shortener.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/public/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(userService.authenticateUser(loginRequest));
    }

    @PostMapping("/public/register")
    public ResponseEntity<?> registerUser(@RequestBody RegistterRequest registterRequest) {
        User user = new User();
        user.setUsername(registterRequest.getUsername());
        user.setPassword(registterRequest.getPassword());
        user.setEmail(registterRequest.getEmail());
        user.setRole("ROLE_USER");
        userService.registerUser(user);
        return ResponseEntity.ok("User registered successfully");
    }
}
