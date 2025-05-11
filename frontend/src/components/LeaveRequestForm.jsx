import React, { useState, useEffect } from "react";
import './style.css';
import PropTypes from 'prop-types';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const EmployeePropType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
});

const LeaveRequestForm = () => {
    const [employeeData, setEmployeeData] = useState([]);
    const [formData, setFormData] = useState({
        employeeId: "",
        leaveType: "SICK",
        startDate: "",
        endDate: "",
        reason: "",
        numberOfDays: 0,
    });
    const [submittedData, setSubmittedData] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const today = new Date().toISOString().split("T")[0];

    const fetchEmployees = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/employees/all`);
            const data = response.data.data.map((item) => ({
                id: item.employeeId.toString(),
                name: item.employeeName,
                email: item.employeeEmail,
            }));
            setEmployeeData(data);
        } catch (err) {
            console.error("Lỗi lấy dữ liệu nhân viên:", err);
            setError(err.message || "Không thể tải danh sách nhân viên");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        if (formData.startDate && formData.endDate) {
            const start = new Date(formData.startDate);
            const end = new Date(formData.endDate);
            const diffTime = end - start;
            const days = diffTime >= 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 : 0;
            setFormData((prev) => ({
                ...prev,
                numberOfDays: days,
            }));
        }
    }, [formData.startDate, formData.endDate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Lưu dữ liệu gửi đi
        setSubmittedData(formData);

        // Chuẩn bị body cho API POST
        const requestBody = {
            employeeId: formData.employeeId,
            startDate: formData.startDate,
            endDate: formData.endDate,
            leaveType: formData.leaveType,
            reason: formData.reason,
        };

        try {
            // Gửi yêu cầu POST đến API
            const response = await axios.post(`${BASE_URL}/leave-requests`, requestBody);
            console.log("Phản hồi từ API:", response.data);
            setResponseData(response.data); // Lưu phản hồi từ API
        } catch (err) {
            console.error("Lỗi khi gửi yêu cầu nghỉ phép:", err);
            setError(err.message || "Không thể gửi yêu cầu nghỉ phép");
            setResponseData(null); // Reset phản hồi nếu có lỗi
        }
    };

    return (
        <div style={{ maxWidth: 1200, margin: "auto" }}>
            {isLoading && <p>Đang tải dữ liệu...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: 16 }}>
                    <div>
                        <label>
                            Nhân viên:
                            <br />
                            <select name="employeeId" value={formData.employeeId} onChange={handleChange}>
                                <option value="">-- Chọn --</option>
                                {employeeData.map((emp) => (
                                    <option key={emp.id} value={emp.id}>
                                        {emp.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div>
                        <label>
                            Loại nghỉ:
                            <br />
                            <select name="leaveType" value={formData.leaveType} onChange={handleChange}>
                                <option value="SICK">SICK</option>
                                <option value="ANNUAL">ANNUAL</option>
                                <option value="PERSONAL">PERSONAL</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label>
                            Ngày bắt đầu:
                            <br />
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                min={today}
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Ngày kết thúc:
                            <br />
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                min={formData.startDate || today}
                            />
                        </label>
                    </div>

                    <div style={{ flexGrow: 1 }}>
                        <label>
                            Lý do:
                            <br />
                            <input
                                type="text"
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                style={{ width: "100%" }}
                            />
                        </label>
                    </div>
                </div>

                <div style={{ display: "flex", gap: "16px", marginBottom: 16 }}>
                    <div>
                        <label>
                            Số ngày nghỉ:
                            <br />
                            <input type="number" value={formData.numberOfDays} readOnly />
                        </label>
                    </div>
                </div>

                <button type="submit">Gửi yêu cầu</button>
            </form>

            <div className="data-container">
                <div className="data-box">
                    <h4>Dữ liệu gửi đi</h4>
                    <pre>{submittedData ? JSON.stringify(submittedData, null, 2) : "Chưa gửi"}</pre>
                </div>
                <div className="data-box">
                    <h4>Dữ liệu phản hồi</h4>
                    <pre>{responseData ? JSON.stringify(responseData, null, 2) : "Chưa có phản hồi"}</pre>
                </div>
            </div>
        </div>
    );
};

LeaveRequestForm.propTypes = {
    employees: PropTypes.arrayOf(EmployeePropType),
};

export default LeaveRequestForm;