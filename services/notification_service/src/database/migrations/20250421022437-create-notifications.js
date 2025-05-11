'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notifications', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      recipient_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      recipient_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      recipient_type: {
        type: Sequelize.ENUM('EMPLOYEE', 'MANAGER'),
        defaultValue: 'EMPLOYEE',
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM('REMINDER', 'APPROVAL', 'REJECTION'),
        defaultValue: 'REMINDER',
        allowNull: false
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('SENT', 'PENDING'),
        defaultValue: 'SENT',
        allowNull: false
      },
      request_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      pending_since: {
        type: Sequelize.DATE,
        allowNull: true
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      employee_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addIndex('notifications', ['recipient_id']);
    await queryInterface.addIndex('notifications', ['request_id']);
    await queryInterface.addIndex('notifications', ['employee_id']);
    await queryInterface.addIndex('notifications', ['status']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('notifications');
  }
};