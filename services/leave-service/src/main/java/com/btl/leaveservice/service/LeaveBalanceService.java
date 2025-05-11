// LeaveBalanceService.java
package com.btl.leaveservice.service;

import com.btl.leaveservice.model.LeaveBalance;
import com.btl.leaveservice.model.enums.LeaveType;
import com.btl.leaveservice.repository.LeaveBalanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
// import java.util.Optional;

@Service
public class LeaveBalanceService {

    @Autowired
    private LeaveBalanceRepository leaveBalanceRepository;

    public LeaveBalance getLeaveBalance(Long employeeId) {
        int currentYear = LocalDate.now().getYear();
        LeaveBalance balance = leaveBalanceRepository.findByEmployeeIdAndYear(employeeId, currentYear);
        return balance != null ? balance : new LeaveBalance(employeeId, currentYear, 0, 0, 0, 0, 0, 0);
    }

    @Transactional
    public Map<String, Object> updateLeaveBalance(Long employeeId, LeaveType leaveType, int daysUsed, String operation) {
        Map<String, Object> result = new HashMap<>();
        LeaveBalance balance = getLeaveBalance(employeeId);
        int newBalance = 0;
        boolean updated = false;

        if (leaveType == LeaveType.ANNUAL) {
            if ("ADD".equals(operation)) {
                balance.setAnnualLeaveUsed(balance.getAnnualLeaveUsed() - daysUsed);
            } else if ("SUBTRACT".equals(operation)) {
                balance.setAnnualLeaveUsed(balance.getAnnualLeaveUsed() + daysUsed);
            }
            newBalance = balance.getAnnualLeaveTotal() - balance.getAnnualLeaveUsed();
            updated = true;
        } else if (leaveType == LeaveType.SICK) {
            if ("ADD".equals(operation)) {
                balance.setSickLeaveUsed(balance.getSickLeaveUsed() - daysUsed);
            } else if ("SUBTRACT".equals(operation)) {
                balance.setSickLeaveUsed(balance.getSickLeaveUsed() + daysUsed);
            }
            newBalance = balance.getSickLeaveTotal() - balance.getSickLeaveUsed();
            updated = true;
        } else if (leaveType == LeaveType.PERSONAL) {
            if ("ADD".equals(operation)) {
                balance.setPersonalLeaveUsed(balance.getPersonalLeaveUsed() - daysUsed);
            } else if ("SUBTRACT".equals(operation)) {
                balance.setPersonalLeaveUsed(balance.getPersonalLeaveUsed() + daysUsed);
            }
            newBalance = balance.getPersonalLeaveTotal() - balance.getPersonalLeaveUsed();
            updated = true;
        }

        if (updated) {
            leaveBalanceRepository.save(balance);
        }

        result.put("updated", updated);
        result.put("newBalance", newBalance);
        return result;
    }
}
