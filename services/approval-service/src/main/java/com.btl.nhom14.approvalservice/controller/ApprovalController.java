package com.btl.nhom14.approvalservice.controller;

import com.btl.nhom14.approvalservice.dto.ApiResponse;
import com.btl.nhom14.approvalservice.dto.ApprovalDTO;
import com.btl.nhom14.approvalservice.dto.BaseRequest;
import com.btl.nhom14.approvalservice.model.Approval;
import com.btl.nhom14.approvalservice.service.ApprovalService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/approvals")
public class ApprovalController {
    private final ApprovalService approvalService;

    @GetMapping
    public ApiResponse<?> getApprovalById(@RequestParam("id") Long approvalId) {
        return ApiResponse.<ApprovalDTO>builder()
                .data(approvalService.getApprovalById(approvalId))
                .build();
    }

    @PostMapping()
    public ApiResponse<?> saveApproval(@RequestBody BaseRequest dto) {
        return ApiResponse.<ApprovalDTO>builder()
                .data(approvalService.saveApproval(dto))
                .build();
    }

    @PutMapping("/approve")
    public ApiResponse<?> approveApproval(@RequestBody BaseRequest request) {
        return ApiResponse.<List<ApprovalDTO>>builder()
                .data(List.of(approvalService.approveApproval(request)))
                .build();
    }

    @PutMapping("/reject")
    public ApiResponse<?> rejectApproval(@RequestBody BaseRequest request) {
        return ApiResponse.<List<ApprovalDTO>>builder()
                .data(List.of(approvalService.rejectApproval(request)))
                .build();
    }
}
