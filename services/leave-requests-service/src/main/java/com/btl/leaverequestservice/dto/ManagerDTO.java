package com.btl.leaverequestservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ManagerDTO {
    private String managerId;
    private String managerName;
    private String managerEmail;
}