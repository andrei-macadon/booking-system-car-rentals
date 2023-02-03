package com.example.breeze.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Id;
@Data
@AllArgsConstructor
@Builder
public class ExtrasDto {
    private Long extrasId;
    private Integer childSafetySeat;
    private Integer infantSafetySeat;
    private Integer boosterSeat;
    private Integer snowChains;
    private Integer additionalDriver;
}
