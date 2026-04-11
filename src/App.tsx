import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/auth';
import { Toaster } from './components/ui/sonner';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import PostDetailPage from './pages/PostDetailPage';
import { useEffect } from 'react';
import { trackVisit } from './lib/cms';

export default function App() {
  useEffect(() => {
    trackVisit();
  }, []);

  return (
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
  );
}
