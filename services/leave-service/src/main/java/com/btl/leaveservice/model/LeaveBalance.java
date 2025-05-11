package com.btl.leaveservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "leave_balances")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaveBalance {
    
    @Id
    private Long employeeId;
    
    private int year;
    private int annualLeaveTotal;
    private int annualLeaveUsed;
    private int sickLeaveTotal;
    private int sickLeaveUsed;
    private int personalLeaveTotal;
    private int personalLeaveUsed;
}