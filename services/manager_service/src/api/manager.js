// src/api/manager.js - Đúng theo đặc tả
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

    // Lấy danh sách nhân viên trong team của manager
    app.get('/api/managers/:id/team', UserAuth, async (req, res, next) => {
        const managerId = req.params.id;
        try {
            const response = await service.GetTeam(managerId);
            res.status(response.code).json(response);
        } catch (error) {
            next(error);
        }
    });

    // Lấy danh sách yêu cầu chờ phê duyệt
    app.get('/api/managers/:id/pending-requests', UserAuth, async (req, res, next) => {
        const managerId = req.params.id;
        try {
            const response = await service.GetPendingRequests(managerId);
            res.status(response.code).json(response);
        } catch (error) {
            next(error);
        }
    });

    // Lấy danh sách thông báo của manager
    app.get('/api/managers/:id/notifications', UserAuth, async (req, res, next) => {
        const managerId = req.params.id;
        try {
            const response = await service.GetNotifications(managerId);
            res.status(response.code).json(response);
        } catch (error) {
            next(error);
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