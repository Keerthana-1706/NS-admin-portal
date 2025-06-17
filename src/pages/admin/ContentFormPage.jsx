import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import { useNotification } from '../../context/NotificationContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import BackButton from '../../components/BackButton';
import '../../styles/AdminPages.css';

const formatSlug = (slug) => slug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

const ContentFormPage = () => {
  const { type, category, articleId } = useParams();
  const navigate = useNavigate();
  const { getArticleById, addArticle, updateArticle } = useContent();
  const { showNotification } = useNotification();

  // Form states
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [subImages, setSubImages] = useState(['']);
  const [articleBody, setArticleBody] = useState('');
  
  // --- NEW: State for URL warning ---
  const [urlWarning, setUrlWarning] = useState('');

  const isEditMode = Boolean(articleId);

  useEffect(() => {
    if (isEditMode) {
      const article = getArticleById('website', type, category, articleId);
      if (article) {
        setHeadline(article.headline || '');
        setDescription(article.description || '');
        setMainImage(article.mainImage || '');
        setArticleBody(article.articleBody || '');
        setSubImages(article.subImages?.length > 0 ? article.subImages : ['']);
      }
    } else {
        setHeadline(''); setDescription(''); setMainImage(''); setArticleBody(''); setSubImages(['']);
    }
  }, [articleId, type, category, isEditMode, getArticleById]);
  
  const handleMainImageChange = (e) => {
    const newUrl = e.target.value;
    setMainImage(newUrl);

    // --- NEW: Check for bad Google URL format ---
    if (newUrl.startsWith('https://www.google.com/imgres?')) {
      setUrlWarning('This looks like a search page URL. Right-click the image and "Copy Image Address" instead.');
    } else {
      setUrlWarning(''); // Clear warning if format is ok
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (urlWarning) {
      alert("Please fix the invalid image URL before publishing.");
      return;
    }
    // ... rest of the submit logic
    const finalSubImages = subImages.filter(img => img.trim() !== '');
    const articleData = { headline, description, mainImage, subImages: finalSubImages, articleBody };

    if (isEditMode) {
      updateArticle('website', type, category, articleId, articleData);
      showNotification('Article updated successfully!');
    } else {
      addArticle('website', type, category, articleData);
      showNotification('Article published successfully!');
    }
    navigate(`/admin/website/${type}/${category}`);
  };

  const handleAddSubImage = () => setSubImages([...subImages, '']);
  const handleSubImageChange = (index, value) => { const u = [...subImages]; u[index] = value; setSubImages(u); };
  const handleRemoveSubImage = (index) => setSubImages(subImages.filter((_, i) => i !== index));

  const pageTitle = `${isEditMode ? 'Edit' : 'Add'} Content: ${formatSlug(type)} - ${formatSlug(category)}`;
  const submitButtonText = isEditMode ? 'Update' : 'Publish';

  return (
    <div className="admin-page-container">
      <BackButton />
      <div className="content-form-container">
        <h1 className="admin-page-header">{pageTitle}</h1>
        <form onSubmit={handleSubmit} className="content-form">
          
          <div className="article-header-layout">
            <div className="main-image-uploader">
              {mainImage && <img src={mainImage} alt="Main article preview" />}
              {!mainImage && <p>Image preview will appear here</p>}
            </div>
            <div className="header-content">
              <div className="form-group">
                <label htmlFor="mainImage">Main Image URL</label>
                <input 
                  type="text" 
                  id="mainImage" 
                  value={mainImage} 
                  onChange={handleMainImageChange} // <-- Use the new handler
                  placeholder="https://example.com/image.jpg" 
                  required 
                />
                {/* --- NEW: Display the warning message --- */}
                {urlWarning && <p className="url-warning-text">{urlWarning}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="headline">Headline</label>
                <input type="text" id="headline" value={headline} onChange={e => setHeadline(e.target.value)} placeholder="Enter the main headline..." required />
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description (3-4 lines max)</label>
            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Enter a brief summary..." required />
          </div>

          <div className="form-group">
            <label>The Full Article Body Content</label>
            <ReactQuill theme="snow" value={articleBody} onChange={setArticleBody} placeholder="Start writing the full article here..." />
          </div>

          <div className="sub-image-section form-group">
            <label>Optional Images Within Article Body</label>
            <div className="sub-image-list">
              {subImages.map((imgUrl, index) => (
                <div key={index} className="sub-image-item">
                  <input type="text" value={imgUrl} onChange={(e) => handleSubImageChange(index, e.target.value)} placeholder={`https://example.com/sub-image-${index + 1}.jpg`} />
                  <button type="button" onClick={() => handleRemoveSubImage(index)} className="remove-sub-image-btn">Delete</button>
                </div>
              ))}
            </div>
            <button type="button" onClick={handleAddSubImage} className="add-more-btn" style={{ marginTop: '1rem' }}>
              Add More Image URLs
            </button>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="save-button">{submitButtonText}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContentFormPage;