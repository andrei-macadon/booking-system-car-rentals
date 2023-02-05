package com.example.breeze.repository;

import com.example.breeze.entity.CarEntity;
import com.example.breeze.entity.LocationEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class LocationEntityRepositoryTest {

    @Autowired
    LocationRepository locationRepository;

    @Test
    public void saveLocation() {
        CarEntity car1 = CarEntity.builder()
                .plateNumber("VL25RCA")
                .modelName("Volkswagen Golf")
                .modelYear(2019)
                .mileage(Long.valueOf(30000))
                .availabilityFlag(true)
                .build();

        CarEntity car2 = CarEntity.builder()
                .plateNumber("GR81ANA")
                .modelName("Volkagen Golf")
                .modelYear(2017)
                .mileage(Long.valueOf(45000))
                .availabilityFlag(true)
                .build();

        LocationEntity location = LocationEntity.builder()
                .locationName("Piata Victoriei")
                .city("Bucharest")
                .street("Bulevardul Ion Mihalache")
                .zipcode("011202")
                .carEntities(List.of(car1,car2))
                .build();

        locationRepository.save(location);
    }

    @Test
    public void printAllLocations() {
        List<LocationEntity> locations = locationRepository.findAll();
        System.out.println("The locations with their respective cars are:\n" + locations);
    }
}