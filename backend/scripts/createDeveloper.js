const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

async function createDeveloperAccount() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nirvana-guild');
    console.log('✓ MongoDB Connected');

    // Check if developer already exists
    const existing = await User.findOne({ username: 'ballerina' });
    if (existing) {
      console.log('✓ Developer account "ballerina" already exists, deleting and recreating...');
      await User.deleteOne({ username: 'ballerina' });
    }

    // Create developer account (password will be auto-hashed by the model)
    const developer = new User({
      username: 'ballerina',
      email: 'developer@nirvana.guild',
      password: 'iamtheone@1',
      role: 'developer',
      profilePicture: '/uploads/default-avatar.png'
    });

    await developer.save();
    console.log('✓ Developer account created successfully!');
    console.log('  Username: ballerina');
    console.log('  Password: iamtheone@1');
    console.log('  Role: developer');
    
    process.exit(0);
  } catch (error) {
    console.error('✗ Error creating developer account:', error);
    process.exit(1);
  }
}

createDeveloperAccount();
