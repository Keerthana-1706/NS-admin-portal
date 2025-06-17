// src/components/ActionSelector.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminPages.css';

/**
 * A reusable component that displays "Add", "Edit", and "Delete" buttons as links.
 * @param {object} props
 * @param {string} props.basePath - The base URL for the links (e.g., "/admin/website/domestic").
 * @param {string} [props.itemType='Article'] - The type of item being acted on (e.g., "Article").
 */
const ActionSelector = ({ basePath, itemType = 'Article' }) => {
  return (
    <div className="action-selector-grid">
      <Link to={`${basePath}/add`} className="selector-btn">Add {itemType}</Link>
      <Link to={`${basePath}/edit`} className="selector-btn">Edit {itemType}</Link>
      <Link to={`${basePath}/delete`} className="selector-btn">Delete {itemType}</Link>
    </div>
  );
};

export default ActionSelector;