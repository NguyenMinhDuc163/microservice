package com.btl.leaverequestservice.model.mapper;

import com.btl.leaverequestservice.dto.LeaveRequestDTO;
import com.btl.leaverequestservice.dto.UpdateLeaveRequestRequestDTO;
import com.btl.leaverequestservice.model.LeaveRequest;


public class LeaveRequestMapper {

    public static LeaveRequest fromDTO(LeaveRequestDTO dto) {
        if (dto == null) return null;

        return LeaveRequest.builder()
                .employeeId(dto.getEmployeeId())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .leaveType(dto.getLeaveType())
                .reason(dto.getReason())
                // các trường không có trong DTO sẽ tự động là null/0
                .build();
    }
        public static LeaveRequest fromDTO(UpdateLeaveRequestRequestDTO dto) {
        if (dto == null) return null;

        return LeaveRequest.builder()
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .leaveType(dto.getLeaveType())
                .reason(dto.getReason())
                // các trường không có trong DTO sẽ tự động là null/0
                .build();
    }
}
