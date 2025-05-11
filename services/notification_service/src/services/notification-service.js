// src/services/notification-service.js
const { NotificationRepository } = require("../database");
const { createResponse } = require('../utils/responseHelper');
const { BadRequestError, NotFoundError } = require('../utils/app-errors');

// Mọi logic nghiệp vụ sẽ được đặt ở đây
class NotificationService {
    constructor() {
        this.repository = new NotificationRepository();
    }

    async SendNotification(notificationInputs) {
        const { recipientId, recipientType, message, type, referenceId, channel } = notificationInputs;

        try {
            // Validation
            if (!recipientId || !message) {
                return createResponse(
                    false,
                    'recipientId and message are required fields',
                    400,
                    []
                );
            }

            // Đây là nơi thêm logic để gửi thông báo qua các kênh khác nhau
            // Ví dụ: gửi email, SMS, push notification, v.v.
            if (channel === 'EMAIL') {
                // Xử lý gửi email
                console.log(`[DEV MODE] Sending email notification to ${recipientId}`);
                // Thêm code gửi email ở đây nếu cần
            } else if (channel === 'SMS') {
                // Xử lý gửi SMS
                console.log(`[DEV MODE] Sending SMS notification to ${recipientId}`);
                // Thêm code gửi SMS ở đây nếu cần
            }

            // Lưu thông báo vào database
            const notificationResult = await this.repository.CreateNotification({
                recipientId,
                recipientType: recipientType || 'EMPLOYEE',
                message,
                type: type || 'LEAVE_REQUEST',
                referenceId,
                channel: channel || 'APP'
            });

            return createResponse(
                true,
                'Notification created successfully',
                201,
                [notificationResult]
            );
        } catch (error) {
            console.error('Error in SendNotification:', error);
            return createResponse(
                false,
                error.message || 'Failed to create notification',
                500,
                [],
                error.toString()
            );
        }
    }

    async GetNotification(id) {
        try {
            const notification = await this.repository.FindNotification(id);
            if (!notification) {
                return createResponse(
                    false,
                    'Notification not found',
                    404,
                    []
                );
            }
            return createResponse(
                true,
                'Notification retrieved successfully',
                200,
                [notification]
            );
        } catch (error) {
            console.error('Error in GetNotification:', error);
            return createResponse(
                false,
                error.message || 'Failed to retrieve notification',
                500,
                [],
                error.toString()
            );
        }
    }

    async GetNotifications(query) {
        try {
            const notifications = await this.repository.FindNotifications(query);
            return createResponse(
                true,
                'Notifications retrieved successfully',
                200,
                notifications || []
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

    async UpdateNotificationStatus(id, status) {
        try {
            // Validation
            if (!id || !status) {
                return createResponse(
                    false,
                    'Notification ID and status are required',
                    400,
                    []
                );
            }

            if (!['SENT', 'DELIVERED', 'READ'].includes(status)) {
                return createResponse(
                    false,
                    'Invalid status. Must be one of: SENT, DELIVERED, READ',
                    400,
                    []
                );
            }

            const updatedNotification = await this.repository.UpdateStatus(id, status);
            if (!updatedNotification) {
                return createResponse(
                    false,
                    'Notification not found',
                    404,
                    []
                );
            }

            return createResponse(
                true,
                'Notification status updated successfully',
                200,
                [updatedNotification]
            );
        } catch (error) {
            console.error('Error in UpdateNotificationStatus:', error);
            return createResponse(
                false,
                error.message || 'Failed to update notification status',
                500,
                [],
                error.toString()
            );
        }
    }

    async DeleteNotification(id) {
        try {
            const result = await this.repository.DeleteNotification(id);

            if (!result) {
                return createResponse(
                    false,
                    'Notification not found or could not be deleted',
                    404,
                    []
                );
            }

            return createResponse(
                true,
                'Notification deleted successfully',
                200,
                [{ success: result }]
            );
        } catch (error) {
            console.error('Error in DeleteNotification:', error);
            return createResponse(
                false,
                error.message || 'Failed to delete notification',
                500,
                [],
                error.toString()
            );
        }
    }

    async GetUnreadNotifications(recipientId, recipientType) {
        try {
            if (!recipientId) {
                return createResponse(
                    false,
                    'Recipient ID is required',
                    400,
                    []
                );
            }

            const notifications = await this.repository.GetUnreadNotifications(recipientId, recipientType || 'EMPLOYEE');
            return createResponse(
                true,
                'Unread notifications retrieved successfully',
                200,
                notifications || []
            );
        } catch (error) {
            console.error('Error in GetUnreadNotifications:', error);
            return createResponse(
                false,
                error.message || 'Failed to retrieve unread notifications',
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
                    // Logic gửi thông báo về việc tạo yêu cầu nghỉ phép
                    console.log('Processing LEAVE_REQUEST_CREATED event');
                    const { employeeId, managerId, requestDetails } = data;

                    // Gửi thông báo cho manager
                    if (managerId) {
                        return await this.SendNotification({
                            recipientId: managerId,
                            recipientType: 'MANAGER',
                            message: `Có một yêu cầu nghỉ phép mới từ nhân viên ${requestDetails.employeeName || employeeId}`,
                            type: 'LEAVE_REQUEST',
                            referenceId: requestDetails.requestId,
                            channel: 'APP'
                        });
                    }
                    break;

                case 'LEAVE_REQUEST_APPROVED':
                    // Logic gửi thông báo khi yêu cầu được phê duyệt
                    console.log('Processing LEAVE_REQUEST_APPROVED event');
                    const { employeeId: empId, requestDetails: reqDetails } = data;

                    return await this.SendNotification({
                        recipientId: empId,
                        recipientType: 'EMPLOYEE',
                        message: `Yêu cầu nghỉ phép của bạn đã được phê duyệt`,
                        type: 'APPROVAL',
                        referenceId: reqDetails.requestId,
                        channel: 'APP'
                    });

                case 'LEAVE_REQUEST_REJECTED':
                    // Logic gửi thông báo khi yêu cầu bị từ chối
                    console.log('Processing LEAVE_REQUEST_REJECTED event');
                    const { employeeId: empIdRej, requestDetails: reqDetailsRej, reason } = data;

                    return await this.SendNotification({
                        recipientId: empIdRej,
                        recipientType: 'EMPLOYEE',
                        message: `Yêu cầu nghỉ phép của bạn đã bị từ chối${reason ? ': ' + reason : ''}`,
                        type: 'REJECTION',
                        referenceId: reqDetailsRej.requestId,
                        channel: 'APP'
                    });

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

module.exports = NotificationService;