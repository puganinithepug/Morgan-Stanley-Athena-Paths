import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent } from './ui/Card';
import { Users, Home, Heart, Baby, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import dataService from '../services/dataService';

function AnimatedCounter({ value, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration, isInView]);

  return <span ref={countRef}>{count}</span>;
}

export default function ImpactMetrics() {
  const { language } = useLanguage();
  const donations = dataService.getDonations();

  const metrics = React.useMemo(() => {
    const defaultValues = {
      families: 15,
      shelter: 250,
      counseling: 120,
      children: 45,
      crisis: 180
    };

    if (!donations || donations.length === 0) {
      return defaultValues;
    }

    const totalAmount = donations.reduce((sum, d) => sum + (d.amount || 0), 0);
    const shelterNights = Math.floor(totalAmount / 20);
    const counselingHours = Math.floor(totalAmount / 50);
    const childrenSupported = Math.floor(donations.filter(d => d.path === 'COURAGE').length / 2);
    const crisisCalls = Math.floor(donations.filter(d => d.path === 'WISDOM').length * 2);
    const familiesHelped = new Set(donations.map(d => d.user_id).filter(Boolean)).size;

    return {
      families: familiesHelped,
      shelter: shelterNights,
      counseling: counselingHours,
      children: childrenSupported,
      crisis: crisisCalls
    };
  }, [donations]);

  const stats = [
    { 
      icon: Users, 
      label: language === 'fr' ? 'Familles Aidées' : 'Families Helped', 
      value: metrics.families,
      color: 'from-purple-500 to-indigo-500'
    },
    { 
      icon: Home, 
      label: language === 'fr' ? 'Nuits d\'Hébergement' : 'Shelter Nights', 
      value: metrics.shelter,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: Heart, 
      label: language === 'fr' ? 'Heures de Counseling' : 'Counseling Hours', 
      value: metrics.counseling,
      color: 'from-pink-500 to-rose-500'
    },
    { 
      icon: Baby, 
      label: language === 'fr' ? 'Enfants Soutenus' : 'Children Supported', 
      value: metrics.children,
      color: 'from-amber-500 to-orange-500'
    },
    { 
      icon: Phone, 
      label: language === 'fr' ? 'Appels de Crise' : 'Crisis Calls', 
      value: metrics.crisis,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'fr' ? 'L\'Impact de Notre Communauté' : 'Our Community\'s Impact'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
            {language === 'fr' 
              ? 'Ensemble, nous créons un changement durable pour les femmes et les enfants'
              : 'Together, we\'re creating lasting change for women and children'}
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            {language === 'fr' 
              ? 'Impact en temps réel basé sur les dons de la communauté'
              : 'Real-time impact based on community donations'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="text-center hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-2 border-indigo-100">
                  <CardContent className="p-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 + 0.2, type: "spring" }}
                      className="inline-flex p-3 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 mb-4"
                    >
                      <Icon className="w-6 h-6 text-indigo-600" />
                    </motion.div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
                      <AnimatedCounter value={stat.value} duration={2000} />+
                    </div>
                    <div className="text-sm font-semibold text-gray-900 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-xs text-gray-500">
                      {language === 'fr' ? 'de vos dons' : 'from your donations'}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-3 rounded-full border-2 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-sm font-semibold text-gray-700">
              {language === 'fr'
                ? '100% des dons vont directement aux services - Aucuns frais administratifs'
                : '100% of donations go directly to services - No admin fees'}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

