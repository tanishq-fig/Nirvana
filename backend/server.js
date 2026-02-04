const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const chatRoutes = require('./routes/chat');
const developerRoutes = require('./routes/developer');
const activityRoutes = require('./routes/activity');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'https://nirvana-guild.vercel.app', /\.vercel\.app$/],
    methods: ['GET', 'POST'],
    credentials: true
  },
  transports: ['polling', 'websocket'],
  allowEIO3: true
});

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://nirvana-guild.vercel.app', /\.vercel\.app$/],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nirvana-guild')
.then(() => console.log('✓ MongoDB Connected'))
.catch(err => console.error('✗ MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/developer', developerRoutes);
app.use('/api/activity', activityRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Nirvana Guild Server Running' });
});

// Socket.io Chat Implementation
const Message = require('./models/Message');
const User = require('./models/User');

const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('user_connected', async (userId) => {
    connectedUsers.set(socket.id, userId);
    socket.userId = userId;
    
    try {
      const user = await User.findById(userId).select('username profilePicture role');
      io.emit('user_joined', { 
        userId, 
        username: user?.username,
        socketId: socket.id 
      });
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  });

  socket.on('send_message', async (data) => {
    try {
      const { userId, message } = data;
      
      const user = await User.findById(userId).select('username profilePicture role');
      
      const newMessage = new Message({
        user: userId,
        username: user.username,
        message: message,
        profilePicture: user.profilePicture,
        role: user.role
      });
      
      await newMessage.save();
      
      io.emit('receive_message', {
        _id: newMessage._id,
        username: user.username,
        message: message,
        profilePicture: user.profilePicture,
        role: user.role,
        createdAt: newMessage.createdAt
      });
    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('user_typing', data);
  });

  socket.on('disconnect', () => {
    const userId = connectedUsers.get(socket.id);
    if (userId) {
      io.emit('user_left', { userId, socketId: socket.id });
      connectedUsers.delete(socket.id);
    }
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════╗
  ║   🌙 NIRVANA GUILD SERVER RUNNING 🌙  ║
  ║   Port: ${PORT}                        ║
  ║   Gothic Mode: ACTIVATED              ║
  ╚═══════════════════════════════════════╝
  `);
});

module.exports = { app, io };
