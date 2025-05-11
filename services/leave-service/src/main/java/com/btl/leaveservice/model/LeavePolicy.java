// LeavePolicy.java
package com.btl.leaveservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "leave_policies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeavePolicy {
    
    @Id
    private Long id;
    
    private String employeeType;
    private int annualLeaveEntitlement;
    private int sickLeaveEntitlement;
    private int personalLeaveEntitlement;
    private int maxConsecutiveDays;
}