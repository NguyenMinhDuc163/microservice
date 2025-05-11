
const { Notification } = require('../models');
const { Op } = require('sequelize');

class NotificationRepository {
    async CreateNotification({ recipientId, recipientType, message, type, referenceId, channel }) {
        try {
            const notification = await Notification.create({
                recipientId,
                recipientType,
                message,
                type,
                referenceId,
                channel,
                status: 'SENT'
            });

            return notification;
        } catch (error) {
            console.error('Error creating notification:', error);
            throw error;
        }
    }

    async FindNotification(id) {
        try {
            const notification = await Notification.findByPk(id);
            return notification;
        } catch (error) {
            console.error('Error finding notification:', error);
            throw error;
        }
    }

    async FindNotifications({ recipientId, recipientType, status }) {
        try {
            const whereClause = {};

            if (recipientId) whereClause.recipientId = recipientId;
            if (recipientType) whereClause.recipientType = recipientType;
            if (status) whereClause.status = status;

            const notifications = await Notification.findAll({
                where: whereClause,
                order: [['created_at', 'DESC']]
            });

            return notifications;
        } catch (error) {
            console.error('Error finding notifications:', error);
            throw error;
        }
    }

    async UpdateStatus(id, status) {
        try {
            const notification = await Notification.findByPk(id);

            if (!notification) {
                return null;
            }

            notification.status = status;
            await notification.save();

            return notification;
        } catch (error) {
            console.error('Error updating notification status:', error);
            throw error;
        }
    }

    async DeleteNotification(id) {
        try {
            const notification = await Notification.findByPk(id);

            if (!notification) {
                return false;
            }

            await notification.destroy();
            return true;
        } catch (error) {
            console.error('Error deleting notification:', error);
            throw error;
        }
    }

    async GetNotificationsByReference(referenceId) {
        try {
            const notifications = await Notification.findAll({
                where: { referenceId },
                order: [['created_at', 'DESC']]
            });

            return notifications;
        } catch (error) {
            console.error('Error finding notifications by reference:', error);
            throw error;
        }
    }

    async GetUnreadNotifications(recipientId, recipientType) {
        try {
            const notifications = await Notification.findAll({
                where: {
                    recipientId,
                    recipientType,
                    status: { [Op.ne]: 'READ' }
                },
                order: [['created_at', 'DESC']]
            });

            return notifications;
        } catch (error) {
            console.error('Error finding unread notifications:', error);
            throw error;
        }
    }
}

module.exports = NotificationRepository;