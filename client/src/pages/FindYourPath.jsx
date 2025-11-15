import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Shield, Phone, HandHeart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import FindYourPathQuiz from '../components/FindYourPathQuiz';

export default function FindYourPath() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              delay: 0.2
            }}
            className="inline-flex p-4 rounded-full bg-gradient-to-br from-primary/10 via-background to-primary/20 mb-6 relative"
          >
            <Sparkles className="w-12 h-12 text-primary" />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/40"
              animate={{ scale: [1, 1.2, 1.2], opacity: [0.5, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {language === 'fr' ? 'Trouvez Votre Parcours' : 'Find Your Path'}
          </h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            {language === 'fr'
              ? 'Répondez à quelques questions rapides pour découvrir quel domaine de soutien résonne le plus avec vos valeurs et où votre contribution peut avoir le plus d\'impact.'
              : 'Answer a few quick questions to discover which area of support resonates most with your values and where your contribution can make the greatest impact.'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-gradient-to-br from-highlight/20 to-highlight/10 border-2 border-highlight/40 rounded-xl p-6 text-center">
            <div className="inline-flex p-3 rounded-full bg-highlight/30 mb-3">
              <Phone className="w-8 h-8 text-highlight" />
            </div>
            <h3 className="font-bold text-foreground mb-2">
              {language === 'fr' ? 'Sagesse' : 'Wisdom'}
            </h3>
            <p className="text-sm text-foreground/70">
              {language === 'fr'
                ? 'Premier contact & information'
                : 'First contact & information'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-muted/20 to-muted/10 border-2 border-muted/40 rounded-xl p-6 text-center">
            <div className="inline-flex p-3 rounded-full bg-muted/30 mb-3">
              <Heart className="w-8 h-8 text-muted" />
            </div>
            <h3 className="font-bold text-foreground mb-2">
              {language === 'fr' ? 'Courage' : 'Courage'}
            </h3>
            <p className="text-sm text-foreground/70">
              {language === 'fr'
                ? 'Guérison & counseling'
                : 'Healing & counseling'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 border-2 border-secondary/40 rounded-xl p-6 text-center">
            <div className="inline-flex p-3 rounded-full bg-secondary/30 mb-3">
              <Shield className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="font-bold text-foreground mb-2">
              {language === 'fr' ? 'Protection' : 'Protection'}
            </h3>
            <p className="text-sm text-foreground/70">
              {language === 'fr'
                ? 'Refuge sûr & logement'
                : 'Safe shelter & housing'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-accent/20 to-amber-100/10 border-2 border-accent/40 rounded-xl p-6 text-center">
            <div className="inline-flex p-3 rounded-full bg-accent/30 mb-3">
              <HandHeart className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-bold text-foreground mb-2">
              {language === 'fr' ? 'Service' : 'Service'}
            </h3>
            <p className="text-sm text-foreground/70">
              {language === 'fr'
                ? 'Bénévolat & soutien pratique'
                : 'Volunteering & hands-on support'}
            </p>
          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <FindYourPathQuiz />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center"
        >
          <div className="bg-background rounded-xl shadow-sm border border-foreground/10 p-8 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              {language === 'fr' 
                ? 'Pourquoi choisir un parcours?'
                : 'Why choose a path?'}
            </h3>
            <p className="text-foreground/70 leading-relaxed">
              {language === 'fr'
                ? 'Chaque parcours représente une étape différente du parcours d\'une survivante. En choisissant un parcours qui résonne avec vous, vous rendez votre don plus personnel et significatif. Mais rappelez-vous - vous pouvez toujours soutenir tous les domaines!'
                : 'Each path represents a different stage of a survivor\'s journey. By choosing a path that resonates with you, you make your donation more personal and meaningful. But remember—you can always support all areas!'}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

