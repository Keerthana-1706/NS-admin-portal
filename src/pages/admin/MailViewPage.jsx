import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import BackButton from '../../components/BackButton';
import '../../styles/AdminPages.css';

const MailViewPage = () => {
  const { category, articleId } = useParams();
  const { getMailArticleById } = useContent();

  const article = getMailArticleById(category, articleId);

  if (!article) {
    return (
      <div className="admin-page-container">
        <BackButton />
        <h1 className="admin-page-header">Mail Not Found</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)' }}>
          This mail article does not exist.
        </p>
        <Link to={`/admin/mail/${category}`} className="selector-btn">
          Back to Mail List
        </Link>
      </div>
    );
  }

  return (
    <div className="admin-page-container">
      <BackButton to={`/admin/mail/${category}`} />
      <div className="mail-view-container">
        {article.imageUrl && (
          <img src={article.imageUrl} alt={article.headline} className="mail-view-image" />
        )}
        <div className="mail-view-content">
            <h1 className="mail-view-headline">{article.headline}</h1>
            <p className="mail-view-description">{article.description}</p>
        </div>
      </div>
    </div>
  );
};

export default MailViewPage;