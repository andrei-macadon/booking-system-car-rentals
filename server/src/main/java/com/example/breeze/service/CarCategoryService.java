package com.example.breeze.service;

import com.example.breeze.dto.CarCategoryDto;
import com.example.breeze.entity.CarCategoryEntity;

import java.util.List;
import java.util.Optional;

public interface CarCategoryService {


    List<CarCategoryDto> getAllCarCategories();
    Optional<CarCategoryEntity> findByCarCategoryId(Long id);
}
