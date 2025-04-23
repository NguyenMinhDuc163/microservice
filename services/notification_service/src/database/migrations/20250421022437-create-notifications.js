'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notifications', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      recipient_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      recipient_type: {
        type: Sequelize.ENUM('EMPLOYEE', 'MANAGER'),
        defaultValue: 'EMPLOYEE',
        allowNull: false
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM('LEAVE_REQUEST', 'APPROVAL', 'REJECTION', 'REMINDER'),
        defaultValue: 'LEAVE_REQUEST',
        allowNull: false
      },
      reference_id: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('SENT', 'DELIVERED', 'READ'),
        defaultValue: 'SENT',
        allowNull: false
      },
      channel: {
        type: Sequelize.ENUM('EMAIL', 'APP', 'SMS'),
        defaultValue: 'APP',
        allowNull: false
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
    await queryInterface.addIndex('notifications', ['reference_id']);
    await queryInterface.addIndex('notifications', ['status']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('notifications');
  }
};