import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getManagerNotifications = async (managerId) => {
  try {
    const response = await axios.get(`${API_URL}/notifications/recipient/${managerId}/MANAGER`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const approveRequest = async (leaveRequestId, managerId) => {
  try {
    const response = await axios.post(`${API_URL}/approvals/approve`, {
      leaveRequestId,
      managerId
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const rejectRequest = async (leaveRequestId, managerId) => {
  try {
    const response = await axios.post(`${API_URL}/approvals/reject`, {
      leaveRequestId,
      managerId
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}; 