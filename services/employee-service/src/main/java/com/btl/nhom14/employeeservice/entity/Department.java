package com.btl.nhom14.employeeservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "department")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "department_id")
    @Basic
    private Long departmentId;

    @Basic
    @Column(name = "department_name")
    private String departmentName;

    @Basic
    @Column(name = "department_code")
    private String departmentCode;
    @Basic
    @Column(name = "manager_id")
    private Long managerId;
}
