'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';
import ThemeToggle from '../../components/ThemeToggle';
import ParticleBackground from '../../components/ParticleBackground';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    setLoading(true);

    const result = await register(formData.username, formData.password, profilePicture);

    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gothic-darker dark:bg-gothic-darker light:bg-gothic-light flex items-center justify-center py-12">
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
            className="text-4xl font-gothic text-center text-gothic-blood dark:text-gothic-blood light:text-gothic-gold glow-effect mb-2"
          >
            Join Nirvana
          </motion.h1>
          <p className="text-center text-gray-400 dark:text-gray-400 light:text-gothic-warm-grey text-sm mb-8">
            Create your gothic profile
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-4 border-gothic-crimson dark:border-gothic-crimson light:border-gothic-gold overflow-hidden bg-gothic-dark dark:bg-gothic-dark light:bg-gothic-warm-grey mb-3">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <label className="cursor-pointer text-sm text-gothic-blood dark:text-gothic-blood light:text-gothic-gold hover:underline">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                Upload Profile Picture (Optional)
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300 dark:text-gray-300 light:text-gothic-light">
                Username *
              </label>
              <input
                type="text"
                required
                minLength={3}
                maxLength={20}
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-3 rounded-lg glass-effect border-2 border-gothic-crimson dark:border-gothic-crimson light:border-gothic-gold focus:outline-none focus:border-gothic-blood dark:focus:border-gothic-blood light:focus:border-gothic-amber transition-all duration-300 bg-transparent text-white dark:text-white light:text-gothic-light"
                placeholder="Choose a username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300 dark:text-gray-300 light:text-gothic-light">
                Password *
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-lg glass-effect border-2 border-gothic-crimson dark:border-gothic-crimson light:border-gothic-gold focus:outline-none focus:border-gothic-blood dark:focus:border-gothic-blood light:focus:border-gothic-amber transition-all duration-300 bg-transparent text-white dark:text-white light:text-gothic-light"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300 dark:text-gray-300 light:text-gothic-light">
                Confirm Password *
              </label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-lg glass-effect border-2 border-gothic-crimson dark:border-gothic-crimson light:border-gothic-gold focus:outline-none focus:border-gothic-blood dark:focus:border-gothic-blood light:focus:border-gothic-amber transition-all duration-300 bg-transparent text-white dark:text-white light:text-gothic-light"
                placeholder="Confirm your password"
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
              {loading ? 'Creating...' : 'Create Account'}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 dark:text-gray-400 light:text-gothic-warm-grey">
              Already a member?{' '}
              <Link href="/login" className="text-gothic-blood dark:text-gothic-blood light:text-gothic-gold hover:underline font-medium">
                Sign In
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
