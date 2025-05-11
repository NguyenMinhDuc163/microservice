package com.btl.leaverequestservice.client;

import com.btl.leaverequestservice.dto.EmployeeDTO;
import com.btl.leaverequestservice.dto.GenericResponse;
import com.btl.leaverequestservice.dto.ManagerDTO;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "employee-service", url = "${service.employee.url}")
public interface EmployeeServiceClient {

    @GetMapping("/api/employees/{id}")
    GenericResponse<EmployeeDTO> getEmployee(@PathVariable("id") Long employeeId);
    
    @GetMapping("/api/employees/{id}/manager")
    GenericResponse<ManagerDTO> getEmployeeManager(@PathVariable("id") Long employeeId);
}