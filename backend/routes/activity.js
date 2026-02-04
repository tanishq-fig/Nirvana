const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const authMiddleware = require('../middleware/auth');

// Get recent activities
router.get('/recent', authMiddleware, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const activities = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('user', 'username profilePicture role')
      .populate('target', 'username');
    
    res.json({ activities });
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ message: 'Error fetching activities' });
  }
});

// Create activity (for testing)
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { type, description, targetId, metadata } = req.body;
    
    const activity = new Activity({
      type,
      user: req.userId,
      target: targetId,
      description,
      metadata
    });
    
    await activity.save();
    res.json({ message: 'Activity created', activity });
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ message: 'Error creating activity' });
  }
});

module.exports = router;
