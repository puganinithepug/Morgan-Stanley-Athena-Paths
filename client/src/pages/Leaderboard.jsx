import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent } from '../components/ui/Card';
import { Trophy, Crown, Shield, Phone, Heart, Home, HandHeart, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import TeamSection from '../components/TeamSection';

const PATH_ICONS = {
  WISDOM: Phone,
  COURAGE: Heart,
  PROTECTION: Home,
  SERVICE: HandHeart,
};

const PATH_COLORS = {
  WISDOM: { text: 'text-highlight', bg: 'bg-highlight/15' },
  COURAGE: { text: 'text-muted', bg: 'bg-muted/15' },
  PROTECTION: { text: 'text-secondary', bg: 'bg-secondary/15' },
  SERVICE: {text: 'text-teal-500', bg: 'bg-teal-100'}
};

export default function Leaderboard() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [selectedPath, setSelectedPath] = useState('ALL');
  const [supporters, setSupporters] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadLeaderboard() {
      setLoading(true);
      try {
        const qs = selectedPath && selectedPath !== 'ALL' ? `?path=${selectedPath}` : '';
        const [supportersRes, teamsRes] = await Promise.all([
          fetch(`http://localhost:8000/leaderboard/supporters${qs}`, {
            credentials: 'include',
          }),
          fetch('http://localhost:8000/leaderboard/teams', {
            credentials: 'include',
          }),
        ]);

        if (!supportersRes.ok || !teamsRes.ok) {
          throw new Error('Failed to load leaderboard');
        }

        const supportersData = await supportersRes.json();
        const teamsData = await teamsRes.json();

        if (!cancelled) {
          setSupporters(supportersData.supporters || []);
          setTeams(teamsData.teams || []);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setSupporters([]);
          setTeams([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadLeaderboard();

    return () => {
      cancelled = true;
    };
  }, [selectedPath]);

  const leaderboard = supporters;
  const teamLeaderboard = teams;

  const getRankIcon = (rank) => {
    if (rank === 0) return <Crown className="w-6 h-6 text-highlight" />;
    if (rank === 1) return <Shield className="w-6 h-6 text-secondary" />;
    if (rank === 2) return <Trophy className="w-6 h-6 text-primary" />;
    return null;
  };

  const filters = [
    { id: 'ALL', label: language === 'fr' ? 'Tous les Parcours' : 'All Paths', color: 'bg-primary', hover: 'hover:bg-primary/30' },
    { id: 'WISDOM', label: language === 'fr' ? 'Sagesse' : 'Wisdom', color: 'bg-highlight', hover: 'hover:bg-highlight/30' },
    { id: 'COURAGE', label: language === 'fr' ? 'Courage' : 'Courage', color: 'bg-muted', hover: 'hover:bg-muted/30' },
    { id: 'PROTECTION', label: language === 'fr' ? 'Protection' : 'Protection', color: 'bg-secondary', hover: 'hover:bg-secondary/30' },
    { id: 'SERVICE', label: language === 'fr' ? 'Service' : 'Service', color: 'bg-teal-500', hover: 'hover:bg-teal-500/30' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex p-4 rounded-full bg-gradient-to-br from-primary/10 via-background to-primary/20 mb-6"
          >
            <Trophy className="w-16 h-16 text-primary" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {language === 'fr' ? 'Impact Communautaire' : 'Community Impact'}
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            {language === 'fr'
              ? 'Le Score d\'Espoir met en lumière les donateurs et équipes qui soutiennent constamment les femmes et les enfants. Il ne s\'agit pas de la quantité que vous donnez, mais de rester aux côtés des survivantes dans le temps.'
              : 'The Hope Score highlights donors and teams who consistently support women and children. It\'s not about how much you give, but about standing with survivors over time.'}
          </p>
        </motion.div>
        
        {/* Path Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedPath(filter.id)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                selectedPath === filter.id
                  ? `${filter.color} text-white shadow-md`
                  : `bg-background text-foreground/80 ${filter.hover} border border-foreground/10`
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Split Screen Leaderboard */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/*Individual Leaderboard - LEFT SIDE*/}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-background border-2 border-foreground/10 h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6 mt-6">
                  <Trophy className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold text-foreground">
                    {language === 'fr' ? 'Meilleurs Soutiens' : 'Top Supporters'}
                  </h2>
                </div>

                <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                  {leaderboard.length > 0 ? (
                    leaderboard.map((entry, idx) => {
                      const PathIcon = PATH_ICONS[entry.primary_path];
                      const pathColors = PATH_COLORS[entry.primary_path] || PATH_COLORS.WISDOM;
                      const rankIcon = getRankIcon(idx);
                      const isCurrentUser = user && entry.user_id === user.id;

                      return (
                        <motion.div
                          key={entry.user_id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`flex items-center justify-between p-4 rounded-lg mb-2 border transition-shadow ${
                            isCurrentUser
                              ? 'bg-primary/10 border-primary/60 shadow-md'
                              : 'bg-background border-foreground/10 hover:shadow-sm'
                          }`}
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <div className="flex items-center gap-3">
                              {rankIcon && <div className="flex-shrink-0">{rankIcon}</div>}
                              <span className="font-bold text-foreground/80 text-lg min-w-[3rem]">
                                #{idx + 1}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="font-bold text-foreground mb-1">
                                {entry.display_name}
                                {isCurrentUser && (
                                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-semibold">
                                    {language === 'fr' ? 'Vous' : 'You'}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                {PathIcon && (
                                  <PathIcon className={`w-4 h-4 ${pathColors.text}`} />
                                )}
                                <span className={`text-sm font-medium ${pathColors.text}`}>
                                  {language === 'fr'
                                    ? entry.primary_path === 'WISDOM'
                                      ? 'Sagesse'
                                      : entry.primary_path === 'COURAGE'
                                      ? 'Courage'
                                      : entry.primary_path === 'PROTECTION'
                                      ? 'Protection'
                                      : 'Service'
                                    : entry.primary_path}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-primary text-2xl mb-1">
                              {entry.total_points}
                            </div>
                            <div className="text-sm text-foreground/60">
                              {entry.total_donations}{' '}
                              {language === 'fr'
                                ? 'don(s)'
                                : entry.total_donations === 1
                                ? 'donation'
                                : 'donations'}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="text-center py-12 text-foreground/60">
                      {language === 'fr'
                        ? 'Aucun don pour le moment. Soyez le premier à soutenir!'
                        : 'No donations yet. Be the first to support!'}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Teams Leaderboard - RIGHT SIDE*/}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-background border-2 border-foreground/10 h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6 mt-6">
                  <Trophy className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold text-foreground">
                    {language === 'fr' ? 'Meilleures Équipes' : 'Top Teams'}
                  </h2>
                </div>

                <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                  {teamLeaderboard.length > 0 ? (
                    teamLeaderboard.map((team, idx) => {
                      const rankIcon = getRankIcon(idx);
                      const isUserTeam = user && user.team_id && team.team_id === user.team_id;

                      return (
                        <motion.div
                          key={team.team_id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`flex items-center justify-between p-4 rounded-lg mb-2 border transition-shadow ${
                            isUserTeam
                              ? 'bg-primary/10 border-primary/60 shadow-md'
                              : 'bg-background border-foreground/10 hover:shadow-sm'
                          }`}
                        >
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="flex items-center gap-3">
                              {rankIcon && <div className="flex-shrink-0">{rankIcon}</div>}
                              <span className="font-bold text-foreground/80 text-lg min-w-[3rem]">
                                #{idx + 1}
                              </span>
                              </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-foreground mb-2 truncate">
                                {team.name}
                                {isUserTeam && (
                                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-semibold">
                                    {language === 'fr' ? 'Votre équipe' : 'Your team'}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-3 text-sm flex-wrap">
                                <div className="flex items-center gap-1 text-foreground/60">
                                  <Users className="w-4 h-4" />
                                  {team.member_count}{' '}
                                  {language === 'fr' ? 'membres' : 'members'}
                                </div>
                              <div className="w-px h-3 bg-foreground/20"></div>
                              {team.leader_name && (
                                <div className="text-xs text-foreground/50">
                                  {language === 'fr' ? 'Dirigé par' : 'Led by'} {team.leader_name}
                                </div>
                              )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0 ml-4">
                            <div className="font-bold text-primary text-2xl mb-1">
                              {team.total_points}
                            </div>
                            <div className="text-sm text-foreground/60">
                              {language === 'fr' ? 'points' : 'points'}
                            </div>
                            </div>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="text-center py-12 text-foreground/60">
                      {language === 'fr'
                        ? 'Aucune équipe pour le moment. Créez la première!'
                        : 'No teams yet. Create the first one!'}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Team join/create section at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <TeamSection />
        </motion.div>
      </div>
    </div>
  );
}

