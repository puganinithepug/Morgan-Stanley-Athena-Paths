import React, { useMemo } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Progress } from './ui/Progress';
import { motion } from 'framer-motion';
import { Users, Phone, Heart, Home, HandHeart, UtensilsCrossed, Moon, BookOpen, Shield, CheckCircle2, TrendingUp, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import dataService from '../services/dataService';

// Real human stories for each impact item
const impactStories = {
  '1': {
    en: "Last month, 312 women called our line in moments of fear. Your $50 keeps the phone answered for someone who has no one else.",
    fr: "Le mois dernier, 312 femmes ont appelé notre ligne dans des moments de peur. Vos 50 $ maintiennent le téléphone ouvert pour quelqu'un qui n'a personne d'autre."
  },
  '2': {
    en: "Helps one woman understand her rights and options when she feels trapped. Every package opens a door to safety.",
    fr: "Aide une femme à comprendre ses droits et ses options quand elle se sent piégée. Chaque trousse ouvre une porte vers la sécurité."
  },
  '3': {
    en: "One hour of professional support can change everything. Your $100 gives someone the strength to take the first step toward freedom.",
    fr: "Une heure de soutien professionnel peut tout changer. Vos 100 $ donnent à quelqu'un la force de faire le premier pas vers la liberté."
  },
  '4': {
    en: "Children who witness violence need specialized care. Your $75 helps a child process trauma and begin to heal.",
    fr: "Les enfants qui témoignent de violence ont besoin de soins spécialisés. Vos 75 $ aident un enfant à traiter le traumatisme et à commencer à guérir."
  },
  '5': {
    en: "Maria and her two daughters slept safely last night because someone donated one night of shelter. Tonight, another family needs that same safety.",
    fr: "Maria et ses deux filles ont dormi en sécurité la nuit dernière parce que quelqu'un a fait don d'une nuit d'hébergement. Ce soir, une autre famille a besoin de cette même sécurité."
  },
  '6': {
    en: "Essential supplies for a family starting over: documents, toiletries, clothes. Your $50 helps them take the first step with dignity.",
    fr: "Fournitures essentielles pour une famille qui recommence : documents, articles de toilette, vêtements. Vos 50 $ les aident à faire le premier pas avec dignité."
  }
};

// Impact in plain language
const impactLanguage = {
  '1': {
    en: "Your $50 keeps our crisis line open for 18 callers this week.",
    fr: "Vos 50 $ maintiennent notre ligne de crise ouverte pour 18 appelantes cette semaine."
  },
  '2': {
    en: "Helps one woman understand her rights and options.",
    fr: "Aide une femme à comprendre ses droits et ses options."
  },
  '3': {
    en: "Provides one hour of professional counseling that can change a life.",
    fr: "Fournit une heure de counseling professionnel qui peut changer une vie."
  },
  '4': {
    en: "Supports one week of healing programs for a child affected by violence.",
    fr: "Soutient une semaine de programmes de guérison pour un enfant touché par la violence."
  },
  '5': {
    en: "Provides one night of safe shelter for a woman and her children.",
    fr: "Fournit une nuit d'hébergement sécuritaire pour une femme et ses enfants."
  },
  '6': {
    en: "Gives one family the essential supplies they need to start over safely.",
    fr: "Donne à une famille les fournitures essentielles dont elle a besoin pour recommencer en sécurité."
  }
};

// Empathetic button text based on path
const empatheticButtons = {
  WISDOM: {
    en: "Answer the Call",
    fr: "Répondre à l'Appel"
  },
  COURAGE: {
    en: "Give Hope",
    fr: "Donner l'Espoir"
  },
  PROTECTION: {
    en: "Provide Safety",
    fr: "Offrir la Sécurité"
  },
  SERVICE: {
    en: "Support a Family",
    fr: "Soutenir une Famille"
  }
};

export default function CommunityGoals({ onDonate }) {
  const { language } = useLanguage();
  const impactItems = dataService.getImpactItems();
  
  // Calculate total community goal with purpose
  const communityTotal = useMemo(() => {
    const totalRaised = impactItems.reduce((sum, item) => {
      const itemIdNum = parseInt(item.id) || 1;
      const estimatedContributions = (itemIdNum * 15) + 20;
      return sum + (item.suggested_amount * estimatedContributions);
    }, 0);
    
    const communityGoal = 100000;
    const nightsNeeded = 1000; // 1,000 nights of shelter
    const nightsProvided = Math.floor(totalRaised / 100); // Every $100 = 1 night
    
    return {
      raised: totalRaised,
      goal: communityGoal,
      progress: Math.min((totalRaised / communityGoal) * 100, 100),
      nightsNeeded,
      nightsProvided
    };
  }, [impactItems]);

  // Simulate recent donations for social proof
  const recentDonations = useMemo(() => {
    const names = language === 'fr' 
      ? ['Sophie de Montréal', 'Marc de Laval', 'Julie de Québec', 'Ahmed de Montréal']
      : ['Melissa from Montreal', 'David from Laval', 'Sarah from Quebec', 'Ahmed from Montreal'];
    return names.slice(0, 3);
  }, [language]);

  const pathIcons = {
    WISDOM: Phone,
    COURAGE: Heart,
    PROTECTION: Home,
    SERVICE: HandHeart,
  };

  const itemIcons = {
    'meal': UtensilsCrossed,
    'night': Moon,
    'session': Heart,
    'package': BookOpen,
    'week': Shield,
    'program_week': Users,
    'kit': Shield,
  };

  const pathColors = {
    WISDOM: {
      bg: 'from-highlight to-primary',
      text: 'text-highlight',
      button: 'bg-highlight hover:bg-highlight/90',
    },
    COURAGE: {
      bg: 'from-rose-500 to-primary',
      text: 'text-rose-500',
      button: 'bg-rose-500 hover:bg-rose-600',
    },
    PROTECTION: {
      bg: 'from-secondary to-primary-light',
      text: 'text-secondary',
      button: 'bg-secondary hover:bg-secondary/90',
    },
    SERVICE: {
      bg: 'from-teal-500 to-teal-400',
      text: 'text-teal-500',
      button: 'bg-teal-500 hover:bg-teal-600',
    },
  };

  const displayItems = impactItems.slice(0, 6);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Emotional Header Section */}
        {/* Spacing: 64px bottom margin for section separation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          {/* Badge: 24px bottom margin */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-primary/15 px-4 py-2 rounded-full mb-6"
          >
            <Heart className="w-5 h-5 text-primary-dark" />
            <span className="text-primary-dark font-semibold">
              {language === 'fr' ? 'Faire une Différence Réelle' : 'Make a Real Difference'}
            </span>
          </motion.div>
          
          {/* Main Heading: 24px bottom margin, 16px top padding for breathing room */}
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 pt-4 leading-tight">
            {language === 'fr' 
              ? 'Chaque dollar que vous donnez devient sécurité, espoir et nouveau départ'
              : 'Every dollar you give becomes safety, hope, and a new beginning'}
          </h2>
          
          {/* Subtitle: 32px bottom margin to create space before goal card */}
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed mb-8">
            {language === 'fr'
              ? 'Pour une femme qui fuit la violence, votre don n\'est pas juste un chiffre. C\'est une nuit de sécurité, un appel d\'urgence répondu, une famille qui recommence.'
              : 'For a woman escaping violence, your donation isn\'t just a number. It\'s a night of safety, an emergency call answered, a family starting over.'}
          </p>
        </motion.div>

        {/* Total Community Goal with Purpose */}
        {/* Spacing: 48px bottom margin for balanced section separation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="mb-12"
        >
          <Card className="max-w-4xl mx-auto border-2 border-primary/20 shadow-xl">
            {/* Card padding: 32px (p-8) for consistent internal spacing */}
            <CardContent className="p-8">
              {/* Header section: 24px bottom margin */}
              <div className="text-center mb-6 mt-6">
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  {language === 'fr' 
                    ? `Chaque 100 $ fournit 1 nuit d'hébergement sécuritaire. Nous avons besoin de ${communityTotal.nightsNeeded} nuits pour protéger les familles cet hiver.`
                    : `Every $100 provides 1 night of safe shelter. We need ${communityTotal.nightsNeeded} nights to protect families this winter.`}
                </h3>
                {/* Subtitle: 16px top margin for consistent spacing */}
                <p className="text-lg text-foreground/70 mt-4">
                  {language === 'fr'
                    ? `Nous avons déjà fourni ${communityTotal.nightsProvided} nuits de sécurité.`
                    : `We've already provided ${communityTotal.nightsProvided} nights of safety.`}
                </p>
              </div>
              
              {/* Progress section: 16px vertical spacing (space-y-4) */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-4xl font-bold text-foreground">
                    ${communityTotal.raised.toLocaleString()}
                  </span>
                  <span className="text-lg text-foreground/60">
                    of ${communityTotal.goal.toLocaleString()}
                  </span>
                </div>
                
                <Progress value={communityTotal.progress} className="h-4" />
                
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-primary text-lg">
                    {Math.round(communityTotal.progress)}% {language === 'fr' ? 'financé' : 'funded'}
                  </span>
                  <div className="flex items-center gap-2 text-foreground/70">
                    <Users className="w-4 h-4" />
                    <span>{Math.floor(communityTotal.raised / 50)} {language === 'fr' ? 'contributeurs' : 'supporters'}</span>
                  </div>
                </div>
              </div>

              {/* Before/After Transformation */}
              {/* Spacing: 24px top margin, 24px top padding for border separation */}
              <div className="mt-6 pt-6 border-t border-primary/20">
                <div className="flex items-center gap-2 text-sm text-foreground/70">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span>
                    {language === 'fr'
                      ? 'L\'année dernière, vos dons ont aidé 1 229 femmes et enfants à reconstruire leur vie. Cette année, nous visons encore plus haut.'
                      : 'Last year, your donations helped 1,229 women and children rebuild their lives. This year, we aim even higher.'}
                  </span>
                </div>
              </div>

              {/* Transparency Elements */}
              {/* Spacing: 24px top margin, 24px top padding for border separation */}
              <div className="mt-6 pt-6 border-t border-primary/10 flex flex-wrap justify-center gap-6 text-xs text-foreground/60">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  <span>91% {language === 'fr' ? 'de chaque don va directement aux programmes' : 'of each donation goes directly to programs'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  <span>{language === 'fr' ? 'Audité annuellement' : 'Audited annually'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  <span>{language === 'fr' ? 'Organisme de bienfaisance enregistré' : 'Registered charity'} #138823471RR0001</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Donor Social Proof */}
        {/* Spacing: 48px bottom margin for balanced section separation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          className="mb-12"
        >
          {/* Container padding: 24px (p-6) for consistent spacing */}
          <div className="max-w-4xl mx-auto bg-primary/5 rounded-lg p-6 border border-primary/20">
            {/* First row: 16px gap between items */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-foreground/80">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-semibold">{language === 'fr' ? '12 dons aujourd\'hui' : '12 donations today'}</span>
              </div>
              <span className="text-foreground/40">•</span>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>{language === 'fr' ? 'Rejoignez 572 supporters' : 'Join 572 supporters'} {language === 'fr' ? 'aidant les familles' : 'helping families'} {language === 'fr' ? 'à recommencer en sécurité' : 'restart safely'}</span>
              </div>
            </div>
            {/* Second row: 16px top margin, 12px gap between items */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-foreground/60">
              {recentDonations.map((name, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-primary">⭐</span>
                  <span>{name} {language === 'fr' ? 'a fait un don' : 'donated'} {idx === 0 ? (language === 'fr' ? 'il y a 2 heures' : '2 hours ago') : idx === 1 ? (language === 'fr' ? 'il y a 5 heures' : '5 hours ago') : (language === 'fr' ? 'hier' : 'yesterday')}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Individual Donation Items with Stories */}
        {/* Spacing: 64px top margin for section separation, no bottom margin (last section) */}
        <div className="mt-16">
          {/* Section title: 32px bottom margin */}
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            {language === 'fr' ? 'Choisissez Votre Impact' : 'Choose Your Impact'}
          </h3>
          
          {/* Grid: 24px gap between cards, responsive columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayItems.map((item, idx) => {
              const PathIcon = pathIcons[item.path];
              const colors = pathColors[item.path];
              const ItemIcon = itemIcons[item.impact_unit] || PathIcon;
              const title = language === 'fr' ? (item.title_fr || item.title_en) : item.title_en;
              const description = language === 'fr' ? (item.description_fr || item.description_en) : item.description_en;
              const story = impactStories[item.id] || { en: description, fr: description };
              const impact = impactLanguage[item.id] || { en: description, fr: description };
              const buttonText = empatheticButtons[item.path] || { en: 'Give', fr: 'Donner' };

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="h-full flex"
                >
                  {/* Card: Full height with flex, consistent padding */}
                  <Card className="h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-primary/10 bg-white w-full">
                    {/* Card padding: 24px (p-6) for consistent internal spacing */}
                    <CardContent className="p-6 flex flex-col flex-1">
                      {/* Header section: 16px bottom margin */}
                      <div className="flex items-start gap-3 mb-4 mt-4">
                        {/* Icon: 12px padding (p-3) */}
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${colors.bg} text-white flex-shrink-0 shadow-md`}>
                          <ItemIcon className="w-6 h-6" />
                        </div>
                        {/* Text content: flex-1 for equal distribution */}
                        <div className="flex-1 min-w-0">
                          {/* Title: 8px bottom margin */}
                          <h4 className="font-bold text-foreground mb-2 leading-tight text-lg">
                            {title}
                          </h4>
                          {/* Impact description: 12px bottom margin */}
                          <p className="text-sm text-foreground/70 leading-relaxed mb-3">
                            {language === 'fr' ? impact.fr : impact.en}
                          </p>
                        </div>
                      </div>
                      
                      {/* Real Human Story */}
                      {/* Spacing: 16px bottom margin, 12px padding (p-3) */}
                      <div className="mb-4 p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                        <p className="text-sm text-foreground/80 italic leading-relaxed">
                          "{language === 'fr' ? story.fr : story.en}"
                        </p>
                      </div>
                      
                      {/* Footer: Auto margin-top pushes to bottom, 16px top padding, 16px top border */}
                      <div className="flex items-center justify-between pt-4 mt-auto border-t border-primary/10">
                        <div>
                          <span className="text-3xl font-bold text-foreground">
                            ${item.suggested_amount}
                          </span>
                        </div>
                        <Button
                          onClick={() => onDonate && onDonate(item)}
                          className={`${colors.button} text-white font-semibold shadow-md hover:shadow-lg transition-all`}
                          size="sm"
                        >
                          {language === 'fr' ? buttonText.fr : buttonText.en}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
