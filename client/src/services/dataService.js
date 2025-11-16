import communityDonations from '../data/communityDonations.json';

const memoryStorage = {
  USER: null,
  DONATIONS: [],
  IMPACT_ITEMS: [],
  GOALS: [],
  MESSAGES: [],
  REACTIONS: [],
  REFERRALS: [],
  USERS: [],
  TEAMS: [],
};

const DEMO_DONATIONS_COOKIE = 'demoDonations';

function loadDemoDonationsFromCookie() {
  if (typeof document === 'undefined') return [];
  const cookie = document.cookie
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(DEMO_DONATIONS_COOKIE + '='));
  if (!cookie) return [];
  try {
    const value = decodeURIComponent(cookie.split('=')[1] || '');
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveDemoDonationsToCookie(donations) {
  if (typeof document === 'undefined') return;
  try {
    const value = encodeURIComponent(JSON.stringify(donations || []));
    // Short-ish max-age; this is demo data only
    document.cookie = `${DEMO_DONATIONS_COOKIE}=${value}; path=/; max-age=86400`;
  } catch {
    // Ignore cookie write errors
  }
}

const initializeData = () => {
  if (memoryStorage.IMPACT_ITEMS.length === 0) {
    memoryStorage.IMPACT_ITEMS = [
      {
        id: '1',
        path: 'WISDOM',
        title_en: '24/7 Crisis Line Support',
        title_fr: 'Support de Ligne de Crise 24/7',
        description_en: 'Fund crisis line operations for 1 week',
        description_fr: 'Financer les opérations de la ligne de crise pendant 1 semaine',
        suggested_amount: 50,
        impact_unit: 'week',
        icon: 'phone',
      },
      {
        id: '2',
        path: 'WISDOM',
        title_en: 'Information Package',
        title_fr: 'Trousse d\'Information',
        description_en: 'Provide comprehensive resources for women reaching out',
        description_fr: 'Fournir des ressources complètes pour les femmes qui demandent de l\'aide',
        suggested_amount: 25,
        impact_unit: 'package',
        icon: 'book',
      },
      {
        id: '3',
        path: 'COURAGE',
        title_en: 'Individual Counseling Session',
        title_fr: 'Séance de Counseling Individuelle',
        description_en: 'Fund one professional therapy session',
        description_fr: 'Financer une séance de thérapie professionnelle',
        suggested_amount: 100,
        impact_unit: 'session',
        icon: 'heart',
      },
      {
        id: '4',
        path: 'COURAGE',
        title_en: 'Children\'s Support Program',
        title_fr: 'Programme de Soutien pour Enfants',
        description_en: 'Support healing programs for children',
        description_fr: 'Soutenir les programmes de guérison pour les enfants',
        suggested_amount: 75,
        impact_unit: 'program_week',
        icon: 'users',
      },
      {
        id: '5',
        path: 'PROTECTION',
        title_en: 'Safe Shelter Night',
        title_fr: 'Nuit d\'Hébergement Sécuritaire',
        description_en: 'Provide one night of safe emergency shelter',
        description_fr: 'Fournir une nuit d\'hébergement d\'urgence sécuritaire',
        suggested_amount: 80,
        impact_unit: 'night',
        icon: 'home',
      },
      {
        id: '6',
        path: 'PROTECTION',
        title_en: 'Emergency Safety Kit',
        title_fr: 'Trousse de Sécurité d\'Urgence',
        description_en: 'Essential supplies for families in transition',
        description_fr: 'Fournitures essentielles pour les familles en transition',
        suggested_amount: 50,
        impact_unit: 'kit',
        icon: 'package',
      },
    ];
  }

  if (memoryStorage.GOALS.length === 0) {
    memoryStorage.GOALS = [
      {
        id: '1',
        title_en: 'Winter Shelter Fund',
        title_fr: 'Fonds d\'Hébergement d\'Hiver',
        description_en: 'Help us provide 500 warm shelter nights this winter',
        description_fr: 'Aidez-nous à fournir 500 nuits d\'hébergement au chaud cet hiver',
        target_amount: 40000,
        current_amount: 15230,
        path: 'PROTECTION',
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        is_active: true,
        icon: 'home',
      },
      {
        id: '2',
        title_en: 'Counseling for Kids',
        title_fr: 'Counseling pour Enfants',
        description_en: 'Expand our children\'s therapy programs',
        description_fr: 'Élargir nos programmes de thérapie pour enfants',
        target_amount: 25000,
        current_amount: 8750,
        path: 'COURAGE',
        deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
        is_active: true,
        icon: 'heart',
      },
    ];

    memoryStorage.GOALS.forEach(goal => {
      const goalDonations = communityDonations.filter(d => d.goal_id === goal.id);
      const totalAmount = goalDonations.reduce((sum, d) => sum + d.amount, 0);
      goal.current_amount = (goal.current_amount || 0) + totalAmount;
    });
  }

  if (memoryStorage.USERS.length === 0) {
    memoryStorage.USERS = [
      {
        id: 'user-1',
        email: 'sarah.chen@example.com',
        full_name: 'Sarah Chen',
        total_points: 450,
        badges: ['first_donation', 'wisdom_path'],
        primary_path: 'WISDOM',
        is_anonymous: false,
        preferred_language: 'en',
        referral_code: 'SARAH2024',
        avatar_url: 'https://www.freepik.com/free-vector/user-circles-set_145856997.htm#fromView=keyword&page=1&position=0&uuid=b455faa9-16f6-4e10-b31c-4f2a4bf168b5&query=Generic+profile',
        created_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'user-2',
        email: 'marie.dubois@example.com',
        full_name: 'Marie Dubois',
        total_points: 380,
        badges: ['courage_path', 'community_supporter'],
        primary_path: 'COURAGE',
        is_anonymous: false,
        preferred_language: 'fr',
        referral_code: 'MARIE2024',
        avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        created_date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'user-3',
        email: 'james.wilson@example.com',
        full_name: 'James Wilson',
        total_points: 520,
        badges: ['protection_path', 'first_donation', 'monthly_donor'],
        primary_path: 'PROTECTION',
        is_anonymous: false,
        preferred_language: 'en',
        referral_code: 'JAMES2024',
        avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        created_date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'user-4',
        email: 'lisa.martinez@example.com',
        full_name: 'Lisa Martinez',
        total_points: 290,
        badges: ['wisdom_path'],
        primary_path: 'WISDOM',
        is_anonymous: false,
        preferred_language: 'en',
        referral_code: 'LISA2024',
        created_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'user-5',
        email: 'pierre.tremblay@example.com',
        full_name: 'Pierre Tremblay',
        total_points: 340,
        badges: ['courage_path'],
        primary_path: 'COURAGE',
        is_anonymous: false,
        preferred_language: 'fr',
        referral_code: 'PIERRE2024',
        created_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'user-6',
        email: 'anonymous1@example.com',
        full_name: 'Anonymous',
        total_points: 525,
        badges: ['protection_path', 'first_donation', 'hundred_club', 'five_hundred_club'],
        primary_path: 'PROTECTION',
        is_anonymous: true,
        preferred_language: 'en',
        referral_code: 'ANON1',
        created_date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'user-7',
        email: 'anonymous2@example.com',
        full_name: 'Anonymous',
        total_points: 450,
        badges: ['courage_path', 'first_donation', 'hundred_club'],
        primary_path: 'COURAGE',
        is_anonymous: true,
        preferred_language: 'en',
        referral_code: 'ANON2',
        created_date: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'user-8',
        email: 'anonymous3@example.com',
        full_name: 'Anonymous',
        total_points: 375,
        badges: ['protection_path', 'first_donation'],
        primary_path: 'PROTECTION',
        is_anonymous: true,
        preferred_language: 'en',
        referral_code: 'ANON3',
        created_date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'user-9',
        email: 'anonymous4@example.com',
        full_name: 'Anonymous',
        total_points: 300,
        badges: ['wisdom_path', 'first_donation'],
        primary_path: 'WISDOM',
        is_anonymous: true,
        preferred_language: 'en',
        referral_code: 'ANON4',
        created_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'user-10',
        email: 'anonymous5@example.com',
        full_name: 'Anonymous',
        total_points: 285,
        badges: ['wisdom_path', 'first_donation'],
        primary_path: 'WISDOM',
        is_anonymous: true,
        preferred_language: 'en',
        referral_code: 'ANON5',
        created_date: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'user-11',
        email: 'anonymous6@example.com',
        full_name: 'Anonymous',
        total_points: 258,
        badges: ['courage_path', 'first_donation'],
        primary_path: 'COURAGE',
        is_anonymous: true,
        preferred_language: 'en',
        referral_code: 'ANON6',
        created_date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'user-12',
        email: 'anonymous7@example.com',
        full_name: 'Anonymous',
        total_points: 257,
        badges: ['wisdom_path', 'first_donation'],
        primary_path: 'WISDOM',
        is_anonymous: true,
        preferred_language: 'en',
        referral_code: 'ANON7',
        created_date: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'user-13',
        email: 'anonymous8@example.com',
        full_name: 'Anonymous',
        total_points: 241,
        badges: ['wisdom_path', 'first_donation'],
        primary_path: 'WISDOM',
        is_anonymous: true,
        preferred_language: 'en',
        referral_code: 'ANON8',
        created_date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'user-14',
        email: 'anonymous9@example.com',
        full_name: 'Anonymous',
        total_points: 214,
        badges: ['wisdom_path', 'first_donation'],
        primary_path: 'WISDOM',
        is_anonymous: true,
        preferred_language: 'en',
        referral_code: 'ANON9',
        created_date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'user-15',
        email: 'anonymous10@example.com',
        full_name: 'Anonymous',
        total_points: 160,
        badges: ['wisdom_path', 'first_donation'],
        primary_path: 'WISDOM',
        is_anonymous: true,
        preferred_language: 'en',
        referral_code: 'ANON10',
        created_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  }
  
  if (memoryStorage.TEAMS.length === 0) {
    memoryStorage.TEAMS = [
      {
        id: 'team-1',
        name: 'Hope Warriors',
        description: 'Dedicated to supporting crisis line operations',
        leader_id: 'user-1',
        member_count: 8,
        total_points: 1250,
        path: 'WISDOM',
        members: ['user-1', 'user-4', 'user-9', 'user-10', 'user-12', 'user-13', 'user-14', 'user-15'],
        created_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'team-2',
        name: 'Courage Collective',
        description: 'Supporting counseling and mental health services',
        leader_id: 'user-2',
        member_count: 12,
        total_points: 1890,
        path: 'COURAGE',
        members: ['user-2', 'user-5', 'user-7', 'user-11'],
        created_date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'team-3',
        name: 'Protection Guardians',
        description: 'Funding safe shelter and emergency housing',
        leader_id: 'user-3',
        member_count: 6,
        total_points: 2100,
        path: 'PROTECTION',
        members: ['user-3', 'user-6', 'user-8'],
        created_date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'team-4',
        name: 'Service Stars',
        description: 'Volunteers making a difference every day',
        leader_id: 'user-4',
        member_count: 15,
        total_points: 950,
        path: 'SERVICE',
        members: ['user-4'],
        created_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  }
};

initializeData();

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const DEFAULT_DONATIONS = [
  {
    id: 'default-don-1',
    user_id: 'user-1',
    user_name: 'Sarah Chen',
    path: 'WISDOM',
    amount: 200,
    points_awarded: 200,
    impact_item_id: '1',
    impact_item_title: '24/7 Crisis Line Support',
    created_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'default-don-2',
    user_id: 'user-2',
    user_name: 'Marie Dubois',
    path: 'COURAGE',
    amount: 300,
    points_awarded: 360,
    impact_item_id: '3',
    impact_item_title: 'Individual Counseling Session',
    created_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'default-don-3',
    user_id: 'user-3',
    user_name: 'James Wilson',
    path: 'PROTECTION',
    amount: 300,
    points_awarded: 450,
    impact_item_id: '5',
    impact_item_title: 'Safe Shelter Night',
    created_date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'default-don-4',
    user_id: 'user-6',
    user_name: 'Anonymous',
    path: 'PROTECTION',
    amount: 400,
    points_awarded: 600,
    impact_item_id: '5',
    impact_item_title: 'Safe Shelter Night',
    created_date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'default-don-5',
    user_id: 'user-7',
    user_name: 'Anonymous',
    path: 'COURAGE',
    amount: 350,
    points_awarded: 420,
    impact_item_id: '4',
    impact_item_title: 'Children\'s Support Program',
    created_date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const DEFAULT_MESSAGES = [
  {
    id: 'default-msg-1',
    display_name: 'Anonymous',
    message: 'You are stronger than you know. Keep moving forward, one step at a time.',
    language: 'en',
    created_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'default-msg-2',
    display_name: 'Hope Giver',
    message: 'Your courage inspires us all. You are not alone in this journey.',
    language: 'en',
    created_date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'default-msg-3',
    display_name: 'Community Supporter',
    message: 'We stand with you. Your story matters, and your future holds so much hope.',
    language: 'en',
    created_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'default-msg-4',
    display_name: 'Anonymous',
    message: 'Your children will see your strength and learn from your courage. You are their hero.',
    language: 'en',
    created_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'default-msg-5',
    display_name: 'Hope Warrior',
    message: 'Your resilience is inspiring. Keep fighting for the life you deserve.',
    language: 'en',
    created_date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const dataService = {
  getCurrentUser: () => {
    return memoryStorage.USER;
  },

  clearCurrentUser: () => {
    memoryStorage.USER = null;
  },

  // For offline admin demo: load persisted donations from cookie into memory
  hydrateDemoDonationsFromCookie: () => {
    const demoDonations = loadDemoDonationsFromCookie();
    if (Array.isArray(demoDonations) && demoDonations.length > 0) {
      memoryStorage.DONATIONS = demoDonations;
    }
  },

  clearDemoDonationsCookie: () => {
    if (typeof document === 'undefined') return;
    document.cookie = `${DEMO_DONATIONS_COOKIE}=; path=/; max-age=0`;
  },

  setCurrentUser: (user) => {
    memoryStorage.USER = user;
    const users = memoryStorage.USERS;
    const existingIndex = users.findIndex(u => u.id === user.id);
    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }
  },

  createUser: (userData) => {
    const user = {
      id: generateId(),
      ...userData,
      total_points: 0,
      badges: [],
      created_date: new Date().toISOString(),
    };
    dataService.setCurrentUser(user);
    return user;
  },

  updateUser: (userId, updates) => {
    const users = memoryStorage.USERS;
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex >= 0) {
      users[userIndex] = { ...users[userIndex], ...updates };
      
      const currentUser = dataService.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        dataService.setCurrentUser(users[userIndex]);
      }
      return users[userIndex];
    }
    return null;
  },

  getAllUsers: () => memoryStorage.USERS,

  getDonations: (filters = {}) => {
    const userDonations = memoryStorage.DONATIONS;
    const allDonations = [...DEFAULT_DONATIONS, ...userDonations];
    
    let filtered = allDonations;
    if (filters.user_id) {
      filtered = filtered.filter(d => d.user_id === filters.user_id);
    }
    if (filters.path) {
      filtered = filtered.filter(d => d.path === filters.path);
    }
    return filtered.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
  },

  createDonation: (donationData) => {
    const donation = {
      id: generateId(),
      ...donationData,
      // Allow callers (like demo/offline flows) to specify an explicit date; otherwise default to now
      created_date: donationData.created_date || new Date().toISOString(),
    };
    memoryStorage.DONATIONS.push(donation);

    // Persist offline admin demo donations across reloads using a cookie
    if (donationData.user_id === 'offline-admin') {
      const existing = loadDemoDonationsFromCookie() || [];
      existing.push(donation);
      saveDemoDonationsToCookie(existing);
    }

    return donation;
  },

  getImpactItems: (path = null) => {
    const items = memoryStorage.IMPACT_ITEMS;
    return path ? items.filter(item => item.path === path) : items;
  },

  getGoals: (activeOnly = false) => {
    const goals = memoryStorage.GOALS;
    return activeOnly ? goals.filter(g => g.is_active) : goals;
  },

  updateGoal: (goalId, updates) => {
    const goals = memoryStorage.GOALS;
    const goalIndex = goals.findIndex(g => g.id === goalId);
    if (goalIndex >= 0) {
      goals[goalIndex] = { ...goals[goalIndex], ...updates };
      return goals[goalIndex];
    }
    return null;
  },

  getMessages: (limit = null) => {
    const userMessages = memoryStorage.MESSAGES;
    const allMessages = [...DEFAULT_MESSAGES, ...userMessages];
    allMessages.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    
    return limit ? allMessages.slice(0, limit) : allMessages;
  },

  createMessage: (messageData) => {
    const message = {
      id: generateId(),
      ...messageData,
      created_date: new Date().toISOString(),
    };
    memoryStorage.MESSAGES.push(message);
    return message;
  },

  getReactions: (storyId = null) => {
    const reactions = memoryStorage.REACTIONS;
    return storyId ? reactions.filter(r => r.story_id === storyId) : reactions;
  },

  createReaction: (reactionData) => {
    const reactions = memoryStorage.REACTIONS;
    const existing = reactions.find(
      r => r.story_id === reactionData.story_id && r.user_id === reactionData.user_id
    );
    
    if (existing) {
      const index = reactions.indexOf(existing);
      reactions.splice(index, 1);
      return null;
    } else {
      const reaction = {
        id: generateId(),
        ...reactionData,
        created_date: new Date().toISOString(),
      };
      reactions.push(reaction);
      return reaction;
    }
  },

  getReferrals: (referrerId = null) => {
    const referrals = memoryStorage.REFERRALS;
    return referrerId ? referrals.filter(r => r.referrer_id === referrerId) : referrals;
  },

  createReferral: (referralData) => {
    const referral = {
      id: generateId(),
      ...referralData,
      created_date: new Date().toISOString(),
    };
    memoryStorage.REFERRALS.push(referral);
    return referral;
  },

//TEAMS METHODS
  getTeams: () => {
    return memoryStorage.TEAMS || [];
  },

  createTeam: (teamData) => {
    const teams = memoryStorage.TEAMS = memoryStorage.TEAMS || [];
    const team = {
      id: generateId(),
      ...teamData,
      created_date: new Date().toISOString(),
    };
    teams.push(team);
    return team;
  },

  updateTeam: (teamId, updates) => {
    const teams = memoryStorage.TEAMS || [];
    const teamIndex = teams.findIndex(t => t.id === teamId);
    if (teamIndex >= 0) {
      teams[teamIndex] = { ...teams[teamIndex], ...updates };
      return teams[teamIndex];
    }
    return null;
  },

  joinTeam: (teamId, userId) => {
    const teams = memoryStorage.TEAMS || [];
    const team = teams.find(t => t.id === teamId);
    if (team) {
      if (!team.members) team.members = [];
      if (!team.members.includes(userId)) {
        team.members.push(userId);
        team.member_count = team.members.length;
      }
      return team;
    }
    return null;
  },
};

export default dataService;
