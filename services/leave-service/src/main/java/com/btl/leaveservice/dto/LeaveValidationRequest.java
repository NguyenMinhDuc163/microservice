package com.btl.leaveservice.dto;

import java.time.LocalDate;

import com.btl.leaveservice.model.enums.LeaveType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaveValidationRequest {
    private Long employeeId;
    private LocalDate startDate;
    private LocalDate endDate;
    private LeaveType leaveType;
    private String employeeType;
    // Getters & Setters
}
