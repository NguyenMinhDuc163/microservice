const express = require('express');
const services = require('../config/services');
const createProxyMiddleware = require('../middleware/proxy');
const router = express.Router();

// POST /api/leave-validations
router.post('/', createProxyMiddleware(
    services.leaveService.url,
    {
        ...services.leaveService.options,
        pathRewrite: {
            '^/api/leave-validations': '/api/leave-validations',
        }
    }
));

module.exports = router;
