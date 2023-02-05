package com.example.breeze.service;

import com.example.breeze.dto.CustomerDto;
import com.example.breeze.entity.BookingEntity;
import com.example.breeze.entity.CustomerEntity;
import com.example.breeze.repository.CustomerRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomerServiceImpl implements CustomerService{

    private CustomerRepository customerRepository;

    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public CustomerDto createCustomerAccount(CustomerDto customerDto) {
        CustomerEntity customerEntity = new CustomerEntity();
        BeanUtils.copyProperties(customerDto, customerEntity);
        customerRepository.save(customerEntity);
        return customerDto;
    }

    @Override
    public List<CustomerDto> getAllCustomers() {
        List<CustomerEntity> customerEntityList = customerRepository.findAll();
        List<CustomerDto> customerDtoList = customerEntityList.stream()
                .map(customerEntity -> {
                    CustomerDto customerDto = new CustomerDto();
                    BeanUtils.copyProperties(customerEntity, customerDto);
                    return customerDto;
                }).collect(Collectors.toList());
        return customerDtoList;
    }

    @Override
    public boolean existsByEmail(String email) {
        return customerRepository.existsByEmail(email);
    }

    @Override
    public Optional<CustomerEntity> findByEmail(String email) {
        return customerRepository.findByEmail(email);
    }


    @Override
    public void saveCustomer(CustomerEntity customerEntity) {
        customerRepository.save(customerEntity);
    }

    @Override
    @Transactional
    public void addBookingToCustomer(CustomerEntity customerEntity, BookingEntity bookingEntity) {
        List<BookingEntity> bookingEntities = customerEntity.getBookingEntities();
        if(bookingEntities == null){
            bookingEntities = new ArrayList<>();
        }
        bookingEntities.add(bookingEntity);
        customerEntity.setBookingEntities(bookingEntities);
    }
}
