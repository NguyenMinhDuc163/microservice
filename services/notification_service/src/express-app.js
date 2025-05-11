// src/express-app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { notification, appEvents } = require('./api');
// const { CreateChannel } = require('./utils'); // Tạm thời vô hiệu hóa
const ErrorHandler = require('./utils/error-handler');
const notificationRoutes = require('./routes/notificationRoutes');

module.exports = async (app) => {
    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));

    // Đảm bảo thư mục logs tồn tại
    const fs = require('fs');
    if (!fs.existsSync('./logs')) {
        fs.mkdirSync('./logs');
    }

    // API - Bỏ qua RabbitMQ channel trong giai đoạn phát triển
    console.log('Starting in development mode without RabbitMQ');

    // Setup routes
    notification(app, null); // Truyền null thay vì channel
    appEvents(app);

    // API Documentation route
    app.use('/api-docs', express.static('public'));

    // Routes
    app.use('/api/notifications', notificationRoutes);

    // Error handling middleware
    app.use(ErrorHandler);

    // 404 - Not found handler
    app.use((req, res, next) => {
        return res.status(404).json({ message: "Route not found" });
    });

    // Error handler
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra',
            error: err.message
        });
    });

    return app;
};