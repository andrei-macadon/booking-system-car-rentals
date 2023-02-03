package com.example.breeze.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity(name="Location")
@Table(name="location")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LocationEntity implements Serializable {

    @Id
    @SequenceGenerator(
            name="location_sequence",
            sequenceName = "location_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "location_sequence"
    )
    private Long locationId;

    @Column(name="location_name")
    private String locationName;

    @Column(name="street")
    private String street;

    @Column(name="city")
    private String city;

    @Column(name="zipcode")
    private String zipcode;

    @OneToMany(
//            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER
//            fetch = FetchType.EAGER
    )
    @JoinColumn(
            name = "cars_location_id",
            referencedColumnName = "locationId"
    )
//    @Transient
    private List<CarEntity> carEntities;

//            (
////            cascade = CascadeType.ALL,
//            fetch = FetchType.LAZY
//    )
//    @JoinColumn(
//            name = "pickup_loc_id",
//            referencedColumnName = "locationId"
//    )
    @OneToMany
    @Transient
    private List<BookingEntity> bookingEntities;
}