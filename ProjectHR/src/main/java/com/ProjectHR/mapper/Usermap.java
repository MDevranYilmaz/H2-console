package com.ProjectHR.mapper;

import com.ProjectHR.dto.userRequestDTO;
import com.ProjectHR.dto.userResponseDTO;
import com.ProjectHR.entity.User;

public class Usermap {
    public static userResponseDTO toDto(User user) {
        userResponseDTO dto = new userResponseDTO();
        dto.setId(user.getId().toString());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setRole(user.getRole());
        dto.setEmail(user.getEmail());
        dto.setUsername(user.getUsername());
        dto.setCondition(user.getCondition());
        dto.setDetails(user.getDetails());
        dto.setSubmittedBy(
                user.getSubmittedBy() != null ? user.getSubmittedBy().toString() : null);
        return dto;
    }

    public static User toEntity(userRequestDTO userRequest) {
        User user = new User();
        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        user.setEmail(userRequest.getEmail());
        user.setUsername(userRequest.getUsername());
        user.setPassword(userRequest.getPassword());
        user.setRole(userRequest.getRole());
        user.setCondition(userRequest.getCondition());
        user.setDetails(userRequest.getDetails());
        user.setSubmittedBy(userRequest.getSubmittedBy());
        return user;
    }
}