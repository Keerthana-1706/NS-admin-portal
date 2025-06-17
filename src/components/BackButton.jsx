import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminPages.css'; // We'll use styles from here

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className="back-button">
      ← Back
    </button>
  );
};

export default BackButton;