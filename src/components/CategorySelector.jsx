// src/components/Category-Selector.jsx - CORRECTED

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminPages.css';

// Defines the categories that will be displayed as buttons
const CATEGORIES = ["Sustainable Fashion", "Luxury Fashion", "Fast Fashion", "Sneaker World"];

/**
 * A reusable component that displays the four category buttons as links.
 * It takes a `basePath` prop to build the correct navigation URL.
 * Example: if basePath is "/admin/website", a link will be "/admin/website/luxury-fashion"
 */
const CategorySelector = ({ basePath }) => {
  return (
    <div className="category-selector-grid">
      {CATEGORIES.map(category => {
        // Create a URL-friendly version of the category name
        // e.g., "Sustainable Fashion" becomes "sustainable-fashion"
        const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
        
        return (
          <Link 
            key={categorySlug} 
            to={`${basePath}/${categorySlug}`} 
            className="selector-btn"
          >
            {category}
          </Link>
        );
      })}
    </div>
  );
};

// THIS IS THE FIX: This line makes the component available to be imported
// by other files using `import CategorySelector from '...'`.
export default CategorySelector;