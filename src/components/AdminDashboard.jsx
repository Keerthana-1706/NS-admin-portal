import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// This path assumes AdminDashboard.jsx is in src/components/
// Adjust if necessary (e.g., if it's in src/pages/admin/)
import '../styles/AdminDashboard.css'; 

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('User logged out');
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard-container">
      
      {/* This header is positioned absolutely by your CSS */}
      <header className="admin-dashboard-header">
        {/* The "Admin Dashboard" text in your CSS is an h1 */}
        <h1>Admin Dashboard</h1> 
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>

      <p className="welcome-message">
        Welcome. Select a section below to manage your content.
      </p>

      <div className="admin-actions">
        <Link to="/admin/website" className="admin-action-btn">
          Manage Website Content
        </Link>
        <Link to="/admin/mail" className="admin-action-btn">
          Manage Mail Content
        </Link>
      </div>
      
    </div>
  );
};

export default AdminDashboard;