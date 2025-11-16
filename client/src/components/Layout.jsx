import React, { useEffect } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import Header from './Header';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();

  // Always start new page at the top 
  useEffect(() => {
    window.scrollTo(0, 0); // jump to top
  }, [location.pathname]);

  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-indigo-50">
          <Header />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
}
