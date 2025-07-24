package com.ProjectHR.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ProjectHR.entity.User;
import com.ProjectHR.repository.userRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private userRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String input) throws UsernameNotFoundException {
        try {
            UUID uuid = UUID.fromString(input);
            return userRepository.findById(uuid)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + input));
        } catch (IllegalArgumentException e) {
            return userRepository.findByUsername(input)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + input));
        }
    }
}
