package com.example.breeze.repository;

import com.example.breeze.entity.CarEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
import java.util.List;

@SpringBootTest
//@DataJpaTest --> the database wont be affected, everything will be flushed
class CarEntityRepositoryTest {

    @Autowired
    private CarRepository carRepository;

    @Test
    public void saveCar() {
        CarEntity carEntity = CarEntity.builder()
                .plateNumber("B07ARG")
                .modelName("Skoda Octavia")
                .mileage(Long.valueOf(40000))
                .modelYear(2016)
                .availabilityFlag(true)
                .build();

        carRepository.save(carEntity);
    }


    @Test
    public void printAllCars() {
        List<CarEntity> allCars = carRepository.findAll();
        System.out.println(allCars);
    }

    @Test
    public void printCarsByModelName() {

//        List<CarEntity> allCarsByModelName = carRepository.findByModelName("Skoda Octavia");
//        System.out.println(allCarsByModelName);
    }
}