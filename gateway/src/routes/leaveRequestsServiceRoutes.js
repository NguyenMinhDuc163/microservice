const express = require('express');
const services = require('../config/services');
const createProxyMiddleware = require('../middleware/proxy');
const logger = require('../utils/logger');

const router = express.Router();

// Proxy chính dùng chung cho các method POST, PUT, DELETE, GET gốc
const leaveRequestProxy = createProxyMiddleware(
    services.leaveRequestService.url,
    {
        ...services.leaveRequestService.options,
        pathRewrite: {
            '^/api/leave-requests': '/leave-requests',
        },
        onProxyReq: (proxyReq, req, res) => {
            if (req.body && ['POST', 'PUT', 'PATCH'].includes(req.method)) {
                const bodyData = JSON.stringify(req.body);
                proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
                proxyReq.write(bodyData);
            }
            logger.debug(`[LeaveRequest] Forwarding request: ${req.method} ${req.originalUrl}`);
            logger.debug(`[LeaveRequest] Request body: ${JSON.stringify(req.body)}`);
        },
        onProxyRes: (proxyRes, req, res) => {
            logger.debug(`[LeaveRequest] Response status: ${proxyRes.statusCode}`);
        },
        onError: (err, req, res) => {
            logger.error(`[LeaveRequest] Proxy error: ${err.message}`);
            res.status(500).json({ error: 'Internal Server Error', message: err.message });
        }
    }
);

// Route: Tạo yêu cầu nghỉ phép mới
router.post('/', leaveRequestProxy);

// Route: Lấy yêu cầu nghỉ phép theo ID
router.get('/:id', leaveRequestProxy);

// Route: Tìm kiếm yêu cầu nghỉ phép theo employeeId và status
router.get('/', leaveRequestProxy);

// Route: Cập nhật yêu cầu nghỉ phép
router.put('/:id', leaveRequestProxy);

// Route: Cập nhật trạng thái yêu cầu
router.put('/:id/status', leaveRequestProxy);

// Route: Xoá yêu cầu nghỉ phép
router.delete('/:id', leaveRequestProxy);

// Route: Lấy danh sách các yêu cầu nghỉ phép chưa duyệt (giả sử được khai báo trong controller như gợi ý)
router.get('/pending', createProxyMiddleware(
    services.leaveRequestService.url,
    {
        ...services.leaveRequestService.options,
        pathRewrite: {
            '^/api/leave-requests/pending': '/leave-requests/pending',
        }
    }
));

module.exports = router;
