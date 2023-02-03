package com.example.breeze.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity(name = "CarCategory")
@Table(name = "car_category")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CarCategoryEntity {

    @Id
    @Column(name = "car_category_id")
    @SequenceGenerator(
            name = "car_category_id_generator",
            sequenceName = "car_category_name",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "car_category_id_generator"
    )
    private Long carCategoryId;

    @Column(name = "car_category_name")
    private String carCategoryName;

    @Column(name = "no_of_persons")
    private Integer noOfPersons;

    @Column(name = "no_of_luggage")
    private Integer noOfLuggage;

    @Column(name = "no_of_doors")
    private Integer noOfDoors;

    @Column(name = "minimum_driving_age")
    private Integer minimumDrivingAge;

    @Column(name = "insurance_multiplier")
    private Float insuranceMultiplier;

    @Column(name = "late_fee_per_hour")
    private Integer lateFeePerHour;

    @Column(name = "subcategory")
    private String subcategory;

    @OneToMany(
            fetch = FetchType.LAZY,
            mappedBy = "category"
    )
    private List<CarEntity> carEntities;
}
