package com.ProjectHR.service;

import com.ProjectHR.grpc.ApprovalServiceGRPCClient;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

import com.ProjectHR.dto.userRequestDTO;
import com.ProjectHR.dto.userResponseDTO;
import com.ProjectHR.entity.User;
import com.ProjectHR.enums.Condition;
import com.ProjectHR.enums.Role;
import com.ProjectHR.exception.EmailAlreadyExistsException;
import com.ProjectHR.exception.UserNotFoundException;
import com.ProjectHR.mapper.Usermap;
import com.ProjectHR.repository.userRepository;

@Service
public class UserService {

    private userRepository userRepository;
    private final ApprovalServiceGRPCClient approvalServiceGRPCClient;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public UserService(userRepository userRepository1, ApprovalServiceGRPCClient approvalServiceGRPCClient,
            PasswordEncoder passwordEncoder, EmailService emailService) {
        this.userRepository = userRepository1;
        this.approvalServiceGRPCClient = approvalServiceGRPCClient;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    public List<userResponseDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<userResponseDTO> userDtos = users.stream()
                .map(user -> Usermap.toDto(user))
                .toList();
        return userDtos;
    }

    @CacheEvict(value = { "allWorkers", "workersByHR", "workersByStatus" }, allEntries = true)
    public userResponseDTO createUser(userRequestDTO userRequestDto) {
        if (userRepository.existsByEmail(userRequestDto.getEmail())) {
            throw new EmailAlreadyExistsException("Email already exists: " + userRequestDto.getEmail()); // special
                                                                                                         // exception
                                                                                                         // for mail
                                                                                                         // check
                                                                                                         // mechanism
        }
        userRequestDto.setPassword(passwordEncoder.encode(userRequestDto.getPassword()));
        User user = userRepository.save(Usermap.toEntity(userRequestDto));

        approvalServiceGRPCClient.createApprovalResponse(user.getId().toString(), user.getUsername(),
                user.getCondition().toString(), user.getDetails());
        return Usermap.toDto(user);
    }

    @CacheEvict(value = { "allWorkers", "workersByHR", "workersByStatus" }, allEntries = true)
    public userResponseDTO updateUser(UUID id, userRequestDTO userRequestDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id)); // special exception for
                                                                                                // user not found
                                                                                                // mechanism

        if (userRepository.existsByEmailAndIdNot(userRequestDto.getEmail(), id)) {
            throw new EmailAlreadyExistsException("Email already exists: " + userRequestDto.getEmail());
        } // if the user try to update the email with an existing one, it will throw an
          // exception

        Condition previousCondition = user.getCondition();

        user.setFirstName(userRequestDto.getFirstName());
        user.setLastName(userRequestDto.getLastName());
        user.setEmail(userRequestDto.getEmail());
        user.setUsername(userRequestDto.getUsername());
        user.setPassword(userRequestDto.getPassword());
        user.setRole(userRequestDto.getRole());
        user.setCondition(userRequestDto.getCondition());

        User updatedUser = userRepository.save(user);

        if (previousCondition == Condition.PENDING &&
                (user.getCondition() == Condition.APPROVED || user.getCondition() == Condition.REJECTED)) {
            emailService.sendStatusUpdateEmail(
                    user.getEmail(),
                    user.getFirstName(),
                    user.getCondition().name());
        }

        return Usermap.toDto(updatedUser);
    }

    @Cacheable(value = "workersByHR", key = "#hrId")
    public List<userResponseDTO> getWorkersByHR(UUID hrId) {
        List<User> workers = userRepository.findAllByRoleAndSubmittedBy(Role.WORKER, hrId);
        return workers.stream().map(Usermap::toDto).toList();
    }

    @Cacheable("allWorkers")
    public List<userResponseDTO> getAllWorkers() {
        List<User> workers = userRepository.findAllByRole(Role.WORKER);
        return workers.stream().map(Usermap::toDto).toList();
    }

    @Cacheable(value = "workersByStatus", key = "#status")
    public List<userResponseDTO> getWorkersByStatus(Condition condition) {
        List<User> workers = userRepository.findAllByRoleAndCondition(Role.WORKER, condition);
        return workers.stream().map(Usermap::toDto).toList();
    }

}
