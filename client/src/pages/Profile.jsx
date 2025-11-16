import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { User, Award, Trophy, Heart, Phone, Home, Sparkles } from 'lucide-react';
import { BADGE_DEFINITIONS, checkAndAwardBadges } from '../components/BadgeChecker';
import ReferralSection from '../components/ReferralSection';
import { motion, AnimatePresence } from 'framer-motion';
import { PATH_STORIES, PATH_LEVEL_LABELS } from '../contexts/PathStories';
import { computePathStats } from '../components/PathProgress';

export default function Profile() {
  const { user } = useAuth();
  const userId = user?.id;
  const { language } = useLanguage();
  const [newBadges, setNewBadges] = useState([]);
  const [showBadgeNotification, setShowBadgeNotification] = useState(false);
  const [backendBadges, setBackendBadges] = useState([]);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    async function syncBadges() {
      try {
        const earned = await checkAndAwardBadges(user);
        if (!cancelled && earned.length > 0) {
          setNewBadges(earned);
          setShowBadgeNotification(true);
          setTimeout(() => setShowBadgeNotification(false), 5000);
        }

        const res = await fetch(`http://localhost:8000/users/${user.id}/badges`, {
          credentials: 'include',
        });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) {
          setBackendBadges(data.badges || []);
        }
      } catch (err) {
        console.error('Failed to sync badges', err);
      }
    }

    syncBadges();

    return () => {
      cancelled = true;
    };
  }, [userId, user]);

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    async function loadDonations() {
      try {
        const res = await fetch(`http://localhost:8000/users/${user.id}/donations`, {
          credentials: 'include',
        });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) {
          setDonations(data.donations || []);
        }
      } catch (err) {
        console.error('Failed to load donations', err);
      }
    }

    loadDonations();

    return () => {
      cancelled = true;
    };
  }, [userId, user?.id]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground/70">Please log in to view your profile.</p>
      </div>
    );
  }
  
  const realDonations = donations.filter((d) => (d.amount || 0) > 0);
  const totalAmount = realDonations.reduce((sum, d) => sum + (d.amount || 0), 0);
  const totalImpactPoints = donations.reduce((sum, d) => sum + (d.impact_points || 0), 0);

  const backendBadgeIds = new Set(
    (backendBadges || []).map((b) => b.badge_id || b.id)
  );

  const earnedBadges = (backendBadges || [])
    .map((b) => {
      const id = b.badge_id || b.id;
      return Object.values(BADGE_DEFINITIONS).find((def) => def.id === id) || null;
    })
    .filter(Boolean);

  const pathStats = computePathStats(donations);

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
                <div className="text-3xl font-bold mb-1 relative z-10">{totalImpactPoints}</div>
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
                <div className="text-3xl font-bold mb-1 relative z-10">{realDonations.length}</div>
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

        <div className="grid md:grid-cols-3 gap-8 mb-8">
        
        {/* PATH STATS – LEFT, 2/3 width */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              {language === 'fr' ? 'Vos Statistiques par Parcours' : 'Your Path Statistics'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* 2×2 grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* WISDOM */}
              {(() => {
                const stats = pathStats.WISDOM;
                const story =
                  PATH_STORIES.WISDOM[stats.level] || PATH_STORIES.WISDOM[1];
                const levelLabel =
                  PATH_LEVEL_LABELS[stats.level] || PATH_LEVEL_LABELS[1];
                const progress =
                  stats.nextLevelXp == null
                    ? 1
                    : (stats.xp - stats.currentLevelMinXp) /
                      (stats.nextLevelXp - stats.currentLevelMinXp || 1);

                return (
                  <div className="p-3 rounded-lg bg-highlight/15 border border-highlight/40 group">
                    <div className="flex items-start justify-between mb-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-highlight" />
                          <span className="font-medium text-foreground">
                            {language === 'fr' ? 'Sagesse' : 'Wisdom'}
                          </span>
                        </div>
                        <span className="text-xs text-foreground/60">
                          {language === 'fr'
                            ? `Niveau ${stats.level} – ${levelLabel}`
                            : `Level ${stats.level} – ${levelLabel}`}
                        </span>
                        <span className="text-[11px] text-foreground/60 block">
                          {language === 'fr' ? story.fr : story.en}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-foreground">
                          {stats.xp} XP
                        </div>
                      </div>
                    </div>

                    {/*higher-contrast bar */}
                    <div className="w-full h-3 rounded-full bg-foreground/10 overflow-hidden">
                      <div
                        className="h-3 rounded-full bg-highlight"
                        style={{
                          width: `${Math.min(100, Math.max(0, progress * 100))}%`,
                        }}
                      />
                    </div>

                    {stats.nextLevelXp != null && (
                      <p className="mt-1 text-[11px] text-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity text-right">
                        {language === 'fr'
                          ? `Encore ${stats.nextLevelXp - stats.xp} XP pour le prochain niveau.`
                          : `${stats.nextLevelXp - stats.xp} XP to your next level.`}
                      </p>
                    )}
                  </div>
                );
              })()}

              {/* COURAGE */}
              {(() => {
                const stats = pathStats.COURAGE;
                const story =
                  PATH_STORIES.COURAGE[stats.level] || PATH_STORIES.COURAGE[1];
                const levelLabel =
                  PATH_LEVEL_LABELS[stats.level] || PATH_LEVEL_LABELS[1];
                const progress =
                  stats.nextLevelXp == null
                    ? 1
                    : (stats.xp - stats.currentLevelMinXp) /
                      (stats.nextLevelXp - stats.currentLevelMinXp || 1);

                return (
                  <div className="p-3 rounded-lg bg-muted/15 border border-muted/40 group">
                    <div className="flex items-start justify-between mb-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-muted" />
                          <span className="font-medium text-foreground">
                            {language === 'fr' ? 'Courage' : 'Courage'}
                          </span>
                        </div>
                        <span className="text-xs text-foreground/60">
                          {language === 'fr'
                            ? `Niveau ${stats.level} – ${levelLabel}`
                            : `Level ${stats.level} – ${levelLabel}`}
                        </span>
                        <span className="text-[11px] text-foreground/60 block">
                          {language === 'fr' ? story.fr : story.en}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-foreground">
                          {stats.xp} XP
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-3 rounded-full bg-foreground/10 overflow-hidden">
                      <div
                        className="h-3 rounded-full bg-muted"
                        style={{
                          width: `${Math.min(100, Math.max(0, progress * 100))}%`,
                        }}
                      />
                    </div>

                    {stats.nextLevelXp != null && (
                      <p className="mt-1 text-[11px] text-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity text-right">
                        {language === 'fr'
                          ? `Encore ${stats.nextLevelXp - stats.xp} XP pour le prochain niveau.`
                          : `${stats.nextLevelXp - stats.xp} XP to your next level.`}
                      </p>
                    )}
                  </div>
                );
              })()}

              {/* PROTECTION */}
              {(() => {
                const stats = pathStats.PROTECTION;
                const story =
                  PATH_STORIES.PROTECTION[stats.level] ||
                  PATH_STORIES.PROTECTION[1];
                const levelLabel =
                  PATH_LEVEL_LABELS[stats.level] || PATH_LEVEL_LABELS[1];
                const progress =
                  stats.nextLevelXp == null
                    ? 1
                    : (stats.xp - stats.currentLevelMinXp) /
                      (stats.nextLevelXp - stats.currentLevelMinXp || 1);

                return (
                  <div className="p-3 rounded-lg bg-secondary/15 border border-secondary/40 group">
                    <div className="flex items-start justify-between mb-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Home className="w-4 h-4 text-secondary" />
                          <span className="font-medium text-foreground">
                            {language === 'fr' ? 'Protection' : 'Protection'}
                          </span>
                        </div>
                        <span className="text-xs text-foreground/60">
                          {language === 'fr'
                            ? `Niveau ${stats.level} – ${levelLabel}`
                            : `Level ${stats.level} – ${levelLabel}`}
                        </span>
                        <span className="text-[11px] text-foreground/60 block">
                          {language === 'fr' ? story.fr : story.en}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-foreground">
                          {stats.xp} XP
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-3 rounded-full bg-foreground/10 overflow-hidden">
                      <div
                        className="h-3 rounded-full bg-secondary"
                        style={{
                          width: `${Math.min(100, Math.max(0, progress * 100))}%`,
                        }}
                      />
                    </div>

                    {stats.nextLevelXp != null && (
                      <p className="mt-1 text-[11px] text-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity text-right">
                        {language === 'fr'
                          ? `Encore ${stats.nextLevelXp - stats.xp} XP pour le prochain niveau.`
                          : `${stats.nextLevelXp - stats.xp} XP to your next level.`}
                      </p>
                    )}
                  </div>
                );
              })()}

              {/* SERVICE */}
              {(() => {
                const stats = pathStats.SERVICE;
                const story =
                  PATH_STORIES.SERVICE[stats.level] || PATH_STORIES.SERVICE[1];
                const levelLabel =
                  PATH_LEVEL_LABELS[stats.level] || PATH_LEVEL_LABELS[1];
                const progress =
                  stats.nextLevelXp == null
                    ? 1
                    : (stats.xp - stats.currentLevelMinXp) /
                      (stats.nextLevelXp - stats.currentLevelMinXp || 1);

                return (
                  <div className="p-3 rounded-lg bg-accent/15 border border-accent/40 group">
                    <div className="flex items-start justify-between mb-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Home className="w-4 h-4 text-accent" />
                          <span className="font-medium text-foreground">
                            {language === 'fr' ? 'Service' : 'Service'}
                          </span>
                        </div>
                        <span className="text-xs text-foreground/60">
                          {language === 'fr'
                            ? `Niveau ${stats.level} – ${levelLabel}`
                            : `Level ${stats.level} – ${levelLabel}`}
                        </span>
                        <span className="text-[11px] text-foreground/60 block">
                          {language === 'fr' ? story.fr : story.en}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-foreground">
                          {stats.xp} XP
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-3 rounded-full bg-foreground/10 overflow-hidden">
                      <div
                        className="h-3 rounded-full bg-accent"
                        style={{
                          width: `${Math.min(100, Math.max(0, progress * 100))}%`,
                        }}
                      />
                    </div>

                    {stats.nextLevelXp != null && (
                      <p className="mt-1 text-[11px] text-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity text-right">
                        {language === 'fr'
                          ? `Encore ${stats.nextLevelXp - stats.xp} XP pour le prochain niveau.`
                          : `${stats.nextLevelXp - stats.xp} XP to your next level.`}
                      </p>
                    )}
                  </div>
                );
              })()}

            </div>
          </CardContent>

        </Card>

        {/* BADGES – RIGHT, 1/3 width */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              {language === 'fr' ? 'Vos Badges' : 'Your Badges'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 place-items-center">
              {Object.values(BADGE_DEFINITIONS).map((badge) => {
                const isUnlocked = backendBadgeIds.has(badge.id);

                return (
                  <motion.div
                    key={badge.id}
                    whileHover={{ scale: 1.05 }}
                    className="group flex flex-col items-center gap-1"
                  >
                    {/* Icon */}
                    <div
                      className={`
                        w-14 h-14 rounded-full flex items-center justify-center border-2
                        transition-colors
                        ${isUnlocked
                          ? 'bg-primary/10 border-primary text-primary'
                          : 'bg-background border-foreground/20 text-foreground/30'}
                      `}
                    >
                      <span className="text-2xl">{badge.icon}</span>
                    </div>

                    {/* Name – on hover */}
                    <p
                      className={`
                        text-[11px] font-medium text-center mt-1 
                        opacity-0 group-hover:opacity-100 transition-opacity
                        ${isUnlocked ? 'text-foreground' : 'text-foreground/60'}
                      `}
                    >
                      {badge.name[language]}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>


        <ReferralSection />
      </div>
    </div>
  );
}

