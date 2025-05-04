// src/services/manager-service.js - Đúng theo đặc tả
const { ManagerRepository } = require("../database");
const { createResponse } = require('../utils/responseHelper');
const axios = require('axios'); // Cần cài đặt axios để gọi API từ các service khác

// URL của các service khác (trong thực tế sẽ lấy từ biến môi trường)
const LEAVE_REQUEST_SERVICE = 'http://localhost:8001';
const EMPLOYEE_SERVICE = 'http://localhost:8002';
const NOTIFICATION_SERVICE = 'http://localhost:8005';

class ManagerService {
    constructor() {
        this.repository = new ManagerRepository();
    }

    // Lấy danh sách nhân viên trong team của manager
    async GetTeam(managerId) {
        try {
            if (!managerId) {
                return createResponse(
                    false,
                    'Manager ID is required',
                    400,
                    []
                );
            }

            // Trong thực tế, sẽ gọi API từ Employee Service
            // để lấy danh sách nhân viên thuộc quản lý của manager này
            try {
                // Mô phỏng kết quả
                const teamMembers = [
                    { employeeId: "emp-001", name: "John Smith", position: "Developer" },
                    { employeeId: "emp-002", name: "Alice Johnson", position: "Designer" },
                    { employeeId: "emp-003", name: "Bob Brown", position: "Tester" }
                ];

                return createResponse(
                    true,
                    'Team members retrieved successfully',
                    200,
                    teamMembers
                );
            } catch (error) {
                console.error("Error calling Employee Service:", error);
                return createResponse(
                    false,
                    'Failed to retrieve employees from Employee Service',
                    500,
                    []
                );
            }
        } catch (error) {
            console.error('Error in GetTeam:', error);
            return createResponse(
                false,
                error.message || 'Failed to retrieve team members',
                500,
                [],
                error.toString()
            );
        }
    }

    // Lấy danh sách yêu cầu chờ phê duyệt
    async GetPendingRequests(managerId) {
        try {
            if (!managerId) {
                return createResponse(
                    false,
                    'Manager ID is required',
                    400,
                    []
                );
            }

            // Trong thực tế, sẽ gọi API từ Approval Service hoặc Leave Request Service
            // để lấy danh sách yêu cầu chờ phê duyệt
            try {
                // Mô phỏng kết quả
                const pendingRequests = [
                    {
                        requestId: "req-001",
                        employeeId: "emp-001",
                        employeeName: "John Smith",
                        startDate: "2025-05-01",
                        endDate: "2025-05-05",
                        leaveType: "ANNUAL"
                    },
                    {
                        requestId: "req-002",
                        employeeId: "emp-002",
                        employeeName: "Alice Johnson",
                        startDate: "2025-05-10",
                        endDate: "2025-05-12",
                        leaveType: "SICK"
                    }
                ];

                return createResponse(
                    true,
                    'Pending requests retrieved successfully',
                    200,
                    pendingRequests
                );
            } catch (error) {
                console.error("Error calling Leave Request Service:", error);
                return createResponse(
                    false,
                    'Failed to retrieve pending requests from Leave Request Service',
                    500,
                    []
                );
            }
        } catch (error) {
            console.error('Error in GetPendingRequests:', error);
            return createResponse(
                false,
                error.message || 'Failed to retrieve pending requests',
                500,
                [],
                error.toString()
            );
        }
    }

    // Lấy danh sách thông báo của manager
    async GetNotifications(managerId) {
        try {
            if (!managerId) {
                return createResponse(
                    false,
                    'Manager ID is required',
                    400,
                    []
                );
            }

            // Trong thực tế, sẽ gọi API từ Notification Service
            // để lấy danh sách thông báo của manager
            try {
                // Mô phỏng kết quả
                const notifications = [
                    {
                        notificationId: "notif-001",
                        message: "New leave request from John Smith",
                        createdAt: "2025-04-25T14:30:00Z",
                        read: false
                    },
                    {
                        notificationId: "notif-002",
                        message: "Leave request updated by Alice Johnson",
                        createdAt: "2025-04-24T09:15:00Z",
                        read: true
                    }
                ];

                return createResponse(
                    true,
                    'Notifications retrieved successfully',
                    200,
                    notifications
                );
            } catch (error) {
                console.error("Error calling Notification Service:", error);
                return createResponse(
                    false,
                    'Failed to retrieve notifications from Notification Service',
                    500,
                    []
                );
            }
        } catch (error) {
            console.error('Error in GetNotifications:', error);
            return createResponse(
                false,
                error.message || 'Failed to retrieve notifications',
                500,
                [],
                error.toString()
            );
        }
    }

    // Xử lý các sự kiện từ các service khác
    async SubscribeEvents(payload) {
        console.log('Received event:', typeof payload === 'string' ? payload : JSON.stringify(payload));

        try {
            const payloadData = typeof payload === 'string' ? JSON.parse(payload) : payload;

            const { event, data } = payloadData;

            switch(event) {
                case 'LEAVE_REQUEST_CREATED':
                    // Logic xử lý khi có yêu cầu nghỉ phép mới
                    console.log('Processing LEAVE_REQUEST_CREATED event in Manager Service');
                    break;

                case 'EMPLOYEE_ASSIGNED':
                    // Logic xử lý khi nhân viên được phân công cho manager
                    console.log('Processing EMPLOYEE_ASSIGNED event');
                    break;

                case 'DEPARTMENT_UPDATED':
                    // Logic xử lý khi thông tin phòng ban thay đổi
                    console.log('Processing DEPARTMENT_UPDATED event');
                    break;

                default:
                    console.log(`Unhandled event type: ${event}`);
                    return createResponse(
                        false,
                        `Unhandled event type: ${event}`,
                        400,
                        [],
                        `Unhandled event type: ${event}`
                    );
            }

            return createResponse(
                true,
                'Event processed successfully',
                200,
                []
            );
        } catch (error) {
            console.error('Error processing subscription event:', error);
            return createResponse(
                false,
                error.message || 'Failed to process subscription event',
                500,
                [],
                error.toString()
            );
        }
    }
}

module.exports = ManagerService;