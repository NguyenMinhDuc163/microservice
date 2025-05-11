// src/index.js
const express = require('express');
const { PORT } = require('./config');
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');

const StartServer = async() => {
    const app = express();

    try {
        // Kết nối database
        await databaseConnection();

        console.log('Configuring Express application...');
        // Cấu hình express app
        await expressApp(app);

        // Listen for connections
        const server = app.listen(PORT, () => {
            console.log(`Manager service running on port ${PORT}`);
        });

        // Handle graceful shutdown
        process.on('SIGINT', async () => {
            console.log('SIGINT signal received: closing HTTP server');
            server.close(() => {
                console.log('HTTP server closed');
                process.exit(0);
            });
        });

        process.on('SIGTERM', async () => {
            console.log('SIGTERM signal received: closing HTTP server');
            server.close(() => {
                console.log('HTTP server closed');
                process.exit(0);
            });
        });

    } catch (error) {
        console.error('Warning: Service started with limited functionality:', error.message);
        console.log('Attempting to start HTTP server anyway...');

        try {
            // Vẫn cố gắng khởi động server dù có lỗi
            await expressApp(app);

            const server = app.listen(PORT, () => {
                console.log(`Manager service running with limited functionality on port ${PORT}`);
            });
        } catch (serverError) {
            console.error('Failed to start server:', serverError);
            process.exit(1);
        }
    }
};

StartServer().then(r =>
console.log('Server started successfully'));