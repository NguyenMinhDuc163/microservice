// package com.btl.leaverequestservice.service.impl;

// import com.btl.leaverequestservice.client.ApprovalServiceClient;
// import com.btl.leaverequestservice.client.EmployeeServiceClient;
// import com.btl.leaverequestservice.client.LeaveServiceClient;
// import com.btl.leaverequestservice.client.NotificationServiceClient;
// import com.btl.leaverequestservice.dto.EmployeeDTO;
// import com.btl.leaverequestservice.dto.LeaveValidationRequest;
// import com.btl.leaverequestservice.dto.LeaveValidationResponse;
// import com.btl.leaverequestservice.exception.LeaveRequestInvalidException;
// import com.btl.leaverequestservice.model.LeaveRequest;
// import com.btl.leaverequestservice.model.LeaveStatus;
// import com.btl.leaverequestservice.repository.LeaveRequestRepository;

// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.MockitoAnnotations;

// import java.time.LocalDate;

// import static com.btl.leaverequestservice.model.LeaveType.SICK;
// import static org.junit.jupiter.api.Assertions.*;
// import static org.mockito.Mockito.*;

// public class LeaveRequestServiceImplTest {

//     @Mock
//     private LeaveRequestRepository leaveRequestRepository;

//     @Mock
//     private EmployeeServiceClient employeeServiceClient;

//     @Mock
//     private LeaveServiceClient leaveServiceClient;

//     @Mock
//     private ApprovalServiceClient approvalServiceClient;

//     @Mock
//     private NotificationServiceClient notificationServiceClient;

//     @InjectMocks
//     private LeaveRequestServiceImpl leaveRequestService;

//     private LeaveRequest leaveRequest;
//     private EmployeeDTO employeeDTO;

//     @BeforeEach
//     public void setUp() {
//         MockitoAnnotations.openMocks(this);
//         leaveRequest = new LeaveRequest();
//         leaveRequest.setEmployeeId("123");
//         leaveRequest.setStartDate(LocalDate.of(2025, 5, 10));
//         leaveRequest.setEndDate(LocalDate.of(2025, 5, 12));
//         leaveRequest.setLeaveType(SICK);
        
//         employeeDTO = new EmployeeDTO();
//         employeeDTO.setName("John Doe");
//         employeeDTO.setManagerId("456");
//     }

//     @Test
//     public void testCreateLeaveRequest_ValidRequest() {
//         // Arrange
//         LeaveValidationResponse validationResponse = new LeaveValidationResponse();
//         validationResponse.setValid(true);

//         // Mocking external services
//         when(employeeServiceClient.getEmployee(anyString())).thenReturn(employeeDTO);
//         when(leaveServiceClient.validateLeaveRequest(any(LeaveValidationRequest.class))).thenReturn(validationResponse);
//         when(leaveRequestRepository.save(any(LeaveRequest.class))).thenReturn(leaveRequest);

//         // Act
//         LeaveRequest result = leaveRequestService.createLeaveRequest(leaveRequest);

//         // Assert
//         assertNotNull(result);
//         assertEquals(LeaveStatus.PENDING, result.getStatus());
//         assertEquals(3, result.getNumberOfDays());  // May 10 - May 12 => 3 days
        
//         verify(approvalServiceClient, times(1)).createApproval(any());
//         verify(notificationServiceClient, times(2)).sendNotification(any());
//     }

//     @Test
//     public void testCreateLeaveRequest_InvalidLeaveRequest() {
//         // Arrange
//         LeaveValidationResponse validationResponse = new LeaveValidationResponse();
//         validationResponse.setValid(false);
//         validationResponse.setMessage("Invalid leave type");

//         // Mocking external services
//         when(leaveServiceClient.validateLeaveRequest(any(LeaveValidationRequest.class))).thenReturn(validationResponse);

//         // Act and Assert
//         LeaveRequestInvalidException exception = assertThrows(LeaveRequestInvalidException.class, () -> {
//             leaveRequestService.createLeaveRequest(leaveRequest);
//         });
        
//         assertEquals("Invalid leave type", exception.getMessage());
//     }
// }
