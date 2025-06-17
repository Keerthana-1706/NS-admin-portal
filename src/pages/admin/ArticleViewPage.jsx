import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import BackButton from '../../components/BackButton';
import '../../styles/AdminPages.css';

const ArticleViewPage = () => {
  const { type, category, articleId } = useParams();
  const { getArticleById } = useContent();

  const article = getArticleById('website', type, category, articleId);

  // Handle case where article isn't found
  if (!article) {
    return (
      <div className="admin-page-container">
        <BackButton />
        <h1 className="admin-page-header">Article Not Found</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)' }}>
          The article you are looking for does not exist. It may have been deleted.
        </p>
        <Link to={`/admin/website/${type}/${category}`} className="selector-btn">
          Back to Article List
        </Link>
      </div>
    );
  }

  return (
    <div className="admin-page-container">
      {/* This BackButton now takes you back to the list */}
      <BackButton to={`/admin/website/${type}/${category}`} />

      <article className="article-view-container">
        {article.mainImage && (
          <img src={article.mainImage} alt={article.headline} className="article-view-image" />
        )}
        
        <h1 className="article-view-headline">{article.headline}</h1>
        
        <p className="article-view-description">{article.description}</p>
        
        <div 
          className="article-view-body"
          // This is essential for rendering the HTML from the rich text editor
          dangerouslySetInnerHTML={{ __html: article.articleBody }}
        />

        {article.subImages && article.subImages.length > 0 && (
          <div className="article-sub-images">
            <h2>Related Images</h2>
            {article.subImages.map((img, index) => (
              <img key={index} src={img} alt={`Sub-image ${index + 1}`} />
            ))}
          </div>
        )}
      </article>
    </div>
  );
};

export default ArticleViewPage;