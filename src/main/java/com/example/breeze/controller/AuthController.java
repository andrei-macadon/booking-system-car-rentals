package com.example.breeze.controller;


import com.example.breeze.dto.CustomerDto;
import com.example.breeze.entity.CustomerEntity;
import com.example.breeze.entity.ERole;
import com.example.breeze.entity.Role;
import com.example.breeze.payload.request.LoginRequest;
import com.example.breeze.payload.request.RegistrationRequest;
import com.example.breeze.payload.response.JwtResponse;
import com.example.breeze.repository.RoleRepository;
import com.example.breeze.security.jwt.JwtUtils;
import com.example.breeze.security.services.UserDetailsImpl;
import com.example.breeze.service.CustomerService;
import io.jsonwebtoken.Jwts;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashSet;
import java.util.Set;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    CustomerService customerService;

    @Autowired
    RoleRepository roleRepository;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateCustomer(@Valid @RequestBody LoginRequest loginRequest) {
        // send credentials to Authentication Manager -> search for the customer -> get the authenticated object (with get principal)
        Authentication authenticationObjectWithCredentials = new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );

        Authentication authenticated = authenticationManager.authenticate(authenticationObjectWithCredentials);
        SecurityContextHolder.getContext().setAuthentication(authenticated);

        // create the JWT
        String jwtToken = jwtUtils.generateJwtToken(authenticated);

        UserDetailsImpl userDetails = (UserDetailsImpl) authenticated.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(grantedAuthority -> {
           return grantedAuthority.getAuthority();
        }).collect(Collectors.toList());

        return ResponseEntity.ok()
                .body(new JwtResponse(
                        jwtToken,
                        userDetails.getCustomerId(),
                        userDetails.getFirstName(),
                        userDetails.getLastName(),
                        userDetails.getEmail(),
                        userDetails.getBirthdate(),
                        userDetails.getPhoneNumber(),
                        userDetails.getCountry(),
                        userDetails.getCity(),
                        userDetails.getStreet(),
                        userDetails.getZipcode(),
                        userDetails.getDriversLicenseNumber(),
                        userDetails.getLicenseIssueDate(),
                        userDetails.getLicenseExpiryDate(),
                        userDetails.getLicenseIssueCountry(),
                        roles
                        )
                );
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerCustomer(@Valid @RequestBody RegistrationRequest registrationRequest) throws ParseException {
        if(customerService.existsByEmail(registrationRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Email is already taken.");
        }
        System.out.println(registrationRequest.getLicenseExpiryDate().replace('/','-'));

        CustomerEntity customerEntity = CustomerEntity.builder()
                .firstName(registrationRequest.getFirstName())
                .lastName(registrationRequest.getLastName())
                .email(registrationRequest.getEmail())
                .birthdate(new SimpleDateFormat("dd-MM-yyyy").parse(registrationRequest.getBirthdate().replace('/','-')))
                .phoneNumber(registrationRequest.getPhoneNumber())
                .country(registrationRequest.getCountry())
                .city(registrationRequest.getCity())
                .street(registrationRequest.getStreet())
                .zipcode(registrationRequest.getZipcode())
                .driversLicenseNumber(registrationRequest.getDriversLicenseNumber())
                .licenseIssueDate(new SimpleDateFormat("dd-MM-yyyy").parse(registrationRequest.getLicenseIssueDate().replace('/','-')))
                .licenseExpiryDate(new SimpleDateFormat("dd-MM-yyyy").parse(registrationRequest.getLicenseExpiryDate().replace('/','-')))
                .licenseIssueCountry(registrationRequest.getLicenseIssueCountry())
                .password(passwordEncoder.encode(registrationRequest.getPassword()))
                .build();

        Role role = roleRepository.findByName(ERole.USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        customerEntity.setRoles(roles);

        customerService.saveCustomer(customerEntity);

        return ResponseEntity.ok().body("You have successfully created your account!");
    }
}
