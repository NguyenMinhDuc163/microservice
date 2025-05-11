package com.btl.nhom14.approvalservice.repository;

import com.btl.nhom14.approvalservice.model.Approval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApprovalRepository extends JpaRepository<Approval, Long> {
}
