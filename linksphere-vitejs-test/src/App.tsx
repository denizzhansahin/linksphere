import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PersonalDashboard from './pages/PersonalDashboard';
import CorporateDashboard from './pages/CorporateDashboard';
import NotFoundPage from './pages/NotFoundPage';
import UserPersonalDashboard from './pages/UserPersonalDashboard';
import UserCorporateDashboard from './pages/UserCorporateDashboard';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<Layout><HomePage /></Layout>} />
            <Route path="/personal" element={<Layout><PersonalDashboard /></Layout>} />
            <Route path="/corporate" element={<Layout><CorporateDashboard /></Layout>} />
            <Route path="/p/:id" element={<Layout><UserPersonalDashboard /></Layout>} />
            <Route path="/c/:id" element={<Layout><UserCorporateDashboard /></Layout>} />
            <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
          </Routes>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;