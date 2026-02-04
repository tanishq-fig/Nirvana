'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function RemovedPage() {
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    // Force logout
    logout();
  }, [logout]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-red-900/20 to-black"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center px-6"
      >
        {/* Broken icon */}
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="text-9xl mb-8"
        >
          ⛔
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-6xl font-gothic text-accent mb-6"
        >
          ACCESS DENIED
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-3xl font-gothic-text text-white mb-4"
        >
          Sorry, Nirvana isn't for you
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-gray-400 mb-12 max-w-md mx-auto"
        >
          You have been removed from the guild by a developer.
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/')}
          className="btn-secondary"
        >
          Return to Home
        </motion.button>
      </motion.div>
    </div>
  );
}
