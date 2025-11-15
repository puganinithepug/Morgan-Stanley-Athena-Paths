import React from "react";
import { Link } from "react-router-dom";
import { Phone, MapPin, Heart } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer>
      <div className="bg-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src={"/logo.svg"}
                  alt="Shield of Athena"
                  className="w-7 h-7 flex-shrink-0 object-contain filter invert brightness-200"
                />
                <div>
                  <div className="font-bold text-lg">Shield of Athena</div>
                </div>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                {language === "fr"
                  ? "Offrant sécurité, guérison et espoir aux femmes et enfants fuyant la violence familiale depuis plus de 30 ans."
                  : "Providing safety, healing, and hope to women and children fleeing family violence for over 30 years."}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">
                {language === "fr" ? "Navigation" : "Quick Links"}
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/landing"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {language === "fr" ? "Accueil" : "Home"}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {language === "fr" ? "Nos Services" : "Our Services"}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/find-your-path"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {language === "fr"
                      ? "Trouvez Votre Parcours"
                      : "Find Your Path"}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/leaderboard"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {language === "fr"
                      ? "Impact Communautaire"
                      : "Community Impact"}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support-wall"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {language === "fr" ? "Mur d'Espoir" : "Hope Wall"}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Contact</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white mb-1">
                      {language === "fr"
                        ? "Ligne de Crise 24/7"
                        : "24/7 Crisis Line"}
                    </div>
                    <a
                      href="tel:514-274-8117"
                      className="text-white/80 hover:text-white"
                    >
                      514-274-8117
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                  <div className="text-white/80">
                    Montreal, Quebec
                    <br />
                    {language === "fr"
                      ? "Services multilingues"
                      : "Multilingual services"}
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-red-400">
                {language === "fr" ? "Besoin d'aide?" : "Need Help?"}
              </h3>
              <p className="text-white/80 text-sm mb-4">
                {language === "fr"
                  ? "Si vous êtes en danger, appelez notre ligne de crise immédiatement."
                  : "If you are in danger, call our crisis line immediately."}
              </p>
              <a
                href="tel:514-274-8117"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                <Phone className="w-4 h-4" />
                {language === "fr" ? "Appeler Maintenant" : "Call Now"}
              </a>
            </div>
          </div>

          <div className="border-t border-white/15 mt-8 pt-8 text-center text-sm text-gray-400">
            <p className="flex items-center justify-center gap-2 mb-2">
              {language === "fr" ? "Fait avec" : "Made with"}{" "}
              <Heart className="w-4 h-4 text-red-400" />{" "}
              {language === "fr"
                ? "pour Shield of Athena"
                : "for Shield of Athena"}
            </p>
            <p>
              &copy; {new Date().getFullYear()} Shield of Athena Family
              Services.{" "}
              {language === "fr"
                ? "Organisme de bienfaisance enregistré."
                : "Registered charity."}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
