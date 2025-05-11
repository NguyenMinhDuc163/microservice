package com.btl.leaveservice.controller;

import com.btl.leaveservice.model.LeaveBalance;
import com.btl.leaveservice.model.enums.LeaveType;
import com.btl.leaveservice.service.LeaveBalanceService;
import com.btl.leaveservice.utils.ResponseBuilder;
// import com.btl.leaveservice.model.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/leave-balances")
public class LeaveBalanceController {

    @Autowired
    private LeaveBalanceService leaveBalanceService;

    @GetMapping("/{employeeId}")
    public ResponseEntity<Object> getLeaveBalance(@PathVariable Long employeeId) {
        LeaveBalance leaveBalance = leaveBalanceService.getLeaveBalance(employeeId);
        if (leaveBalance != null) {
            // Trả về phản hồi thành công
            return ResponseBuilder.build(HttpStatus.OK, "Leave balance retrieved successfully", leaveBalance, null);
        } else {
            // Trả về phản hồi lỗi nếu không tìm thấy thông tin
            return ResponseBuilder.build(HttpStatus.NOT_FOUND, "Leave balance not found", null, "Employee not found");
        }
    }

    @PutMapping("/{employeeId}/update")
    public ResponseEntity<Object> updateLeaveBalance(
            @PathVariable Long employeeId,
            @RequestBody Map<String, Object> request) {

        LeaveType leaveType = LeaveType.valueOf((String) request.get("leaveType"));
        int daysUsed = (Integer) request.get("daysUsed");
        String operation = (String) request.get("operation");

        Map<String, Object> updatedBalance = leaveBalanceService.updateLeaveBalance(employeeId, leaveType, daysUsed, operation);

        if (updatedBalance != null) {
            // Trả về phản hồi thành công
            return ResponseBuilder.build(HttpStatus.OK, "Leave balance updated successfully", updatedBalance, null);
        } else {
            // Trả về phản hồi lỗi nếu không thể cập nhật
            return ResponseBuilder.build(HttpStatus.BAD_REQUEST, "Failed to update leave balance", null, "Invalid operation");
        }
    }
}
