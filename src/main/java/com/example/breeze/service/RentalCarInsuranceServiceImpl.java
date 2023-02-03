package com.example.breeze.service;

import com.example.breeze.dto.RentalCarInsuranceDto;
import com.example.breeze.entity.RentalCarInsuranceEntity;
import com.example.breeze.repository.RentalCarInsuranceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RentalCarInsuranceServiceImpl implements RentalCarInsuranceService {

    @Autowired
    RentalCarInsuranceRepository rentalCarInsuranceRepository;

    @Override
    public List<RentalCarInsuranceDto> getRentalCarInsurances() {
        List<RentalCarInsuranceEntity> rentalCarInsuranceEntities = rentalCarInsuranceRepository.findAll();
        List<RentalCarInsuranceDto> rentalCarInsuranceDtos =  rentalCarInsuranceEntities.stream().map(rentalCarInsuranceEntity -> {
            RentalCarInsuranceDto rentalCarInsuranceDto = new RentalCarInsuranceDto();
            BeanUtils.copyProperties(rentalCarInsuranceEntity, rentalCarInsuranceDto);
            return rentalCarInsuranceDto;
        }).collect(Collectors.toList());
        return rentalCarInsuranceDtos;
    }

    @Override
    public Optional<RentalCarInsuranceEntity> findByCoverageType(String coverageType) {
        return rentalCarInsuranceRepository.findByCoverageType(coverageType);
    }
}
