import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/admin/AdminDashboard.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to="/admin/website">Website</Link></li>
        <li><Link to="/admin/mail">Mail</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
