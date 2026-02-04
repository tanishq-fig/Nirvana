const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true,
    maxlength: 1000
  },
  profilePicture: {
    type: String,
    default: '/uploads/default-avatar.png'
  },
  role: {
    type: String,
    enum: ['member', 'officer', 'owner', 'developer'],
    default: 'member'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);
