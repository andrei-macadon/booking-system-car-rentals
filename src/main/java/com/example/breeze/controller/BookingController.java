package com.example.breeze.controller;

import com.example.breeze.dto.BookingDto;
import com.example.breeze.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/v1")
@EnableWebMvc
public class BookingController {

    @Autowired
    BookingService bookingService;

    @PostMapping("/booking")
    public ResponseEntity<?> addBooking(@Valid @RequestBody BookingDto bookingDto) throws ParseException {
        boolean ok = bookingService.addBooking(bookingDto);
        if(ok == true){
            return ResponseEntity.ok("Your booking has been confirmed!");
        } else {
            return ResponseEntity.badRequest().body("Your booking request has failed");
        }
    }

    @GetMapping("/bookings")
    public List<BookingDto> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/bookings/{id}")
    public BookingDto getBookingById(@PathVariable Long id) {
        BookingDto bookingDto = bookingService.getBookingById(id);
        return bookingDto;
    }

    @PutMapping("/bookings/{id}")
    public ResponseEntity<?> updateBooking(@PathVariable Long id, @RequestBody String actualRetDtTime) throws ParseException {
        System.out.println("The actual return date time is: " + actualRetDtTime);
        boolean response = bookingService.updateBooking(id, actualRetDtTime);
        if(!response){
            return ResponseEntity.ok("The actual return date time you introduced was incorrect!");
        }
        return ResponseEntity.ok("The booking was updated!");
    }

    @DeleteMapping("/bookings/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteBooking(@PathVariable Long id) {
        boolean deleted = false;
        deleted = bookingService.deleteBooking(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }
}
