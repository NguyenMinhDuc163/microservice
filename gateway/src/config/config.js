module.exports = {
    server: {
        port: process.env.PORT || 8080,
        env: process.env.NODE_ENV || 'development',
    },
    services: {
        managerService: {
            url: process.env.MANAGER_SERVICE_URL || 'http://localhost:8003',
            options: {
                timeout: 30000,
                changeOrigin: true,
                secure: false,
                logLevel: 'debug'
            }
        },
        notificationService: {
            url: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:8005',
            options: {
                timeout: 10000,
                retry: {
                    attempts: 3,
                    delay: 1000
                },
                changeOrigin: true,
                secure: false,
                logLevel: 'debug'
            }
        },
        employeeService: {
            url: process.env.EMPLOYEE_SERVICE_URL || 'http://localhost:8082',
            options: {
                timeout: 10000,
                retry: {
                    attempts: 3,
                    delay: 1000
                },
                changeOrigin: true,
                secure: false,
                logLevel: 'debug'
            }
        },
        approvalService: {
            url: process.env.APPROVAL_SERVICE_URL || 'http://localhost:8083',
            options: {
                timeout: 10000,
                retry: {
                    attempts: 3,
                    delay: 1000
                },
                changeOrigin: true,
                secure: false,
                logLevel: 'debug'
            }
        },
        //////////////////
        leaveRequestService: {
            url: process.env.LEAVE_REQUEST_SERVICE_URL || 'http://localhost:8090',
            options: {
                timeout: 10000,
                retry: {
                    attempts: 3,
                    delay: 1000
                },
                changeOrigin: true,
                secure: false,
                logLevel: 'debug'
            }
        },
        leaveService: {
            url: process.env.LEAVE_SERVICE_URL || 'http://localhost:8091',
            options: {
                timeout: 10000,
                retry: {
                    attempts: 3,
                    delay: 1000
                },
                changeOrigin: true,
                secure: false,
                logLevel: 'debug'
            }
        }
    },
    logging: {
        level: process.env.LOG_LEVEL || 'info',
        directory: 'logs',
    },
};