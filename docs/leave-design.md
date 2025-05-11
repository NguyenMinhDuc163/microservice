# Thiết kế Hệ thống Phê duyệt Nghỉ phép Microservice

## 1. Tổng quan

Hệ thống phê duyệt nghỉ phép cho phép nhân viên nộp đơn xin nghỉ phép qua hệ thống. Quản lý sau đó sẽ xem xét yêu cầu và phê duyệt hoặc từ chối dựa trên tình trạng làm việc của nhân viên và các quy định nghỉ phép của công ty.

## 2. Kiến trúc Microservice

### 2.1. Các Service chính

#### Task Service:
- **Leave Request Service**: Xử lý toàn bộ quy trình nộp và phê duyệt yêu cầu nghỉ phép, từ khi nhân viên nộp đơn đến khi quản lý phê duyệt hoặc từ chối.

#### Entity Service:
- **Employee Service**: Quản lý thông tin chi tiết về nhân viên và phòng ban.
- **Leave Service**: Xác minh số ngày nghỉ còn lại của nhân viên, quản lý chính sách nghỉ phép và kiểm tra tính hợp lệ của yêu cầu.
- **Approval Service**: Hỗ trợ quản lý phê duyệt hoặc từ chối yêu cầu nghỉ phép và cập nhật trạng thái.
- **Manager Service**: Quản lý thông tin của quản lý, bao gồm việc nhận thông báo phê duyệt yêu cầu nghỉ phép.

#### Utility Service:
- **Notification Service**: Gửi thông báo đến nhân viên và quản lý về tình trạng yêu cầu nghỉ phép qua các kênh khác nhau (email, ứng dụng, SMS).

### 2.2. Luồng Hoạt Động Tổng Thể

```
┌─────────────┐       ┌────────────────┐       ┌─────────────┐       ┌────────────┐       ┌─────────────┐       ┌────────────────┐
│             │  1    │                │   2   │             │   3   │            │   4   │             │   5   │                │
│  Nhân viên  ├──────►│Leave Request   ├──────►│Employee     ├──────►│Leave       ├──────►│Approval     ├──────►│  Manager       │
│             │       │Service         │       │Service      │       │Service     │       │Service      │       │  Service       │
└─────────────┘       └────────────────┘       └─────────────┘       └────────────┘       └─────────────┘       └────────────────┘
                              │                                                               │                          │
                              │                                                               │                          │
                              │                       ┌───────────────┐                       │                          │
                              │          7           │               │         6             │                          │
                              └──────────────────────┤ Notification  │◄────────┐             │                          │
                                                     │ Service       │         │             │                          │
                                                     └───────────────┘         │             │                          │
                                                           ▲                   │             │                          │
                                                           │                   │             │                          │
                                                           │                   └─────────────┘                          │
                                                           │                                                            │
                                                           │              8                                             │
                                                           └────────────────────────────────────────────────────────────┘
```

#### Chi tiết các bước:

1. Nhân viên tạo yêu cầu nghỉ phép qua Leave Request Service
2. Leave Request Service lấy thông tin nhân viên từ Employee Service
3. Kiểm tra số ngày nghỉ phép còn lại và tính hợp lệ với Leave Service
4. Tạo yêu cầu phê duyệt trong Approval Service
5. Gửi thông báo đến Manager Service
6. Approval Service gửi thông báo phê duyệt hoặc từ chối qua Notification Service
7. Leave Request Service gửi thông báo kết quả đến nhân viên qua Notification Service
8. Manager Service cập nhật quyết định phê duyệt hoặc từ chối đến Notification Service

## 3. Chi tiết API cho từng Service

### 3.1. Leave Request Service

