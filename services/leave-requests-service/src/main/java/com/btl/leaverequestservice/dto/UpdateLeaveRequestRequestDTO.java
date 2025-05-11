package com.btl.leaverequestservice.dto;

import java.time.LocalDate;

import com.btl.leaverequestservice.model.LeaveType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateLeaveRequestRequestDTO {
    private LocalDate startDate;
    private LocalDate endDate;
    private LeaveType leaveType;
    private String reason;

}
