// src/services/manager-service.js
const { ManagerRepository } = require("../database");
const { createResponse } = require('../utils/responseHelper');
const axios = require('axios');

// URL của các service khác
const LEAVE_REQUEST_SERVICE = process.env.LEAVE_REQUEST_SERVICE_URL || 'http://localhost:8001';
const EMPLOYEE_SERVICE = process.env.EMPLOYEE_SERVICE_URL || 'http://localhost:8002';
const NOTIFICATION_SERVICE = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:8005';

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

            // Kiểm tra manager tồn tại trong DB
            const manager = await this.repository.FindManager(managerId);
            if (!manager) {
                return createResponse(
                    false,
                    'Manager not found',
                    404,
                    []
                );
            }

            // Gọi Employee Service để lấy danh sách nhân viên
            try {
                const response = await axios.get(
                    `${EMPLOYEE_SERVICE}/api/employees?managerId=${managerId}`
                );

                return createResponse(
                    true,
                    'Team members retrieved successfully',
                    200,
                    response.data.data || []
                );
            } catch (error) {
                console.error("Error calling Employee Service:", error);
                // Fallback: trả về empty array nếu không kết nối được
                return createResponse(
                    true,
                    'Unable to fetch team members from Employee Service',
                    200,
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

            // Kiểm tra manager tồn tại
            const manager = await this.repository.FindManager(managerId);
            if (!manager) {
                return createResponse(
                    false,
                    'Manager not found',
                    404,
                    []
                );
            }

            // Gọi Leave Request Service để lấy pending requests
            try {
                const response = await axios.get(
                    `${LEAVE_REQUEST_SERVICE}/api/leave-requests?managerId=${managerId}&status=PENDING`
                );

                return createResponse(
                    true,
                    'Pending requests retrieved successfully',
                    200,
                    response.data.data || []
                );
            } catch (error) {
                console.error("Error calling Leave Request Service:", error);
                return createResponse(
                    true,
                    'Unable to fetch pending requests',
                    200,
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

            // Kiểm tra manager tồn tại
            const manager = await this.repository.FindManager(managerId);
            if (!manager) {
                return createResponse(
                    false,
                    'Manager not found',
                    404,
                    []
                );
            }

            // Gọi Notification Service để lấy thông báo
            try {
                const response = await axios.get(
                    `${NOTIFICATION_SERVICE}/api/notifications?recipientId=${managerId}&recipientType=MANAGER`
                );

                return createResponse(
                    true,
                    'Notifications retrieved successfully',
                    200,
                    response.data.data || []
                );
            } catch (error) {
                console.error("Error calling Notification Service:", error);
                return createResponse(
                    true,
                    'Unable to fetch notifications',
                    200,
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

    // ... rest of the code
}

module.exports = ManagerService;