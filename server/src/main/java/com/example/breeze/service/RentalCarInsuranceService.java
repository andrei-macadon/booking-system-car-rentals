package com.example.breeze.service;

import com.example.breeze.dto.RentalCarInsuranceDto;
import com.example.breeze.entity.RentalCarInsuranceEntity;

import java.util.List;
import java.util.Optional;

public interface RentalCarInsuranceService {
    List<RentalCarInsuranceDto> getRentalCarInsurances();
    Optional<RentalCarInsuranceEntity> findByCoverageType(String coverageType);
}
