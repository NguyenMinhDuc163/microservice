// src/services/manager-service.js
const { ManagerRepository } = require("../database");
const { createResponse } = require('../utils/responseHelper');
const { BadRequestError, NotFoundError } = require('../utils/app-errors');

class ManagerService {
    constructor() {
        this.repository = new ManagerRepository();
    }

    async CreateManager(managerInputs) {
        const { name, email, departmentId, position } = managerInputs;

        try {
            // Validation
            if (!name || !email || !departmentId || !position) {
                return createResponse(
                    false,
                    'All fields (name, email, departmentId, position) are required',
                    400,
                    []
                );
            }

            // Kiểm tra email đã tồn tại chưa
            const existingManager = await this.repository.FindManagerByEmail(email);
            if (existingManager) {
                return createResponse(
                    false,
                    'Email already exists',
                    400,
                    []
                );
            }

            // Tạo manager mới
            const managerResult = await this.repository.CreateManager({
                name,
                email,
                departmentId,
                position
            });

            return createResponse(
                true,
                'Manager created successfully',
                201,
                [managerResult]
            );
        } catch (error) {
            console.error('Error in CreateManager:', error);
            return createResponse(
                false,
                error.message || 'Failed to create manager',
                500,
                [],
                error.toString()
            );
        }
    }

    async GetManager(id) {
        try {
            const manager = await this.repository.FindManager(id);
            if (!manager) {
                return createResponse(
                    false,
                    'Manager not found',
                    404,
                    []
                );
            }
            return createResponse(
                true,
                'Manager retrieved successfully',
                200,
                [manager]
            );
        } catch (error) {
            console.error('Error in GetManager:', error);
            return createResponse(
                false,
                error.message || 'Failed to retrieve manager',
                500,
                [],
                error.toString()
            );
        }
    }

    async GetAllManagers(filter) {
        try {
            const managers = await this.repository.FindAllManagers(filter);
            return createResponse(
                true,
                'Managers retrieved successfully',
                200,
                managers || []
            );
        } catch (error) {
            console.error('Error in GetAllManagers:', error);
            return createResponse(
                false,
                error.message || 'Failed to retrieve managers',
                500,
                [],
                error.toString()
            );
        }
    }

    async UpdateManager(id, managerData) {
        try {
            // Validation
            if (!id) {
                return createResponse(
                    false,
                    'Manager ID is required',
                    400,
                    []
                );
            }

            // Kiểm tra manager tồn tại
            const existingManager = await this.repository.FindManager(id);
            if (!existingManager) {
                return createResponse(
                    false,
                    'Manager not found',
                    404,
                    []
                );
            }

            // Nếu email thay đổi, kiểm tra email mới đã tồn tại chưa
            if (managerData.email && managerData.email !== existingManager.email) {
                const emailExists = await this.repository.FindManagerByEmail(managerData.email);
                if (emailExists) {
                    return createResponse(
                        false,
                        'Email already exists',
                        400,
                        []
                    );
                }
            }

            // Cập nhật manager
            const updatedManager = await this.repository.UpdateManager(id, managerData);
            return createResponse(
                true,
                'Manager updated successfully',
                200,
                [updatedManager]
            );
        } catch (error) {
            console.error('Error in UpdateManager:', error);
            return createResponse(
                false,
                error.message || 'Failed to update manager',
                500,
                [],
                error.toString()
            );
        }
    }

    async DeleteManager(id) {
        try {
            const result = await this.repository.DeleteManager(id);

            if (!result) {
                return createResponse(
                    false,
                    'Manager not found',
                    404,
                    []
                );
            }

            return createResponse(
                true,
                'Manager deleted successfully',
                200,
                [{ success: result }]
            );
        } catch (error) {
            console.error('Error in DeleteManager:', error);
            return createResponse(
                false,
                error.message || 'Failed to delete manager',
                500,
                [],
                error.toString()
            );
        }
    }

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

            // Kiểm tra manager tồn tại
            const existingManager = await this.repository.FindManager(managerId);
            if (!existingManager) {
                return createResponse(
                    false,
                    'Manager not found',
                    404,
                    []
                );
            }

            const teamMembers = await this.repository.GetTeamMembers(managerId);
            return createResponse(
                true,
                'Team members retrieved successfully',
                200,
                teamMembers || []
            );
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
            const existingManager = await this.repository.FindManager(managerId);
            if (!existingManager) {
                return createResponse(
                    false,
                    'Manager not found',
                    404,
                    []
                );
            }

            // Trong thực tế, cần tích hợp với Leave Request Service
            // Ở đây chúng ta giả định rằng có API để lấy danh sách yêu cầu

            // Mô phỏng kết quả trả về
            const pendingRequests = [];
            return createResponse(
                true,
                'Pending requests retrieved successfully',
                200,
                pendingRequests
            );
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
            const existingManager = await this.repository.FindManager(managerId);
            if (!existingManager) {
                return createResponse(
                    false,
                    'Manager not found',
                    404,
                    []
                );
            }

            // Trong thực tế, cần tích hợp với Notification Service
            // Ở đây chúng ta giả định rằng có API để lấy danh sách thông báo

            // Mô phỏng kết quả trả về
            const notifications = [];
            return createResponse(
                true,
                'Notifications retrieved successfully',
                200,
                notifications
            );
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
                    // Có thể thêm logic cập nhật số lượng yêu cầu chờ xử lý
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