import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import { useNotification } from '../../context/NotificationContext'; // <-- IMPORT THIS
import BackButton from '../../components/BackButton';
import '../../styles/AdminPages.css';

const ViewIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>;
const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>;

const formatSlug = (slug) => slug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

const ArticleListPage = () => {
  const { type, category } = useParams();
  const navigate = useNavigate();
  const { getArticles, deleteArticle } = useContent();
  const { showConfirmation, showNotification } = useNotification(); // <-- Get the new functions

  const articles = getArticles('website', type, category);
  const pageTitle = `Manage: ${formatSlug(type)} - ${formatSlug(category)}`;

  // --- MODIFIED handleDelete ---
  const handleDelete = (articleId) => {
    showConfirmation(
      'Are you sure you want to delete this article permanently?',
      () => { // This callback runs only when the user clicks the "Delete" button
        deleteArticle('website', type, category, articleId);
        showNotification('Article deleted successfully.');
      }
    );
  };

  return (
    <div className="admin-page-container">
      <BackButton />
      <h1 className="admin-page-header-purple">{pageTitle}</h1>

      <div className="add-article-link-container">
        <Link to={`/admin/website/${type}/${category}/add`} className="add-article-link">
          + Add New Article
        </Link>
      </div>

      <div className="article-list">
        {articles.length > 0 ? (
          articles.map(article => (
            <div key={article.id} className="article-list-item">
              <span className="article-list-title">{article.headline}</span>
              <div className="article-list-actions">
                <button onClick={() => navigate(`/admin/website/${type}/${category}/${article.id}/view`)} className="list-action-btn view-btn">
                  <ViewIcon /> View
                </button>
                <button onClick={() => navigate(`/admin/website/${type}/${category}/${article.id}/edit`)} className="list-action-btn edit-btn">
                  <EditIcon /> Edit
                </button>
                <button onClick={() => handleDelete(article.id)} className="list-action-btn delete-btn">
                  <DeleteIcon /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-articles-message">No articles found in this category. Add one!</p>
        )}
      </div>
    </div>
  );
};

export default ArticleListPage;