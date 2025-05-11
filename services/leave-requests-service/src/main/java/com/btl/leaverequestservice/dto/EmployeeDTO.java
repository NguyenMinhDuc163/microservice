package com.btl.leaverequestservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDTO {
    private Long id;
    private String name;
    private String email;
    private String gender;
    private String departmentId;
    private Long managerId;
    private String positionId;
    private LocalDate joinDate;
    private String status;
}