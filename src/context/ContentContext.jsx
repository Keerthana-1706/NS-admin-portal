import React, { createContext, useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid'; // For unique IDs.

const ContentContext = createContext();

const getInitialData = () => {
  try {
    const savedData = localStorage.getItem('appContent');
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error("Could not parse localStorage data, using default.", error);
  }
  
  return {
    website: {
      domestic: {
        'sustainable-fashion': [
          {
            id: 'demo-1',
            // --- TYPO FIXED HERE ---
            headline: 'The Rise of Upcycled Denim', 
            description: 'Discover how old jeans are being transformed into new, high-fashion pieces.',
            mainImage: 'https://images.unsplash.com/photo-1593030103066-0424a66164a4?q=80&fm=jpg&crop=entropy',
            articleBody: '<p>Upcycling denim is not just a trend; it\'s a movement towards a more sustainable future in fashion. This article explores the innovative techniques and designers leading the charge.</p>',
            subImages: [],
          }
        ],
        'luxury-fashion': [],
        'fast-fashion': [],
        'sneaker-world': [],
      },
      international: {
        'sustainable-fashion': [],
        'luxury-fashion': [],
        'fast-fashion': [],
        'sneaker-world': [],
      },
    },
    mail: {
        'sustainable-fashion': [],
        'luxury-fashion': [],
        'fast-fashion': [],
        'sneaker-world': [],
    },
  };
};


export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(getInitialData);

  useEffect(() => {
    localStorage.setItem('appContent', JSON.stringify(content));
  }, [content]);

  // --- Functions ---
  const getArticles = (section, type, category) => {
    return content[section]?.[type]?.[category] || [];
  };

  const getArticleById = (section, type, category, articleId) => {
    return getArticles(section, type, category).find(article => article.id === articleId);
  };

  const addArticle = (section, type, category, articleData) => {
    const newArticle = { ...articleData, id: uuidv4() };
    setContent(prevContent => {
      const newContent = JSON.parse(JSON.stringify(prevContent));
      newContent[section][type][category].push(newArticle);
      return newContent;
    });
  };

  const updateArticle = (section, type, category, articleId, updatedData) => {
     setContent(prevContent => {
      const newContent = JSON.parse(JSON.stringify(prevContent));
      const articles = newContent[section][type][category];
      const articleIndex = articles.findIndex(article => article.id === articleId);
      if (articleIndex !== -1) {
        articles[articleIndex] = { ...articles[articleIndex], ...updatedData };
      }
      return newContent;
    });
  };

  // --- MODIFIED deleteArticle ---
  const deleteArticle = (section, type, category, articleId) => {
    setContent(prevContent => {
        const newContent = JSON.parse(JSON.stringify(prevContent));
        newContent[section][type][category] = newContent[section][type][category].filter(article => article.id !== articleId);
        return newContent;
    });
  };

  // --- Mail Functions ---
  const getMailArticles = (category) => {
    return content.mail?.[category] || [];
  }

  const getMailArticleById = (category, articleId) => {
    return getMailArticles(category).find(a => a.id === articleId);
  }

  const addMailArticle = (category, articleData) => {
    const newArticle = { ...articleData, id: uuidv4() };
     setContent(prevContent => {
      const newContent = JSON.parse(JSON.stringify(prevContent));
      newContent.mail[category].push(newArticle);
      return newContent;
    });
  }

  const updateMailArticle = (category, articleId, updatedData) => {
    setContent(prevContent => {
      const newContent = JSON.parse(JSON.stringify(prevContent));
      const articles = newContent.mail[category];
      const articleIndex = articles.findIndex(a => a.id === articleId);
      if(articleIndex !== -1) {
        articles[articleIndex] = { ...articles[articleIndex], ...updatedData };
      }
      return newContent;
    });
  }

  // --- MODIFIED deleteMailArticle ---
  const deleteMailArticle = (category, articleId) => {
    setContent(prevContent => {
      const newContent = JSON.parse(JSON.stringify(prevContent));
      newContent.mail[category] = newContent.mail[category].filter(a => a.id !== articleId);
      return newContent;
    });
  }

  const value = {
    getArticles, getArticleById, addArticle, updateArticle, deleteArticle,
    getMailArticles, getMailArticleById, addMailArticle, updateMailArticle, deleteMailArticle,
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);