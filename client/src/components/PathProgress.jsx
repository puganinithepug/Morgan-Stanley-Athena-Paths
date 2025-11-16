import { getLevelFromXP } from '../contexts/PathStories';

// Given all donations for a user, compute per-path stats (count, XP, level, etc.)
export function computePathStats(donations) {
  // "Real" donations: amount > 0 (exclude referral bonuses, etc.)
  const realDonations = donations.filter((d) => (d.amount || 0) > 0);

  function buildPathStats(pathKey) {
    if (pathKey !== 'SERVICE') {
      const pathDonations = realDonations.filter((d) => d.path === pathKey);

      const xp = pathDonations.reduce(
        (sum, d) => sum + Number(d.impact_points || 0),
        0
      );

      const { level, currentLevelMinXp, nextLevelXp } = getLevelFromXP(xp);

      return {
        count: pathDonations.length, // number of donations in this path
        xp,                          // total impact points in this path
        level,                       // 1–4
        currentLevelMinXp,
        nextLevelXp,                 // null if max level
      };
    }

    // SERVICE: use volunteer hours as "count", XP from impact_points
    const serviceDonations = donations.filter((d) => d.path === 'SERVICE');

    const hoursCount = serviceDonations.reduce(
      (sum, d) => sum + Number(d.hours || 0),
      0
    );

    const xp = serviceDonations.reduce(
      (sum, d) => sum + Number(d.impact_points || 0),
      0
    );

    const { level, currentLevelMinXp, nextLevelXp } = getLevelFromXP(xp);

    return {
      count: hoursCount, // hours volunteered in Service path
      xp,
      level,
      currentLevelMinXp,
      nextLevelXp,
    };
  }

  return {
    WISDOM: buildPathStats('WISDOM'),
    COURAGE: buildPathStats('COURAGE'),
    PROTECTION: buildPathStats('PROTECTION'),
    SERVICE: buildPathStats('SERVICE'),
  };
}
