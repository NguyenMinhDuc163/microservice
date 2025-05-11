const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const logger = require('../utils/logger');

const router = express.Router();


const MANAGER_SERVICE_URL = process.env.MANAGER_SERVICE_URL || 'http://localhost:8003';
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:8005';
const EMPLOYEE_SERVICE_URL = process.env.EMPLOYEE_SERVICE_URL || 'http://localhost:8082';
const APPROVAL_SERVICE_URL = process.env.APPROVAL_SERVICE_URL || 'http://localhost:8083';

router.use('/managers', createProxyMiddleware({
    target: MANAGER_SERVICE_URL,
    changeOrigin: true,
    logLevel: 'debug',
    onError: (err, req, res) => {
        logger.error('Manager Service Proxy Error:', err);
        res.status(503).json({
            code: 503,
            status: false,
            message: 'Manager Service không khả dụng',
            error: err.message
        });
    }
}));


router.use('/notifications', createProxyMiddleware({
    target: NOTIFICATION_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api/notifications': '/api/notifications'
    },
    logLevel: 'debug',
    onProxyReq: (proxyReq, req, res) => {
        if (req.body && ['POST', 'PUT', 'PATCH'].includes(req.method)) {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }
        logger.debug(`Forwarding request to Notification Service: ${req.method} ${req.originalUrl}`);
        logger.debug(`Request body: ${JSON.stringify(req.body)}`);
    },
    onProxyRes: (proxyRes, req, res) => {
        logger.debug(`Received response from Notification Service: ${proxyRes.statusCode}`);
    },
    onError: (err, req, res) => {
        logger.error('Notification Service Proxy Error:', err);
        res.status(503).json({
            code: 503,
            status: false,
            message: 'Notification Service không khả dụng',
            error: err.message
        });
    }
}));

router.use('/employees', createProxyMiddleware({
    target: EMPLOYEE_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api/employees': '/api/employees'
    },
    logLevel: 'debug',
    onProxyReq: (proxyReq, req, res) => {

        if (req.body && ['POST', 'PUT', 'PATCH'].includes(req.method)) {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }
        logger.debug(`Forwarding request to Employee Service: ${req.method} ${req.originalUrl}`);
        logger.debug(`Request body: ${JSON.stringify(req.body)}`);
    },
    onProxyRes: (proxyRes, req, res) => {
        logger.debug(`Received response from Employee Service: ${proxyRes.statusCode}`);
    },
    onError: (err, req, res) => {
        logger.error('Employee Service Proxy Error:', err);
        res.status(503).json({
            code: 503,
            status: false,
            message: 'Employee Service không khả dụng',
            error: err.message
        });
    }
}));
router.use('/approvals', createProxyMiddleware({
    target: APPROVAL_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api/approvals': '/api/approvals'
    },
    logLevel: 'debug',
    onProxyReq: (proxyReq, req, res) => {

        if (req.body && ['POST', 'PUT', 'PATCH'].includes(req.method)) {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }
        logger.debug(`Forwarding request to Approval Service: ${req.method} ${req.originalUrl}`);
        logger.debug(`Request body: ${JSON.stringify(req.body)}`);
    },
    onProxyRes: (proxyRes, req, res) => {
        logger.debug(`Received response from Approval Service: ${proxyRes.statusCode}`);
    },
    onError: (err, req, res) => {
        logger.error('Approval Service Proxy Error:', err);
        res.status(503).json({
            code: 503,
            status: false,
            message: 'Approval Service không khả dụng',
            error: err.message
        });
    }
}));

router.get('/health', (req, res) => {
    res.json({
        code: 200,
        status: true,
        message: 'API Gateway is healthy',
        data: {
            uptime: process.uptime(),
            timestamp: new Date().toISOString()
        }
    });
});


router.get('/', (req, res) => {
    res.json({
        message: 'API Gateway đang hoạt động',
        endpoints: [
            { path: '/api/managers/*', description: 'Manager Service APIs' },
            { path: '/api/notifications/*', description: 'Notification Service APIs' },
            { path: '/health', description: 'Kiểm tra trạng thái API Gateway' },
            { path: '/api/employees/*', description: 'Employee Service APIs' },
            { path: '/api/approvals/*', description: 'Approval Service APIs' }
        ],
    });
});


router.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Không tìm thấy endpoint cho ${req.originalUrl}`,
    });
});

module.exports = router;