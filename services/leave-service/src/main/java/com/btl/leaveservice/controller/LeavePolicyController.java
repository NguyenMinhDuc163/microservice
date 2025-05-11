package com.btl.leaveservice.controller;

import com.btl.leaveservice.model.LeavePolicy;
import com.btl.leaveservice.service.LeavePolicyService;
import com.btl.leaveservice.utils.ResponseBuilder;
// import com.btl.leaveservice.model.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/leave-policies")
public class LeavePolicyController {

    @Autowired
    private LeavePolicyService leavePolicyService;

    @GetMapping
    public ResponseEntity<Object> getAllPolicies() {
        List<LeavePolicy> leavePolicies = leavePolicyService.getAllPolicies();
        if (leavePolicies != null && !leavePolicies.isEmpty()) {
            // Trả về phản hồi thành công nếu có dữ liệu chính sách nghỉ phép
            return ResponseBuilder.build(HttpStatus.OK, "Leave policies retrieved successfully", leavePolicies, null);
        } else {
            // Trả về phản hồi lỗi nếu không có dữ liệu
            return ResponseBuilder.build(HttpStatus.NOT_FOUND, "No leave policies found", null, "No policies available");
        }
    }
}
