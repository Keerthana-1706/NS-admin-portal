import React from 'react';
import { Link, useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import '../../styles/AdminPages.css';

const CATEGORIES = ["Sustainable Fashion", "Luxury Fashion", "Fast Fashion", "Sneaker World"];
const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');

const WebsiteManageHubPage = () => {
  const { type } = useParams(); // "domestic" or "international"

  return (
    <div className="admin-page-container">
      <BackButton />
      <h1 className="admin-page-header">Manage Content: {capitalize(type)}</h1>
      <p style={{ color: 'rgba(255,255,255,0.7)' }}>Select a category to manage its articles.</p>
      
      <div className="category-selector-grid">
        {CATEGORIES.map(category => {
          const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
          const destination = `/admin/website/${type}/${categorySlug}`;

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

export default WebsiteManageHubPage;