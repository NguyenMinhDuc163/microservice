package com.btl.leaverequestservice.client;

import com.btl.leaverequestservice.dto.GenericResponse;
import com.btl.leaverequestservice.dto.LeaveValidationRequest;
import com.btl.leaverequestservice.dto.LeaveValidationResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "leave-service", url = "${service.leave.url}")
public interface LeaveServiceClient {

    @PostMapping("/api/leave-validations")
    GenericResponse<LeaveValidationResponse> validateLeaveRequest(@RequestBody LeaveValidationRequest request);
}