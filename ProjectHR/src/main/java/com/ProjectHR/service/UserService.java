package com.ProjectHR.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import com.ProjectHR.dto.userRequestDTO;
import com.ProjectHR.dto.userResponseDTO;
import com.ProjectHR.entity.User;
import com.ProjectHR.mapper.Usermap;
import com.ProjectHR.repository.userRepository;

@Service
public class UserService {

    @Autowired
    private userRepository userRepository;

    public UserService(userRepository userRepository1) {
        this.userRepository = userRepository1;
    }

    public List<userResponseDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<userResponseDTO> userDtos = users.stream()
                .map(user -> Usermap.toDto(user))
                .toList();
        return userDtos;
    }

    public userResponseDTO createUser(userRequestDTO userRequestDto) {
        User user = userRepository.save(Usermap.toEntity(userRequestDto));
        return Usermap.toDto(user);
    }
}
