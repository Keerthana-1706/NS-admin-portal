import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import { useNotification } from '../../context/NotificationContext'; // <-- IMPORT THE HOOK
import BackButton from '../../components/BackButton';
import '../../styles/AdminPages.css';

const formatSlug = (slug) => slug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

const MailFormPage = () => {
  const { category, articleId } = useParams();
  const navigate = useNavigate();
  const { getMailArticleById, addMailArticle, updateMailArticle } = useContent();
  const { showNotification } = useNotification(); // <-- GET THE showNotification FUNCTION
  
  const [formData, setFormData] = useState({ imageUrl: '', headline: '', description: '' });
  
  const isEditMode = Boolean(articleId);

  useEffect(() => {
    if (isEditMode) {
      const article = getMailArticleById(category, articleId);
      if (article) {
        setFormData({
          imageUrl: article.imageUrl || '',
          headline: article.headline || '',
          description: article.description || '',
        });
      }
    } else {
        setFormData({ imageUrl: '', headline: '', description: '' });
    }
  }, [articleId, category, isEditMode, getMailArticleById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      updateMailArticle(category, articleId, formData);
      // --- Use the new notification system ---
      showNotification('Mail updated successfully!'); 
    } else {
      addMailArticle(category, formData);
      // --- Use the new notification system ---
      showNotification('Mail published successfully!');
    }
    // Navigate back to the list after showing the notification
    navigate(`/admin/mail/${category}`);
  };

  const pageTitle = `${isEditMode ? 'Edit' : 'Add'} Mail: ${formatSlug(category)}`;
  const submitButtonText = isEditMode ? 'Update' : 'Publish';

  return (
    <div className="admin-page-container">
      <BackButton />
      <div className="content-form-container">
        <h1 className="admin-page-header">{pageTitle}</h1>
        <form onSubmit={handleSubmit} className="content-form">
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL</label>
            <input type="text" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/main-image.jpg" required />
          </div>
          <div className="form-group">
            <label htmlFor="headline">Headline</label>
            <input type="text" id="headline" name="headline" value={formData.headline} placeholder="Enter the main headline" required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description (3-4 lines max)</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Enter a brief summary..." required rows="4" />
          </div>
          <div className="form-actions">
            <button type="submit" className="save-button">{submitButtonText}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MailFormPage;