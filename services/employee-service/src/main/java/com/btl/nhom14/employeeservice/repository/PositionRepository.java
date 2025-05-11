package com.btl.nhom14.employeeservice.repository;

import com.btl.nhom14.employeeservice.entity.Position;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PositionRepository extends JpaRepository<Position, Long> {
}
