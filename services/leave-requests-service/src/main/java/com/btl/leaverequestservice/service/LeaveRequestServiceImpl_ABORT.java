// package com.btl.leaverequestservice.service;

// import com.btl.leaverequestservice.client.ApprovalServiceClient;
// import com.btl.leaverequestservice.client.EmployeeServiceClient;
// import com.btl.leaverequestservice.client.LeaveServiceClient;
// import com.btl.leaverequestservice.client.NotificationServiceClient;
// import com.btl.leaverequestservice.dto.ApprovalRequest;
// import com.btl.leaverequestservice.dto.EmployeeDTO;
// import com.btl.leaverequestservice.dto.LeaveValidationRequest;
// import com.btl.leaverequestservice.dto.LeaveValidationResponse;
// import com.btl.leaverequestservice.dto.NotificationRequest;
// import com.btl.leaverequestservice.exception.LeaveRequestInvalidException;
// import com.btl.leaverequestservice.model.LeaveRequest;
// import com.btl.leaverequestservice.model.LeaveStatus;
// import com.btl.leaverequestservice.repository.LeaveRequestRepository;
// import com.btl.leaverequestservice.service.LeaveRequestService;
// import org.springframework.stereotype.Service;

// import java.time.LocalDate;
// import java.time.temporal.ChronoUnit;
// import java.util.List;

// @Service
// public class LeaveRequestServiceImpl_ABORT implements LeaveRequestService {

//     private final LeaveRequestRepository repository;
//     private final EmployeeServiceClient employeeServiceClient;
//     private final LeaveServiceClient leaveServiceClient;
//     private final ApprovalServiceClient approvalServiceClient;
//     private final NotificationServiceClient notificationServiceClient;

//     public LeaveRequestServiceImpl_ABORT(
//             LeaveRequestRepository repository,
//             EmployeeServiceClient employeeServiceClient,
//             LeaveServiceClient leaveServiceClient,
//             ApprovalServiceClient approvalServiceClient,
//             NotificationServiceClient notificationServiceClient) {
//         this.repository = repository;
//         this.employeeServiceClient = employeeServiceClient;
//         this.leaveServiceClient = leaveServiceClient;
//         this.approvalServiceClient = approvalServiceClient;
//         this.notificationServiceClient = notificationServiceClient;
//     }

//     @Override
//     public LeaveRequest createLeaveRequest(LeaveRequest request) {
//         // 1. Lấy thông tin nhân viên
//         EmployeeDTO employee = employeeServiceClient.getEmployee(request.getEmployeeId());
        
//         // 2. Kiểm tra tính hợp lệ của yêu cầu nghỉ phép
//         LeaveValidationRequest validationRequest = new LeaveValidationRequest(
//                 request.getEmployeeId(),
//                 request.getStartDate(),
//                 request.getEndDate(),
//                 request.getLeaveType()
//         );
        
//         LeaveValidationResponse validationResponse = leaveServiceClient.validateLeaveRequest(validationRequest);
        
//         if (!validationResponse.isValid()) {
//             throw new LeaveRequestInvalidException(validationResponse.getMessage());
//         }
        
//         // 3. Tính số ngày nghỉ
//         long days = ChronoUnit.DAYS.between(request.getStartDate(), request.getEndDate()) + 1;
//         request.setNumberOfDays((int) days);
        
//         // 4. Đặt trạng thái PENDING và ngày yêu cầu
//         request.setStatus(LeaveStatus.PENDING);
//         request.setRequestDate(LocalDate.now());
        
//         // 5. Lưu yêu cầu nghỉ phép
//         LeaveRequest savedRequest = repository.save(request);
        
//         // 6. Tạo yêu cầu phê duyệt
//         ApprovalRequest approvalRequest = new ApprovalRequest(
//                 savedRequest.getId(),
//                 employee.getManagerId()
//         );
        
//         approvalServiceClient.createApproval(approvalRequest);
        
