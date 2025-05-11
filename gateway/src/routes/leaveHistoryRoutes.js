const express = require('express');
const services = require('../config/services');
const createProxyMiddleware = require('../middleware/proxy');
const router = express.Router();

const leaveHistoryProxy = createProxyMiddleware(
    services.leaveService.url,
    {
        ...services.leaveService.options,
        pathRewrite: {
            '^/api/leave-history': '/api/leave-history',
        }
    }
);

// GET /api/leave-history/employees/:id
router.get('/employees/:id', leaveHistoryProxy);

// POST /api/leave-history/employees/:id
router.post('/employees/:id', leaveHistoryProxy);

module.exports = router;
