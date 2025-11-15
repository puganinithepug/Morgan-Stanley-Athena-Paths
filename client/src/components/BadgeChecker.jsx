import dataService from '../services/dataService';

export const BADGE_DEFINITIONS = {
  FIRST_DONATION: {
    id: 'first_donation',
    name: { en: 'First Step', fr: 'Premier Pas' },
    description: { en: 'Made your first donation', fr: 'Fait votre premier don' },
    icon: '🌟',
    condition: (user, donations) => donations.filter(d => d.user_id === user.id).length >= 1
  },
  WISDOM_SUPPORTER: {
    id: 'wisdom_supporter',
    name: { en: 'Wisdom Keeper', fr: 'Gardien de la Sagesse' },
    description: { en: 'Donated to Wisdom path 5 times', fr: 'Donné au parcours Sagesse 5 fois' },
    icon: '📞',
    condition: (user, donations) => donations.filter(d => d.user_id === user.id && d.path === 'WISDOM').length >= 5
  },
  COURAGE_SUPPORTER: {
    id: 'courage_supporter',
    name: { en: 'Courage Champion', fr: 'Champion du Courage' },
    description: { en: 'Donated to Courage path 5 times', fr: 'Donné au parcours Courage 5 fois' },
    icon: '❤️',
    condition: (user, donations) => donations.filter(d => d.user_id === user.id && d.path === 'COURAGE').length >= 5
  },
  PROTECTION_SUPPORTER: {
    id: 'protection_supporter',
    name: { en: 'Protection Guardian', fr: 'Gardien de la Protection' },
    description: { en: 'Donated to Protection path 5 times', fr: 'Donné au parcours Protection 5 fois' },
    icon: '🛡️',
    condition: (user, donations) => donations.filter(d => d.user_id === user.id && d.path === 'PROTECTION').length >= 5
  },
  ALL_PATHS: {
    id: 'all_paths',
    name: { en: 'Complete Supporter', fr: 'Soutien Complet' },
    description: { en: 'Donated to all three paths', fr: 'Donné aux trois parcours' },
    icon: '⭐',
    condition: (user, donations) => {
      const userDonations = donations.filter(d => d.user_id === user.id);
      const paths = new Set(userDonations.map(d => d.path));
      return paths.has('WISDOM') && paths.has('COURAGE') && paths.has('PROTECTION');
    }
  },
  HUNDRED_CLUB: {
    id: 'hundred_club',
    name: { en: 'Hundred Club', fr: 'Club des Cent' },
    description: { en: 'Reached 100 impact points', fr: 'Atteint 100 points d\'impact' },
    icon: '💯',
    condition: (user) => (user.total_points || 0) >= 100
  },
  FIVE_HUNDRED_CLUB: {
    id: 'five_hundred_club',
    name: { en: 'Elite Supporter', fr: 'Soutien d\'Élite' },
    description: { en: 'Reached 500 impact points', fr: 'Atteint 500 points d\'impact' },
    icon: '🏆',
    condition: (user) => (user.total_points || 0) >= 500
  },
  COMMUNITY_LEADER: {
    id: 'community_leader',
    name: { en: 'Community Leader', fr: 'Leader Communautaire' },
    description: { en: 'Referred 5 friends', fr: 'Parrainé 5 amis' },
    icon: '👥',
    condition: (user) => {
      const referrals = dataService.getReferrals();
      return referrals.filter(r => r.referrer_id === user.id).length >= 5;
    }
  }
};

export function checkAndAwardBadges(user) {
  if (!user) return [];

  const donations = dataService.getDonations();
  const userBadges = user.badges || [];
  const earnedBadges = [];

  Object.values(BADGE_DEFINITIONS).forEach(badge => {
    const hasBadge = userBadges.includes(badge.id);
    const meetsCondition = badge.condition(user, donations);

    if (meetsCondition && !hasBadge) {
      earnedBadges.push(badge);
      userBadges.push(badge.id);
    }
  });

  if (earnedBadges.length > 0) {
    dataService.updateUser(user.id, { badges: userBadges });
  }

  return earnedBadges;
}

