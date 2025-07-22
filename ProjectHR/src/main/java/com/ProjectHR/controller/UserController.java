package com.ProjectHR.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ProjectHR.dto.userRequestDTO;
import com.ProjectHR.dto.userResponseDTO;
import com.ProjectHR.service.UserService;

import jakarta.validation.Valid;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @GetMapping("/hr/{hrId}")
    public ResponseEntity<List<userResponseDTO>> getWorkersByHR(@PathVariable UUID hrId) {
        List<userResponseDTO> workers = userService.getWorkersByHR(hrId);
        return ResponseEntity.ok().body(workers);
    }

    @GetMapping("/admin")
    public ResponseEntity<List<userResponseDTO>> getAllWorkers() {
        List<userResponseDTO> workers = userService.getAllWorkers();
        return ResponseEntity.ok().body(workers);
    }

    @GetMapping("/admin/{status}")
    public ResponseEntity<List<userResponseDTO>> getWorkersByStatus(@PathVariable String status) {
        List<userResponseDTO> workers = userService
                .getWorkersByStatus(Enum.valueOf(com.ProjectHR.enums.Condition.class, status));
        return ResponseEntity.ok().body(workers);
    }

    @PostMapping
    public ResponseEntity<userResponseDTO> createUser(@Valid @RequestBody userRequestDTO userRequest) {
        userResponseDTO createdUser = userService.createUser(userRequest);
        return ResponseEntity.ok().body(createdUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<userResponseDTO> updateUser(@PathVariable UUID id,
            @Valid @RequestBody userRequestDTO userRequest) {
        userResponseDTO updatedUser = userService.updateUser(id, userRequest);
        return ResponseEntity.ok().body(updatedUser);
    }

}
