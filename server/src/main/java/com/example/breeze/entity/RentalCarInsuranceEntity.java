package com.example.breeze.entity;


import lombok.*;

import javax.annotation.processing.Generated;
import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity(name = "RentalCarInsurance")
@Table(name = "rental_car_insurance")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class RentalCarInsuranceEntity implements Serializable {

    @Id
    @SequenceGenerator(
            name="rental_car_insurance_sequence",
            sequenceName = "rental_car_insurance_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "rental_car_insurance_sequence"
    )
    private Long insuranceCode;
    private String coverageType;
    private Integer costPerDay;
    private Integer excess;
}