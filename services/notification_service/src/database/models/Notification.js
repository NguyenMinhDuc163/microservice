const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection');

const Notification = sequelize.define('Notification', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    recipientId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    recipientName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    recipientType: {
        type: DataTypes.ENUM('EMPLOYEE', 'MANAGER'),
        defaultValue: 'EMPLOYEE',
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('LEAVE_REQUEST', 'APPROVAL', 'REJECTION', 'REMINDER'),
        defaultValue: 'LEAVE_REQUEST',
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('SENT', 'DELIVERED', 'READ'),
        defaultValue: 'SENT',
        allowNull: false
    },
    requestId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    pendingSince: {
        type: DataTypes.DATE,
        allowNull: true
    },
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    employeeName: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'notifications',
    timestamps: true, 
    underscored: true 
});

module.exports = Notification;