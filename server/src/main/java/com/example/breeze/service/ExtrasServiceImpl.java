package com.example.breeze.service;

import com.example.breeze.entity.BookingEntity;
import com.example.breeze.entity.ExtrasEntity;
import com.example.breeze.repository.ExtrasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExtrasServiceImpl implements ExtrasService{

    ExtrasRepository extrasRepository;

    @Autowired
    public ExtrasServiceImpl(ExtrasRepository extrasRepository){
        this.extrasRepository = extrasRepository;
    }

    @Override
    public void saveExtrasEntity(ExtrasEntity extrasEntity) {
        extrasRepository.save(extrasEntity);
    }

    @Override
    public void addBookingToExtras(ExtrasEntity extrasEntity, BookingEntity bookingEntity) {
        extrasEntity.setBookingEntity(bookingEntity);
        extrasRepository.save(extrasEntity);
    }
}
