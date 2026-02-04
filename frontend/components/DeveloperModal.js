'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function DeveloperModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const developerInfo = {
    name: 'Anveshi Patel',
    role: 'FSD dev',
    instagram: 'https://www.instagram.com/swaayyeee/',
    freefire: '129044454',
    discord: 'nerdwithblackglasses',
    image: '/images/developer.jpg'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-80 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="glass-effect rounded-2xl p-8 max-w-md w-full relative border-2 border-gothic-crimson dark:border-gothic-crimson light:border-gothic-gold">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full glass-effect flex items-center justify-center hover:bg-gothic-crimson dark:hover:bg-gothic-crimson light:hover:bg-gothic-gold transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Developer Image */}
              <div className="flex justify-center mb-6">
                <div className="w-32 h-32 rounded-full border-4 border-gothic-crimson dark:border-gothic-crimson light:border-gothic-gold overflow-hidden bg-gothic-dark dark:bg-gothic-dark light:bg-gothic-warm-grey">
                  <img 
                    src={developerInfo.image}
                    alt={developerInfo.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Developer Info */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-gothic text-gothic-blood dark:text-gothic-blood light:text-gothic-gold glow-effect mb-2">
                  {developerInfo.name}
                </h3>
                <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gothic-warm-grey font-gothic-text">
                  {developerInfo.role}
                </p>
              </div>

              {/* Social Links */}
              <div className="space-y-3">
                <a href={developerInfo.instagram} target="_blank" rel="noopener noreferrer">
                  <SocialLink
                    icon={
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    }
                    label="Instagram"
                    value="Visit Profile"
                  />
                </a>

                <SocialLink
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                  }
                  label="Discord"
                  value={developerInfo.discord}
                />

                <SocialLink
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 3.6v8.55c0 4.55-3.08 8.81-7 10.03V3.78l-1-.45z"/>
                    </svg>
                  }
                  label="Free Fire ID"
                  value={developerInfo.freefire}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SocialLink({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 glass-effect rounded-lg hover:bg-gothic-crimson dark:hover:bg-gothic-crimson light:hover:bg-gothic-gold hover:bg-opacity-20 transition-all duration-300">
      <div className="text-gothic-blood dark:text-gothic-blood light:text-gothic-gold">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-400 dark:text-gray-400 light:text-gothic-warm-grey">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
