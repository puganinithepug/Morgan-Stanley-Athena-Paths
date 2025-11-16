
// Collective missions for teams

export const TEAM_QUESTS = [
  // ------------------------------------------------
  // WISDOM QUESTS — Crisis line support
  // ------------------------------------------------
  {
    id: "team-wisdom-1",
    path: "WISDOM",
    title: "The Circle of Voices",
    description: {
      en: "As a team, help sustain the crisis line so every call for help is answered.",
      fr: "En équipe, aidez à maintenir la ligne de crise pour que chaque appel soit entendu."
    },
    goal: {
      type: "xp",    // can be: "xp", "donations", "hours", "safe_nights"
      value: 500
    },
    reward: {
      xp: 200,
      badge: "Circle of Voices"
    },
    story: {
      en: "Your team became a steady voice on the other side of the line.",
      fr: "Votre équipe est devenue une présence rassurante au bout du fil."
    },
    season: "Any",
    active: true
  },

  // COURAGE QUESTS — Counselling support
 
  {
    id: "team-courage-1",
    path: "COURAGE",
    title: "Hearts in Step",
    description: {
      en: "Fund counselling sessions together to walk beside survivors on their path to healing.",
      fr: "Financez des séances de counseling ensemble pour accompagner les survivantes."
    },
    goal: {
      type: "donations",
      value: 10   // 10 counselling-related donations
    },
    reward: {
      xp: 300,
      badge: "Hearts in Step"
    },
    story: {
      en: "Together, your team walked beside those taking their first steps toward healing.",
      fr: "Ensemble, vous avez accompagné celles qui faisaient leurs premiers pas vers la guérison."
    },
    season: "Any",
    active: true
  },

  // PROTECTION QUESTS — Shelter & safe nights
 
  {
    id: "team-protection-1",
    path: "PROTECTION",
    title: "Twenty Safe Nights",
    description: {
      en: "Give 20 nights of safety in the shelter — together.",
      fr: "Offrez 20 nuits de sécurité au refuge — ensemble."
    },
    goal: {
      type: "safe_nights",
      value: 20
    },
    reward: {
      xp: 400,
      badge: "Safe Nights Guardians"
    },
    story: {
      en: "Your team secured nights of peace when they were needed most.",
      fr: "Votre équipe a assuré des nuits de paix quand c’était le plus nécessaire."
    },
    season: "Winter",
    active: true
  },

  // SERVICE QUESTS — Volunteering
  {
    id: "team-service-1",
    path: "SERVICE",
    title: "Hands That Sustain",
    description: {
      en: "Volunteer for a combined 15 hours. Many hands, one purpose.",
      fr: "Offrez 15 heures de bénévolat. Plusieurs mains, un même but."
    },
    goal: {
      type: "hours",
      value: 15
    },
    reward: {
      xp: 250,
      badge: "Hands That Sustain"
    },
    story: {
      en: "Together, your team became part of the rhythm of the house.",
      fr: "Votre équipe a fait partie du rythme de la maison."
    },
    season: "Any",
    active: true
  },

  // SEASONAL QUEST — Women’s Month (March)
  {
    id: "season-courage-2",
    path: "COURAGE",
    title: "Voices of March",
    description: {
      en: "In honor of Women's Month, support 5 counselling sessions as a team.",
      fr: "Pour le Mois des femmes, soutenez 5 séances de counseling en équipe."
    },
    goal: {
      type: "donations",
      value: 5
    },
    reward: {
      xp: 400,
      badge: "Voices of March"
    },
    story: {
      en: "Your team stood with women everywhere by opening doors to healing.",
      fr: "Votre équipe a soutenu les femmes en ouvrant des portes vers la guérison."
    },
    season: "March",
    active: false // becomes active in March
  }
];
