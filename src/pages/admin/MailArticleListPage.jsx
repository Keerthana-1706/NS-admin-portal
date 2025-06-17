import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import { useNotification } from '../../context/NotificationContext'; // <-- IMPORT THIS
import BackButton from '../../components/BackButton';
import '../../styles/AdminPages.css';

// --- Add all three icons for consistency ---
const ViewIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg>;
const EditIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>;
const DeleteIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>;

const formatSlug = (slug) => slug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

const MailArticleListPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { getMailArticles, deleteMailArticle } = useContent();
  const { showConfirmation, showNotification } = useNotification(); // <-- Get the new functions

  const articles = getMailArticles(category);
  const pageTitle = `Manage Mail: ${formatSlug(category)}`;

  // --- MODIFIED handleDelete for Mail ---
  const handleDelete = (articleId) => {
    showConfirmation(
      'Are you sure you want to delete this mail article permanently?',
      () => { // This runs only if the user confirms
        deleteMailArticle(category, articleId);
        showNotification('Mail article deleted successfully.');
      }
    );
  };

  return (
    <div className="admin-page-container">
      <BackButton />
      <h1 className="admin-page-header-purple">{pageTitle}</h1>

      <div className="add-article-link-container">
        <Link to={`/admin/mail/${category}/add`} className="add-article-link">
          + Add New Mail
        </Link>
      </div>

      <div className="article-list">
        {articles.length > 0 ? (
          articles.map(article => (
            <div key={article.id} className="article-list-item">
              <span className="article-list-title">{article.headline}</span>
              <div className="article-list-actions">
                {/* --- ADDED THE VIEW BUTTON --- */}
                <button 
                  onClick={() => navigate(`/admin/mail/${category}/${article.id}/view`)} 
                  className="list-action-btn view-btn"
                >
                  <ViewIcon /> View
                </button>
                <button 
                  onClick={() => navigate(`/admin/mail/${category}/${article.id}/edit`)} 
                  className="list-action-btn edit-btn"
                >
                  <EditIcon /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(article.id)} 
                  className="list-action-btn delete-btn"
                >
                  <DeleteIcon /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-articles-message">No mail articles found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default MailArticleListPage;