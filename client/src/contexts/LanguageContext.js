import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.services': 'Our Services',
    'nav.findPath': 'Find Your Path',
    'nav.leaderboard': 'Community Impact',
    'nav.profile': 'My Profile',
    'nav.supportWall': 'Hope Wall',
    'hero.title': 'Help women and children find safety, healing, and hope.',
    'hero.subtitle': 'Athena Paths transforms donating into a guided journey—Wisdom, Courage, and Protection—that mirrors the real stages of a survivor\'s healing.',
    'hero.cta': 'Start your path',
    'paths.wisdom.name': 'Wisdom',
    'paths.wisdom.desc': 'Support first contact and crisis information—outreach, listening, and guidance for women taking their first step toward safety.',
    'paths.courage.name': 'Courage',
    'paths.courage.desc': 'Help survivors rebuild through counseling and long-term support for women and children healing from violence.',
    'paths.protection.name': 'Protection',
    'paths.protection.desc': 'Fund emergency shelter nights and safe housing so families can leave danger and sleep safely.',
    'paths.service.name': 'Service',
    'paths.service.desc': 'Keep every path alive by offering your time—taking shifts, helping at events, or supporting daily operations that protect women and children.',
    'common.login': 'Log In',
    'common.logout': 'Log Out',
    'common.loading': 'Loading...',
    'common.close': 'Close'
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.services': 'Nos Services',
    'nav.findPath': 'Trouvez Votre Parcours',
    'nav.leaderboard': 'Impact Communautaire',
    'nav.profile': 'Mon Profil',
    'nav.supportWall': 'Mur d\'Espoir',
    'hero.title': 'Aidez les femmes et les enfants à trouver la sécurité, la guérison et l\'espoir.',
    'hero.subtitle': 'Athena Paths transforme les dons en un parcours guidé—Sagesse, Courage et Protection—qui reflète les vraies étapes de guérison d\'une survivante.',
    'hero.cta': 'Commencez votre parcours',
    'paths.wisdom.name': 'Sagesse',
    'paths.wisdom.desc': 'Soutenir le premier contact et l\'information de crise—sensibilisation, écoute et accompagnement pour les femmes qui font leur premier pas vers la sécurité.',
    'paths.courage.name': 'Courage',
    'paths.courage.desc': 'Aider les survivantes à se reconstruire grâce au counseling et au soutien à long terme pour les femmes et les enfants guérissant de la violence.',
    'paths.protection.name': 'Protection',
    'paths.protection.desc': 'Financer des nuits d\'hébergement d\'urgence et un logement sûr pour que les familles puissent quitter le danger et dormir en toute sécurité.',
    'paths.service.name': 'Service',
    'paths.service.desc': 'Soutenez chaque parcours en offrant votre temps — en prenant des quarts, en aidant lors d’événements ou en appuyant les opérations quotidiennes qui protègent les femmes et les enfants.',
    'common.login': 'Se connecter',
    'common.logout': 'Se déconnecter',
    'common.loading': 'Chargement...',
    'common.close': 'Fermer'
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const t = (key, replacements = {}) => {
    let text = translations[language][key] || key;
    Object.keys(replacements).forEach(placeholder => {
      text = text.replace(`{${placeholder}}`, replacements[placeholder]);
    });
    return text;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

