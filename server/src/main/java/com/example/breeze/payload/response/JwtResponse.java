package com.example.breeze.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class JwtResponse {
    private String jwtToken;
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
    private List<String> roles;
}
