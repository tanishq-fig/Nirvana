'use client';

import { motion } from 'framer-motion';

export default function DeveloperPage() {
  const developerInfo = {
    name: 'Anveshi Patel',
    title: 'FSD dev',
    social: {
      instagram: 'https://www.instagram.com/swaayyeee/',
      discord: 'nerdwithblackglasses',
      freefire: '129044454',
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 mt-8"
      >
        <h1 className="text-5xl font-gothic text-accent glow-effect mb-4 uppercase tracking-wider">
          Meet the Developer
        </h1>
        <p className="text-xl text-gray-400 font-gothic-text">
          The architect behind Nirvana
        </p>
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Image */}
          <div className="md:col-span-1 flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="w-48 h-48 rounded-full border-4 border-accent overflow-hidden bg-gray-800 mb-6"
            >
              <img 
                src="/images/developer.jpg" 
                alt="Anveshi Patel"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Developer Info */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-gothic text-accent mb-2">
              {developerInfo.name}
            </h2>
            <p className="text-xl text-gray-400 mb-6 font-gothic-text">
              {developerInfo.title}
            </p>

            {/* Social Links */}
            <div className="space-y-4">
              <SocialLink 
                icon={
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#FED576'}} />
                        <stop offset="50%" style={{stopColor: '#F47133'}} />
                        <stop offset="100%" style={{stopColor: '#BC3081'}} />
                      </linearGradient>
                    </defs>
                    <path fill="url(#instagram-gradient)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                }
                label="Instagram" 
                value={developerInfo.social.instagram} 
                isLink={true} 
              />
              <SocialLink 
                icon={
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#5865F2" d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                }
                label="Discord" 
                value={developerInfo.social.discord} 
              />
              <SocialLink 
                icon={
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="fire-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#FF4500'}} />
                        <stop offset="100%" style={{stopColor: '#FF8C00'}} />
                      </linearGradient>
                    </defs>
                    <path fill="url(#fire-gradient)" d="M12 2c-1.5 0-2.7 1.1-3.4 2.8-.3.8-.5 1.7-.5 2.7 0 1.1.2 2.2.7 3.2-1.5-1-2.5-2.7-2.5-4.7 0-.5.1-1 .2-1.5C4.3 5.9 3 8.3 3 11c0 4.4 3.6 8 8 8h2c4.4 0 8-3.6 8-8 0-2.7-1.3-5.1-3.5-6.5.1.5.2 1 .2 1.5 0 2-1 3.7-2.5 4.7.5-1 .7-2.1.7-3.2 0-1-.2-1.9-.5-2.7C14.7 3.1 13.5 2 12 2zm1 14h-2c-2.2 0-4-1.8-4-4 0-.8.2-1.5.6-2.2.5 1.3 1.7 2.2 3.1 2.2h.6c1.4 0 2.6-.9 3.1-2.2.4.7.6 1.4.6 2.2 0 2.2-1.8 4-4 4z"/>
                  </svg>
                }
                label="Free Fire ID" 
                value={developerInfo.social.freefire} 
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card mt-8"
      >
        <h3 className="text-2xl font-gothic text-accent mb-4">
          kuch extra feature add krna ho to contact me on insta
        </h3>
      </motion.div>
    </div>
  );
}

function SocialLink({ icon, label, value, isLink }) {
  const content = (
    <motion.div
      whileHover={{ x: 5 }}
      className="flex items-center gap-3 p-3 rounded-lg bg-gray-800 bg-opacity-50"
    >
      <div>{icon}</div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-white font-medium">{isLink ? 'Visit Profile' : value}</p>
      </div>
    </motion.div>
  );

  if (isLink) {
    return (
      <a href={value} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
