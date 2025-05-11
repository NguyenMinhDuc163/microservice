// LeavePolicyRepository.java
package com.btl.leaveservice.repository;

import com.btl.leaveservice.model.LeavePolicy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeavePolicyRepository extends JpaRepository<LeavePolicy, Long> {
    LeavePolicy findByEmployeeType(String employeeType);
}