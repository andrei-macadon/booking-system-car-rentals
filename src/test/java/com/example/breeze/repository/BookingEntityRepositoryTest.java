package com.example.breeze.repository;

import com.example.breeze.entity.BookingEntity;
import com.example.breeze.entity.CarEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class BookingEntityRepositoryTest {

    @Autowired
    BookingRepository bookingRepository;

    @Test
    public void saveBooking() {

        CarEntity carEntity = CarEntity.builder()
                .plateNumber("B618HAI")
                .modelName("Renault Megane")
                .modelYear(2020)
                .mileage(Long.valueOf(15000))
                .availabilityFlag(true)
                .build();

        BookingEntity bookingEntity = BookingEntity.builder()
                .fromDtTime(new Date())
                .retDtTime(new Date())
                .actualRetDtTime(new Date())
                .amount(400)
                .bookingsCarEntity(carEntity)
                .build();

        bookingRepository.save(bookingEntity);
    }

    @Test
    public void getAllBookings() {
        List<BookingEntity> bookingList = bookingRepository.findAll();
        System.out.println("The booking list is:\n" + bookingList);
    }

}