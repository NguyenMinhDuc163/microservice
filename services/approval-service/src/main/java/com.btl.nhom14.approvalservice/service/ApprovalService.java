package com.btl.nhom14.approvalservice.service;

import com.btl.nhom14.approvalservice.dto.ApprovalDTO;
import com.btl.nhom14.approvalservice.dto.BaseRequest;

public interface ApprovalService {
    ApprovalDTO getApprovalById(Long approvalId);
    ApprovalDTO saveApproval(BaseRequest request);
    ApprovalDTO approveApproval(BaseRequest request);
    ApprovalDTO rejectApproval(BaseRequest request);
    void checkConsumer(String request);
}
