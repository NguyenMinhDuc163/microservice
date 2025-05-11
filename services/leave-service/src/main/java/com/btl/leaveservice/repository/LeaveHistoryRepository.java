// LeaveHistoryRepository.java
package com.btl.leaveservice.repository;

import com.btl.leaveservice.model.LeaveHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LeaveHistoryRepository extends JpaRepository<LeaveHistory, Long> {
    List<LeaveHistory> findByEmployeeIdOrderByStartDateDesc(Long employeeId);
}
