package com.example.breeze.repository;

import java.util.List;
import com.example.breeze.entity.CarCategoryEntity;
import com.example.breeze.entity.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CarCategoryRepository extends JpaRepository<CarCategoryEntity, Long> {

    List<CarCategoryEntity> findByCarCategoryName(String carCategoryName);
    Boolean existsByCarCategoryName(String carCategoryName);

    Optional<CarCategoryEntity> findByCarCategoryId(Long id);
}
