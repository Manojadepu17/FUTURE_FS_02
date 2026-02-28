import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

/**
 * Authentication Context Provider
 * Manages authentication state and provides auth methods throughout the app
 */
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem('admin') || 'null'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    // Sync authentication state with localStorage
    if (token) {
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      setIsAuthenticated(false);
    }
  }, [token]);

  const login = (tokenValue, adminData) => {
    setToken(tokenValue);
    setAdmin(adminData);
    localStorage.setItem('token', tokenValue);
    localStorage.setItem('admin', JSON.stringify(adminData));
    setIsAuthenticated(true);
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    setIsAuthenticated(false);
  };

  const value = {
    token,
    admin,
    isAuthenticated,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
