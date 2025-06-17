import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import '../../styles/AdminPages.css';

const CATEGORIES = ["Sustainable Fashion", "Luxury Fashion", "Fast Fashion", "Sneaker World"];

const MailManageHubPage = () => {
  return (
    <div className="admin-page-container">
      <BackButton to="/admin/dashboard" />
      <h1 className="admin-page-header">Manage Mail Content</h1>
      <p style={{ color: 'rgba(255,255,255,0.7)' }}>Select a category to manage its mail articles.</p>
      
      <div className="category-selector-grid">
        {CATEGORIES.map(category => {
          const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
          const destination = `/admin/mail/${categorySlug}`;
          return (
            <Link key={categorySlug} to={destination} className="selector-btn">
              {category}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MailManageHubPage;