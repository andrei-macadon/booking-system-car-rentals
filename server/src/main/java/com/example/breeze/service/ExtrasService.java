package com.example.breeze.service;

import com.example.breeze.entity.BookingEntity;
import com.example.breeze.entity.ExtrasEntity;

public interface ExtrasService {
    void saveExtrasEntity(ExtrasEntity extrasEntity);

    void addBookingToExtras(ExtrasEntity extrasEntity, BookingEntity bookingEntity);
}
