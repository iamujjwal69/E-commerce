"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://e-commerce-backend-production-ebd6.up.railway.app/api/v1';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('auth_token');
      const savedUser = localStorage.getItem('auth_user');
      
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
      setIsReady(true);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/users/login`, { email, password });
    const { token: newToken, user: userData } = res.data;
    
    localStorage.setItem('auth_token', newToken);
    localStorage.setItem('auth_user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
    return res.data;
  };

  const register = async (email, password, first_name, last_name) => {
    const res = await axios.post(`${API_URL}/users/register`, { email, password, first_name, last_name });
    const { token: newToken, user: userData } = res.data;
    
    localStorage.setItem('auth_token', newToken);
    localStorage.setItem('auth_user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setToken(null);
    setUser(null);
    window.location.reload();
  };

  const openAuthModal = () => {
    window.dispatchEvent(new Event('auth:open'));
  };

  return (
    <AuthContext.Provider value={{ user, token, isReady, login, register, logout, openAuthModal }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
