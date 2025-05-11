const { Notification } = require('../database/models');
const logger = require('../utils/logger');

const getNotificationsByRecipientId = async (req, res) => {
    try {
        const { recipientId, recipientType } = req.params;
        
        // Log giá trị thực tế
        logger.info(`Received recipientType: "${recipientType}"`);
        
        // Validate recipientType
        if (!['EMPLOYEE', 'MANAGER'].includes(recipientType)) {
            logger.error(`Invalid recipientType: "${recipientType}"`);
            return res.status(400).json({
                success: false,
                message: 'Loại người nhận không hợp lệ. Phải là EMPLOYEE hoặc MANAGER'
            });
        }

        logger.info(`Getting notifications for ${recipientType} with ID: ${recipientId}`);

        const notifications = await Notification.findAll({
            where: {
                recipientId: recipientId,
                recipientType: recipientType
            },
            order: [['createdAt', 'DESC']] // Sắp xếp theo thời gian tạo mới nhất
        });

        logger.info(`Found ${notifications.length} notifications`);

        res.json({
            success: true,
            data: notifications
        });
    } catch (error) {
        logger.error('Error getting notifications:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy danh sách thông báo',
            error: error.message
        });
    }
};

module.exports = {
    getNotificationsByRecipientId
}; 