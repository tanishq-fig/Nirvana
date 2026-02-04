'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';


const AuthContext = createContext();

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/verify`, {
        withCredentials: true
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        username,
        password
      }, {
        withCredentials: true
      });
      
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      const kicked = error.response?.data?.kicked === true;
      return { 
        success: false, 
        kicked: kicked,
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (username, password, profilePicture) => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      if (profilePicture) {
        formData.append('profilePicture', profilePicture);
      }

      const response = await axios.post(`${API_URL}/api/auth/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
    setUser(null);
  };

  const updateProfilePicture = async (file) => {
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);

      const response = await axios.post(
        `${API_URL}/api/users/update-profile-picture`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        }
      );

      setUser({ ...user, profilePicture: response.data.profilePicture });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Update failed' 
      };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout,
      updateProfilePicture 
    }}>
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
