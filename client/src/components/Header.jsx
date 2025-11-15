import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { Globe, ChevronDown } from "lucide-react";
import { Button } from "./ui/Button";
import GoogleTranslate from "./GoogleTranslate";

// Language options with Google Translate language codes
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'hu', name: 'Magyar', flag: '🇭🇺' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
  { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
];

export default function Header() {
  const { t } = useLanguage();
  const { user, login, logout } = useAuth();
  const translateRef = useRef(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  // Get current language from cookie or default to English
  useEffect(() => {
    const cookie = document.cookie.split(';').find(c => c.trim().startsWith('googtrans='));
    if (cookie) {
      const langCode = cookie.split('=')[1].split('/')[2];
      if (langCode) {
        setSelectedLanguage(langCode);
      }
    }
  }, []);

  const handleLogin = () => {
    login({ email: "demo@example.com", full_name: "Demo User" });
  };

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    setIsLanguageDropdownOpen(false);
    
    // Use Google Translate to translate the page
    if (translateRef.current) {
      translateRef.current.changeLanguage(langCode);
    } else {
      // Fallback: set cookie and reload if translate not ready
      document.cookie = `googtrans=/en/${langCode};path=/;max-age=31536000`;
      setTimeout(() => {
        if (translateRef.current?.isLoaded()) {
          translateRef.current.changeLanguage(langCode);
        } else {
          window.location.reload();
        }
      }, 500);
    }
  };

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  return (
    <>
      {/* Hidden Google Translate component */}
      <div style={{ display: 'none' }}>
        <GoogleTranslate ref={translateRef} />
      </div>
      
      <header className="sticky top-0 z-50 shadow-sm bg-background border-b border-secondary/2">
        {/* bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
          <Link to="/landing" className="flex items-center gap-3 group">
            <div className="relative flex-shrink-0">
              <img
                src="/logo.svg"
                alt="Shield of Athena"
                className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <div className="font-bold text-xl bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                Shield of Athena
              </div>
              <div className="text-xs text-gray-600 font-medium">
                Athena Paths
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/landing"
              className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm"
            >
              {t("nav.home")}
            </Link>
            <Link
              to="/services"
              className="text-foreground/80 hover:text-primarytransition-colors font-medium text-sm"
            >
              {t("nav.services")}
            </Link>
            <Link
              to="/find-your-path"
              className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm"
            >
              {t("nav.findPath")}
            </Link>
            <Link
              to="/leaderboard"
              className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm"
            >
              {t("nav.leaderboard")}
            </Link>
            {user && (
              <Link
                to="/profile"
                className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm"
              >
                {t("nav.profile")}
              </Link>
            )}
            <Link
              to="/support-wall"
              className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm"
            >
              {t("nav.supportWall")}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* Language Selector with Google Translate */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center gap-2 text-foreground/80 hover:text-primary min-w-[120px] justify-between"
                title="Select language"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span className="text-lg">{currentLanguage.flag}</span>
                  <span className="hidden sm:inline text-sm font-medium">{currentLanguage.name}</span>
                  <span className="sm:hidden text-xs font-medium uppercase">{currentLanguage.code}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
              </Button>
              
              {isLanguageDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsLanguageDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 z-50 w-56 max-h-80 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="p-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors ${
                            selectedLanguage === lang.code ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'
                          }`}
                        >
                          <span className="text-xl">{lang.flag}</span>
                          <span className="flex-1 text-left">{lang.name}</span>
                          {selectedLanguage === lang.code && (
                            <span className="text-indigo-600">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {user ? (
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="border-secondary/60 text-foreground/80 hover:border-primary hover:text-primary"
              >
                {t("common.logout")}
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handleLogin}
                className="bg-primary text-white hover:bg-primary/90 font-semibold"
              >
                {t("common.login")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
    </>
  );
}
