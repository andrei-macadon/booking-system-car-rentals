package com.example.breeze.entity;

import lombok.*;

import javax.persistence.*;

@Entity(name="Extras")
@Table(name="extras")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@ToString
public class ExtrasEntity {

    @Id
    @SequenceGenerator(
            name = "extras_sequence",
            sequenceName = "extras_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "extras_sequence"
    )
    private Long extrasId;
    @Column
    private Integer additionalDriver;
    @Column
    private Integer childSafetySeat;
    @Column
    private Integer infantSafetySeat;
    @Column
    private Integer snowChains;

    @OneToOne
    @JoinColumn(
            name = "booking_id",
            referencedColumnName = "booking_id"
    )
    private BookingEntity bookingEntity;

}
