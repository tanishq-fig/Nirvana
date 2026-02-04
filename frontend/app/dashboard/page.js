'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (user) {
      loadActivities();
    }
  }, [user]);

  const loadActivities = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/activity/recent?limit=50`, {
        withCredentials: true
      });
      setActivities(response.data.activities || []);
    } catch (error) {
      console.error('Error loading activities:', error);
    }
  };

  const quickActions = [
    { name: 'Chat', icon: '💬', path: '/dashboard/chat', color: 'from-purple-600 to-purple-400' },
    { name: 'Members', icon: '👥', path: '/dashboard/members', color: 'from-red-600 to-red-400' },
    { name: 'Developer', icon: '💻', path: '/dashboard/developer', color: 'from-cyan-600 to-cyan-400' },
    { name: 'Profile', icon: '👤', path: '/dashboard/profile', color: 'from-yellow-600 to-yellow-400' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 md:mb-10 text-left"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-gothic text-gothic-blood dark:text-gothic-blood light:text-gothic-gold glow-effect mb-3 uppercase tracking-wider break-words">
          Welcome, {user?.username}
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-400 dark:text-gray-400 light:text-gothic-warm-grey font-gothic-text">
          Your role: <span className={`role-badge role-${user?.role} uppercase`}>{user?.role}</span>
        </p>
      </motion.div>

      {/* Quick Actions Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {quickActions.map((action, index) => (
          <motion.button
            key={action.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(action.path)}
            className="glass-effect rounded-xl p-6 border-2 border-gothic-crimson dark:border-gothic-crimson light:border-gothic-gold btn-glow transition-all duration-300"
          >
            <div className="text-6xl mb-4">{action.icon}</div>
            <h3 className="text-xl font-gothic text-white dark:text-white light:text-gothic-light">
              {action.name}
            </h3>
          </motion.button>
        ))}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-effect rounded-xl p-8 border-2 border-gothic-crimson dark:border-gothic-crimson light:border-gothic-gold mt-6"
      >
        <h2 className="text-3xl font-gothic text-gothic-blood dark:text-gothic-blood light:text-gothic-gold mb-6">
          Recent Activity
        </h2>
        <div className="max-h-[500px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <ActivityItem 
                key={activity._id}
                user={activity.user?.username || 'Unknown'} 
                action={getActivityAction(activity)}
                time={getTimeAgo(activity.createdAt)} 
                type={activity.type}
              />
            ))
          ) : (
            <div className="text-center text-gray-400 py-8">
              <p>No recent activity</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function getActivityAction(activity) {
  if (activity.type === 'user_kicked' && activity.target) {
    return `kicked ${activity.target.username}`;
  }
  switch (activity.type) {
    case 'user_joined':
      return 'joined the guild';
    case 'user_login':
      return 'logged in';
    case 'message_sent':
      return 'sent a message';
    default:
      return activity.description || 'did something';
  }
}

function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}

function StatCard({ title, value, icon }) {
  return (
    <div className="text-center p-4 bg-black bg-opacity-20 rounded-lg">
      <div className="text-4xl mb-2">{icon}</div>
      <div className="text-3xl font-bold text-gothic-blood dark:text-gothic-blood light:text-gothic-gold mb-1">
        {value}
      </div>
      <div className="text-sm text-gray-400 dark:text-gray-400 light:text-gothic-warm-grey">
        {title}
      </div>
    </div>
  );
}

function ActivityItem({ user, action, time, type }) {
  const getActivityIcon = () => {
    switch (type) {
      case 'user_joined':
        return (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        );
      case 'user_kicked':
        return <span className="text-xl">⚠️</span>;
      case 'user_login':
        return <span className="text-xl">🔓</span>;
      case 'message_sent':
        return <span className="text-xl">💬</span>;
      default:
        return <span className="text-xl">📌</span>;
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-black bg-opacity-20 rounded-lg">
      <div className="w-10 h-10 rounded-full bg-gothic-crimson dark:bg-gothic-crimson light:bg-gothic-gold flex items-center justify-center">
        {getActivityIcon()}
      </div>
      <div className="flex-1">
        <p className="text-white dark:text-white light:text-gothic-light">
          <span className="font-bold text-gothic-blood dark:text-gothic-blood light:text-gothic-gold">{user}</span>{' '}
          {action}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-400 light:text-gothic-warm-grey">{time}</p>
      </div>
    </div>
  );
}
