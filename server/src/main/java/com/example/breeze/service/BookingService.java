package com.example.breeze.service;

import com.example.breeze.dto.BookingDto;

import java.text.ParseException;
import java.util.List;

public interface BookingService {
     boolean addBooking(BookingDto bookingDto) throws ParseException;

    List<BookingDto> getAllBookings();

    boolean deleteBooking(Long id);

    Boolean updateBooking(Long id, String actualRetDtTime) throws ParseException;

    BookingDto getBookingById(Long id);
}
