'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function MembersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const isDeveloper = user?.role === 'developer';

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users/members`, {
        withCredentials: true
      });
      setMembers(response.data.members || []);
    } catch (error) {
      console.error('Error loading members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKickMember = async (memberId, memberUsername) => {
    if (!confirm(`Are you sure you want to kick ${memberUsername}?`)) return;

    try {
      await axios.post(
        `${API_URL}/api/users/kick/${memberId}`,
        {},
        { withCredentials: true }
      );
      
      loadMembers();
      alert(`${memberUsername} has been kicked from the guild!`);
    } catch (error) {
      console.error('Error kicking member:', error);
      alert('Failed to kick member');
    }
  };

  const handleAssignRole = async (memberId, memberUsername, currentRole, newRole) => {
    if (!confirm(`Change ${memberUsername}'s role from ${currentRole} to ${newRole}?`)) return;

    try {
      await axios.post(
        `${API_URL}/api/users/assign-role/${memberId}`,
        { newRole },
        { withCredentials: true }
      );
      
      loadMembers();
      alert(`${memberUsername}'s role changed to ${newRole}!`);
    } catch (error) {
      console.error('Error assigning role:', error);
      alert(error.response?.data?.message || 'Failed to assign role');
    }
  };

  const filteredMembers = members.filter((member) => {
    if (filter === 'all') return true;
    return member.role === filter;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-gothic text-gothic-blood glow-effect mb-4">
          Guild Members
        </h1>
        <p className="text-gray-400">
          Total Members: {members.length}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex gap-4 mb-8 overflow-x-auto"
      >
        {['all', 'owner', 'officer', 'developer', 'member'].map((role) => (
          <button
            key={role}
            onClick={() => setFilter(role)}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
              filter === role
                ? 'bg-gothic-crimson text-white'
                : 'glass-effect text-gray-400 hover:text-white'
            }`}
          >
            {role === 'all' ? 'All' : role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredMembers.map((member, index) => (
            <MemberCard 
              key={member._id} 
              member={member} 
              index={index}
              isDeveloper={isDeveloper}
              currentUserId={user?.id}
              onKick={handleKickMember}
              onAssignRole={handleAssignRole}
            />
          ))}
        </motion.div>
      )}

      {filteredMembers.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            No members found in this category
          </p>
        </div>
      )}
    </div>
  );
}

function MemberCard({ member, index, isDeveloper, currentUserId, onKick, onAssignRole }) {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const canKick = isDeveloper && member._id !== currentUserId;
  const canAssignRole = isDeveloper && member._id !== currentUserId;
  
  const availableRoles = ['owner', 'officer', 'developer', 'member'].filter(
    role => role !== member.role
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="glass-effect rounded-xl p-6 border-2 border-gothic-crimson btn-glow transition-all duration-300"
    >
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 rounded-full border-4 border-gothic-crimson overflow-hidden bg-gothic-dark">
          {member.profilePicture && member.profilePicture !== '/uploads/default-avatar.png' ? (
            <img
              src={`${API_URL}${member.profilePicture}`}
              alt={member.username}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-xl font-gothic text-white mb-2">
          {member.username}
        </h3>
        <span className={`role-badge role-${member.role} inline-block mb-3`}>
          {member.role}
        </span>
        <div className="space-y-1 text-sm text-gray-400 mb-4">
          <p>Joined: {new Date(member.createdAt).toLocaleDateString()}</p>
          <p>Last Active: {new Date(member.lastActive).toLocaleDateString()}</p>
        </div>

        {canAssignRole && (
          <div className="relative mb-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="w-full px-4 py-2 bg-gothic-crimson hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg"
            >
              Assign Role
            </motion.button>
            
            {showRoleMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 mt-2 w-full glass-effect border border-gothic-crimson rounded-lg overflow-hidden shadow-xl"
              >
                {availableRoles.map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      onAssignRole(member._id, member.username, member.role, role);
                      setShowRoleMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-white hover:bg-gothic-crimson/30 transition-colors duration-200"
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        )}

        {canKick && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onKick(member._id, member.username)}
            className="w-full mt-3 px-4 py-2 bg-red-900 hover:bg-red-800 text-white font-medium rounded-lg transition-all duration-300 shadow-lg"
          >
            ⚠️ Kick Member
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
