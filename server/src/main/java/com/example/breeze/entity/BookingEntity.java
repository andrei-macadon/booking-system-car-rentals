package com.example.breeze.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "Booking")
@Table(name = "booking")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data
public class BookingEntity {

    @Id
    @Column(name = "booking_id")
    @SequenceGenerator(
            name = "booking_id_sequence",
            sequenceName = "booking_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "booking_id_sequence"
    )
    private Long bookingId;

    @Column(name = "from_dt_time")
    private Date fromDtTime;

    @Column(name = "ret_dt_time")
    private Date retDtTime;

    @Column(name = "actual_ret_dt_time")
    private Date actualRetDtTime;

    @Column(name = "amount")
    private Integer amount;

    @OneToOne
    @JoinColumn(
            name = "car_name",
            referencedColumnName = "model_name"
    )
    private CarEntity bookingsCarEntity;

    @ManyToOne
    @JoinColumn(
            name = "insurance_type",
            referencedColumnName = "coverageType"
    )
    private RentalCarInsuranceEntity carInsurance;

    @Column
    private Long noOfHoursLate;

    @Column
    private Long totalLateFee;

    @ManyToOne
    @JoinColumn(
            name = "customer_email",
            referencedColumnName = "email"
    )
    private CustomerEntity customerEntity;

    @ManyToOne
    @JoinColumn(
            name = "pickup_location",
            referencedColumnName = "location_name"
    )
    private LocationEntity pickupLocation;

    @ManyToOne
    @JoinColumn(
            name = "drop_location",
            referencedColumnName = "location_name"
    )
    private LocationEntity dropLocation;

    @OneToOne(cascade = { CascadeType.REMOVE, CascadeType.PERSIST })
    @JoinColumn(
            name = "extras_id",
            referencedColumnName = "extrasId"
    )
    private ExtrasEntity extrasEntity;


    public Long calculateNoOfHoursLate() {
        if(actualRetDtTime != null) {
            noOfHoursLate = ((actualRetDtTime.getTime() - retDtTime.getTime()) / (1000 * 60 * 60));
        } else {
            noOfHoursLate = 0L;
        }
        return noOfHoursLate;
    }

    public Long calculateTotalLateFee() {
        if(actualRetDtTime != null) {
            long differenceInHours = calculateNoOfHoursLate();
            if(differenceInHours > 7) {
                totalLateFee = 2 * (differenceInHours - 7);
            } else {
                totalLateFee = 0L;
            }
        } else {
            totalLateFee = 0L;
        }
        return totalLateFee;
    }
}