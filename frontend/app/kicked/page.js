'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function KickedPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear all auth data
    document.cookie = 'nirvana-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.clear();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gothic-darker relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950 to-black opacity-50"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center px-6"
      >
        {/* Laughing Emoji */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          className="text-9xl mb-8"
        >
          😂
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <h1 className="text-6xl font-gothic text-accent glow-effect mb-4">
            SORRY
          </h1>
          <p className="text-3xl text-gray-300 font-gothic-text mb-8">
            Nirvana can't accept you, cutie
          </p>
          <motion.div
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(255, 0, 0, 0.3)',
                '0 0 40px rgba(255, 0, 0, 0.6)',
                '0 0 20px rgba(255, 0, 0, 0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block px-8 py-4 rounded-xl glass-effect border-2 border-gothic-crimson"
          >
            <p className="text-xl text-gray-400">
              You've been kicked from the guild
            </p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/')}
            className="mt-8 px-8 py-3 bg-gothic-crimson hover:bg-red-800 text-white font-gothic rounded-lg transition-all duration-300 shadow-lg"
          >
            Return to Home
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
