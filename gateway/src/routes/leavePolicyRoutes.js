const express = require('express');
const services = require('../config/services');
const createProxyMiddleware = require('../middleware/proxy');
const router = express.Router();

// GET /api/leave-policies
router.get('/', createProxyMiddleware(
    services.leaveService.url,
    {
        ...services.leaveService.options,
        pathRewrite: {
            '^/api/leave-policies': '/api/leave-policies',
        }
    }
));

module.exports = router;
