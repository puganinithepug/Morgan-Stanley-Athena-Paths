import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { Globe } from "lucide-react";
import { Button } from "./ui/Button";

export default function Header() {
  const { language, toggleLanguage, t } = useLanguage();
  const { user, login, logout } = useAuth();

  const handleLogin = () => {
    login({ email: "demo@example.com", full_name: "Demo User" });
  };

  return (
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
  );
}
