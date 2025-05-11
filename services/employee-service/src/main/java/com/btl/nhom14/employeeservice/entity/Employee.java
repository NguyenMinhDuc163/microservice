package com.btl.nhom14.employeeservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic
    @Column(name = "employee_id")
    private Long employeeId;

    @Basic
    @Column(name = "employee_name")
    private String employeeName;

    @Basic
    @Column(name = "employee_email")
    private String employeeEmail;

    @Basic
    @Column(name = "employee_gender")
    private String employeeGender;

//    @Basic
//    @Column(name = "department_id")
//    private Long departmentId;

    @Basic
    @Column(name = "manager_id")
    private Long managerId;

//    @Basic
//    @Column(name = "position_id")
//    private Long positionId;

    @Basic
    @Column(name = "employee_status")
    private String employeeStatus;

}
