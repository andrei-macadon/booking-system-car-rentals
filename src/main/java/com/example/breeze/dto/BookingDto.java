package com.example.breeze.dto;

import com.example.breeze.entity.CarEntity;
import com.example.breeze.entity.CustomerEntity;
import com.example.breeze.entity.ExtrasEntity;
import com.example.breeze.entity.RentalCarInsuranceEntity;
import lombok.*;

import javax.persistence.Column;
import java.util.Date;

@Builder
@AllArgsConstructor
@Data
public class BookingDto {

    private Long bookingId;
    private String fromDtTime;
    private String retDtTime;
    private String actualRetDtTime;
    private Integer amount;
    private CarDto bookingsCarEntity;
    private RentalCarInsuranceDto carInsurance;
    private Long noOfHoursLate;
    private Long totalLateFee;
    private CustomerDto customerEntity;
    private LocationDto pickupLocation;
    private LocationDto dropLocation;
    private ExtrasEntity extrasEntity;

    public BookingDto() {

    }
}
