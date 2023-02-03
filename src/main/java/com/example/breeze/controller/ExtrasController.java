package com.example.breeze.controller;


import com.example.breeze.service.ExtrasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class ExtrasController {

    public ExtrasService extrasService;

    @Autowired
    public ExtrasController(ExtrasService extrasService) {
        this.extrasService = extrasService;
    }

}
