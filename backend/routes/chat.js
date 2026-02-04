const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const authMiddleware = require('../middleware/auth');

// Get recent messages
router.get('/messages', authMiddleware, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('user', 'username profilePicture role');
    
    res.json({ messages: messages.reverse() });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// Get messages with pagination
router.get('/messages/paginated', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const total = await Message.countDocuments();
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'username profilePicture role');
    
    res.json({
      messages: messages.reverse(),
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalMessages: total
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

module.exports = router;
