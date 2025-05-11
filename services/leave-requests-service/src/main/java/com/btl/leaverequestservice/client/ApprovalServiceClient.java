package com.btl.leaverequestservice.client;

import com.btl.leaverequestservice.dto.ApprovalDTO;
import com.btl.leaverequestservice.dto.ApprovalRequest;
import com.btl.leaverequestservice.dto.GenericResponse;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "approval-service", url = "${service.approval.url}")
public interface ApprovalServiceClient {

    @PostMapping("/api/approvals")
    GenericResponse<ApprovalDTO> createApproval(@RequestBody ApprovalRequest request);
}