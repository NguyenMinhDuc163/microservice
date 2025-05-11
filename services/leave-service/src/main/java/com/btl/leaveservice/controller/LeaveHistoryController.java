package com.btl.leaveservice.controller;

import com.btl.leaveservice.model.LeaveHistory;
import com.btl.leaveservice.model.enums.LeaveType;
import com.btl.leaveservice.model.enums.LeaveStatus;
import com.btl.leaveservice.service.LeaveHistoryService;
import com.btl.leaveservice.utils.ResponseBuilder;
// import com.btl.leaveservice.model.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/leave-history")
public class LeaveHistoryController {

    @Autowired
    private LeaveHistoryService leaveHistoryService;

    @GetMapping("/employees/{id}")
    public ResponseEntity<Object> getEmployeeLeaveHistory(@PathVariable("id") Long employeeId) {
        List<LeaveHistory> leaveHistoryList = leaveHistoryService.getEmployeeLeaveHistory(employeeId);
        if (leaveHistoryList != null && !leaveHistoryList.isEmpty()) {
            // Trả về phản hồi thành công nếu có lịch sử nghỉ phép
            return ResponseBuilder.build(HttpStatus.OK, "Leave history retrieved successfully", leaveHistoryList, null);
        } else {
            // Trả về phản hồi lỗi nếu không tìm thấy lịch sử nghỉ phép
            return ResponseBuilder.build(HttpStatus.NOT_FOUND, "Leave history not found", null, "Employee not found or no leave history");
        }
    }
//v01
    // @PostMapping("/employees/{id}")
    // public ResponseEntity<Object> addLeaveHistory(
    //         @PathVariable("id") Long employeeId,
    //         @RequestBody LeaveHistory leaveHistory) {
        
    //     Map<String, String> response = leaveHistoryService.addLeaveHistory(employeeId, leaveHistory);
        
    //     if (response.containsKey("success")) {
    //         // Trả về phản hồi thành công nếu thêm lịch sử nghỉ phép thành công
    //         return ResponseBuilder.build(HttpStatus.CREATED, "Leave history added successfully", response, null);
    //     } else {
    //         // Trả về phản hồi lỗi nếu thêm lịch sử nghỉ phép thất bại
    //         return ResponseBuilder.build(HttpStatus.BAD_REQUEST, "Failed to add leave history", null, "Invalid data or employee ID");
    //     }
    // }
@PostMapping("/api/leave-history/employees/{id}")
public ResponseEntity<Object> addLeaveHistory(
        @PathVariable("id") Long employeeId,
        @RequestBody Map<String, Object> requestBody) {

    LeaveHistory leaveHistory = new LeaveHistory();
    LeaveType leaveType = LeaveType.valueOf((String) requestBody.get("leaveType"));
    LeaveStatus leaveStatus = LeaveStatus.valueOf((String) requestBody.get("status"));
    leaveHistory.setStartDate(LocalDate.parse((String) requestBody.get("startDate")));
    leaveHistory.setEndDate(LocalDate.parse((String) requestBody.get("endDate")));
    leaveHistory.setLeaveType(leaveType);
    leaveHistory.setStatus(leaveStatus);
    leaveHistory.setRequestId((String) requestBody.get("requestId"));

    Map<String, Long> response = leaveHistoryService.addLeaveHistory(employeeId, leaveHistory);

    if (response != null && response.containsKey("historyId")) {
        return ResponseBuilder.build(HttpStatus.CREATED, "Leave history added successfully", response, null);
    } else {
        return ResponseBuilder.build(HttpStatus.BAD_REQUEST, "Failed to add leave history", null, "Invalid data or employee ID");
    }
}


}
