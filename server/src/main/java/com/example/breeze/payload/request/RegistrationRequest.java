package com.example.breeze.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationRequest {

    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @NotBlank
    private String email;
    @NotNull
    private String birthdate;
    @NotBlank
    private String phoneNumber;
    @NotBlank
    private String country;
    @NotBlank
    private String city;
    @NotBlank
    private String street;
    @NotBlank
    private String zipcode;
    @NotBlank
    private String driversLicenseNumber;
    @NotNull
    private String licenseIssueDate;
    @NotNull
    private String licenseExpiryDate;
    @NotBlank
    private String licenseIssueCountry;
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;
}
