package com.btl.leaveservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

import com.btl.leaveservice.model.enums.LeaveStatus;
import com.btl.leaveservice.model.enums.LeaveType;

@Entity
@Table(name = "leave_histories")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaveHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long employeeId;
    private LocalDate startDate;
    private LocalDate endDate;
    
    @Enumerated(EnumType.STRING)
    private LeaveType leaveType;
    
    @Enumerated(EnumType.STRING)
    private LeaveStatus status;
    
    private String requestId;
}