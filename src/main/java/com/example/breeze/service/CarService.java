package com.example.breeze.service;

import com.example.breeze.entity.CarEntity;

import java.util.Optional;

public interface CarService {

    Optional<CarEntity> findByModelName(String modelName);

}
