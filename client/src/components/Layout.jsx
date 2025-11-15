import React, { useEffect, useState } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import Header from './Header';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const [hideHeader, setHideHeader] = useState(false);
  const location = useLocation();

  // Hide / show header based on scroll direction
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScrollY && current > 80) {
        // scrolling down
        setHideHeader(true);
      } else {
        // scrolling up
        setHideHeader(false);
      }

      lastScrollY = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Always start new page at the top 
  useEffect(() => {
    window.scrollTo(0, 0); // jump to top
  }, [location.pathname]);

  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-indigo-50">
          <Header hide={hideHeader} />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
}
