// src/database/seeders/20250421000001-demo-managers.js
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('managers', [
            {
                id: '88880000-0000-0000-0000-000000000001',
                name: 'John Manager',
                email: 'john.manager@company.com',
                department_id: '11110000-0000-0000-0000-000000000001',
                position: 'Team Lead',
                status: 'ACTIVE',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: '88880000-0000-0000-0000-000000000002',
                name: 'Sarah Director',
                email: 'sarah.director@company.com',
                department_id: '11110000-0000-0000-0000-000000000002',
                position: 'Department Director',
                status: 'ACTIVE',
                created_at: new Date(),
                updated_at: new Date()
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('managers', null, {});
    }
};