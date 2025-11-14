import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Shield, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import FindYourPathQuiz from '../components/FindYourPathQuiz';

export default function FindYourPath() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-12">
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
            className="inline-flex p-4 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 mb-6 relative"
          >
            <Sparkles className="w-12 h-12 text-purple-600" />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-purple-300"
              animate={{ scale: [1, 1.2, 1.2], opacity: [0.5, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {language === 'fr' ? 'Trouvez Votre Parcours' : 'Find Your Path'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'fr'
              ? 'Répondez à quelques questions rapides pour découvrir quel domaine de soutien résonne le plus avec vos valeurs et où votre contribution peut avoir le plus d\'impact.'
              : 'Answer a few quick questions to discover which area of support resonates most with your values and where your contribution can make the greatest impact.'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6 text-center">
            <div className="inline-flex p-3 rounded-full bg-amber-100 mb-3">
              <Phone className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">
              {language === 'fr' ? 'Sagesse' : 'Wisdom'}
            </h3>
            <p className="text-sm text-gray-600">
              {language === 'fr'
                ? 'Premier contact & information'
                : 'First contact & information'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-200 rounded-xl p-6 text-center">
            <div className="inline-flex p-3 rounded-full bg-rose-100 mb-3">
              <Heart className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">
              {language === 'fr' ? 'Courage' : 'Courage'}
            </h3>
            <p className="text-sm text-gray-600">
              {language === 'fr'
                ? 'Guérison & counseling'
                : 'Healing & counseling'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6 text-center">
            <div className="inline-flex p-3 rounded-full bg-blue-100 mb-3">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">
              {language === 'fr' ? 'Protection' : 'Protection'}
            </h3>
            <p className="text-sm text-gray-600">
              {language === 'fr'
                ? 'Refuge sûr & logement'
                : 'Safe shelter & housing'}
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {language === 'fr' 
                ? 'Pourquoi choisir un parcours?'
                : 'Why choose a path?'}
            </h3>
            <p className="text-gray-600 leading-relaxed">
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

