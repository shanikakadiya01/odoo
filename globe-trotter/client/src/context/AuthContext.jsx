import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiLogin, apiDemoLogin, apiRegister } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('gt_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('gt_currency') || 'USD';
  });
  const [bookmarks, setBookmarks] = useState(() => {
    const stored = localStorage.getItem('gt_bookmarks');
    return stored ? JSON.parse(stored) : ['city_paris_01', 'city_tokyo_02', 'city_bali_05'];
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  useEffect(() => {
    if (user) {
      localStorage.setItem('gt_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gt_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('gt_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('gt_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const login = async (email, password) => {
    const res = await apiLogin(email, password);
    if (res && res.user) {
      setUser(res.user);
      setAuthModalOpen(false);
      return res.user;
    }
    throw new Error('Login failed');
  };

  const loginDemo = async () => {
    const res = await apiDemoLogin();
    if (res && res.user) {
      setUser(res.user);
      setAuthModalOpen(false);
      return res.user;
    }
  };

  const register = async (userData) => {
    const res = await apiRegister({ ...userData, currency });
    if (res && res.user) {
      setUser(res.user);
      setAuthModalOpen(false);
      return res.user;
    }
    throw new Error('Registration failed');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gt_token');
    localStorage.removeItem('gt_user');
  };

  const toggleBookmark = (cityId) => {
    setBookmarks((prev) => {
      if (prev.includes(cityId)) {
        return prev.filter((id) => id !== cityId);
      } else {
        return [...prev, cityId];
      }
    });
  };

  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        currency,
        setCurrency,
        bookmarks,
        toggleBookmark,
        authModalOpen,
        setAuthModalOpen,
        authMode,
        setAuthMode,
        openAuth,
        login,
        loginDemo,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
