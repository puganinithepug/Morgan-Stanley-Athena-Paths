import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import dataService from '../services/dataService';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { User, Award, Trophy, Heart, Phone, Home, Sparkles } from 'lucide-react';
import { BADGE_DEFINITIONS, checkAndAwardBadges } from '../components/BadgeChecker';
import ReferralSection from '../components/ReferralSection';
import { motion, AnimatePresence } from 'framer-motion';

export default function Profile() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [newBadges, setNewBadges] = useState([]);
  const [showBadgeNotification, setShowBadgeNotification] = useState(false);

  useEffect(() => {
    if (user) {
      const earned = checkAndAwardBadges(user);
      if (earned.length > 0) {
        setNewBadges(earned);
        setShowBadgeNotification(true);
        setTimeout(() => setShowBadgeNotification(false), 5000);
      }
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground/70">Please log in to view your profile.</p>
      </div>
    );
  }

  const donations = dataService.getDonations().filter(d => d.user_id === user.id);
  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);
  const userBadges = user.badges || [];
  const earnedBadges = Object.values(BADGE_DEFINITIONS).filter(b => userBadges.includes(b.id));

  const pathStats = {
    WISDOM: donations.filter(d => d.path === 'WISDOM').length,
    COURAGE: donations.filter(d => d.path === 'COURAGE').length,
    PROTECTION: donations.filter(d => d.path === 'PROTECTION').length
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-background via-background to-primary/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence>
          {showBadgeNotification && newBadges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-20 right-4 z-50 bg-background rounded-lg shadow-2xl border-2 border-primary/30 p-6 max-w-sm"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                  className="text-4xl"
                >
                  {newBadges[0].icon}
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-1">
                    {language === 'fr' ? 'Nouveau Badge Débloqué!' : 'New Badge Unlocked!'}
                  </h3>
                  <p className="text-sm text-foreground/70">
                    {newBadges[0].name[language]}
                  </p>
                </div>
                <button
                  onClick={() => setShowBadgeNotification(false)}
                  className="text-foreground/40 hover:text-foreground/80"
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-primary/10 via-background to-primary/20 mb-6">
            <User className="w-10 h-10 text-primary" />
          </div>
               <h1 className="text-4xl font-bold text-foreground mb-2">
            {language === 'fr' ? 'Votre Profil Athena' : 'Your Athena Profile'}
          </h1>
          <p className="text-foreground/70">
            {user.full_name || user.email || 'Anonymous User'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-primary-dark to-primary text-white overflow-hidden">
              <CardContent className="p-6 text-center relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                <Award className="mt-6 w-8 h-8 mx-auto mb-2 opacity-90 relative z-10" />
                <div className="text-3xl font-bold mb-1 relative z-10">{user.total_points || 0}</div>
                <div className="text-sm opacity-90 relative z-10">
                  {language === 'fr' ? 'Points d\'Impact' : 'Impact Points'}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-muted to-primary text-white overflow-hidden">
              <CardContent className="p-6 text-center relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                <Heart className="mt-6 w-8 h-8 mx-auto mb-2 opacity-90 relative z-10" />
                <div className="text-3xl font-bold mb-1 relative z-10">{donations.length}</div>
                <div className="text-sm opacity-90 relative z-10">
                  {language === 'fr' ? 'Dons Totaux' : 'Total Donations'}
                </div>
                <div className="text-xs opacity-75 mt-1 relative z-10">
                  ${totalAmount.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-highlight to-secondary text-white overflow-hidden">
              <CardContent className="p-6 text-center relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                <Trophy className="mt-6 w-8 h-8 mx-auto mb-2 opacity-90 relative z-10" />
                <div className="text-3xl font-bold mb-1 relative z-10">{earnedBadges.length}</div>
                <div className="text-sm opacity-90 relative z-10">
                  {language === 'fr' ? 'Badges' : 'Badges'}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                {language === 'fr' ? 'Vos Badges' : 'Your Badges'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {earnedBadges.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {earnedBadges.map(badge => (
                    <motion.div
                      key={badge.id}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-primary/10 via-background to-primary/5 border border-primary/30"
                    >
                      <span className="text-3xl">{badge.icon}</span>
                      <div>
                        <div className="font-semibold text-foreground text-sm">
                          {badge.name[language]}
                        </div>
                        <div className="text-xs text-foreground/70">
                          {badge.description[language]}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-foreground/60 text-center py-8">
                  {language === 'fr'
                    ? 'Continuez à donner pour débloquer des badges!'
                    : 'Keep donating to unlock badges!'}
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                {language === 'fr' ? 'Vos Statistiques par Parcours' : 'Your Path Statistics'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-highlight/15 border border-highlight/40">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-highlight" />
                    <span className="font-medium text-foreground">
                      {language === 'fr' ? 'Sagesse' : 'Wisdom'}
                    </span>
                  </div>
                  <span className="font-bold text-foreground">{pathStats.WISDOM}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/15 border border-muted/40">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-muted" />
                    <span className="font-medium text-foreground">
                      {language === 'fr' ? 'Courage' : 'Courage'}
                    </span>
                  </div>
                  <span className="font-bold text-foreground">{pathStats.COURAGE}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/15 border border-secondary/40">
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5 text-secondary" />
                    <span className="font-medium text-foreground">
                      {language === 'fr' ? 'Protection' : 'Protection'}
                    </span>
                  </div>
                  <span className="font-bold text-foreground">{pathStats.PROTECTION}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <ReferralSection />
      </div>
    </div>
  );
}

