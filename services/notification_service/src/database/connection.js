// src/database/connection.js
const { Sequelize } = require('sequelize');
const {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT
} = require('../config');


const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    String(DB_PASSWORD), // Đảm bảo mật khẩu là string
    {
        host: DB_HOST,
        port: Number(DB_PORT), // Đảm bảo port là số
        dialect: 'postgres',
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        // Sync tất cả các models với database
        await sequelize.sync({ alter: process.env.NODE_ENV !== 'prod' });
        console.log('All models were synchronized successfully.');

        return sequelize;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
};

module.exports = dbConnection;
module.exports.sequelize = sequelize;