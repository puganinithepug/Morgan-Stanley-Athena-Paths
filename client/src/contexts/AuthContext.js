import React, { createContext, useContext, useState, useEffect } from 'react';
import dataService from '../services/dataService';

const AuthContext = createContext();

function adaptBackendUserToFrontend(backendUser) {
  if (!backendUser) return null;

  const fullNameFromParts = [backendUser.fname, backendUser.lname]
    .filter(Boolean)
    .join(' ');

  const appUser = {
    id: backendUser.uuid || backendUser.id || backendUser.email,
    email: backendUser.email,
    full_name: backendUser.full_name || fullNameFromParts || backendUser.email,
    total_points: backendUser.total_points ?? 0,
    badges: backendUser.badges ?? [],
    primary_path: backendUser.primary_path ?? null,
    is_anonymous: false,
    preferred_language: backendUser.preferred_language || 'en',
    referral_code: backendUser.referral_code,
    avatar_url: backendUser.avatar_url || null,
  };

  // Persist into the local dataService so the rest of the app can use it
  dataService.setCurrentUser(appUser);
  return appUser;
}

async function fetchCurrentUser() {
  try {
    const res = await fetch('http://localhost:8000/me', {
      credentials: 'include',
    });
    const data = await res.json();
    if (data.logged_in && data.user) {
      return adaptBackendUserToFrontend(data.user);
    }
    return null;
  } catch (e) {
    console.error('Failed to fetch current user from backend', e);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On mount, try to hydrate user from backend session
    (async () => {
      const backendUser = await fetchCurrentUser();
      if (backendUser) {
        setUser(backendUser);
        setLoading(false);
        return;
      }

      // If backend didn't give us a user, check if demo mode is enabled via cookie
      let demoModeEnabled = false;
      if (typeof document !== 'undefined') {
        demoModeEnabled = document.cookie
          .split(';')
          .map((c) => c.trim())
          .some((c) => c.startsWith('demoMode='));
      }

      if (demoModeEnabled) {
        // Recreate the offline admin demo user
        const demoAdmin = {
          id: 'offline-admin',
          email: 'admin@offline.local',
          full_name: 'Admin (Offline Demo)',
          total_points: 0,
          badges: [],
          primary_path: 'WISDOM',
          is_anonymous: false,
          preferred_language: 'en',
          referral_code: 'ADMINOFFLINE',
          avatar_url: null,
        };
        dataService.setCurrentUser(demoAdmin);
        if (typeof dataService.hydrateDemoDonationsFromCookie === 'function') {
          dataService.hydrateDemoDonationsFromCookie();
        }
        setUser(demoAdmin);
        setLoading(false);
        return;
      }

      // Fallback to existing local dataService user if any
      const currentUser = dataService.getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    })();
  }, []);

  // Called after a successful login (e.g., from Login popup)
  // Tries backend first, then falls back to any local dataService user (for offline/demo mode)
  const login = async () => {
    const backendUser = await fetchCurrentUser();
    if (backendUser) {
      setUser(backendUser);
      return backendUser;
    }

    // Fallback: if backend is unreachable but we have a local user (e.g., offline demo admin), use that
    const localUser = dataService.getCurrentUser();
    if (localUser) {
      setUser(localUser);
      return localUser;
    }

    return null;
  };

  const logout = () => {
    // Optionally call backend /logout to clear cookie
    fetch('http://localhost:8000/logout', {
      method: 'POST',
      credentials: 'include',
    }).catch(() => {});

    // Clear both React auth state and any local/demo user (e.g., offline admin)
    setUser(null);
    if (typeof dataService.clearCurrentUser === 'function') {
      dataService.clearCurrentUser();
    }

    // Clear demo donations + demo mode cookie so it does not persist after logout
    if (typeof dataService.clearDemoDonationsCookie === 'function') {
      dataService.clearDemoDonationsCookie();
    }
    if (typeof document !== 'undefined') {
      document.cookie = 'demoMode=; path=/; max-age=0';
    }
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
