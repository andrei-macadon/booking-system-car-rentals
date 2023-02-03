package com.example.breeze.dto;

import com.example.breeze.entity.CarCategoryEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@AllArgsConstructor
@ToString
@Builder
public class CarDto {
    private Long carId;
    private String plateNumber;
    private String modelName;
    private Integer modelYear;
    private Long mileage;
    private String transmission;
    private Integer costPerDay;
    private CarCategoryDto category;
    public CarDto() {

    }

}
