package com.ProjectHR.dto;

import java.io.Serializable;

import com.ProjectHR.enums.Condition;
import com.ProjectHR.enums.Role;

public class userResponseDTO implements Serializable {
    private String id;
    private String firstName;
    private String lastName;
    private Role role;
    private String email;
    private String username;
    private Condition condition;
    private String details;
    private String submittedBy;

    public String getSubmittedBy() {
        return submittedBy;
    }

    public void setSubmittedBy(String submittedBy) {
        this.submittedBy = submittedBy;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Condition getCondition() {
        return condition;
    }

    public String getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Role getRole() {
        return role;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public void setCondition(Condition condition) {
        this.condition = condition;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public userResponseDTO(String id, String firstName, String lastName, Role role, String email, String username,
            Condition condition) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.email = email;
        this.username = username;
        this.condition = condition;
    }

    public userResponseDTO() {
    }
}
