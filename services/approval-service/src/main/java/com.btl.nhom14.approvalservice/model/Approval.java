package com.btl.nhom14.approvalservice.model;

import com.btl.nhom14.approvalservice.constant.EStatusApproval;
import com.btl.nhom14.approvalservice.utils.TimeUtil;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

/*
Approval {
    id: string              // ID phê duyệt
    leaveRequestId: string  // ID yêu cầu nghỉ phép
    managerId: string       // ID quản lý phê duyệt
    status: enum (PENDING, APPROVED, REJECTED)  // Trạng thái
    approvalDate: date      // Ngày phê duyệt
    comments: string        // Ghi chú
}
**/


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "approval")
public class Approval {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic
    @Column(name = "approval_id")
    private Long approvalId;

    @Basic
    @Column(name = "approval_date")
    private Timestamp approvalDate;

    @Basic
    @Column(name = "comments")
    private String comments;

    @Basic
    @Column(name = "manager_id")
    private Long managerId;

//    @Basic
//    @Column(name = "sender_id")
//    private Integer senderId;

    @Basic
    @Column(name = "leave_request_id")
    private Long leaveRequestId;

    @Basic
    @Column(name = "approval_status")
    @Enumerated(EnumType.STRING)
    private EStatusApproval approvalStatus;


    @Basic
    @Column(name = "created_at")
    private Timestamp createdAt;

    @Basic
    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Basic
    @Column(name = "approval_at")
    private Timestamp approvalAt;

    @Basic
    @Column(name = "rejected_at")
    private Timestamp rejectedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = TimeUtil.getCurrentTimestamp();
        this.updatedAt = null;

    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = TimeUtil.getCurrentTimestamp();
    }
}
