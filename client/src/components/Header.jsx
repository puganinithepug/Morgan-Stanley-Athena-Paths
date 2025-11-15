import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Globe } from 'lucide-react';
import { Button } from './ui/Button';

export default function Header() {
  const { language, toggleLanguage, t } = useLanguage();
  const { user, login, logout } = useAuth();

  const handleLogin = () => {
    login({ email: 'demo@example.com', full_name: 'Demo User' });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background border-b border-secondary/2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/landing" className="flex items-center gap-3 group">
            <div className="relative flex-shrink-0">
              <svg 
                width="40" 
                height="40" 
                viewBox="0 0 40 40" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:scale-105 transition-transform duration-300"
              >
                <path 
                  d="M20 4L8 10V18C8 25.5 14 31.5 20 36C26 31.5 32 25.5 32 18V10L20 4Z" 
                  fill="url(#shieldGradient)" 
                  stroke="url(#shieldStroke)" 
                  strokeWidth="1.5"
                />
                <path 
                  d="M16 20L20 16L24 20M20 16V28" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <circle 
                  cx="20" 
                  cy="20" 
                  r="12" 
                  fill="none" 
                  stroke="url(#circleStroke)" 
                  strokeWidth="1" 
                  opacity="0.3"
                />
                <defs>
                  <linearGradient id="shieldGradient" x1="20" y1="4" x2="20" y2="36" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                  <linearGradient id="shieldStroke" x1="20" y1="4" x2="20" y2="36" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#4F46E5" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                  <linearGradient id="circleStroke" x1="20" y1="8" x2="20" y2="32" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#A78BFA" />
                    <stop offset="100%" stopColor="#C4B5FD" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div>
              <div className="font-bold text-xl bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                Shield of Athena
              </div>
              <div className="text-xs text-gray-600 font-medium">Athena Paths</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/landing" className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm">
              {t('nav.home')}
            </Link>
            <Link to="/services" className="text-foreground/80 hover:text-primarytransition-colors font-medium text-sm">
              {t('nav.services')}
            </Link>
            <Link to="/find-your-path" className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm">
              {t('nav.findPath')}
            </Link>
            <Link to="/leaderboard" className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm">
              {t('nav.leaderboard')}
            </Link>
            {user && (
              <Link to="/profile" className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm">
                {t('nav.profile')}
              </Link>
            )}
            <Link to="/support-wall" className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm">
              {t('nav.supportWall')}
            </Link>
          </nav>

                    <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-foreground/80 hover:text-primary"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase font-semibold">{language}</span>
            </Button>

            {user ? (
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="border-secondary/60 text-foreground/80 hover:border-primary hover:text-primary"
              >
                {t('common.logout')}
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handleLogin}
                className="bg-primary text-white hover:bg-primary/90 font-semibold"
              >
                {t('common.login')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

