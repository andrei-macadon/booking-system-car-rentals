package com.example.breeze.repository;

import com.example.breeze.entity.RentalCarInsuranceEntity;
import com.example.breeze.entity.RentalCarInsuranceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RentalCarInsuranceRepository extends JpaRepository<RentalCarInsuranceEntity, Long> {

    Optional<RentalCarInsuranceEntity> findByCoverageType(String coverageType);
}
