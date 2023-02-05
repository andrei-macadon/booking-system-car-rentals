package com.example.breeze.dto;

import com.example.breeze.entity.BookingEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@AllArgsConstructor
@ToString
public class LocationDto {

    private Long locationId;
    private String locationName;
    private String street;
    private String city;
    private String zipcode;
    private List<CarDto> carEntities;
    private List<BookingEntity> bookingEntities;

    public LocationDto() {

    }
}
