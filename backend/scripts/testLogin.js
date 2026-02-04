const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

async function testLogin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nirvana-guild');
    console.log('✓ MongoDB Connected');

    // Find the ballerina user
    const user = await User.findOne({ username: 'ballerina' });
    if (!user) {
      console.log('✗ User "ballerina" not found in database');
      process.exit(1);
    }

    console.log('✓ User found:');
    console.log('  Username:', user.username);
    console.log('  Role:', user.role);
    console.log('  Email:', user.email);

    // Test password
    const testPassword = 'iamtheone@1';
    const isMatch = await user.comparePassword(testPassword);
    
    if (isMatch) {
      console.log('✓ Password "iamtheone@1" is CORRECT');
    } else {
      console.log('✗ Password "iamtheone@1" is INCORRECT');
      console.log('  The password hash in database does not match');
    }

    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error);
    process.exit(1);
  }
}

testLogin();
