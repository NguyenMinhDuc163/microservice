package com.btl.leaverequestservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import com.btl.leaverequestservice.model.LeaveType;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaveValidationRequest {
    private Long employeeId;
    private LocalDate startDate;
    private LocalDate endDate;
    private LeaveType leaveType;
}