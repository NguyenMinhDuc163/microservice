import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LeaveApproval from './components/LeaveApproval';
import './App.css';

const { Content, Header } = Layout;

function App() {
  // Giả lập ID của manager, trong thực tế sẽ lấy từ authentication
  const managerId = 1;

  return (
    <Router>
      <Layout className="layout">
        <Header>
          <nav>
            <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0 }}>
              <li>
                <Link to="/" style={{ color: 'white' }}>Trang chủ</Link>
              </li>
              <li>
                <Link to="/manager" style={{ color: 'white' }}>Quản lý nghỉ phép</Link>
              </li>
            </ul>
          </nav>
        </Header>
        <Content style={{ padding: '50px' }}>
          <Routes>
            <Route path="/" element={<div>Trang chủ</div>} />
            <Route path="/manager" element={<LeaveApproval managerId={managerId} />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
