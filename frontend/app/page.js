'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import DeveloperModal from '@/components/DeveloperModal';

export default function Home() {
  const router = useRouter();
  const [showDevModal, setShowDevModal] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at center, #2d0a0a 0%, #1a0000 50%, #000000 100%)'
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12 relative"
        >
          <motion.div
            className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-96 h-96 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              background: 'radial-gradient(circle, rgba(139, 0, 0, 0.4) 0%, transparent 70%)',
              filter: 'blur(40px)'
            }}
          />

          <motion.h1 
            className="font-gothic-text tracking-widest relative z-10 inline-block"
            style={{
              fontSize: '7rem',
              fontWeight: 900,
              background: 'linear-gradient(180deg, #ff0000 0%, #8b0000 50%, #440000 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px rgba(139, 0, 0, 0.8))'
            }}
            animate={{
              textShadow: [
                '0 0 20px rgba(139, 0, 0, 0.8), 0 0 40px rgba(139, 0, 0, 0.6), 0 0 60px rgba(139, 0, 0, 0.4)',
                '0 0 40px rgba(139, 0, 0, 1), 0 0 60px rgba(139, 0, 0, 0.8), 0 0 80px rgba(139, 0, 0, 0.6)',
                '0 0 20px rgba(139, 0, 0, 0.8), 0 0 40px rgba(139, 0, 0, 0.6), 0 0 60px rgba(139, 0, 0, 0.4)'
              ],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            NIRVANA
          </motion.h1>

          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 left-1/2 w-1 h-1 bg-red-600 rounded-full"
              style={{
                transformOrigin: 'center center',
              }}
              animate={{
                x: [0, Math.cos(i * 120 * Math.PI / 180) * 200],
                y: [0, Math.sin(i * 120 * Math.PI / 180) * 200],
                scale: [1, 0],
                opacity: [1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeOut"
              }}
            />
          ))}

          <motion.div
            className="absolute inset-0 border-2 border-red-900 rounded-full opacity-30"
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, 360],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`blood-${i}`}
              className="absolute w-2 h-2 bg-red-600 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, 20, 0],
                opacity: [0.6, 0.2, 0.6],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl text-gray-300 mb-12 font-gothic-text tracking-wider"
        >
          Smells Like Teen Spirit
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/login')}
            className="px-10 py-4 font-gothic-text text-lg font-semibold text-white rounded-lg transition-all duration-300 relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #8b0000 0%, #4a0000 100%)',
              boxShadow: '0 0 30px rgba(139, 0, 0, 0.5)',
            }}
          >
            <span className="relative z-10">Enter Portal</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-900"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/register')}
            className="px-10 py-4 font-gothic-text text-lg font-semibold text-white border-2 border-red-900 rounded-lg transition-all duration-300 relative overflow-hidden group"
            style={{
              boxShadow: '0 0 20px rgba(139, 0, 0, 0.3)',
            }}
          >
            <span className="relative z-10">Join Guild</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-900 to-black opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowDevModal(true)}
          className="mt-12 text-sm text-gray-500 hover:text-accent transition-colors font-gothic-text"
        >
          Developer Access
        </motion.button>
      </div>

      <DeveloperModal 
        isOpen={showDevModal} 
        onClose={() => setShowDevModal(false)} 
      />

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      />
    </div>
  );
}
