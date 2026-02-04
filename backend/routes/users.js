const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Activity = require('../models/Activity');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configure multer for profile picture updates
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

// Get all members
router.get('/members', authMiddleware, async (req, res) => {
  try {
    const users = await User.find({ isBanned: { $ne: true } })
      .select('-password')
      .sort({ role: 1, createdAt: -1 });
    
    // Custom sort: owner > officer > developer > member
    const roleOrder = { owner: 0, officer: 1, developer: 2, member: 3 };
    users.sort((a, b) => roleOrder[a.role] - roleOrder[b.role]);
    
    res.json({ members: users });
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ message: 'Error fetching members' });
  }
});

// Get user profile
router.get('/profile/:userId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ user });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// Update profile picture
router.post('/update-profile-picture', authMiddleware, upload.single('profilePicture'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.profilePicture = `/uploads/${req.file.filename}`;
    await user.save();

    res.json({
      message: 'Profile picture updated successfully',
      profilePicture: user.profilePicture
    });
  } catch (error) {
    console.error('Error updating profile picture:', error);
    res.status(500).json({ message: 'Error updating profile picture' });
  }
});

// Get current user
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

// Kick member (developer only)
router.post('/kick/:userId', authMiddleware, async (req, res) => {
  try {
    console.log('Kick request received for userId:', req.params.userId);
    console.log('Requester userId:', req.userId);
    
    // Check if requester is developer
    const requester = await User.findById(req.userId);
    console.log('Requester role:', requester?.role);
    
    if (!requester || requester.role !== 'developer') {
      console.log('Permission denied: Not a developer');
      return res.status(403).json({ message: 'Only developers can kick members' });
    }

    // Get user to kick
    const userToKick = await User.findById(req.params.userId);
    console.log('User to kick:', userToKick?.username);
    
    if (!userToKick) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Cannot kick yourself
    if (userToKick._id.toString() === req.userId) {
      console.log('Cannot kick yourself');
      return res.status(400).json({ message: 'You cannot kick yourself' });
    }

    // Mark user as kicked/banned
    userToKick.isBanned = true;
    await userToKick.save();
    
    // Log activity
    await Activity.create({
      type: 'user_kicked',
      user: req.userId,
      target: userToKick._id,
      description: `${requester.username} kicked ${userToKick.username}`
    }).catch(err => console.error('Activity log error:', err));
    
    console.log('Successfully kicked user:', userToKick.username);

    res.json({ 
      message: 'User has been kicked',
      kickedUser: userToKick.username
    });
  } catch (error) {
    console.error('Error kicking user:', error);
    res.status(500).json({ message: 'Error kicking user: ' + error.message });
  }
});

// Assign role to a user
router.post('/assign-role/:userId', authMiddleware, async (req, res) => {
  try {
    const requester = await User.findById(req.userId);
    console.log('Role assignment request from:', requester?.username, 'role:', requester?.role);

    // Only developer can assign roles
    if (requester.role !== 'developer') {
      console.log('Unauthorized role assignment attempt');
      return res.status(403).json({ message: 'Only developers can assign roles' });
    }

    const { newRole } = req.body;
    const validRoles = ['owner', 'officer', 'developer', 'member'];
    
    if (!validRoles.includes(newRole)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const targetUser = await User.findById(req.params.userId);
    
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Cannot change your own role
    if (targetUser._id.toString() === req.userId) {
      return res.status(400).json({ message: 'You cannot change your own role' });
    }

    const oldRole = targetUser.role;
    targetUser.role = newRole;
    await targetUser.save();
    
    // Log activity
    await Activity.create({
      type: 'role_assigned',
      user: req.userId,
      target: targetUser._id,
      description: `${requester.username} changed ${targetUser.username}'s role from ${oldRole} to ${newRole}`
    }).catch(err => console.error('Activity log error:', err));

    console.log('Successfully assigned role:', newRole, 'to', targetUser.username);

    res.json({ 
      message: 'Role assigned successfully',
      user: {
        id: targetUser._id,
        username: targetUser.username,
        role: targetUser.role
      }
    });
  } catch (error) {
    console.error('Error assigning role:', error);
    res.status(500).json({ message: 'Error assigning role: ' + error.message });
  }
});

module.exports = router;
