package com.btl.nhom14.employeeservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDTO {
    private Long employeeId;
    private String employeeName;
    private String employeeEmail;
    private String employeeGender;
    private Long departmentId;
    private Long positionId;
    private String employeeStatus;


    public EmployeeDTO(Long employeeId, String employeeName, String employeeEmail) {
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.employeeEmail = employeeEmail;
    }
}
