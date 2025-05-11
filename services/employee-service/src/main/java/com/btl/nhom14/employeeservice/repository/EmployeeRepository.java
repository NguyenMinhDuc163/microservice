package com.btl.nhom14.employeeservice.repository;

import com.btl.nhom14.employeeservice.dto.EmployeeDTO;
import com.btl.nhom14.employeeservice.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Query("""
    SELECT new com.btl.nhom14.employeeservice.dto.EmployeeDTO(m.employeeId, m.employeeName, m.employeeEmail)
    FROM Employee e
    JOIN Employee m ON e.managerId = m.employeeId
    WHERE e.employeeId = :employeeId
    """)
    Optional<EmployeeDTO>  findManagerByEmployeeId(Long employeeId);

    List<EmployeeDTO> findAllByManagerId(Long managerId);
}
