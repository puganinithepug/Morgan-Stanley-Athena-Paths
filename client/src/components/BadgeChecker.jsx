export const BADGE_DEFINITIONS = {
  FIRST_DONATION: {
    id: 'first_donation',
    name: { en: 'First Step', fr: 'Premier Pas' },
    description: { en: 'Made your first donation', fr: 'Fait votre premier don' },
    icon: '🌟',
    // Earned when user has at least one donation
    condition: (user, donations, referrals) => donations.length >= 1
  },
  WISDOM_SUPPORTER: {
    id: 'wisdom_supporter',
    name: { en: 'Wisdom Keeper', fr: 'Gardien de la Sagesse' },
    description: { en: 'Donated to Wisdom path 5 times', fr: 'Donné au parcours Sagesse 5 fois' },
    icon: '📞',
    condition: (user, donations, referrals) => donations.filter(d => d.path === 'WISDOM').length >= 5
  },
  COURAGE_SUPPORTER: {
    id: 'courage_supporter',
    name: { en: 'Courage Champion', fr: 'Champion du Courage' },
    description: { en: 'Donated to Courage path 5 times', fr: 'Donné au parcours Courage 5 fois' },
    icon: '❤️',
    condition: (user, donations, referrals) => donations.filter(d => d.path === 'COURAGE').length >= 5
  },
  PROTECTION_SUPPORTER: {
    id: 'protection_supporter',
    name: { en: 'Protection Guardian', fr: 'Gardien de la Protection' },
    description: { en: 'Donated to Protection path 5 times', fr: 'Donné au parcours Protection 5 fois' },
    icon: '🛡️',
    condition: (user, donations, referrals) => donations.filter(d => d.path === 'PROTECTION').length >= 5
  },
  ALL_PATHS: {
    id: 'all_paths',
    name: { en: 'Complete Supporter', fr: 'Soutien Complet' },
    description: { en: 'Donated to all three paths', fr: 'Donné aux trois parcours' },
    icon: '⭐',
    condition: (user, donations, referrals) => {
      const paths = new Set(donations.map(d => d.path));
      return paths.has('WISDOM') && paths.has('COURAGE') && paths.has('PROTECTION');
    }
  },
  HUNDRED_CLUB: {
    id: 'hundred_club',
    name: { en: 'Hundred Club', fr: 'Club des Cent' },
    description: { en: 'Reached 100 impact points', fr: 'Atteint 100 points d\'impact' },
    icon: '💯',
    // Still uses user.total_points (currently UI-calculated)
    condition: (user, donations, referrals) => (user.total_points || 0) >= 100
  },
  FIVE_HUNDRED_CLUB: {
    id: 'five_hundred_club',
    name: { en: 'Elite Supporter', fr: 'Soutien d\'Élite' },
    description: { en: 'Reached 500 impact points', fr: 'Atteint 500 points d\'impact' },
    icon: '🏆',
    condition: (user, donations, referrals) => (user.total_points || 0) >= 500
  },
  COMMUNITY_LEADER: {
    id: 'community_leader',
    name: { en: 'Community Leader', fr: 'Leader Communautaire' },
    description: { en: 'Referred 5 friends', fr: 'Parrainé 5 amis' },
    icon: '👥',
    condition: (user, donations, referrals) => {
      return referrals.length >= 5;
    }
  }
};

async function fetchJson(url) {
  const res = await fetch(url, { credentials: 'include' });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export async function checkAndAwardBadges(user) {
  if (!user) return [];

  // Fetch current donations, referrals, and existing badges from backend
  const [donationsRes, referralsRes, userBadgesRes] = await Promise.all([
    fetchJson(`http://localhost:8000/users/${user.id}/donations`),
    fetchJson(`http://localhost:8000/users/${user.id}/referrals`),
    fetchJson(`http://localhost:8000/users/${user.id}/badges`),
  ]);

  const donations = donationsRes.donations || [];
  const referrals = referralsRes.referrals || [];

  // IDs of badges the user already has (from backend)
  const existingBadges = new Set(
    (userBadgesRes.badges || []).map((b) => b.badge_id || b.id)
  );

  const newlyEarned = [];

  // Evaluate conditions for each locally-defined badge and sync with backend
  await Promise.all(
    Object.values(BADGE_DEFINITIONS).map(async (badgeDef) => {
      const id = badgeDef.id;
      const hasBadge = existingBadges.has(id);
      const meetsCondition = badgeDef.condition(user, donations, referrals);

      if (meetsCondition && !hasBadge) {
        // Assign badge in backend
        try {
          await fetch(`http://localhost:8000/users/${user.id}/badges`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ badge_id: id }),
          });
        } catch (err) {
          console.error('Failed to assign badge', id, err);
        }

        newlyEarned.push(badgeDef);
      }
    })
  );

  return newlyEarned;
}

