const { consumer } = require('../config/kafka');
const logger = require('../utils/logger');
const Notification = require('../database/models/Notification');

class KafkaNotificationService {
  async startConsumer() {
    try {
      await consumer.connect();
      await consumer.subscribe({ topic: 'leave-requests', fromBeginning: true });

      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const notificationData = JSON.parse(message.value.toString());
            logger.info('Received notification:', notificationData);

            // Lưu thông báo vào database
            const notification = await Notification.create({
              recipientId: notificationData.recipientId,
              recipientName: notificationData.recipientName,
              recipientType: notificationData.recipientType,
              message: notificationData.message,
              type: notificationData.type,
              status: notificationData.status,
              requestId: notificationData.requestId,
              pendingSince: notificationData.pendingSince,
              employeeId: notificationData.employeeId,
              employeeName: notificationData.employeeName
            });

            logger.info('Successfully saved notification to database:', notification.id);
          } catch (error) {
            logger.error('Error processing notification:', error);
          }
        },
      });

      logger.info('Kafka consumer started successfully');
    } catch (error) {
      logger.error('Error starting Kafka consumer:', error);
      throw error;
    }
  }

  async stopConsumer() {
    try {
      await consumer.disconnect();
      logger.info('Kafka consumer stopped successfully');
    } catch (error) {
      logger.error('Error stopping Kafka consumer:', error);
      throw error;
    }
  }
}

module.exports = new KafkaNotificationService(); 