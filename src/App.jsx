import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Context Providers
import { ContentProvider } from './context/ContentContext';
import { NotificationProvider } from './context/NotificationContext';

// Admin Components & Pages
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

// Website Pages
import WebsitePage from './pages/admin/WebsitePage';
import WebsiteManageHubPage from './pages/admin/WebsiteManageHubPage';
import ArticleListPage from './pages/admin/ArticleListPage';
import ContentFormPage from './pages/admin/ContentFormPage';
import ArticleViewPage from './pages/admin/ArticleViewPage';

// Mail Pages
import MailManageHubPage from './pages/admin/MailManageHubPage';
import MailArticleListPage from './pages/admin/MailArticleListPage';
import MailFormPage from './pages/admin/MailFormPage';
import MailViewPage from './pages/admin/MailViewPage';

// --- Global Styles ---
import './App.css';

function App() {
  return (
    <ContentProvider>
      <NotificationProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/login" replace />} />
          
          {/* --- Admin Routes --- */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          
          {/* === WEBSITE CONTENT FLOW === */}
          <Route path="/admin/website" element={<ProtectedRoute><WebsitePage /></ProtectedRoute>} />
          <Route path="/admin/website/:type" element={<ProtectedRoute><WebsiteManageHubPage /></ProtectedRoute>} />
          
          {/* THIS IS THE CORRECTED LINE */}
          <Route path="/admin/website/:type/:category" element={<ProtectedRoute><ArticleListPage /></ProtectedRoute>} />
          
          <Route path="/admin/website/:type/:category/add" element={<ProtectedRoute><ContentFormPage /></ProtectedRoute>} />
          <Route path="/admin/website/:type/:category/:articleId/edit" element={<ProtectedRoute><ContentFormPage /></ProtectedRoute>} />
          <Route path="/admin/website/:type/:category/:articleId/view" element={<ProtectedRoute><ArticleViewPage /></ProtectedRoute>} />

          {/* === MAIL CONTENT FLOW === */}
          <Route path="/admin/mail" element={<ProtectedRoute><MailManageHubPage /></ProtectedRoute>} />
          <Route path="/admin/mail/:category" element={<ProtectedRoute><MailArticleListPage /></ProtectedRoute>} />
          <Route path="/admin/mail/:category/add" element={<ProtectedRoute><MailFormPage /></ProtectedRoute>} />
          <Route path="/admin/mail/:category/:articleId/edit" element={<ProtectedRoute><MailFormPage /></ProtectedRoute>} />
          <Route path="/admin/mail/:category/:articleId/view" element={<ProtectedRoute><MailViewPage /></ProtectedRoute>} />

        </Routes>
      </NotificationProvider>
    </ContentProvider>
  );
}

export default App;