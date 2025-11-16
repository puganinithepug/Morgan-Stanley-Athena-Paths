// src/contexts/PathStories.js

export const PATH_LEVEL_THRESHOLDS = [0, 100, 300, 600];

export const PATH_LEVEL_LABELS = {
  1: 'Initiate',
  2: 'Ally',
  3: 'Guardian',
  4: 'Champion',
};

export function getLevelFromXP(xp) {
  const thresholds = PATH_LEVEL_THRESHOLDS;
  let level = 1;

  for (let i = 0; i < thresholds.length; i++) {
    if (xp >= thresholds[i]) {
      level = i + 1;
    }
  }

  const maxIndex = thresholds.length - 1;
  const currentIndex = Math.min(level - 1, maxIndex);
  const nextIndex = currentIndex + 1;

  const currentLevelMinXp = thresholds[currentIndex] || 0;
  const nextLevelXp = thresholds[nextIndex] ?? null;

  return { level, currentLevelMinXp, nextLevelXp };
}

export const PATH_STORIES = {
  WISDOM: {
    1: {
      en: 'First Light: You help ensure the crisis line is there when someone reaches out.',
      fr: 'Première lumière: Vous aidez à garantir qu’une survivante trouve quelqu’un pour l’écouter.'
    },
    2: {
      en: 'Steady Voice: Your support provides calm guidance during moments of fear.',
      fr: 'Voix rassurante: Votre soutien offre une présence calme dans les moments de peur.'
    },
    3: {
      en: 'Beacon of Information: You help survivors access resources clearly and safely.',
      fr: 'Phare d’information: Vous aidez les survivantes à trouver des ressources claires et sécuritaires.'
    },
    4: {
      en: 'Lifeline Keeper: You sustain the line that can save lives day and night.',
      fr: 'Gardien de la ligne: Vous veillez sur un service qui peut sauver des vies, jour et nuit.'
    },
  },

  COURAGE: {
    1: {
      en: 'First Step to Healing: Your support opens the door to counselling.',
      fr: 'Premier pas vers la guérison: Votre soutien ouvre la porte au counseling.'
    },
    2: {
      en: 'Walking Companion: You help maintain ongoing therapy for women and children.',
      fr: 'À leurs côtés: Vous soutenez la thérapie continue pour les femmes et les enfants.'
    },
    3: {
      en: 'Rebuilding Strength: You contribute to trauma recovery and regained confidence.',
      fr: 'Reconstruire la force: Vous aidez à la guérison du traumatisme et à retrouver la confiance.'
    },
    4: {
      en: 'Circle of Healing: You help sustain long-term support programs.',
      fr: 'Cercle de guérison: Vous contribuez à soutenir les programmes à long terme.'
    },
  },

  PROTECTION: {
    1: {
      en: 'First Safe Night: You provide emergency safety when danger is near.',
      fr: 'Première nuit en sécurité: Vous offrez une protection d’urgence quand le danger est proche.'
    },
    2: {
      en: 'A Door That Locks: You help maintain secure shelter and stability.',
      fr: 'Une porte qui se verrouille: Vous contribuez à un refuge sécuritaire et stable.'
    },
    3: {
      en: 'Safe Routine: You support families rebuilding a safe daily life.',
      fr: 'Routine apaisée: Vous aidez les familles à reconstruire un quotidien sécuritaire.'
    },
    4: {
      en: 'Guardian of Shelter: You stand behind long-term safety for women and children.',
      fr: 'Gardien du refuge: Vous soutenez la sécurité à long terme des femmes et des enfants.'
    },
  },

  SERVICE: {
    1: {
      en: 'Helping Hands: Your time keeps programs running.',
      fr: 'Mains aidantes: Votre temps permet aux services de continuer.'
    },
    2: {
      en: 'Steady Presence: You become part of the shelter’s daily rhythm.',
      fr: 'Présence fidèle: Vous faites partie du rythme quotidien du refuge.'
    },
    3: {
      en: 'House Pillar: Your commitment supports families over weeks and months.',
      fr: 'Pilier de la maison: Votre engagement soutient les familles au fil des semaines.'
    },
    4: {
      en: 'Heart of the House: You are one of the hands that sustain everything.',
      fr: 'Cœur de la maison: Vous êtes l’une des mains qui soutiennent tout.'
    },
  }
};
