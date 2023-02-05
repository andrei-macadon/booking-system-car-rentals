package com.example.breeze.entity;


import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.List;

@Entity(name = "Customer")
@Table(
        name = "customer",
        uniqueConstraints = {
                @UniqueConstraint(name = "unique_email", columnNames = "email")
        }
)
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class CustomerEntity implements Serializable {

    @Id
    @SequenceGenerator(
            name = "customer_id_sequence",
            sequenceName = "customer_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "customer_id_sequence"
    )
    private Long customerId;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    @Size(max = 60)
    private String email;

    @NotNull
    private Date birthdate;

    @NotBlank
    private String phoneNumber;

    @NotBlank
    private String country;

    @NotBlank
    private String city;

    @NotBlank
    private String street;

    @NotBlank
    private String zipcode;

    @NotBlank
    private String driversLicenseNumber;

    @NotNull
    private Date licenseIssueDate;

    @NotNull
    private Date licenseExpiryDate;

    @NotBlank
    private String licenseIssueCountry;

    @NotBlank
    @Size(max = 100)
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(  name = "customer_roles",
            joinColumns = @JoinColumn(name = "customer_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @Transient
    @OneToMany
    private List<BookingEntity> bookingEntities;

}