const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Message = require('../models/Message');

// Middleware to check if user is developer
const isDeveloper = async (req, res, next) => {
  if (req.user.role !== 'developer') {
    return res.status(403).json({ message: 'Access denied. Developer role required.' });
  }
  next();
};

// Delete a message
router.delete('/messages/:messageId', auth, isDeveloper, async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove a user (ban)
router.delete('/users/:userId', auth, isDeveloper, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent removing another developer
    if (user.role === 'developer') {
      return res.status(403).json({ message: 'Cannot remove another developer' });
    }

    // Mark user as banned
    user.isBanned = true;
    await user.save();

    res.json({ success: true, message: 'User removed successfully' });
  } catch (error) {
    console.error('Remove user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Assign role to user
router.put('/users/:userId/role', auth, isDeveloper, async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!['member', 'officer', 'owner'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent changing developer role
    if (user.role === 'developer') {
      return res.status(403).json({ message: 'Cannot change developer role' });
    }

    user.role = role;
    await user.save();

    res.json({ success: true, message: 'Role updated successfully', user });
  } catch (error) {
    console.error('Update role error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
