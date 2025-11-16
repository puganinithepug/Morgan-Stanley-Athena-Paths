import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import dataService from '../services/dataService';
import { Card, CardContent } from '../components/ui/Card';
import { Trophy, Crown, Shield, Phone, Heart, Home, HandHeart, Users } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const [selectedPath, setSelectedPath] = useState('ALL');
  const donations = dataService.getDonations();
  const users = dataService.getAllUsers();
  const teams = dataService.getTeams();

  const userStats = {};
  const pathCounts = {};
  
  donations.forEach(donation => {
    if (selectedPath !== 'ALL' && donation.path !== selectedPath) return;
    
    if (!userStats[donation.user_id]) {
      userStats[donation.user_id] = {
        userId: donation.user_id,
        totalPoints: 0,
        totalDonations: 0,
        pathCounts: {},
      };
      pathCounts[donation.user_id] = {};
    }
    
    userStats[donation.user_id].totalPoints += donation.points_awarded || 0;
    userStats[donation.user_id].totalDonations += 1;
    
    if (!pathCounts[donation.user_id][donation.path]) {
      pathCounts[donation.user_id][donation.path] = 0;
    }
    pathCounts[donation.user_id][donation.path] += 1;
  });

  Object.keys(userStats).forEach(userId => {
    const paths = pathCounts[userId];
    const primaryPath = Object.keys(paths).reduce((a, b) => paths[a] > paths[b] ? a : b);
    userStats[userId].primaryPath = primaryPath;
  });

  const leaderboard = Object.values(userStats)
    .map(stat => {
      const user = users.find(u => u.id === stat.userId);
      const firstDonation = donations.find(d => d.user_id === stat.userId);
      const displayName = user 
        ? (user.is_anonymous ? 'Anonymous' : (user.full_name || 'Anonymous'))
        : (firstDonation?.user_name || 'Anonymous');
      return {
        ...stat,
        displayName: displayName,
        path: stat.primaryPath,
      };
    })
    .sort((a, b) => b.totalPoints - a.totalPoints);

  const teamLeaderboard = teams
    .map(team => {
      const teamMembers = users.filter(user => team.members?.includes(user.id));
      const totalTeamPoints = teamMembers.reduce((sum, user) => sum + (user.total_points || 0), 0);
      
      return {
        ...team,
        totalPoints: totalTeamPoints,
        memberCount: team.member_count,
        leader: users.find(u => u.id === team.leader_id)
      };
    })
    .sort((a, b) => b.totalPoints - a.totalPoints);

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

                <div className="space-y-3">
                  {leaderboard.length > 0 ? (
                    leaderboard.map((entry, idx) => {
                      const PathIcon = PATH_ICONS[entry.path];
                      const pathColors = PATH_COLORS[entry.path] || PATH_COLORS.WISDOM;
                      const rankIcon = getRankIcon(idx);

                      return (
                        <motion.div
                          key={entry.userId}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-center justify-between p-4 bg-background rounded-lg mb-2 border border-foreground/10 hover:shadow-sm transition-shadow"
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
                                {entry.displayName}
                              </div>
                              <div className="flex items-center gap-2">
                                {PathIcon && (
                                  <PathIcon className={`w-4 h-4 ${pathColors.text}`} />
                                )}
                                <span className={`text-sm font-medium ${pathColors.text}`}>
                                  {language === 'fr'
                                    ? entry.path === 'WISDOM'
                                      ? 'Sagesse'
                                      : entry.path === 'COURAGE'
                                      ? 'Courage'
                                      : entry.path === 'PROTECTION'
                                      ? 'Protection'
                                      : 'Service'
                                    : entry.path}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-primary text-2xl mb-1">
                              {entry.totalPoints}
                            </div>
                            <div className="text-sm text-foreground/60">
                              {entry.totalDonations} {language === 'fr' ? 'don(s)' : entry.totalDonations === 1 ? 'donation' : 'donations'}
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

                <div className="space-y-3">
                  {teamLeaderboard.length > 0 ? (
                    teamLeaderboard.map((team, idx) => {
                      const rankIcon = getRankIcon(idx);

                      return (
                        <motion.div
                          key={team.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-center justify-between p-4 bg-background rounded-lg mb-2 border border-foreground/10 hover:shadow-sm transition-shadow"
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
                              </div>
                              <div className="flex items-center gap-3 text-sm flex-wrap">
                                <div className="flex items-center gap-1 text-foreground/60">
                                  <Users className="w-4 h-4" />
                                  {team.memberCount} {language === 'fr' ? 'membres' : 'members'}
                                </div>
                              <div className="w-px h-3 bg-foreground/20"></div>
                              {team.leader && (
                                <div className="text-xs text-foreground/50">
                                  {language === 'fr' ? 'Dirigé par' : 'Led by'} {team.leader.full_name}
                                </div>
                              )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0 ml-4">
                            <div className="font-bold text-primary text-2xl mb-1">
                              {team.totalPoints}
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

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30 inline-block">
            <CardContent className="p-6">
              <p className="text-foreground/70 mb-4">
                {language === 'fr' 
                  ? 'Rejoignez une équipe ou créez la vôtre pour multiplier votre impact!'
                  : 'Join a team or create your own to multiply your impact!'}
              </p>
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={() => window.location.href = '/profile'}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                    {language === 'fr' ? 'Voir mon profil' : 'View My Profile'}
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

