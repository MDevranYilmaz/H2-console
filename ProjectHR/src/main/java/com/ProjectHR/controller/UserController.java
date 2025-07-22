package com.ProjectHR.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ProjectHR.dto.userRequestDTO;
import com.ProjectHR.dto.userResponseDTO;
import com.ProjectHR.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "User Controller", description = "User Controller API")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @Operation(summary = "Get all users", description = "Get all users")
    public ResponseEntity<List<userResponseDTO>> getAllUsers() {
        List<userResponseDTO> users = userService.getAllUsers();
        return ResponseEntity.ok().body(users);
    }

    @GetMapping("/hr/{hrId}")
    @Operation(summary = "Get workers by HR", description = "Get workers by HR")
    public ResponseEntity<List<userResponseDTO>> getWorkersByHR(@PathVariable UUID hrId) {
        List<userResponseDTO> workers = userService.getWorkersByHR(hrId);
        return ResponseEntity.ok().body(workers);
    }

    @GetMapping("/admin")
    @Operation(summary = "Get all workers", description = "Get all workers")
    public ResponseEntity<List<userResponseDTO>> getAllWorkers() {
        List<userResponseDTO> workers = userService.getAllWorkers();
        return ResponseEntity.ok().body(workers);
    }

    @GetMapping("/admin/{status}")
    @Operation(summary = "Get workers by status", description = "Get workers by status")
    public ResponseEntity<List<userResponseDTO>> getWorkersByStatus(@PathVariable String status) {
        List<userResponseDTO> workers = userService
                .getWorkersByStatus(Enum.valueOf(com.ProjectHR.enums.Condition.class, status));
        return ResponseEntity.ok().body(workers);
    }

    @PostMapping
    @Operation(summary = "Create user", description = "Create user")
    public ResponseEntity<userResponseDTO> createUser(@Valid @RequestBody userRequestDTO userRequest) {
        userResponseDTO createdUser = userService.createUser(userRequest);
        return ResponseEntity.ok().body(createdUser);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update user", description = "Update user")
    public ResponseEntity<userResponseDTO> updateUser(@PathVariable UUID id,
            @Valid @RequestBody userRequestDTO userRequest) {
        userResponseDTO updatedUser = userService.updateUser(id, userRequest);
        return ResponseEntity.ok().body(updatedUser);
    }

}
