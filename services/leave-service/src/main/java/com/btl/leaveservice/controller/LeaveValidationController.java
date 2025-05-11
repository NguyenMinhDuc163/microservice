package com.btl.leaveservice.controller;

import com.btl.leaveservice.dto.LeaveValidationRequest;
import com.btl.leaveservice.model.enums.LeaveType;
import com.btl.leaveservice.service.LeaveValidationService;
import com.btl.leaveservice.utils.ResponseBuilder;
// import com.btl.leaveservice.model.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/leave-validations")
public class LeaveValidationController {

    @Autowired
    private LeaveValidationService leaveValidationService;

    @PostMapping
    public ResponseEntity<Object> validateLeaveRequest(@RequestBody LeaveValidationRequest request) {
        Long employeeId = request.getEmployeeId();
        String employeeType = request.getEmployeeType();
        LocalDate startDate = request.getStartDate();
        LocalDate endDate = request.getEndDate();
        LeaveType leaveType = request.getLeaveType();

        Map<String, Object> validationResult = leaveValidationService.validateLeaveRequest(
                employeeId, startDate, endDate, leaveType, employeeType);

        if (validationResult != null && !validationResult.isEmpty()) {
            return ResponseBuilder.build(HttpStatus.OK, "Leave request validated successfully", validationResult, null);
        } else {
            return ResponseBuilder.build(HttpStatus.BAD_REQUEST, "Leave request validation failed", null, "Invalid leave request");
        }
}

}
