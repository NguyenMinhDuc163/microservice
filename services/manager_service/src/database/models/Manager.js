// src/database/models/Manager.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection');

const Manager = sequelize.define('Manager', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    departmentId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
        defaultValue: 'ACTIVE',
        allowNull: false
    }
}, {
    tableName: 'managers',
    timestamps: true,
    underscored: true
});

module.exports = Manager;