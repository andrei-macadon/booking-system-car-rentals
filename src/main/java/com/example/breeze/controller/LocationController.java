package com.example.breeze.controller;

import com.example.breeze.dto.CarDto;
import com.example.breeze.dto.LocationDto;
import com.example.breeze.entity.LocationEntity;
import com.example.breeze.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class LocationController {

    @Autowired
    public LocationService locationService;

    @GetMapping("/locations")
    public List<LocationDto>  getAllLocations() {
        List<LocationDto> locationDtos = locationService.getAllLocations();
        for(int i=0; i< locationDtos.size(); i++)
            System.out.println(locationDtos.get(i));
        return locationDtos;
    }

}
