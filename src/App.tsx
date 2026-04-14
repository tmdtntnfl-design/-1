import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/auth';
import { Toaster } from './components/ui/sonner';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import PostDetailPage from './pages/PostDetailPage';
import { trackVisit } from './lib/cms';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  useEffect(() => {
    trackVisit();
  }, []);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:id" element={<PostDetailPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
          </Routes>
        </Router>
        <Toaster position="top-center" />
      </AuthProvider>
    </ErrorBoundary>
  );
}
