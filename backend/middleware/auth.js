const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies['nirvana-token'];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_this_in_production');
    
    // Check if user is banned
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found', banned: false });
    }
    
    if (user.isBanned) {
      return res.status(403).json({ message: 'User has been removed from the guild', banned: true });
    }
    
    req.userId = decoded.userId;
    req.user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
