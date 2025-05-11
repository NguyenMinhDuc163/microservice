-- Xóa dữ liệu cũ
TRUNCATE TABLE notifications;

-- Insert dữ liệu test
INSERT INTO notifications (
    recipient_id,
    recipient_name,
    recipient_type,
    type,
    message,
    status,
    request_id,
    pending_since,
    employee_id,
    employee_name,
    created_at,
    updated_at
) VALUES 
(1, 'Nguyễn Văn A', 'EMPLOYEE', 'LEAVE_REQUEST', 'Yêu cầu nghỉ phép của bạn đã được duyệt', 'SENT', 1, CURRENT_TIMESTAMP, 1, 'Nguyễn Văn A', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 'Nguyễn Văn A', 'EMPLOYEE', 'APPROVAL', 'Yêu cầu tăng lương của bạn đang được xem xét', 'SENT', 2, CURRENT_TIMESTAMP, 1, 'Nguyễn Văn A', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Trần Thị B', 'MANAGER', 'LEAVE_REQUEST', 'Có yêu cầu nghỉ phép mới từ nhân viên', 'SENT', 3, CURRENT_TIMESTAMP, 3, 'Lê Văn C', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Trần Thị B', 'MANAGER', 'APPROVAL', 'Có yêu cầu tăng lương mới từ nhân viên', 'SENT', 4, CURRENT_TIMESTAMP, 4, 'Phạm Thị D', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); 