package com.example.breeze.service;

import com.example.breeze.dto.*;
import com.example.breeze.entity.*;
import com.example.breeze.repository.BookingRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService{

    @Autowired
    BookingRepository bookingRepository;
    @Autowired
    LocationService locationService;
    @Autowired
    CustomerService customerService;
    @Autowired
    CarCategoryService carCategoryService;
    @Autowired
    CarService carService;
    @Autowired
    RentalCarInsuranceService rentalCarInsuranceService;
    @Autowired
    ExtrasService extrasService;


    @Override
    public boolean addBooking(BookingDto bookingDto) throws ParseException {
        // CUSTOMER ENTITY CREATION
        CustomerEntity customerEntity = customerService.findByEmail(bookingDto.getCustomerEntity().getEmail()).orElseThrow();

        // CAR CATEGORY ENTITY CREATION

        // CAR ENTITY CREATION
        CarEntity carEntity = carService.findByModelName(bookingDto.getBookingsCarEntity().getModelName()).orElseThrow();

        // RENTAL CAR INSURANCE ENTITY CREATION
        RentalCarInsuranceEntity rentalCarInsuranceEntity = rentalCarInsuranceService
                .findByCoverageType(bookingDto.getCarInsurance().getCoverageType()).orElseThrow();

        // PICKUP LOCATION ENTITY CREATION
        LocationEntity pickupLocationEntity = locationService
                .findByLocationName(bookingDto.getPickupLocation().getLocationName()).orElseThrow();
        // DROP LOCATION ENTITY CREATION
        LocationEntity dropLocationEntity = locationService
                .findByLocationName(bookingDto.getDropLocation().getLocationName()).orElseThrow();

        ExtrasEntity extrasEntity = ExtrasEntity.builder()
                .additionalDriver(bookingDto.getExtrasEntity().getAdditionalDriver())
                .infantSafetySeat(bookingDto.getExtrasEntity().getInfantSafetySeat())
                .childSafetySeat(bookingDto.getExtrasEntity().getChildSafetySeat())
                .snowChains(bookingDto.getExtrasEntity().getSnowChains())
                .build();
        extrasService.saveExtrasEntity(extrasEntity);

        // ----->BUILD THE BOOKING ENTITY<-----
        BookingEntity bookingEntity = BookingEntity.builder()
                .customerEntity(customerEntity)
                .pickupLocation(pickupLocationEntity)
                .dropLocation(dropLocationEntity)
                .bookingsCarEntity(carEntity)
                .amount(bookingDto.getAmount())
                .totalLateFee(bookingDto.getTotalLateFee())
                .noOfHoursLate(bookingDto.getNoOfHoursLate())
                .carInsurance(rentalCarInsuranceEntity)
                .fromDtTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(bookingDto.getFromDtTime()))
                .retDtTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(bookingDto.getRetDtTime()))
                .extrasEntity(extrasEntity)
                .build();
        bookingRepository.save(bookingEntity);
        // ADAUGAM BOOKINGUL LA AMBELE LOCATII
        locationService.addBookingToLocation(pickupLocationEntity, bookingEntity);
        locationService.addBookingToLocation(dropLocationEntity, bookingEntity);
        customerService.addBookingToCustomer(customerEntity, bookingEntity);
        extrasService.addBookingToExtras(extrasEntity, bookingEntity);
        return true;
    }

    public DateFormat getDateFormat(){
        return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    }

    @Override
    public List<BookingDto> getAllBookings() {
        List<BookingEntity> bookingEntityList = bookingRepository.findAll();
        DateFormat dateFormat = getDateFormat();
        List<BookingDto> bookingDtoList = bookingEntityList.stream().map(bookingEntity -> {
           BookingDto bookingDto = BookingDto.builder()
                   .bookingId(bookingEntity.getBookingId())
                   .actualRetDtTime(bookingEntity.getActualRetDtTime() == null ? null : dateFormat.format(bookingEntity.getActualRetDtTime()))
                   .amount(bookingEntity.getAmount())
                   .noOfHoursLate(bookingEntity.getNoOfHoursLate())
                   .totalLateFee(bookingEntity.getTotalLateFee())
                   .fromDtTime(dateFormat.format(bookingEntity.getFromDtTime()))
                   .retDtTime(dateFormat.format(bookingEntity.getRetDtTime()))
                   .build();
//           CarEntity carEntity =
           CarDto carDto = new CarDto();
           BeanUtils.copyProperties(bookingEntity.getBookingsCarEntity(), carDto);
//                   .carId(carEntity.getCarId())
//                   .costPerDay(carEntity.getCostPerDay())
//                   .mileage(carEntity.getMileage())
//                   .modelName(carEntity.getModelName())
//                   .modelYear(carEntity.getModelYear())
//                   .plateNumber(carEntity.getPlateNumber())
//                   .transmission(carEntity.getTransmission())
//                   .build();
           bookingDto.setBookingsCarEntity(carDto);

           RentalCarInsuranceEntity carInsuranceEntity = bookingEntity.getCarInsurance();
           RentalCarInsuranceDto rentalCarInsuranceDto = RentalCarInsuranceDto.builder()
                   .costPerDay(carInsuranceEntity.getCostPerDay())
                   .excess(carInsuranceEntity.getExcess())
                   .coverageType(carInsuranceEntity.getCoverageType())
                   .insuranceCode(carInsuranceEntity.getInsuranceCode())
                   .build();
           bookingDto.setCarInsurance(rentalCarInsuranceDto);

           CustomerEntity customerEntity = bookingEntity.getCustomerEntity();
           CustomerDto customerDto = CustomerDto.builder()
                   .customerId(customerEntity.getCustomerId())
                   .birthdate(customerEntity.getBirthdate())
                   .city(customerEntity.getCity())
                   .email(customerEntity.getEmail())
                   .country(customerEntity.getCountry())
                   .driversLicenseNumber(customerEntity.getDriversLicenseNumber())
                   .firstName(customerEntity.getFirstName())
                   .lastName(customerEntity.getLastName())
                   .licenseIssueCountry(customerEntity.getLicenseIssueCountry())
                   .phoneNumber(customerEntity.getPhoneNumber())
                   .licenseIssueDate(customerEntity.getLicenseIssueDate())
                   .licenseExpiryDate(customerEntity.getLicenseExpiryDate())
                   .build();
           bookingDto.setCustomerEntity(customerDto);

           return bookingDto;
        }).collect(Collectors.toList());
        return bookingDtoList;
    }

    @Override
    public Boolean updateBooking(Long id, String actualRetDtTime) throws ParseException {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println(dateFormat);
        BookingEntity bookingEntity = bookingRepository.findById(id).get();
        Date actualRetDtTimeDate = dateFormat.parse(actualRetDtTime);
        if(actualRetDtTimeDate.getTime() - bookingEntity.getRetDtTime().getTime() > 0){
            bookingEntity.setActualRetDtTime(actualRetDtTimeDate);
            bookingEntity.setNoOfHoursLate(bookingEntity.calculateNoOfHoursLate());
            bookingEntity.setTotalLateFee(bookingEntity.calculateTotalLateFee());

            bookingRepository.save(bookingEntity);
            return true;
        }
        System.out.println("HOW MY NIGGA");
        System.out.println("Actual ret time: " + actualRetDtTimeDate);
        System.out.println("Ret time: " + bookingEntity.getRetDtTime());
        return false;
    }

    @Override
    public BookingDto getBookingById(Long id) {
        BookingEntity bookingEntity = bookingRepository.findById(id).get();
        DateFormat dateFormat = getDateFormat();

        BookingDto bookingDto = BookingDto.builder()
                .bookingId(bookingEntity.getBookingId())
                .actualRetDtTime(bookingEntity.getActualRetDtTime() == null ? null : dateFormat.format(bookingEntity.getActualRetDtTime()))
                .amount(bookingEntity.getAmount())
                .noOfHoursLate(bookingEntity.getNoOfHoursLate())
                .totalLateFee(bookingEntity.getTotalLateFee())
                .fromDtTime(dateFormat.format(bookingEntity.getFromDtTime()))
                .retDtTime(dateFormat.format(bookingEntity.getRetDtTime()))
                .build();
        CarDto carDto = new CarDto();
        BeanUtils.copyProperties(bookingEntity.getBookingsCarEntity(), carDto);
        bookingDto.setBookingsCarEntity(carDto);

        RentalCarInsuranceEntity carInsuranceEntity = bookingEntity.getCarInsurance();
        RentalCarInsuranceDto rentalCarInsuranceDto = RentalCarInsuranceDto.builder()
                .costPerDay(carInsuranceEntity.getCostPerDay())
                .excess(carInsuranceEntity.getExcess())
                .coverageType(carInsuranceEntity.getCoverageType())
                .insuranceCode(carInsuranceEntity.getInsuranceCode())
                .build();
        bookingDto.setCarInsurance(rentalCarInsuranceDto);

        CustomerEntity customerEntity = bookingEntity.getCustomerEntity();
        CustomerDto customerDto = CustomerDto.builder()
                .customerId(customerEntity.getCustomerId())
                .birthdate(customerEntity.getBirthdate())
                .city(customerEntity.getCity())
                .email(customerEntity.getEmail())
                .country(customerEntity.getCountry())
                .driversLicenseNumber(customerEntity.getDriversLicenseNumber())
                .firstName(customerEntity.getFirstName())
                .lastName(customerEntity.getLastName())
                .licenseIssueCountry(customerEntity.getLicenseIssueCountry())
                .phoneNumber(customerEntity.getPhoneNumber())
                .licenseIssueDate(customerEntity.getLicenseIssueDate())
                .licenseExpiryDate(customerEntity.getLicenseExpiryDate())
                .build();
        bookingDto.setCustomerEntity(customerDto);

        LocationDto pickupLocationDto = new LocationDto();
        BeanUtils.copyProperties(bookingEntity.getPickupLocation(), pickupLocationDto);
        bookingDto.setPickupLocation(pickupLocationDto);

        LocationDto dropLocationDto = new LocationDto();
        BeanUtils.copyProperties(bookingEntity.getDropLocation(), dropLocationDto);
        bookingDto.setDropLocation(dropLocationDto);

        return bookingDto;
    }

    @Override
    public boolean deleteBooking(Long id) {
        BookingEntity bookingEntity = bookingRepository.findById(id).get();
        bookingRepository.delete(bookingEntity);
        return true;
    }
}
