package com.example.breeze.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@AllArgsConstructor
@ToString
public class CarCategoryDto {

    private Long carCategoryId;
    private String carCategoryName;
    private Integer noOfPersons;
    private Integer noOfLuggage;
    private Integer noOfDoors;
    private Integer minimumDrivingAge;
    private Float insuranceMultiplier;
    private Integer lateFeePerHour;
    private String subcategory;
    private List<CarDto> carEntities;

    public CarCategoryDto() {

    }
}
