const express = require('express');
const services = require('../config/services');
const createProxyMiddleware = require('../middleware/proxy');
const router = express.Router();

const leaveBalanceProxy = createProxyMiddleware(
    services.leaveService.url,
    {
        ...services.leaveService.options,
        pathRewrite: {
            '^/api/leave-balances': '/api/leave-balances',
        }
    }
);

// GET /api/leave-balances/:employeeId
router.get('/:employeeId', leaveBalanceProxy);

// PUT /api/leave-balances/:employeeId/update
router.put('/:employeeId/update', leaveBalanceProxy);

module.exports = router;
