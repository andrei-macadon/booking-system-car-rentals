package com.example.breeze.service;

import com.example.breeze.dto.CarCategoryDto;
import com.example.breeze.entity.CarCategoryEntity;
import com.example.breeze.repository.CarCategoryRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@AllArgsConstructor
public class CarCategoryServiceImpl implements CarCategoryService{

    @Autowired
    CarCategoryRepository carCategoryRepository;

    @Override
    public List<CarCategoryDto> getAllCarCategories() {

        List<CarCategoryEntity> carCategoryEntities = carCategoryRepository.findAll();
        List<CarCategoryDto> carCategoryDtos1 = new ArrayList<>();
        CarCategoryDto carCategoryDto1 = new CarCategoryDto();
        BeanUtils.copyProperties(carCategoryEntities.get(0), carCategoryDto1);
        System.out.println(carCategoryDto1);
        List<CarCategoryDto> carCategoryDtos = carCategoryEntities.stream().map(carCategoryEntity -> {
            CarCategoryDto carCategoryDto = new CarCategoryDto();
            BeanUtils.copyProperties(carCategoryEntity, carCategoryDto);
            return carCategoryDto;
        }).collect(Collectors.toList());
        return carCategoryDtos;
    }

    @Override
    public Optional<CarCategoryEntity> findByCarCategoryId(Long id) {
        return carCategoryRepository.findByCarCategoryId(id);
    }
}
