// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check sessionStorage to see if the user is authenticated
  const isAuthenticated = sessionStorage.getItem('adminAuthenticated') === 'true';

  // If they are authenticated, show the child components (e.g., the Dashboard).
  // If not, redirect them to the login page.
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;