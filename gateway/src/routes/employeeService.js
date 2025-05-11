const express = require('express');
const services = require('../config/services');
const createProxyMiddleware = require('../middleware/proxy');
const logger = require('../utils/logger');

const router = express.Router();


const employeeServiceProxy = createProxyMiddleware(
    services.employeeService.url,
    {
        ...services.employeeService.options,
        pathRewrite: {
            '^/api/employees': '/api/employees',
        },
        // onProxyReq: (proxyReq, req, res) => {
        //     logger.debug(`Forwarding request to Manager Service: ${req.method} ${req.originalUrl}`);
        // },
        onProxyReq: (proxyReq, req, res) => {
            // Đảm bảo body được chuyển tiếp đúng cách
            if (req.body && ['POST', 'PUT', 'PATCH'].includes(req.method)) {
                const bodyData = JSON.stringify(req.body);
                proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
                proxyReq.write(bodyData);
            }

            logger.debug(`Forwarding request to Approval Service: ${req.method} ${req.originalUrl}`);
            logger.debug(`Request body: ${JSON.stringify(req.body)}`);
            logger.debug(`Request headers: ${JSON.stringify(proxyReq.getHeaders())}`);
        },
        onProxyRes: (proxyRes, req, res) => {
            logger.debug(`Received response from Approval Service: ${proxyRes.statusCode}`);
            logger.debug(`Response headers: ${JSON.stringify(proxyRes.headers)}`);
        },
        onError: (err, req, res) => {
            logger.error(`Proxy error: ${err.message}`);
            res.status(500).json({ error: 'Internal Server Error', message: err.message });
        }
    }
);


router.get('/:id/manager', employeeServiceProxy); //get manager of employee by employee id
router.get('/:id', employeeServiceProxy); //get employee by id
router.post('/check', employeeServiceProxy); //check kafka


router.use('/', employeeServiceProxy);

module.exports = router;