#### Entities:
```
LeaveRequest {
    id: string                  // ID của yêu cầu nghỉ phép
    employeeId: string          // ID của nhân viên
    startDate: date             // Ngày bắt đầu nghỉ
    endDate: date               // Ngày kết thúc nghỉ
    leaveType: enum (SICK, ANNUAL, PERSONAL, etc.)  // Loại nghỉ phép
    reason: string              // Lý do nghỉ phép
    status: enum (DRAFT, PENDING, APPROVED, REJECTED)  // Trạng thái
    requestDate: date           // Ngày yêu cầu
    numberOfDays: number        // Số ngày nghỉ
    approvalId: string (reference to approval)  // ID phê duyệt
    comments: string            // Ghi chú
}
```

#### API Endpoints:

**POST /api/leave-requests** - Tạo yêu cầu nghỉ phép mới
- Request body: `{ employeeId, startDate, endDate, leaveType, reason }`
- Response: `{ requestId, status }`

**GET /api/leave-requests/{id}** - Lấy chi tiết yêu cầu nghỉ phép
- Response: `LeaveRequest object`

**GET /api/leave-requests?employeeId={id}&status={status}** - Tìm kiếm yêu cầu nghỉ phép
- Response: `[ LeaveRequest objects ]`

**PUT /api/leave-requests/{id}** - Cập nhật thông tin yêu cầu nghỉ phép
- Request body: `{ startDate, endDate, leaveType, reason }`
- Response: `{ requestId, status }`

**PUT /api/leave-requests/{id}/status** - Cập nhật trạng thái yêu cầu
- Request body: `{ status, comments }`
- Response: `{ requestId, status }`

**DELETE /api/leave-requests/{id}** - Hủy yêu cầu nghỉ phép (chỉ ở trạng thái DRAFT)

### 3.2. Employee Service

#### Entities:
```
Employee {
    id: int                 // ID nhân viên
    name: string            // Tên nhân viên
    email: string           // Email
    gender: String          // giới tính 
    departmentId: int       // ID phòng ban
    managerId: int          // ID quản lý
    positionId: int         // ID chức vụ 
    joinDate: date          // Ngày bắt đầu làm việc
    status: enum (ACTIVE, INACTIVE)  // Trạng thái
}

Department {
    id: int                 // ID phòng ban
    name: string            // Tên phòng ban
    code: String            // Code của phòng ban 
    managerId: int          // ID quản lý phòng ban
}

Position  {
    id: int                 // ID chức vụ 
    name: string            // Tên chức vụ 
    code: String            // Code của chức vụ 
}

```

#### API Endpoints:

**GET /api/employees/{id}** - Lấy thông tin nhân viên
- Response: `Employee object`

**GET /api/employees/{id}/manager** - Lấy thông tin quản lý của nhân viên
- Response: `{ managerId, managerName, managerEmail }`


### 3.3. Manager Service

#### API Endpoints:

**GET /api/managers/{id}/team** - Lấy danh sách nhân viên trong team
- Response: `[ { employeeId, name, position } ]`

**GET /api/managers/{id}/pending-requests** - Lấy danh sách yêu cầu chờ phê duyệt
- Response: `[ { requestId, employeeId, employeeName, startDate, endDate, leaveType } ]`

**GET /api/managers/{id}/notifications** - Lấy danh sách thông báo của quản lý
- Response: `[ { notificationId, message, createdAt, read } ]`

### 3.4. Approval Service

#### Entities:
```
Approval {
    id: string              // ID phê duyệt
    leaveRequestId: string  // ID yêu cầu nghỉ phép
    managerId: string       // ID quản lý phê duyệt
    status: enum (PENDING, APPROVED, REJECTED)  // Trạng thái
    approvalDate: date      // Ngày phê duyệt
    comments: string        // Ghi chú
}
```

#### API Endpoints:

**POST /api/approvals** - Tạo yêu cầu phê duyệt mới
- Request body: `{ leaveRequestId, employeeId }`
- Response: `Approval object`

**GET /api/approvals/{id}** - Lấy chi tiết phê duyệt
- RequestParam: `{id}`
- Response: `Approval object`

**PUT /api/approvals/{id}/approve** - Phê duyệt yêu cầu
- Request body: `{id,  comments }`
- Response: `Approval object`

