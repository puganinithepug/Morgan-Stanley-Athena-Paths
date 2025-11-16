import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.services': 'Our Services',
    'nav.findPath': 'Find Your Path',
    'nav.leaderboard': 'Community Impact',
    'nav.profile': 'My Profile',
    'nav.supportWall': 'Hope Wall',
    'hero.title': 'Supporting Women and Children Affected by Family Violence',
    'hero.subtitle': 'The Shield of Athena is a non-profit organization offering culturally and linguistically adapted professional support, intervention, and prevention services to women victims of family violence and their children.',
    'hero.cta': 'Start your path',
    'paths.wisdom.name': 'Wisdom',
    'paths.wisdom.desc': 'Support first contact and crisis information—outreach, listening, and guidance for women taking their first step toward safety.',
    'paths.courage.name': 'Courage',
    'paths.courage.desc': 'Help survivors rebuild through counseling and long-term support for women and children healing from violence.',
    'paths.protection.name': 'Protection',
    'paths.protection.desc': 'Fund emergency shelter nights and safe housing so families can leave danger and sleep safely.',
    'paths.service.name': 'Service',
    'paths.service.desc': 'Keep every path alive by offering your time—taking shifts, helping at events, or supporting daily operations that protect women and children. Volunteers have no direct contacts with clients as they are in vulnerable state but the volunteers can help with Administrative, Office support, transportation, procuration of donations and at events.',
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
    'hero.title': 'Soutenir les Femmes et les Enfants Touchés par la Violence Familiale',
    'hero.subtitle': 'Le Bouclier d\'Athéna Services familiaux est un organisme communautaire sans but lucratif qui offre des services professionnels de soutien, d\'intervention et de prévention culturellement et linguistiquement adaptés aux besoins des femmes victimes de violence familiale et leurs enfants.',
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

