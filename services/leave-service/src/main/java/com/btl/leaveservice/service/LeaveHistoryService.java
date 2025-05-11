// LeaveHistoryService.java
package com.btl.leaveservice.service;

import com.btl.leaveservice.model.LeaveHistory;
import com.btl.leaveservice.repository.LeaveHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LeaveHistoryService {

    @Autowired
    private LeaveHistoryRepository leaveHistoryRepository;

    public List<LeaveHistory> getEmployeeLeaveHistory(Long employeeId) {
        return leaveHistoryRepository.findByEmployeeIdOrderByStartDateDesc(employeeId);
    }

    public Map<String, Long> addLeaveHistory(Long employeeId, LeaveHistory leaveHistory) {
        leaveHistory.setEmployeeId(employeeId);
        LeaveHistory savedHistory = leaveHistoryRepository.save(leaveHistory);
        
        Map<String, Long> response = new HashMap<>();
        response.put("historyId", savedHistory.getId());
        return response;
    }
}