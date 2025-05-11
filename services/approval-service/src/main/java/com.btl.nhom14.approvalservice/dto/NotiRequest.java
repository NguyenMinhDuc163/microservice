package com.btl.nhom14.approvalservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotiRequest {

    private Integer recipientId;
    private String recipientType;
    private String message;
    private String type;
    private Integer referenceId;
    private String channel;
}
