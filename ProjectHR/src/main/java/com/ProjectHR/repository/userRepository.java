package com.ProjectHR.repository;

import com.ProjectHR.entity.User;
import com.ProjectHR.enums.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface userRepository extends JpaRepository<User, UUID> {
    boolean existsByEmail(String email); // check if email exists

    boolean existsByEmailAndIdNot(String email, UUID id); // check if email exists and is not the same as the id for
                                                          // update part

    List<User> findAllByRoleAndSubmittedBy(Role role, UUID submittedBy);

    List<User> findAllByRole(Role role);

    List<User> findAllByRoleAndCondition(Role role, Condition condition);

    Optional<User> findByUsername(String username);
}
