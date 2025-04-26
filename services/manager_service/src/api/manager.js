// src/api/manager.js
const ManagerService = require('../services/manager-service');
const UserAuth = require('./middlewares/auth');
const { SubscribeMessage } = require('../utils');
const { createResponse } = require('../utils/responseHelper');

module.exports = (app, channel) => {
    const service = new ManagerService();

    if (channel) {
        try {
            SubscribeMessage(channel, service);
            console.log('Successfully subscribed to message broker');
        } catch (error) {
            console.error('Failed to subscribe to message broker:', error.message);
        }
    } else {
        console.log('RabbitMQ channel not available, message subscription disabled');
    }

    // Tạo manager mới
    app.post('/managers', UserAuth, async (req, res, next) => {
        const { name, email, departmentId, position } = req.body;
        try {
            const response = await service.CreateManager({
                name,
                email,
                departmentId,
                position
            });
            res.status(response.code).json(response);
        } catch (error) {
            next(createResponse(
                false,
                error.message || 'Internal server error',
                500,
                [],
                error.toString()
            ));
        }
    });

    // Lấy thông tin manager theo ID
    app.get('/managers/:id', UserAuth, async (req, res, next) => {
        const managerId = req.params.id;
        try {
            const response = await service.GetManager(managerId);
            res.status(response.code).json(response);
        } catch (error) {
            next(createResponse(
                false,
                error.message || 'Internal server error',
                500,
                [],
                error.toString()
            ));
        }
    });

    // Lấy danh sách tất cả managers (có thể lọc theo phòng ban)
    app.get('/managers', UserAuth, async (req, res, next) => {
        const { departmentId, status } = req.query;
        try {
            const response = await service.GetAllManagers({ departmentId, status });
            res.status(response.code).json(response);
        } catch (error) {
            next(createResponse(
                false,
                error.message || 'Internal server error',
                500,
                [],
                error.toString()
            ));
        }
    });

    // Cập nhật thông tin manager
    app.put('/managers/:id', UserAuth, async (req, res, next) => {
        const managerId = req.params.id;
        const { name, email, departmentId, position, status } = req.body;
        try {
            const response = await service.UpdateManager(managerId, {
                name,
                email,
                departmentId,
                position,
                status
            });
            res.status(response.code).json(response);
        } catch (error) {
            next(createResponse(
                false,
                error.message || 'Internal server error',
                500,
                [],
                error.toString()
            ));
        }
    });

    // Xóa manager (soft delete, chuyển status thành INACTIVE)
    app.delete('/managers/:id', UserAuth, async (req, res, next) => {
        const managerId = req.params.id;
        try {
            const response = await service.DeleteManager(managerId);
            res.status(response.code).json(response);
        } catch (error) {
            next(createResponse(
                false,
                error.message || 'Internal server error',
                500,
                [],
                error.toString()
            ));
        }
    });

    // Lấy danh sách nhân viên trong team của manager
    app.get('/managers/:id/team', UserAuth, async (req, res, next) => {
        const managerId = req.params.id;
        try {
            const response = await service.GetTeam(managerId);
            res.status(response.code).json(response);
        } catch (error) {
            next(createResponse(
                false,
                error.message || 'Internal server error',
                500,
                [],
                error.toString()
            ));
        }
    });

    // Lấy danh sách yêu cầu chờ phê duyệt
    app.get('/managers/:id/pending-requests', UserAuth, async (req, res, next) => {
        const managerId = req.params.id;
        try {
            const response = await service.GetPendingRequests(managerId);
            res.status(response.code).json(response);
        } catch (error) {
            next(createResponse(
                false,
                error.message || 'Internal server error',
                500,
                [],
                error.toString()
            ));
        }
    });

    // Lấy danh sách thông báo của manager
    app.get('/managers/:id/notifications', UserAuth, async (req, res, next) => {
        const managerId = req.params.id;
        try {
            const response = await service.GetNotifications(managerId);
            res.status(response.code).json(response);
        } catch (error) {
            next(createResponse(
                false,
                error.message || 'Internal server error',
                500,
                [],
                error.toString()
            ));
        }
    });

    // Kiểm tra trạng thái service
    app.get('/whoami', (req, res, next) => {
        return res.status(200).json(createResponse(
            true,
            'Service information',
            200,
            [{ msg: '/manager : I am Manager Service' }]
        ));
    });
};