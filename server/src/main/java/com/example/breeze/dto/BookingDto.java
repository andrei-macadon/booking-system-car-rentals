package com.example.breeze.dto;

import com.example.breeze.entity.ExtrasEntity;
import lombok.*;

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
