package com.btl.leaverequestservice.dto;

import java.time.LocalDate;

import com.btl.leaverequestservice.model.LeaveRequest;
import com.btl.leaverequestservice.model.LeaveType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LeaveRequestDTO {
    private Long employeeId;
    private LocalDate startDate;
    private LocalDate endDate;
    private LeaveType leaveType;
    private String reason;

    // Static factory method to convert from LeaveRequest entity
    public static LeaveRequestDTO fromEntity(LeaveRequest request) {
        if (request == null) return null;

        return new LeaveRequestDTO(
            request.getEmployeeId(),
            request.getStartDate(),
            request.getEndDate(),
            request.getLeaveType(),
            request.getReason()
        );
    }
}
