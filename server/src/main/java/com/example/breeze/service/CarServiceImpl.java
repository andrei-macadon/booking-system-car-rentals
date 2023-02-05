package com.example.breeze.service;

import com.example.breeze.entity.CarEntity;
import com.example.breeze.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CarServiceImpl implements CarService{

    @Autowired
    CarRepository carRepository;

    @Override
    public Optional<CarEntity> findByModelName(String modelName) {
        return carRepository.findByModelName(modelName);
    }
}
