package com.example.breeze.service;


import com.example.breeze.dto.LocationDto;
import com.example.breeze.entity.BookingEntity;
import com.example.breeze.entity.LocationEntity;

import java.util.List;
import java.util.Optional;

public interface LocationService {

    List<LocationDto> getAllLocations();

    void addBookingToLocation(LocationEntity locationName, BookingEntity bookingEntity);
    Optional<LocationEntity> findByLocationName(String locationName);
}
