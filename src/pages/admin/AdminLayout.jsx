import React from 'react';
import Sidebar from '../../components/admin/Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="admin-content">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
