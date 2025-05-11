package com.btl.nhom14.approvalservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApprovalDTO {
    private Integer approvalId;

    private Timestamp approvalAt;

    private Timestamp rejectAt;

    private String comments;

    private Integer managerId;

//    private Integer senderId;

    private Integer leaveRequestId;
}
