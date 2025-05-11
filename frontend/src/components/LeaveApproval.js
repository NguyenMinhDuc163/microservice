import React, { useState, useEffect } from 'react';
import { getManagerNotifications, approveRequest, rejectRequest } from '../services/approvalService';
import {
  Table,
  Button,
  Space,
  message,
  Card,
  Typography,
  Spin
} from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Title } = Typography;

const LeaveApproval = ({ managerId }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await getManagerNotifications(managerId);
      setNotifications(data);
    } catch (error) {
      message.error('Không thể tải danh sách yêu cầu nghỉ phép');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [managerId]);

  const handleApprove = async (leaveRequestId) => {
    try {
      await approveRequest(leaveRequestId, managerId);
      message.success('Đã phê duyệt yêu cầu nghỉ phép');
      fetchNotifications();
    } catch (error) {
      message.error('Không thể phê duyệt yêu cầu');
    }
  };

  const handleReject = async (leaveRequestId) => {
    try {
      await rejectRequest(leaveRequestId, managerId);
      message.success('Đã từ chối yêu cầu nghỉ phép');
      fetchNotifications();
    } catch (error) {
      message.error('Không thể từ chối yêu cầu');
    }
  };

  const columns = [
    {
      title: 'Nhân viên',
      dataIndex: 'employee_name',
      key: 'employee_name',
    },
    {
      title: 'Loại thông báo',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        const types = {
          'APPROVAL': 'Yêu cầu phê duyệt',
          'REMINDER': 'Nhắc nhở',
          'REJECTION': 'Từ chối'
        };
        return types[type] || type;
      }
    },
    {
      title: 'Nội dung',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusColors = {
          'SENT': 'green',
          'PENDING': 'orange'
        };
        return (
          <span style={{ color: statusColors[status] }}>
            {status === 'SENT' ? 'Đã gửi' : 'Đang chờ'}
          </span>
        );
      }
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={() => handleApprove(record.request_id)}
            disabled={record.status !== 'PENDING'}
          >
            Phê duyệt
          </Button>
          <Button
            danger
            icon={<CloseOutlined />}
            onClick={() => handleReject(record.request_id)}
            disabled={record.status !== 'PENDING'}
          >
            Từ chối
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Title level={2}>Phê duyệt nghỉ phép</Title>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={notifications}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Spin>
    </Card>
  );
};

export default LeaveApproval; 