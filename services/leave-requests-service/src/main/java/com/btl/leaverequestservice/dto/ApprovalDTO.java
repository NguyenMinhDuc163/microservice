package com.btl.leaverequestservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApprovalDTO {
    private Long id;
    private String leaveRequestId;
    private String managerId;
    private String status;
    private LocalDate approvalDate;
    private String comments;
}