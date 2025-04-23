
const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection');

const Notification = sequelize.define('Notification', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    recipientId: {
        type: DataTypes.STRING,
        allowNull: false
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
    referenceId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('SENT', 'DELIVERED', 'READ'),
        defaultValue: 'SENT',
        allowNull: false
    },
    channel: {
        type: DataTypes.ENUM('EMAIL', 'APP', 'SMS'),
        defaultValue: 'APP',
        allowNull: false
    }
}, {
    tableName: 'notifications',
    timestamps: true, 
    underscored: true 
});

module.exports = Notification;