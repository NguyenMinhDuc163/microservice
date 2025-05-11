// LeavePolicyService.java
package com.btl.leaveservice.service;

import com.btl.leaveservice.model.LeavePolicy;
import com.btl.leaveservice.repository.LeavePolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeavePolicyService {

    @Autowired
    private LeavePolicyRepository leavePolicyRepository;

    public List<LeavePolicy> getAllPolicies() {
        return leavePolicyRepository.findAll();
    }

    public LeavePolicy getPolicyByEmployeeType(String employeeType) {
        return leavePolicyRepository.findByEmployeeType(employeeType);
    }
}
