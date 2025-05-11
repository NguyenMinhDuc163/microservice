package com.btl.leaverequestservice.model;

import lombok.*;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Data // <-- THÊM annotation này để tự sinh getter/setter/toString/equals/hashCode
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeId;
    private LocalDate startDate;
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    private LeaveType leaveType;

    private String reason;
    private LocalDate requestDate;
    private Integer numberOfDays;

    @Enumerated(EnumType.STRING)
    private LeaveStatus status;

    private String approvalId;
    private String comments;
}
