import React from 'react';
import { useParams } from 'react-router-dom';
import CategorySelector from '../../components/CategorySelector';
import BackButton from '../../components/BackButton';
import '../../styles/AdminPages.css';

const ArticleActionPage = () => {
  const { action } = useParams();
  const title = action.charAt(0).toUpperCase() + action.slice(1);

  return (
    <div className="admin-page-container">
      <BackButton />
      <h1 className="admin-page-header">{title} Article</h1>
      <p style={{color: 'rgba(255,255,255,0.7)'}}>Select a category for the article you wish to {action}.</p>
      <CategorySelector basePath={`/admin/mail/${action}`} />
    </div>
  );
};

export default ArticleActionPage;