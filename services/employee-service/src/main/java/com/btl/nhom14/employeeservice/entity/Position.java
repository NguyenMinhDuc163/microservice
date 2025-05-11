package com.btl.nhom14.employeeservice.entity;
/*
Department {
    id: string              // ID phòng ban
    name: string            // Tên phòng ban
    managerId: string       // ID quản lý phòng ban
}
*/

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "position")
public class Position {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "position_id")
    @Basic
    private Long positionId;

    @Basic
    @Column(name = "position_name")
    private String positionName;

    @Basic
    @Column(name = "position_code")
    private String positionCode;

}
