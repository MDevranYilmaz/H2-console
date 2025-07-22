package com.ProjectHR.service;

import com.ProjectHR.grpc.ApprovalServiceGRPCClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

import com.ProjectHR.dto.userRequestDTO;
import com.ProjectHR.dto.userResponseDTO;
import com.ProjectHR.entity.User;
import com.ProjectHR.exception.EmailAlreadyExistsException;
import com.ProjectHR.exception.UserNotFoundException;
import com.ProjectHR.mapper.Usermap;
import com.ProjectHR.repository.userRepository;

@Service
public class UserService {

    @Autowired
    private userRepository userRepository;
    private final ApprovalServiceGRPCClient approvalServiceGRPCClient;

    public UserService(userRepository userRepository1, ApprovalServiceGRPCClient approvalServiceGRPCClient) {
        this.userRepository = userRepository1;
        this.approvalServiceGRPCClient = approvalServiceGRPCClient;
    }

    public List<userResponseDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<userResponseDTO> userDtos = users.stream()
                .map(user -> Usermap.toDto(user))
                .toList();
        return userDtos;
    }

    public userResponseDTO createUser(userRequestDTO userRequestDto) {
        if (userRepository.existsByEmail(userRequestDto.getEmail())) {
            throw new EmailAlreadyExistsException("Email already exists: " + userRequestDto.getEmail()); // special
                                                                                                         // exception
                                                                                                         // for mail
                                                                                                         // check
                                                                                                         // mechanism
        }
        User user = userRepository.save(Usermap.toEntity(userRequestDto));

        approvalServiceGRPCClient.createApprovalResponse(user.getId().toString(), user.getUsername(), user.getCondition().toString(), user.getDetails());
        return Usermap.toDto(user);
    }

    public userResponseDTO updateUser(UUID id, userRequestDTO userRequestDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id)); // special exception for
                                                                                                // user not found
                                                                                                // mechanism

        if (userRepository.existsByEmailAndIdNot(userRequestDto.getEmail(), id)) {
            throw new EmailAlreadyExistsException("Email already exists: " + userRequestDto.getEmail());
        } // if the user try to update the email with an existing one, it will throw an
          // exception

        user.setFirstName(userRequestDto.getFirstName());
        user.setLastName(userRequestDto.getLastName());
        user.setEmail(userRequestDto.getEmail());
        user.setUsername(userRequestDto.getUsername());
        user.setPassword(userRequestDto.getPassword());
        user.setRole(userRequestDto.getRole());

        User updatedUser = userRepository.save(user);
        return Usermap.toDto(updatedUser);
    }

}