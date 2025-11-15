import React, { createContext, useContext, useState, useEffect } from 'react';
import dataService from '../services/dataService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = dataService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = (userData) => {
    let currentUser = dataService.getCurrentUser();
    
    if (!currentUser) {
      currentUser = dataService.createUser({
        email: userData.email || 'alex.thompson@example.com',
        full_name: userData.full_name || 'Alex Thompson',
        referral_code: `ALEX${Date.now().toString(36)}`,
        is_anonymous: false,
        preferred_language: 'en',
        avatar_url: userData.avatar_url || null,
      });
    }
    
    setUser(currentUser);
    return currentUser;
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates) => {
    if (!user) return;
    const updated = dataService.updateUser(user.id, updates);
    if (updated) {
      setUser(updated);
    }
    return updated;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

