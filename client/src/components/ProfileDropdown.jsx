import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, User, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import Avatar from './ui/Avatar';
import { Button } from './ui/Button';

const ProfileDropdown = () => {
  const { user, login, logout } = useAuth();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = () => {
    login({ 
      email: "alex.thompson@example.com", 
      full_name: "Alex Thompson",
      avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
    });
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {user ? (
        <>
          {/* Logged in user profile button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 p-1 hover:bg-gray-50"
          >
            <Avatar 
              src={user.avatar_url}
              name={user.full_name}
              size="md"
              alt={user.full_name}
            />
            <ChevronDown className={`w-4 h-4 transition-transform text-gray-600 ${isOpen ? 'rotate-180' : ''}`} />
          </Button>

          {/* Dropdown menu for logged in user */}
          {isOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsOpen(false)}
              />
              <div className="absolute right-0 mt-2 z-50 w-64 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <Avatar 
                      src={user.avatar_url}
                      name={user.full_name}
                      size="lg"
                      alt={user.full_name}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">
                        {user.full_name}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {user.email}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-primary font-medium">
                          {user.total_points} {t("common.points")}
                        </span>
                        {user.badges && user.badges.length > 0 && (
                          <span className="text-xs text-gray-500">
                            • {user.badges.length} {t("common.badges")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-4 h-4 text-gray-500" />
                    {t("nav.profile")}
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-gray-500" />
                    {t("common.logout")}
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {/* Anonymous user login button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 p-1 hover:bg-gray-50"
          >
            <Avatar 
              size="md"
              fallbackIcon={User}
            />
            <ChevronDown className={`w-4 h-4 transition-transform text-gray-600 ${isOpen ? 'rotate-180' : ''}`} />
          </Button>

          {/* Dropdown menu for anonymous user */}
          {isOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsOpen(false)}
              />
              <div className="absolute right-0 mt-2 z-50 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <div className="p-2">
                  <button
                    onClick={handleLogin}
                    className="flex items-center gap-3 w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <LogIn className="w-4 h-4 text-gray-500" />
                    {t("common.login")}
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileDropdown;