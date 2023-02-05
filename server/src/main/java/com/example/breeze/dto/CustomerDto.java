package com.example.breeze.dto;

import com.example.breeze.entity.BookingEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class CustomerDto {
    private Long customerId;
    private String firstName;
    private String lastName;
    private String email;
    private Date birthdate;
    private String phoneNumber;
    private String country;
    private String city;
    private String street;
    private String zipcode;
    private String driversLicenseNumber;
    private Date licenseIssueDate;
    private Date licenseExpiryDate;
    private String licenseIssueCountry;
    private String password;
    private List<BookingEntity> bookingEntities;

    public CustomerDto () {

    }
}
