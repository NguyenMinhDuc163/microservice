// src/database/repository/manager-repository.js
const { Manager } = require('../models');
const { Op } = require('sequelize');

class ManagerRepository {
    async CreateManager({ name, email, departmentId, position }) {
        try {
            const manager = await Manager.create({
                name,
                email,
                departmentId,
                position,
                status: 'ACTIVE'
            });

            return manager;
        } catch (error) {
            console.error('Error creating manager:', error);
            throw error;
        }
    }

    async FindManager(id) {
        try {
            const manager = await Manager.findByPk(id);
            return manager;
        } catch (error) {
            console.error('Error finding manager:', error);
            throw error;
        }
    }

    async FindManagerByEmail(email) {
        try {
            const manager = await Manager.findOne({
                where: { email }
            });
            return manager;
        } catch (error) {
            console.error('Error finding manager by email:', error);
            throw error;
        }
    }

    async FindAllManagers(filter = {}) {
        try {
            const whereClause = {};

            if (filter.departmentId) whereClause.departmentId = filter.departmentId;
            if (filter.status) whereClause.status = filter.status;

            const managers = await Manager.findAll({
                where: whereClause,
                order: [['created_at', 'DESC']]
            });

            return managers;
        } catch (error) {
            console.error('Error finding all managers:', error);
            throw error;
        }
    }

    async UpdateManager(id, managerData) {
        try {
            const manager = await Manager.findByPk(id);

            if (!manager) {
                return null;
            }

            // Cập nhật dữ liệu
            await manager.update(managerData);
            return manager;
        } catch (error) {
            console.error('Error updating manager:', error);
            throw error;
        }
    }

    async DeleteManager(id) {
        try {
            const manager = await Manager.findByPk(id);

            if (!manager) {
                return false;
            }

            // Thay vì xóa, hãy cập nhật trạng thái thành 'INACTIVE'
            manager.status = 'INACTIVE';
            await manager.save();

            return true;
        } catch (error) {
            console.error('Error deleting manager:', error);
            throw error;
        }
    }

    async GetManagersByDepartment(departmentId) {
        try {
            const managers = await Manager.findAll({
                where: {
                    departmentId,
                    status: 'ACTIVE'
                },
                order: [['created_at', 'DESC']]
            });

            return managers;
        } catch (error) {
            console.error('Error finding managers by department:', error);
            throw error;
        }
    }

    async GetTeamMembers(managerId) {
        try {
            // Trong thực tế, cần có kết nối đến Employee Service
            // Ở đây chúng ta giả định rằng có API để lấy danh sách nhân viên
            // Hoặc bạn có thể triển khai một giải pháp local caching

            // Mô phỏng kết quả trả về
            return []; // Placeholder, sẽ được thay thế bằng gọi API
        } catch (error) {
            console.error('Error getting team members:', error);
            throw error;
        }
    }

    // Thêm phương thức để kiểm tra manager tồn tại
    async CheckManagerExists(managerId) {
        try {
            const manager = await Manager.findByPk(managerId);
            return !!manager;
        } catch (error) {
            console.error('Error checking manager exists:', error);
            throw error;
        }
    }

}

module.exports = ManagerRepository;