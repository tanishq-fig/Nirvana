'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ProfilePage() {
  const { user, updateProfilePicture } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select an image first');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('profilePicture', selectedFile);

      const response = await fetch(`${API_URL}/api/users/update-profile-picture`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Profile picture updated successfully!');
        await updateProfilePicture(selectedFile);
        setPreview(null);
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setMessage(data.message || 'Upload failed');
      }
    } catch (error) {
      setMessage('Upload failed: ' + error.message);
    }

    setUploading(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const cancelUpload = () => {
    setPreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-gothic text-accent mb-2">
          Your Profile
        </h1>
        <p className="text-gray-400">
          Manage your guild profile settings
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card mb-8"
      >
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 rounded-full border-4 border-accent overflow-hidden bg-gray-800 mb-4">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : user?.profilePicture && user.profilePicture !== '/uploads/default-avatar.png' ? (
                <img
                  src={`${API_URL}${user.profilePicture}`}
                  alt={user.username}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<svg class="w-24 h-24 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-24 h-24 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            {/* Upload Controls */}
            {!preview ? (
              <label className="btn-primary cursor-pointer">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                Change Picture
              </label>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
                <button
                  onClick={cancelUpload}
                  disabled={uploading}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            )}

            {message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-3 text-sm ${
                  message.includes('success')
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}
              >
                {message}
              </motion.p>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-gothic text-white mb-2">
              {user?.username}
            </h2>
            <span className={`inline-block px-4 py-1 rounded-full text-sm font-gothic mb-6 ${
              user?.role === 'developer' ? 'bg-purple-600 text-white' :
              user?.role === 'owner' ? 'bg-red-600 text-white' :
              user?.role === 'officer' ? 'bg-yellow-600 text-white' :
              'bg-gray-600 text-white'
            }`}>
              {user?.role}
            </span>

            <div className="space-y-4">
              <InfoRow label="User ID" value={user?.id || 'N/A'} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Role Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <h3 className="text-2xl font-gothic text-accent mb-4">
          Role Information
        </h3>
        <div className="text-gray-300 space-y-2">
          <p>
            <strong className="text-accent">Current Role:</strong> {user?.role}
          </p>
          <p className="text-sm text-gray-400">
            {getRoleDescription(user?.role)}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-center md:justify-start gap-4 py-2">
      <span className="text-gray-400 font-medium">
        {label}:
      </span>
      <span className="text-white">{value}</span>
    </div>
  );
}

function getRoleDescription(role) {
  const descriptions = {
    owner: 'Guild creator with full administrative privileges. Can manage all members and settings.',
    officer: 'Trusted member with moderation privileges. Can help manage the guild and assist members.',
    developer: 'Technical specialist role. Creator and maintainer of the Nirvana platform.',
    member: 'Standard guild member. Full access to chat, events, and community features.',
  };
  return descriptions[role] || 'Guild member with standard privileges.';
}
