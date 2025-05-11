// LeaveValidationService.java
package com.btl.leaveservice.service;

import com.btl.leaveservice.model.LeaveBalance;
import com.btl.leaveservice.model.LeavePolicy;
import com.btl.leaveservice.model.enums.LeaveType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;

@Service
public class LeaveValidationService {

    @Autowired
    private LeaveBalanceService leaveBalanceService;

    @Autowired
    private LeavePolicyService leavePolicyService;

    public Map<String, Object> validateLeaveRequest(Long employeeId, LocalDate startDate, 
                                                   LocalDate endDate, LeaveType leaveType,
                                                   String employeeType) {
        Map<String, Object> result = new HashMap<>();
        
        // Calculate days requested
        long daysRequested = ChronoUnit.DAYS.between(startDate, endDate) + 1;
        
        // Get employee's leave balance
        LeaveBalance balance = leaveBalanceService.getLeaveBalance(employeeId);
        
        // Get applicable leave policy
        LeavePolicy policy = leavePolicyService.getPolicyByEmployeeType(employeeType);
        
        boolean isValid = false;
        String message = "";
        int availableDays = 0;
        
        // Validate request based on leave type
        if (leaveType == LeaveType.ANNUAL) {
            availableDays = balance.getAnnualLeaveTotal() - balance.getAnnualLeaveUsed();
            isValid = availableDays >= daysRequested;
            message = isValid ? "Valid request" : "Insufficient annual leave balance";
        } else if (leaveType == LeaveType.SICK) {
            availableDays = balance.getSickLeaveTotal() - balance.getSickLeaveUsed();
            isValid = availableDays >= daysRequested;
            message = isValid ? "Valid request" : "Insufficient sick leave balance";
        } else if (leaveType == LeaveType.PERSONAL) {
            availableDays = balance.getPersonalLeaveTotal() - balance.getPersonalLeaveUsed();
            isValid = availableDays >= daysRequested;
            message = isValid ? "Valid request" : "Insufficient personal leave balance";
        }
        
        // Check against max consecutive days allowed
        if (isValid && policy != null && daysRequested > policy.getMaxConsecutiveDays()) {
            isValid = false;
            message = "Exceeds maximum consecutive days allowed (" + policy.getMaxConsecutiveDays() + ")";
        }
        
        result.put("valid", isValid);
        result.put("message", message);
        result.put("availableDays", availableDays);
        
        return result;
    }
}
