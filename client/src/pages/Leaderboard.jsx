import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import dataService from '../services/dataService';
import { Card, CardContent } from '../components/ui/Card';
import { Trophy, Crown, Shield, Phone, Heart, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const PATH_ICONS = {
  WISDOM: Phone,
  COURAGE: Heart,
  PROTECTION: Home
};

const PATH_COLORS = {
  WISDOM: { text: 'text-amber-600', bg: 'bg-amber-50' },
  COURAGE: { text: 'text-rose-600', bg: 'bg-rose-50' },
  PROTECTION: { text: 'text-blue-600', bg: 'bg-blue-50' }
};

export default function Leaderboard() {
  const { language } = useLanguage();
  const [selectedPath, setSelectedPath] = useState('ALL');
  const donations = dataService.getDonations();
  const users = dataService.getAllUsers();

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

  const getRankIcon = (rank) => {
    if (rank === 0) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (rank === 1) return <Shield className="w-6 h-6 text-gray-400" />;
    if (rank === 2) return <Trophy className="w-6 h-6 text-amber-500" />;
    return null;
  };

  const filters = [
    { id: 'ALL', label: language === 'fr' ? 'Tous les Parcours' : 'All Paths' },
    { id: 'WISDOM', label: language === 'fr' ? 'Sagesse' : 'Wisdom' },
    { id: 'COURAGE', label: language === 'fr' ? 'Courage' : 'Courage' },
    { id: 'PROTECTION', label: language === 'fr' ? 'Protection' : 'Protection' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-12">
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
            className="inline-flex p-4 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 mb-6"
          >
            <Trophy className="w-16 h-16 text-purple-600" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-purple-600 mb-4">
            {language === 'fr' ? 'Impact Communautaire' : 'Community Impact'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {language === 'fr'
              ? 'Le Score d\'Espoir met en lumière les donateurs et équipes qui soutiennent constamment les femmes et les enfants. Il ne s\'agit pas de la quantité que vous donnez, mais de rester aux côtés des survivantes dans le temps.'
              : 'The Hope Score highlights donors and teams who consistently support women and children. It\'s not about how much you give, but about standing with survivors over time.'}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedPath(filter.id)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                selectedPath === filter.id
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gray-50 border-2 border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">
                  {language === 'fr' ? 'Meilleurs Soutiens' : 'Top Supporters'}
                </h2>
              </div>

              <div className="space-y-0">
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
                        className="flex items-center justify-between p-4 bg-white rounded-lg mb-2 border border-gray-100 hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex items-center gap-3">
                            {rankIcon && <div className="flex-shrink-0">{rankIcon}</div>}
                            <span className="font-bold text-gray-700 text-lg min-w-[3rem]">
                              #{idx + 1}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-gray-900 mb-1">
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
                                    : 'Protection'
                                  : entry.path}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-purple-600 text-2xl mb-1">
                            {entry.totalPoints}
                          </div>
                          <div className="text-sm text-gray-500">
                            {entry.totalDonations} {language === 'fr' ? 'don(s)' : entry.totalDonations === 1 ? 'donation' : 'donations'}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    {language === 'fr'
                      ? 'Aucun don pour le moment. Soyez le premier à soutenir!'
                      : 'No donations yet. Be the first to support!'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

