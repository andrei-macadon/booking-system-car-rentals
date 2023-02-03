package com.example.breeze.repository;

import com.example.breeze.entity.ExtrasEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExtrasRepository extends JpaRepository<ExtrasEntity, Long> {


}
