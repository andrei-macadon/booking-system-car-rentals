package com.example.breeze.controller;

import com.example.breeze.dto.CarCategoryDto;
import com.example.breeze.service.CarCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CarCategoryController {

    @Autowired
    CarCategoryService carCategoryService;

    @GetMapping("/carcategory")
    public List<CarCategoryDto> getAllCarCategories() {
        List<CarCategoryDto> carCategoryDtos = carCategoryService.getAllCarCategories();
        return carCategoryDtos;
    }
}
