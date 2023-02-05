package com.example.breeze.repository;

import com.example.breeze.entity.ERole;
import com.example.breeze.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository  extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);

    boolean existsByName(ERole name);
}

