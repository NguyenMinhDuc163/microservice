package com.btl.nhom14.employeeservice.service;

import com.btl.nhom14.employeeservice.dto.EmployeeDTO;

import java.util.List;

public interface EmployeeService {
    EmployeeDTO getEmployeeById(long id);
    EmployeeDTO getManagerByEmployeeId(Long employeeId);
    void sendMessage(String message);
    List<Long> getListEmployeeByManagerId(Long managerId);
    List<EmployeeDTO> getAll();
}
