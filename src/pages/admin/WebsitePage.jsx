// src/pages/admin/WebsitePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import '../../styles/AdminPages.css';

const WebsitePage = () => {
  return (
    <div className="admin-page-container">
      <BackButton />
      <h1 className="admin-page-header">Website Content</h1>
      <p style={{ color: 'rgba(255,255,255,0.7)' }}>First, select a region to manage.</p>
      
      <div className="action-selector-grid">
        <Link to="/admin/website/domestic" className="selector-btn">
          Domestic
        </Link>
        <Link to="/admin/website/international" className="selector-btn">
          International
        </Link>
      </div>
    </div>
  );
};

export default WebsitePage;