//         // 7. Gửi thông báo cho quản lý
//         NotificationRequest managerNotification = new NotificationRequest(
//                 employee.getManagerId(),
//                 "MANAGER",
//                 "New leave request from " + employee.getName() + " needs your approval",
//                 "LEAVE_REQUEST",
//                 savedRequest.getId(),
//                 "APP"
//         );
        
//         notificationServiceClient.sendNotification(managerNotification);
        
//         // 8. Gửi thông báo cho nhân viên
//         NotificationRequest employeeNotification = new NotificationRequest(
//                 request.getEmployeeId(),
//                 "EMPLOYEE",
//                 "Your leave request has been submitted successfully",
//                 "LEAVE_REQUEST",
//                 savedRequest.getId(),
//                 "APP"
//         );
        
//         notificationServiceClient.sendNotification(employeeNotification);
        
//         return savedRequest;
//     }

//     @Override
//     public LeaveRequest getLeaveRequest(Long id) {
//         return repository.findById(id).orElseThrow(() -> 
//             new RuntimeException("Leave request not found with id: " + id));
//     }

//     @Override
//     public List<LeaveRequest> searchLeaveRequests(Long employeeId, String status) {
//         if (status != null) {
//             return repository.findByEmployeeIdAndStatus(employeeId, status);
//         } else {
//             //TODO: Do it later
//             // return repository.findByEmployeeId(employeeId);
//             return null;
//         }
//     }

//     @Override
//     public LeaveRequest updateLeaveRequest(Long id, LeaveRequest request) {
//         LeaveRequest existing = getLeaveRequest(id);
        
//         // Chỉ cho phép cập nhật khi trạng thái là DRAFT hoặc PENDING
//         if (existing.getStatus() != LeaveStatus.DRAFT && existing.getStatus() != LeaveStatus.PENDING) {
//             throw new RuntimeException("Cannot update request with status: " + existing.getStatus());
//         }
        
//         // Kiểm tra tính hợp lệ của yêu cầu nghỉ phép
//         LeaveValidationRequest validationRequest = new LeaveValidationRequest(
//                 existing.getEmployeeId(),
//                 request.getStartDate(),
//                 request.getEndDate(),
//                 request.getLeaveType()
//         );
        
//         LeaveValidationResponse validationResponse = leaveServiceClient.validateLeaveRequest(validationRequest);
        
//         if (!validationResponse.isValid()) {
//             throw new LeaveRequestInvalidException(validationResponse.getMessage());
//         }
        
//         // Cập nhật thông tin
//         existing.setStartDate(request.getStartDate());
//         existing.setEndDate(request.getEndDate());
//         existing.setLeaveType(request.getLeaveType());
//         existing.setReason(request.getReason());
        
//         // Tính lại số ngày nghỉ
//         long days = ChronoUnit.DAYS.between(request.getStartDate(), request.getEndDate()) + 1;
//         existing.setNumberOfDays((int) days);
        
//         return repository.save(existing);
//     }

//     @Override
//     public LeaveRequest updateStatus(Long id, String status, String comments) {
//         LeaveRequest existing = getLeaveRequest(id);
//         LeaveStatus newStatus = LeaveStatus.valueOf(status);
//         existing.setStatus(newStatus);
//         existing.setComments(comments);
        
//         LeaveRequest updated = repository.save(existing);
        
//         // Gửi thông báo cho nhân viên về cập nhật trạng thái
//         NotificationRequest notification = new NotificationRequest(
//                 updated.getEmployeeId(),
//                 "EMPLOYEE",
//                 "Your leave request status has been updated to " + status,
//                 "LEAVE_REQUEST",
//                 updated.getId(),
//                 "APP"
//         );
        
//         notificationServiceClient.sendNotification(notification);
        
//         return updated;
//     }

//     @Override
//     public void deleteLeaveRequest(Long id) {
//         LeaveRequest existing = getLeaveRequest(id);
//         if (existing.getStatus() == LeaveStatus.DRAFT) {
//             repository.deleteById(id);
//         } else {
//             throw new RuntimeException("Cannot delete request with status: " + existing.getStatus());
//         }
//     }
// }