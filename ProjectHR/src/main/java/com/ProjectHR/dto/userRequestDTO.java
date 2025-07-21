package com.ProjectHR.dto;

import com.ProjectHR.enums.Role;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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

}
