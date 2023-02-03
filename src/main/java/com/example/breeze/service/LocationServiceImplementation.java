package com.example.breeze.service;

import com.example.breeze.dto.CarCategoryDto;
import com.example.breeze.dto.CarDto;
import com.example.breeze.dto.LocationDto;
import com.example.breeze.entity.BookingEntity;
import com.example.breeze.entity.CarEntity;
import com.example.breeze.entity.LocationEntity;
import com.example.breeze.repository.LocationRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class LocationServiceImplementation  implements LocationService{

    @Autowired
    LocationRepository locationRepository;

    @Override
    public List<LocationDto> getAllLocations() {
        List<LocationEntity> locationEntities = locationRepository.findAll();

        List<LocationDto> locationDtos = locationEntities.stream().map(locationEntity -> {
            List<CarDto> carDtoList = locationEntity.getCarEntities().stream().map(carEntity -> {

                CarDto carDto = new CarDto();
                BeanUtils.copyProperties(carEntity, carDto);
                CarCategoryDto carCategoryDto = new CarCategoryDto();
                BeanUtils.copyProperties(carEntity.getCategory(), carCategoryDto);
                carDto.setCategory(carCategoryDto);
                return carDto;
            }).collect(Collectors.toList());

            LocationDto locationDto = new LocationDto();
            BeanUtils.copyProperties(locationEntity, locationDto);
            locationDto.setCarEntities(carDtoList);
            return locationDto;
        }).collect(Collectors.toList());

        return locationDtos;
    }

    @Override
    public void addBookingToLocation(LocationEntity location, BookingEntity bookingEntity) {
        List<BookingEntity> bookingEntities = location.getBookingEntities();
        if(bookingEntities == null){
            bookingEntities = new ArrayList<BookingEntity>();
        }
        System.out.println("The booking entity received in addBookingToLocation is: " + bookingEntity.getBookingId());
        System.out.println("All the bookings from " + location.getLocationName() + " has the following active bookings: ");
        bookingEntities.stream().map(
                ((bookingEntity1) -> {
                    System.out.println(bookingEntity1.getBookingId());
                    return bookingEntity1;
                })
        ).collect(Collectors.toList());

        bookingEntities.add(bookingEntity);
        location.setBookingEntities(bookingEntities);
        locationRepository.save(location);
    }

    @Override
    public Optional<LocationEntity> findByLocationName(String locationName) {
        return locationRepository.findByLocationName(locationName);
    }
}
