package com.btl.nhom14.approvalservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BaseRequest {
    private Long id;
    private Long leaveRequestId;
    private Long managerId;
    private String comments;
}
