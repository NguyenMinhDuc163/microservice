package com.btl.leaverequestservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationRequest {
    private Long recipientId;
    private String recipientType;  // EMPLOYEE, MANAGER
    private String message;
    private String type;           // LEAVE_REQUEST, APPROVAL, REJECTION, REMINDER
    private Long referenceId;
    private String channel;        // EMAIL, APP, SMS
}