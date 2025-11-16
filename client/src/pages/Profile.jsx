import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { User, Award, Trophy, Heart, Phone, Home, Sparkles, HandHeart } from 'lucide-react';
import { BADGE_DEFINITIONS, checkAndAwardBadges } from '../components/BadgeChecker';
import ReferralSection from '../components/ReferralSection';
import TeamSection from '../components/TeamSection';
import { motion, AnimatePresence } from 'framer-motion';
import { PATH_STORIES, PATH_LEVEL_LABELS } from '../contexts/PathStories';
import { computePathStats } from '../components/PathProgress';
import dataService from '../services/dataService';
import { Button } from '../components/ui/Button';

export default function Profile() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const userId = user?.id;
  const [newBadges, setNewBadges] = useState([]);
  const [showBadgeNotification, setShowBadgeNotification] = useState(false);
  const [backendBadges, setBackendBadges] = useState([]);
  const [donations, setDonations] = useState([]);
  const [donationPathFilter, setDonationPathFilter] = useState('ALL');

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    async function syncBadges() {
      try {
        // Offline demo admin: use locally computed badges only
        if (user.id === 'offline-admin') {
          const earned = await checkAndAwardBadges(user);
          if (!cancelled) {
            if (earned.length > 0) {
              setNewBadges(earned);
              setShowBadgeNotification(true);
              setTimeout(() => setShowBadgeNotification(false), 5000);
            }
            // Mirror earned badge definitions into the backendBadges shape
            setBackendBadges(earned.map((b) => ({ badge_id: b.id })));
          }
          return;
        }

        // First, check and award any new badges based on backend data
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

  // Load donations for this user from backend (or from local dataService for offline admin)
  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    async function loadDonations() {
      try {
        // Offline demo admin: skip backend and use local in-memory donations
        if (user.id === 'offline-admin') {
          const local = dataService.getDonations({ user_id: user.id }) || [];
          const mapped = local.map((d) => ({
            amount: d.amount,
            path: d.path,
            impact_points: d.points_awarded || 0,
            hours: d.hours || 0,
            // Surface date information for offline/demo donations so the history section can display it
            created_at: d.created_date,
          }));
          if (!cancelled) {
            setDonations(mapped);
          }
          return;
        }

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
  const totalAmount =
    user?.total_amount ?? realDonations.reduce((sum, d) => sum + (d.amount || 0), 0);
  const totalImpactPoints =
    user?.total_points ?? donations.reduce((sum, d) => sum + (d.impact_points || 0), 0);

  // Normalize and sort donations with date information for the history section
  const donationsWithDates = donations
    .filter((d) => (d.amount || 0) > 0 || (d.hours || 0) > 0)
    .map((d) => ({
      ...d,
      _created: d.created_at || d.created_date || null,
    }))
    .sort((a, b) => {
      if (!a._created || !b._created) return 0;
      return new Date(b._created) - new Date(a._created);
    });

  const filteredDonationsForHistory = donationsWithDates
    .filter((d) =>
      donationPathFilter === 'ALL' ? true : d.path === donationPathFilter
    )
    .sort((a, b) => {
      if (!a._created || !b._created) return 0;
      return new Date(b._created) - new Date(a._created);
    });

  // Primary source of volunteer hours: SERVICE entries in donations
  const volunteerHoursFromDonations = donations
    .filter((d) => d.path === 'SERVICE')
    .reduce((sum, d) => {
      const h = typeof d.hours === 'string' ? parseFloat(d.hours) : d.hours;
      return sum + (h || 0);
    }, 0);

  console.log("Volunteering hours:", volunteerHoursFromDonations);
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

  const donationPathOptions = [
    { id: 'ALL', labelEn: 'All', labelFr: 'Tous', color: 'bg-primary/80', border: 'border-primary', hover: 'hover:bg-primary/40' },
    { id: 'WISDOM', labelEn: 'Wisdom', labelFr: 'Sagesse', color: 'bg-highlight', border: 'border-highlight', hover: 'hover:bg-highlight/40' },
    { id: 'COURAGE', labelEn: 'Courage', labelFr: 'Courage', color: 'bg-muted', border: 'border-muted', hover: 'hover:bg-muted/40' },
    { id: 'PROTECTION', labelEn: 'Protection', labelFr: 'Protection', color: 'bg-secondary', border: 'border-secondary', hover: 'hover:bg-secondary/40' },
    { id: 'SERVICE', labelEn: 'Service', labelFr: 'Service', color: 'bg-accent', border: 'border-accent', hover: 'hover:bg-accent/40' },
  ];
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
                  className="w-12 h-12 flex items-center justify-center"
                >
                  <img
                    src={newBadges[0].icon}
                    alt={newBadges[0].name[language]}
                    className="w-10 h-10 object-contain"
                  />
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-1">
                    New Badge Unlocked!
                  </h3>
                  <p className="text-sm text-foreground/70">
                    {newBadges[0].name.en}
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
            Your Athena Profile
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
                  Impact Points
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
                  Total Donations
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
                  Badges
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="mb-8">
          <TeamSection />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
        
        {/* PATH STATS – LEFT, 2/3 width */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Your Path Statistics
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 gap-4">
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
                            Wisdom
                          </span>
                        </div>
                        
                        <span className="text-[11px] text-foreground/60 block">
                          {story.en}
                        </span>
                      </div>
                      <div className="text-right flex flex-row items-center gap-4">
                        <span className="text-xs text-foreground/60">
                          {`Level ${stats.level} – ${levelLabel}`}
                        </span>
                        <div className="font-bold text-foreground">
                          {stats.xp} XP
                        </div>
                      </div>
                    </div>


                    {/* PROGRESS BAR */}
                    <div className="w-full h-3 rounded-full bg-foreground/10 overflow-hidden">
                      <div
                        className="h-3 rounded-full bg-highlight"
                        style={{
                          width: `${Math.min(100, Math.max(0, progress * 100))}%`,
                        }}
                      />
                    </div>

                    {/* NEXT LEVEL HINT */}
                    {stats.nextLevelXp != null && (
                      <p className="mt-1 text-[11px] text-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity text-right">
                        {`${stats.nextLevelXp - stats.xp} XP to your next level.`}
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
                            Courage
                          </span>
                        </div>
                        <span className="text-[11px] text-foreground/60 block">
                          {story.en}
                        </span>
                      </div>
                       <div className="text-right flex flex-row items-center gap-4">
                        <span className="text-xs text-foreground/60">
                          {`Level ${stats.level} – ${levelLabel}`}
                        </span>
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
                        {`${stats.nextLevelXp - stats.xp} XP to your next level.`}
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
                            Protection
                          </span>
                        </div>
                        <span className="text-[11px] text-foreground/60 block">
                          {story.en}
                        </span>
                      </div>
                       <div className="text-right flex flex-row items-center gap-4">
                        <span className="text-xs text-foreground/60">
                          {`Level ${stats.level} – ${levelLabel}`}
                        </span>
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
                        {`${stats.nextLevelXp - stats.xp} XP to your next level.`}
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
                          <HandHeart className="w-4 h-4 text-accent" />
                          <span className="font-medium text-foreground">
                            Service
                          </span>
                        </div>
                        <span className="text-[11px] text-foreground/60 block">
                          {story.en}
                        </span>
                      </div>
                       <div className="text-right flex flex-row items-center gap-4">
                        <span className="text-xs text-foreground/60">
                          {`Level ${stats.level} – ${levelLabel}`}
                        </span>
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
                        {`${stats.nextLevelXp - stats.xp} XP to your next level.`}
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
              Your Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 -gap-1 place-items-center">
              {Object.values(BADGE_DEFINITIONS).map((badge) => {
                const isUnlocked = backendBadgeIds.has(badge.id);

                return (
                  <motion.div
                    key={badge.id}
                    whileHover={{ scale: 1.05 }}
                    className="group flex flex-col items-center gap-1"
                  >
                    {/* Icon */}
                    <div className="flex items-center justify-center">
                      <img
                        src={badge.icon}
                        alt={badge.name[language]}
                        className={`w-30 h-30 object-contain ${
                          isUnlocked ? '' : 'opacity-30 grayscale'
                        }`}
                      />
                    </div>

                    {/* Tooltip */}
                    <div
                      className="
                        absolute bottom-[110%] left-1/2 -translate-x-1/2
                        px-3 py-1 rounded-md text-xs
                        bg-black text-white shadow-lg whitespace-nowrap
                        opacity-0 pointer-events-none
                        group-hover:opacity-100 group-hover:pointer-events-auto
                        transition-opacity
                      "
                    >
                      {badge.description[language]}
                    </div>
                    {/* Badge label */}
                    <p
                      className="
                        text-xs text-center leading-tight
                        h-8 flex items-center justify-center
                      "
                    >
                      {badge.name.en}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5 text-primary" />
            Your Contribution History
          </CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            {donationPathOptions.map((opt) => {
              const isActive = donationPathFilter === opt.id;
              const label = opt.labelEn;
              return (
                <Button
                  key={opt.id}
                  type="button"
                  variant="unstyled"
                  size='pill'
                  onClick={() => setDonationPathFilter(opt.id)}
                  className={`px-3 py-1 rounded-full text-xs border transition-colors
                    ${isActive
                      ? `${opt.color} text-primary-foreground ${opt.border}`
                      : `bg-background text-foreground/80 border-border ${opt.hover}`}`}
                >
                  {label}
                </Button>
              );
            })}
          </div>
        </CardHeader>
        <CardContent>
          {filteredDonationsForHistory.length === 0 ? (
            <p className="text-sm text-foreground/70">
              No contributions for this path.
            </p>
          ) : (
            <div className="max-h-64 overflow-y-auto pr-1 space-y-3">
              {filteredDonationsForHistory.map((d, idx) => {
                const date = d._created ? new Date(d._created) : null;
                const isService = d.path === 'SERVICE';
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-sm border-b last:border-b-0 border-border/40 pb-2"
                  >
                    <div>
                      <div className="font-medium text-foreground">
                        {isService ? 'Volunteer Service' : 'Donation'}
                      </div>
                      <div className="text-xs text-foreground/60">
                        {date
                          ? date.toLocaleDateString()
                          : 'Date unknown'}
                      </div>
                      {d.path && (
                        <div className="text-[11px] text-foreground/60 mt-0.5">
                          Path: 
                          {d.path}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      {d.amount ? (
                        <div className="font-semibold">
                          ${Number(d.amount).toLocaleString()}
                        </div>
                      ) : null}
                      {d.hours ? (
                        <div className="font-semibold">
                          {d.hours}{' '}
                          hours
                        </div>
                      ) : null}
                      {d.impact_points ? (
                        <div className="text-[11px] text-foreground/60 mt-0.5">
                          {d.impact_points}{' '}
                          impact points
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

        <ReferralSection />
      </div>
    </div>
  );
}

