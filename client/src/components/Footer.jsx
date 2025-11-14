import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer>
      <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg 
                  width="28" 
                  height="28" 
                  viewBox="0 0 40 40" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path 
                    d="M20 4L8 10V18C8 25.5 14 31.5 20 36C26 31.5 32 25.5 32 18V10L20 4Z" 
                    fill="url(#footerShieldGradient)" 
                    stroke="url(#footerShieldStroke)" 
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
                    stroke="url(#footerCircleStroke)" 
                    strokeWidth="1" 
                    opacity="0.3"
                  />
                  <defs>
                    <linearGradient id="footerShieldGradient" x1="20" y1="4" x2="20" y2="36" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                    <linearGradient id="footerShieldStroke" x1="20" y1="4" x2="20" y2="36" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#818CF8" />
                      <stop offset="100%" stopColor="#A78BFA" />
                    </linearGradient>
                    <linearGradient id="footerCircleStroke" x1="20" y1="8" x2="20" y2="32" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#A78BFA" />
                      <stop offset="100%" stopColor="#C4B5FD" />
                    </linearGradient>
                  </defs>
                </svg>
                <div>
                  <div className="font-bold text-lg">Shield of Athena</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {language === 'fr'
                  ? 'Offrant sécurité, guérison et espoir aux femmes et enfants fuyant la violence familiale depuis plus de 40 ans.'
                  : 'Providing safety, healing, and hope to women and children fleeing family violence for over 40 years.'}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">
                {language === 'fr' ? 'Navigation' : 'Quick Links'}
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/landing" className="text-gray-300 hover:text-white transition-colors">
                    {language === 'fr' ? 'Accueil' : 'Home'}
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                    {language === 'fr' ? 'Nos Services' : 'Our Services'}
                  </Link>
                </li>
                <li>
                  <Link to="/find-your-path" className="text-gray-300 hover:text-white transition-colors">
                    {language === 'fr' ? 'Trouvez Votre Parcours' : 'Find Your Path'}
                  </Link>
                </li>
                <li>
                  <Link to="/leaderboard" className="text-gray-300 hover:text-white transition-colors">
                    {language === 'fr' ? 'Impact Communautaire' : 'Community Impact'}
                  </Link>
                </li>
                <li>
                  <Link to="/support-wall" className="text-gray-300 hover:text-white transition-colors">
                    {language === 'fr' ? 'Mur d\'Espoir' : 'Hope Wall'}
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
                      {language === 'fr' ? 'Ligne de Crise 24/7' : '24/7 Crisis Line'}
                    </div>
                    <a href="tel:514-274-8117" className="text-gray-300 hover:text-white">
                      514-274-8117
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                  <div className="text-gray-300">
                    Montreal, Quebec<br />
                    {language === 'fr' ? 'Services multilingues' : 'Multilingual services'}
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-red-400">
                {language === 'fr' ? 'Besoin d\'aide?' : 'Need Help?'}
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                {language === 'fr'
                  ? 'Si vous êtes en danger, appelez notre ligne de crise immédiatement.'
                  : 'If you are in danger, call our crisis line immediately.'}
              </p>
              <a 
                href="tel:514-274-8117"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                <Phone className="w-4 h-4" />
                {language === 'fr' ? 'Appeler Maintenant' : 'Call Now'}
              </a>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p className="flex items-center justify-center gap-2 mb-2">
              {language === 'fr' ? 'Fait avec' : 'Made with'} <Heart className="w-4 h-4 text-red-400" /> {language === 'fr' ? 'pour Shield of Athena' : 'for Shield of Athena'}
            </p>
            <p>&copy; {new Date().getFullYear()} Shield of Athena Family Services. {language === 'fr' ? 'Organisme de bienfaisance enregistré.' : 'Registered charity.'}</p>
          </div>
        </div>
      </div>

    </footer>
  );
}

