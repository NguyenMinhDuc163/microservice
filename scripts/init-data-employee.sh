#!/bin/bash set -e

echo "Đang chờ employee-mysql sẵn sàng..."

Chờ MySQL sẵn sàng

while ! mysqladmin ping -h"employee-mysql" -uroot -proot --silent; do sleep 1 done

echo "Tạo và chèn dữ liệu vào employee_service_db..."

Thực thi lệnh SQL để tạo bảng và chèn dữ liệu mẫu

mysql -hemployee-mysql -uroot -proot employee_service_db <<EOF USE employee_service_db;

 CREATE TABLE IF NOT EXISTS employee ( employee_id BIGINT AUTO_INCREMENT PRIMARY KEY, employee_name VARCHAR(255) NOT NULL, employee_email VARCHAR(255) NOT NULL, employee_gender VARCHAR(50), manager_id BIGINT, employee_status VARCHAR(50) );

 INSERT INTO employee (employee_name, employee_email, employee_gender, manager_id, employee_status) VALUES ('Nguyễn Văn Hùng', 'nguyen.hung@example.com', 'Nam', NULL, 'Đang làm việc'), ('Trần Thị Lan', 'tran.lan@example.com', 'Nữ', 1, 'Đang làm việc'), ('Lê Văn Nam', 'le.nam@example.com', 'Nam', 1, 'Đang làm việc'), ('Phạm Thị Hồng', 'pham.hong@example.com', 'Nữ', 1, 'Nghỉ phép'), ('Hoàng Thanh Tùng', 'hoang.tung@example.com', 'Nam', 1, 'Đang làm việc'), ('Đỗ Thị Mai', 'do.mai@example.com', 'Nữ', 1, 'Đang làm việc'), ('Vũ Văn Sơn', 'vu.son@example.com', 'Nam', 1, 'Nghỉ việc'), ('Bùi Thị Hương', 'bui.huong@example.com', 'Nữ', 1, 'Đang làm việc'), ('Đặng Văn Long', 'dang.long@example.com', 'Nam', 1, 'Đang làm việc'), ('Trịnh Thị Ngọc', 'trinh.ngoc@example.com', 'Nữ', 1, 'Đang làm việc'); EOF

echo "Hoàn tất chèn dữ liệu vào employee_service_db."