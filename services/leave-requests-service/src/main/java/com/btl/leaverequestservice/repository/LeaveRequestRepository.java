package  com.btl.leaverequestservice.repository;

import com.btl.leaverequestservice.model.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByEmployeeIdAndStatus(Long employeeId, String status);
}