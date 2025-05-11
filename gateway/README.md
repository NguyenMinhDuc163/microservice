# API Gateway Documentation

## Cấu trúc thư mục
```
gateway/
├── src/
│   ├── config/         # Cấu hình services
│   ├── middleware/     # Các middleware
│   ├── routes/         # Định nghĩa routes
│   ├── utils/          # Các utility functions
│   └── app.js          # File chính của ứng dụng
├── logs/              # Thư mục chứa logs
└── server.js          # File khởi động server
```

## Các bước thêm service mới

### 1. Thêm cấu hình service
Mở file `src/config/config.js` và thêm vào phần `services`:

```javascript
module.exports = {
    server: {
        port: process.env.PORT || 8080,
        env: process.env.NODE_ENV || 'development',
    },
    services: {
        // ... các services hiện có
        newService: {
            url: process.env.NEW_SERVICE_URL || 'http://localhost:PORT',
            options: {
                timeout: 10000,        // Timeout cho mỗi request
                retry: {
                    attempts: 3,       // Số lần thử lại khi thất bại
                    delay: 1000        // Thời gian chờ giữa các lần thử (ms)
                },
                changeOrigin: true,    // Cho phép thay đổi origin
                secure: false,         // Cho phép kết nối không bảo mật
                logLevel: 'debug'      // Mức độ log
            }
        }
    },
    logging: {
        level: process.env.LOG_LEVEL || 'info',
        directory: 'logs',
    }
};
```

### 2. Thêm routes
Mở file `src/routes/index.js` và thêm:

```javascript
// Thêm vào phần đầu file
const NEW_SERVICE_URL = process.env.NEW_SERVICE_URL || 'http://localhost:PORT';

// Thêm route mới
router.use('/service-name', createProxyMiddleware({
    target: NEW_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api/service-name': '/service-endpoint' // Điều chỉnh path nếu cần
    },
    logLevel: 'debug',
    onProxyReq: (proxyReq, req, res) => {
        // Xử lý body cho POST/PUT/PATCH requests
        if (req.body && ['POST', 'PUT', 'PATCH'].includes(req.method)) {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }
        logger.debug(`Forwarding request to New Service: ${req.method} ${req.originalUrl}`);
    },
    onProxyRes: (proxyRes, req, res) => {
        logger.debug(`Received response from New Service: ${proxyRes.statusCode}`);
    },
    onError: (err, req, res) => {
        logger.error('New Service Proxy Error:', err);
        res.status(503).json({
            code: 503,
            status: false,
            message: 'Service không khả dụng',
            error: err.message
        });
    }
}));
```

### 3. Cập nhật endpoints
Trong file `src/routes/index.js`, thêm endpoint mới vào route '/':

```javascript
router.get('/', (req, res) => {
    res.json({
        message: 'API Gateway đang hoạt động',
        endpoints: [
            // ... các endpoints hiện có
            { path: '/api/service-name/*', description: 'New Service APIs' }
        ],
    });
});
```

## Kiểm tra sau khi thêm
1. Khởi động lại API Gateway
2. Gọi API thông qua gateway
3. Kiểm tra logs
4. Kiểm tra response

## Lưu ý
- Đảm bảo service mới đang chạy
- Kiểm tra port và URL
- Điều chỉnh pathRewrite nếu cần
- Kiểm tra headers (Content-Type, Authorization)
- Điều chỉnh timeout phù hợp
- Đảm bảo thêm đầy đủ các options cần thiết trong cấu hình service

## Cấu hình Docker

### 1. Biến môi trường
Khi chạy với Docker, cần cấu hình các biến môi trường sau trong `docker-compose.yml`:

```yaml
environment:
  - PORT=8080                    # Port của API Gateway
  - NODE_ENV=development         # Môi trường (development/production)
  - MANAGER_SERVICE_URL=http://manager-service:8003        # URL của Manager Service
  - NOTIFICATION_SERVICE_URL=http://notification-service:8005  # URL của Notification Service
  - LOG_LEVEL=debug             # Mức độ log (debug/info/error)
```

### 2. Dependencies
Cấu hình dependencies trong `docker-compose.yml`:

```yaml
depends_on:
  - manager-service      # Phụ thuộc vào Manager Service
  - notification-service # Phụ thuộc vào Notification Service
```

### 3. Network
Đảm bảo tất cả services đều trong cùng một network:

```yaml
networks:
  - app-network
```

### 4. Volumes (nếu cần)
Nếu cần mount thư mục logs hoặc config:

```yaml
volumes:
  - ./logs:/app/logs
  - ./src/config:/app/src/config
```

### 5. Lưu ý khi chạy với Docker
- Sử dụng tên container thay vì localhost trong URL
- Đảm bảo tất cả services đều trong cùng network
- Kiểm tra dependencies giữa các services
- Cấu hình đúng các biến môi trường
- Mount volumes nếu cần thiết 