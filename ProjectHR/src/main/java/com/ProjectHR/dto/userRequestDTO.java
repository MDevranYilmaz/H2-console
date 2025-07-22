package com.ProjectHR.dto;

import com.ProjectHR.enums.Condition;
import com.ProjectHR.enums.Role;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class userRequestDTO {
    @NotBlank
    @Size(max = 100, message = "First name cannot exceed 100 characters")
    private String firstName;

    @NotBlank
    @Size(max = 100, message = "Last name cannot exceed 100 characters")
    private String lastName;

    @NotBlank
    @Size(max = 100, message = "Email cannot exceed 100 characters")
    private String email;

    @NotBlank
    @Size(max = 50, message = "Username cannot exceed 50 characters")
    private String username;

    @NotBlank
    @Size(max = 100, message = "Password cannot exceed 100 characters")
    private String password;

    @NotNull
    private Role role;

    @NotNull
    private Condition condition;

    @NotBlank
    @Size(max = 700, message = "details cannot exceed 700 characters")
    private String details;


    public @NotBlank @Size(max = 700, message = "details cannot exceed 700 characters") String getDetails() {
        return details;
    }

    public void setDetails(@NotBlank @Size(max = 700, message = "details cannot exceed 700 characters") String details) {
        this.details = details;
    }

    public @NotBlank @Size(max = 100, message = "First name cannot exceed 100 characters") String getFirstName() {
        return firstName;
    }

    public @NotBlank @Size(max = 100, message = "Last name cannot exceed 100 characters") String getLastName() {
        return lastName;
    }

    public @NotBlank @Size(max = 100, message = "Email cannot exceed 100 characters") String getEmail() {
        return email;
    }

    public @NotBlank @Size(max = 50, message = "Username cannot exceed 50 characters") String getUsername() {
        return username;
    }

    public @NotBlank @Size(max = 100, message = "Password cannot exceed 100 characters") String getPassword() {
        return password;
    }

    public @NotNull Role getRole() {
        return role;
    }

    public void setFirstName(@NotBlank @Size(max = 100, message = "First name cannot exceed 100 characters") String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(@NotBlank @Size(max = 100, message = "Last name cannot exceed 100 characters") String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(@NotBlank @Size(max = 100, message = "Email cannot exceed 100 characters") String email) {
        this.email = email;
    }

    public void setUsername(@NotBlank @Size(max = 50, message = "Username cannot exceed 50 characters") String username) {
        this.username = username;
    }

    public void setPassword(@NotBlank @Size(max = 100, message = "Password cannot exceed 100 characters") String password) {
        this.password = password;
    }

    public void setRole(@NotNull Role role) {
        this.role = role;
    }

    public @NotNull Condition getCondition() {
        return condition;
    }

    public void setCondition(@NotNull Condition condition) {
        this.condition = condition;
    }
}
