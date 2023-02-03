package com.example.breeze.entity;

import lombok.*;
import org.hibernate.annotations.Fetch;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Builder
@Entity(name = "Car")
@Table(
        name = "car",
        uniqueConstraints = {
                @UniqueConstraint(name = "unique_plate_number", columnNames = "plate_number")
        }
)
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CarEntity implements Serializable {


    @Id
    @Column(
            name = "car_id"
    )
    @SequenceGenerator(
            name = "car_sequence",
            sequenceName = "car_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "car_sequence"
    )
    private Long carId;
    @Column(name = "plate_number")
    private String plateNumber;

    @Column(name = "model_name")
    private String modelName;
    @Column(name = "model_year")
    private Integer modelYear;
    @Column(name = "mileage")
    private Long mileage;
    @Column(name = "transmission")
    private String transmission;
    @Column(name = "cost_per_day")
    private Integer costPerDay;
    // City Car OR Electric OR Prestige OR Van & Truck
    @Column(
            name = "availability_flag",
            nullable = false
    )
    private boolean availabilityFlag;

    @ManyToOne(
//            fetch = FetchType.LAZY
    )
    @JoinColumn(
            name = "category",
            referencedColumnName = "car_category_id"
    )
    private CarCategoryEntity category;
}