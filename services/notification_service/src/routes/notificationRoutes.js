const express = require('express');
const router = express.Router();
const { getNotificationsByRecipientId } = require('../controllers/notificationController');

// Route mới: GET /recipient/:recipientId/:recipientType
router.get('/recipient/:recipientId/:recipientType', getNotificationsByRecipientId);

// Route cũ: GET /recipient/:recipientId
router.get('/recipient/:recipientId', (req, res) => {
    // Chuyển hướng đến route mới với recipientType mặc định là EMPLOYEE
    req.params.recipientType = 'EMPLOYEE';
    getNotificationsByRecipientId(req, res);
});

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'Notification routes are working' });
});

module.exports = router; 