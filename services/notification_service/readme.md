# Notification Service Integration Guide

## Kafka Configuration
```properties
Topic: leave-requests
Bootstrap Servers: kafka:9092
```

## Message Format
```json
{
  "recipientId": "number",      // ID người nhận (ví dụ: 1)
  "recipientName": "string",    // Tên người nhận
  "recipientType": "string",    // EMPLOYEE hoặc MANAGER
  "type": "string",            // REMINDER, APPROVAL, REJECTION
  "message": "string",         // Nội dung thông báo
  "status": "string",          // SENT hoặc PENDING
  "requestId": "number",       // ID request (ví dụ: 1)
  "pendingSince": "string",    // ISO date
  "employeeId": "number",      // ID nhân viên (ví dụ: 1)
  "employeeName": "string",    // Tên nhân viên
  "createdAt": "string"        // ISO date
}
```

## Integration
1. Kết nối tới Kafka broker
2. Gửi message vào topic `leave-requests`
3. Message phải theo đúng format trên

## Support
Liên hệ team notification service nếu cần hỗ trợ.
