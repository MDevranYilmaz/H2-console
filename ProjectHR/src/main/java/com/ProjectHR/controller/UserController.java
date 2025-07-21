package com.ProjectHR.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ProjectHR.dto.userRequestDTO;
import com.ProjectHR.dto.userResponseDTO;
import com.ProjectHR.service.UserService;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<userResponseDTO>> getAllUsers() {
        List<userResponseDTO> users = userService.getAllUsers();
        return ResponseEntity.ok().body(users);
    }

    @PostMapping
    public ResponseEntity<userResponseDTO> createUser(@Valid @RequestBody userRequestDTO userRequest) {
        userResponseDTO createdUser = userService.createUser(userRequest);
        return ResponseEntity.ok().body(createdUser);
    }

}