**PUT /api/approvals/{id}/reject** - Từ chối yêu cầu
- Request body: `{ id, comments }`
- Response: `Approval object`

### 3.5. Leave Service

#### Entities:
```
LeaveBalance {
    employeeId: string        // ID nhân viên
    year: number              // Năm
    annualLeaveTotal: number  // Tổng số ngày nghỉ phép năm
    annualLeaveUsed: number   // Số ngày nghỉ phép năm đã sử dụng
    sickLeaveTotal: number    // Tổng số ngày nghỉ ốm
    sickLeaveUsed: number     // Số ngày nghỉ ốm đã sử dụng
    personalLeaveTotal: number // Tổng số ngày nghỉ cá nhân
    personalLeaveUsed: number // Số ngày nghỉ cá nhân đã sử dụng
}

LeavePolicy {
    id: string                      // ID chính sách
    employeeType: string            // Loại nhân viên
    annualLeaveEntitlement: number  // Số ngày nghỉ phép năm được hưởng
    sickLeaveEntitlement: number    // Số ngày nghỉ ốm được hưởng
    personalLeaveEntitlement: number // Số ngày nghỉ cá nhân được hưởng
    maxConsecutiveDays: number      // Số ngày nghỉ liên tục tối đa
}

LeaveHistory {
    id: string              // ID lịch sử
    employeeId: string      // ID nhân viên
    startDate: date         // Ngày bắt đầu nghỉ
    endDate: date           // Ngày kết thúc nghỉ
    leaveType: enum         // Loại nghỉ phép
    status: enum            // Trạng thái
    requestId: string       // ID yêu cầu
}
```

#### API Endpoints:

**GET /api/leave-balances/{employeeId}** - Lấy số ngày nghỉ phép còn lại
- Response: `LeaveBalance object`

**POST /api/leave-validations** - Kiểm tra tính hợp lệ của yêu cầu nghỉ phép
- Request body: `{ employeeId, startDate, endDate, leaveType }`
- Response: `{ valid: boolean, message: string, availableDays: number }`

**PUT /api/leave-balances/{employeeId}/update** - Cập nhật số ngày nghỉ phép
- Request body: `{ leaveType, daysUsed, operation: "ADD"|"SUBTRACT" }`
- Response: `{ updated: boolean, newBalance: number }`

**GET /api/leave-policies** - Lấy chính sách nghỉ phép
- Response: `[ LeavePolicy objects ]`

**GET /api/leave-history/employees/{id}** - Lấy lịch sử nghỉ phép
- Response: `[ LeaveHistory objects ]`

**POST /api/leave-history/employees/{id}** - Thêm mới lịch sử nghỉ phép
- Request body: `{ startDate, endDate, leaveType, status, requestId }`
- Response: `{ historyId }`

### 3.6. Notification Service

#### Entities:
```
Notification {
    id: string                  // ID thông báo
    recipientId: string         // ID người nhận
    recipientType: enum (EMPLOYEE, MANAGER)  // Loại người nhận
    message: string             // Nội dung thông báo
    type: enum (LEAVE_REQUEST, APPROVAL, REJECTION, REMINDER)  // Loại thông báo
    referenceId: string         // ID tham chiếu
    status: enum (SENT, DELIVERED, READ)  // Trạng thái
    createdAt: date             // Thời gian tạo
    channel: enum (EMAIL, APP, SMS)  // Kênh gửi
}
```

#### API Endpoints:

**POST /api/notifications** - Tạo và gửi thông báo mới
- Request body: `{ recipientId, recipientType, message, type, referenceId, channel }`
- Response: `{ notificationId, status }`

**GET /api/notifications/{id}** - Lấy chi tiết thông báo
- Response: `Notification object`

**GET /api/notifications?recipientId={id}&recipientType={type}** - Lấy danh sách thông báo
- Response: `[ Notification objects ]`

