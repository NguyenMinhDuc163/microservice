// LeaveBalanceRepository.java
package com.btl.leaveservice.repository;

import com.btl.leaveservice.model.LeaveBalance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeaveBalanceRepository extends JpaRepository<LeaveBalance, Long> {
    LeaveBalance findByEmployeeIdAndYear(Long employeeId, int year);
}