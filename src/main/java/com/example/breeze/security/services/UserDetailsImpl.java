package com.example.breeze.security.services;

import com.example.breeze.entity.CustomerEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDetailsImpl implements UserDetails {

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

    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    public static UserDetails build(CustomerEntity customerEntity){

        List<SimpleGrantedAuthority> simpleGrantedAuthorityList = customerEntity.getRoles().stream().map(role -> {
           return new SimpleGrantedAuthority(role.getName().name());
        }).collect(Collectors.toList());

        UserDetailsImpl userDetailsImplObj = new UserDetailsImpl(
                customerEntity.getCustomerId(),
                customerEntity.getFirstName(),
                customerEntity.getLastName(),
                customerEntity.getEmail(),
                customerEntity.getBirthdate(),
                customerEntity.getPhoneNumber(),
                customerEntity.getCountry(),
                customerEntity.getCity(),
                customerEntity.getStreet(),
                customerEntity.getZipcode(),
                customerEntity.getDriversLicenseNumber(),
                customerEntity.getLicenseIssueDate(),
                customerEntity.getLicenseExpiryDate(),
                customerEntity.getLicenseIssueCountry(),
                customerEntity.getPassword(),
                simpleGrantedAuthorityList
        );
        return userDetailsImplObj;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
