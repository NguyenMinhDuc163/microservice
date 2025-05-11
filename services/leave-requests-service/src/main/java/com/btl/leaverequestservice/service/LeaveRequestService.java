package com.btl.leaverequestservice.service;

import com.btl.leaverequestservice.model.LeaveRequest;
import java.util.List;

public interface LeaveRequestService {
    LeaveRequest createLeaveRequest(LeaveRequest leaveRequest);
    LeaveRequest getLeaveRequest(Long id);
    List<LeaveRequest> searchLeaveRequests(Long employeeId, String status);
    LeaveRequest updateLeaveRequest(Long id, LeaveRequest leaveRequest);
    LeaveRequest updateStatus(Long id, String status, String comments);
    void deleteLeaveRequest(Long id);
}