**PUT /api/notifications/{id}/status** - Cập nhật trạng thái thông báo
- Request body: `{ status }`
- Response: `{ notificationId, status }`

## 4. Luồng Chi Tiết Theo Các Bước Nghiệp Vụ

### 4.1. Nhân viên nộp yêu cầu nghỉ phép

1. Client gọi `POST /api/leave-requests` đến Leave Request Service
2. Leave Request Service gọi `GET /api/employees/{id}` của Employee Service để lấy thông tin nhân viên
3. Leave Request Service gọi `POST /api/leave-validations` đến Leave Service để kiểm tra tính hợp lệ
4. Nếu hợp lệ, Leave Request Service tạo yêu cầu với trạng thái PENDING
5. Leave Request Service gọi `POST /api/approvals` đến Approval Service
6. Approval Service gọi `GET /api/employees/{id}/manager` của Employee Service để lấy thông tin quản lý
7. Approval Service gọi `POST /api/notifications` đến Notification Service để thông báo cho quản lý
8. Leave Request Service gọi `POST /api/notifications` để thông báo cho nhân viên về việc tạo yêu cầu thành công

### 4.2. Quản lý xử lý yêu cầu nghỉ phép

1. Quản lý xem danh sách yêu cầu chờ phê duyệt thông qua `GET /api/managers/{id}/pending-requests`
2. Quản lý xem chi tiết yêu cầu thông qua `GET /api/leave-requests/{id}`
3. Quản lý phê duyệt hoặc từ chối yêu cầu thông qua `PUT /api/approvals/{id}/approve` hoặc `/reject`
4. Approval Service cập nhật trạng thái yêu cầu qua `PUT /api/leave-requests/{id}/status`
5. Approval Service gọi `POST /api/notifications` để thông báo kết quả cho nhân viên
6. Nếu được phê duyệt, Approval Service gọi `PUT /api/leave-balances/{employeeId}/update` để cập nhật số ngày nghỉ
7. Approval Service gọi `POST /api/employees/{id}/leave-history` để cập nhật lịch sử nghỉ phép

## 5. Các Sự Kiện (Event) Trong Hệ Thống

Sử dụng Event-Driven Architecture để đảm bảo tính nhất quán giữa các service:

- **LeaveRequestCreated**: Khi yêu cầu nghỉ phép mới được tạo
- **LeaveRequestValidated**: Khi yêu cầu đã được xác thực
- **ApprovalRequested**: Khi yêu cầu phê duyệt được tạo và gửi đến quản lý
- **LeaveRequestApproved**: Khi yêu cầu nghỉ phép được phê duyệt
- **LeaveRequestRejected**: Khi yêu cầu nghỉ phép bị từ chối
- **LeaveBalanceUpdated**: Khi số ngày nghỉ phép của nhân viên được cập nhật
- **NotificationSent**: Khi thông báo được gửi đi
- **LeaveHistoryUpdated**: Khi lịch sử nghỉ phép được cập nhật

## 6. Xử Lý Trường Hợp Đặc Biệt

### 6.1. Yêu cầu nghỉ phép vượt quá số ngày còn lại
- Leave Service trả về thông báo lỗi khi validate
- Leave Request Service thông báo cho nhân viên

### 6.2. Quản lý vắng mặt/không phản hồi
- Implement cơ chế nhắc nhở tự động qua Notification Service
- Thiết lập quy trình escalation đến cấp quản lý cao hơn sau thời gian chờ

### 6.3. Hủy yêu cầu nghỉ phép đã được phê duyệt
- Tạo API endpoint riêng cho việc hủy nghỉ phép
- Yêu cầu phê duyệt lại từ quản lý
- Cập nhật lại số ngày nghỉ phép nếu được chấp thuận

### 6.4. Chỉnh sửa yêu cầu sau khi gửi
- Chỉ cho phép chỉnh sửa khi trạng thái là DRAFT hoặc PENDING
- Nếu đã gửi, yêu cầu tạo mới hoặc hủy yêu cầu hiện tại
