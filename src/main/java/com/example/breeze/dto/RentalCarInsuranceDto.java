package com.example.breeze.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class RentalCarInsuranceDto {
    private Long insuranceCode;
//    private String insuranceName;
    private String coverageType;
    private Integer costPerDay;
    private Integer excess;
}
