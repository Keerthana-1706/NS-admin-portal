// src/pages/admin/WebsiteCategoryPage.jsx

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import '../../styles/AdminPages.css';

const CATEGORIES = ["Sustainable Fashion", "Luxury Fashion", "Fast Fashion", "Sneaker World"];
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const WebsiteCategoryPage = () => {
  const { type, action } = useParams();

  return (
    <div className="admin-page-container">
      <BackButton />
      <h1 className="admin-page-header">{capitalize(action)} Article for {capitalize(type)}</h1>
      <p style={{ color: 'rgba(255,255,255,0.7)' }}>Now, select a fashion category.</p>
      
      <div className="category-selector-grid">
        {CATEGORIES.map(category => {
          const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
          
          // This is the simplification: The link ALWAYS goes to the form page.
          const destination = `/admin/website/${type}/${action}/${categorySlug}`;

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

export default WebsiteCategoryPage;