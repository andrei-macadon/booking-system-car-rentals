package com.example.breeze.service;

import com.example.breeze.entity.ERole;
import com.example.breeze.entity.Role;
import com.example.breeze.repository.RoleRepository;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {

    RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository){
        this.roleRepository = roleRepository;
    }

    @Override
    public Role getAdminRole() {
        return roleRepository.findByName(ERole.ADMIN).orElseThrow();
    }

    @Override
    public Role getUserRole() {
        return roleRepository.findByName(ERole.USER).orElseThrow();
    }
}
