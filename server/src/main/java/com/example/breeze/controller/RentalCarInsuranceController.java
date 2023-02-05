package com.example.breeze.controller;
import com.example.breeze.dto.RentalCarInsuranceDto;
import com.example.breeze.service.RentalCarInsuranceService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class RentalCarInsuranceController {

    @Autowired
    RentalCarInsuranceService rentalCarInsuranceService;

    @GetMapping("/insurance")
    public List<RentalCarInsuranceDto> getRentalCarInsurances(){
        return rentalCarInsuranceService.getRentalCarInsurances();
    }
}
