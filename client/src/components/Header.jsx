import React, { useRef, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { Globe, ChevronDown, AlertTriangle, Heart } from "lucide-react";
import { Button } from "./ui/Button";
import GoogleTranslate from "./GoogleTranslate";
import ProfileDropdown from "./ProfileDropdown";

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
  const { t, language } = useLanguage();
  const translateRef = useRef(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const cookie = document.cookie.split(';').find(c => c.trim().startsWith('googtrans='));
    if (cookie) {
      const langCode = cookie.split('=')[1].split('/')[2];
      if (langCode) {
        setSelectedLanguage(langCode);
      }
    }
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      // hide header when scrolling down
      if (currentY > lastY && currentY > 50) {
        setHidden(true);
      } else {
        // show header when scrolling up
        setHidden(false);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    setIsLanguageDropdownOpen(false);
    
    if (translateRef.current) {
      translateRef.current.changeLanguage(langCode);
    } else {
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 shadow-sm bg-background border-b border-secondary/2 
                    transition-transform duration-300 ${hidden ? "-translate-y-20" : "translate-y-0"}`}
      >
      <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
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

          <nav className="hidden md:flex items-center gap-4">
            <Link
              to="/are-you-a-victim"
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-lg font-bold text-sm hover:from-red-700 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
            >
              <AlertTriangle className="w-4 h-4" />
              {language === 'fr' ? 'Êtes-vous une victime?' : 'Are you a victim?'}
            </Link>
            <Link
              to="/donate"
              className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg font-bold text-sm hover:from-primary-dark hover:to-secondary-dark transition-all shadow-md hover:shadow-lg"
            >
              <Heart className="w-4 h-4" />
              {language === 'fr' ? 'Faire un Don' : 'Donate'}
            </Link>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : ""}`
              }
            >
              {t("nav.services")}
            </NavLink>

            <NavLink
              to="/find-your-path"
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : ""}`
              }
            >
              {t("nav.findPath")}
            </NavLink>

            <NavLink
              to="/leaderboard"
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : ""}`
              }
            >
              {t("nav.leaderboard")}
            </NavLink>

            <NavLink
              to="/support-wall"
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : ""}`
              }
            >
              {t("nav.supportWall")}
            </NavLink>
            <Link
              to="/news"
              className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm"
            >
              News
            </Link>
            <Link
              to="/contact"
              className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm"
            >
              {language === 'fr' ? 'Contact' : 'Contact'}
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

            {/* Profile Dropdown */}
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
    </>
  );
}
