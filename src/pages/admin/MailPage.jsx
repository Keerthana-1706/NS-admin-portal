import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import '../../styles/AdminPages.css';

const MailPage = () => {
  return (
    <div className="admin-page-container">
      <BackButton />
      <h1 className="admin-page-header">Mail Articles</h1>
      <p style={{color: 'rgba(255,255,255,0.7)'}}>Choose an action to perform on an article.</p>
      <div className="action-selector-grid">
        <Link to="/admin/mail/add" className="selector-btn">Add Article</Link>
        <Link to="/admin/mail/edit" className="selector-btn">Edit Article</Link>
        <Link to="/admin/mail/delete" className="selector-btn">Delete Article</Link>
      </div>
    </div>
  );
};

export default MailPage;