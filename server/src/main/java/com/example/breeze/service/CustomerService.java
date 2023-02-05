package com.example.breeze.service;

import com.example.breeze.entity.BookingEntity;
import com.example.breeze.entity.CustomerEntity;
import com.example.breeze.dto.CustomerDto;

import java.util.List;
import java.util.Optional;

public interface CustomerService {
    CustomerDto createCustomerAccount(CustomerDto customerDto);

    List<CustomerDto> getAllCustomers();

    boolean existsByEmail(String email);

    Optional<CustomerEntity> findByEmail(String email);

    void saveCustomer(CustomerEntity customerEntity);

    void addBookingToCustomer(CustomerEntity customerEntity, BookingEntity bookingEntity);
}
