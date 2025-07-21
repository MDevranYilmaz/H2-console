package com.ProjectHR.dto;

import com.ProjectHR.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class userResponseDTO {
    private String id;
    private String firstName;
    private String lastName;
    private Role role;
    private String email;
    private String username;
}
