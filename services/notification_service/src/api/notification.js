const NotificationService = require('../services/notification-service');
const UserAuth = require('./middlewares/auth');
const { SubscribeMessage } = require('../utils');
const { createResponse } = require('../utils/responseHelper');

module.exports = (app, channel) => {
    const service = new NotificationService();

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

    app.post('/notifications', async (req, res, next) => {
        const { recipientId, recipientType, message, type, referenceId, channel } = req.body;
        try {
            const response = await service.SendNotification({
                recipientId,
                recipientType,
                message,
                type,
                referenceId,
                channel
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

    app.get('/notifications/:id', async (req, res, next) => {
        const notificationId = req.params.id;
        try {
            const response = await service.GetNotification(notificationId);
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

    app.get('/notifications', UserAuth, async (req, res, next) => {
        const { recipientId, recipientType, status } = req.query;
        try {
            const response = await service.GetNotifications({ recipientId, recipientType, status });
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

    app.put('/notifications/:id/status', UserAuth, async (req, res, next) => {
        const { status } = req.body;
        const notificationId = req.params.id;
        try {
            const response = await service.UpdateNotificationStatus(notificationId, status);
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

    app.delete('/notifications/:id', UserAuth, async (req, res, next) => {
        const notificationId = req.params.id;
        try {
            const response = await service.DeleteNotification(notificationId);
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

    app.get('/unread-notifications', UserAuth, async (req, res, next) => {
        const { recipientId, recipientType } = req.query;
        try {
            const response = await service.GetUnreadNotifications(recipientId, recipientType);
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

    app.get('/whoami', (req, res, next) => {
        return res.status(200).json(createResponse(
            true,
            'Service information',
            200,
            [{ msg: '/notification : I am Notification Service' }]
        ));
    });
};