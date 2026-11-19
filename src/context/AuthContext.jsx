import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (email, password) => {
    // Check local stored credentials or demo defaults
    try {
      const stored = localStorage.getItem('user');
      const parsed = stored ? JSON.parse(stored) : null;
      if (parsed && parsed.email === email && parsed.password === password) {
        setUser(parsed);
        return { success: true };
      }
    } catch {
      // fallback
    }

    // Demo account fallbacks
    if (email === 'seeker@jobhunt.com' || email.includes('@')) {
      const newUser = {
        name: email.split('@')[0],
        email: email,
        password: password,
        role: 'Job Seeker',
        avatar: './image-1.jpg'
      };
      setUser(newUser);
      return { success: true };
    }

    return { success: false, message: 'Invalid credentials. Try our 1-click Demo Login!' };
  };

  const register = ({ name, email, password, role }) => {
    const newUser = {
      name,
      email,
      password,
      role: role || 'Job Seeker',
      avatar: './image-2.jpg'
    };
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
