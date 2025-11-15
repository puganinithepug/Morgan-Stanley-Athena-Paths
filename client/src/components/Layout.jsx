import React, { useEffect, useState } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  const [hideHeader, setHideHeader] = useState(false);

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
