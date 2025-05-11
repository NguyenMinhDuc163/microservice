const dotEnv = require('dotenv');
const path = require('path');

dotEnv.config();

module.exports = {
    development: {
        username: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'Admin@123',
        database: process.env.POSTGRES_DB || 'notification_service',
        host: process.env.POSTGRES_HOST || 'postgres',
        port: process.env.POSTGRES_PORT || 5432,
        dialect: 'postgres',
        logging: false
    },
    test: {
        username: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'Admin@123',
        database: (process.env.POSTGRES_DB || 'notification_service') + '_test',
        host: process.env.POSTGRES_HOST || 'postgres',
        port: process.env.POSTGRES_PORT || 5432,
        dialect: 'postgres',
        logging: false
    },
    production: {
        username: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'Admin@123',
        database: process.env.POSTGRES_DB || 'notification_service',
        host: process.env.POSTGRES_HOST || 'postgres',
        port: process.env.POSTGRES_PORT || 5432,
        dialect: 'postgres',
        logging: false
    }
};