'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getIcon = (name) => {
    const icons = {
      Dashboard: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      Chat: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      Members: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      Developer: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    };
    return icons[name];
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Chat', path: '/dashboard/chat' },
    { name: 'Members', path: '/dashboard/members' },
    { name: 'Developer', path: '/dashboard/developer' },
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-95 backdrop-blur-md border-b border-gray-800 shadow-lg shadow-red-900/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => router.push('/dashboard')}
            className="cursor-pointer flex-shrink-0"
            style={{ marginLeft: '-120px' }}
          >
            <h2 className="text-4xl md:text-5xl font-gothic text-accent whitespace-nowrap tracking-widest glow-effect" style={{ textShadow: '0 0 20px rgba(139, 0, 0, 0.8), 0 0 30px rgba(139, 0, 0, 0.6)' }}>
              NIRVANA
            </h2>
          </motion.div>

          {/* Nav Items */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <motion.button
                  key={item.path}
                  onClick={() => router.push(item.path)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-accent text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {getIcon(item.name)}
                  <span className="font-medium text-sm">{item.name}</span>
                </motion.button>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-all"
            >
              <div className="w-10 h-10 rounded-full border-2 border-accent overflow-hidden bg-gray-800">
                {user?.profilePicture && user.profilePicture !== '/uploads/default-avatar.png' ? (
                  <img
                    src={`${API_URL}${user.profilePicture}`}
                    alt={user.username}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-white">{user?.username}</p>
                <p className="text-xs text-gray-400">{user?.role}</p>
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-black border border-gray-800 rounded-lg shadow-2xl overflow-hidden"
                >
                  <button
                    onClick={() => {
                      router.push('/dashboard/profile');
                      setShowUserMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left text-white hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    <span>👤</span>
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-red-400 hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    <span>🚪</span>
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
}
