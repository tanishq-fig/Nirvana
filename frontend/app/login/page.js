'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';
import ThemeToggle from '../../components/ThemeToggle';
import ParticleBackground from '../../components/ParticleBackground';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.username, formData.password);

    if (result.success) {
      router.push('/dashboard');
    } else {
      if (result.kicked) {
        router.push('/kicked');
      } else {
        setError(result.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gothic-darker dark:bg-gothic-darker light:bg-gothic-light flex items-center justify-center">
      <ParticleBackground />
      <div className="fog-overlay"></div>

      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="glass-effect rounded-2xl p-8 border-2 border-gothic-crimson dark:border-gothic-crimson light:border-gothic-gold">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-gothic text-center text-gothic-blood dark:text-gothic-blood light:text-gothic-gold glow-effect mb-8"
          >
            Welcome Back
          </motion.h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300 dark:text-gray-300 light:text-gothic-light">
                Username
              </label>
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-3 rounded-lg glass-effect border-2 border-gothic-crimson dark:border-gothic-crimson light:border-gothic-gold focus:outline-none focus:border-gothic-blood dark:focus:border-gothic-blood light:focus:border-gothic-amber transition-all duration-300 bg-transparent text-white dark:text-white light:text-gothic-light"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300 dark:text-gray-300 light:text-gothic-light">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-lg glass-effect border-2 border-gothic-crimson dark:border-gothic-crimson light:border-gothic-gold focus:outline-none focus:border-gothic-blood dark:focus:border-gothic-blood light:focus:border-gothic-amber transition-all duration-300 bg-transparent text-white dark:text-white light:text-gothic-light"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-red-900 bg-opacity-50 border border-red-500 text-red-200 text-sm"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gothic-crimson dark:bg-gothic-crimson light:bg-gothic-gold text-white font-gothic text-lg rounded-lg btn-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {loading ? 'Entering...' : 'Enter Nirvana'}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 dark:text-gray-400 light:text-gothic-warm-grey">
              Not a member yet?{' '}
              <Link href="/register" className="text-gothic-blood dark:text-gothic-blood light:text-gothic-gold hover:underline font-medium">
                Join Nirvana
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-gray-500 dark:text-gray-500 light:text-gothic-warm-grey hover:text-gothic-blood dark:hover:text-gothic-blood light:hover:text-gothic-gold transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
