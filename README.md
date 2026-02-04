# 🌙 NIRVANA GUILD WEBSITE 🌙

A full-stack gothic-themed guild website with real-time chat, member management, and stunning dark fantasy aesthetics.

## 🎨 Features

### Core Features
- ✨ **Gothic Landing Page** with animated typography and particle effects
- 🎵 **Background Music Player** (Smells Like Teen Spirit toggle)
- 🔐 **JWT Authentication** (username + password only)
- 💬 **Real-time Chat** powered by Socket.io
- 👥 **Member Management** with role-based badges
- 👤 **User Profiles** with profile picture uploads
- 💻 **Developer Showcase Page**
- 🌓 **Dark/Light Theme System** with gothic color palettes
- 📱 **Fully Responsive Design**
- ⚡ **Smooth Framer Motion Animations**

### Role System
- **Owner** - Guild creator with full privileges
- **Officer** - Trusted moderators
- **Developer** - Special technical role
- **Member** - Standard guild members

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Socket.io Client** for real-time features
- **Axios** for API calls
- **js-cookie** for token management

### Backend
- **Node.js + Express**
- **MongoDB + Mongoose**
- **Socket.io** for real-time chat
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Multer** for file uploads

## 📁 Project Structure

```
slight/
├── frontend/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── chat/
│   │   │   │   └── page.js          # Real-time chat
│   │   │   ├── members/
│   │   │   │   └── page.js          # Member listing
│   │   │   ├── developer/
│   │   │   │   └── page.js          # Developer showcase
│   │   │   ├── profile/
│   │   │   │   └── page.js          # User profile
│   │   │   ├── layout.js            # Dashboard layout
│   │   │   └── page.js              # Dashboard home
│   │   ├── login/
│   │   │   └── page.js              # Login page
│   │   ├── register/
│   │   │   └── page.js              # Registration page
│   │   ├── layout.js                # Root layout
│   │   ├── page.js                  # Landing page
│   │   └── globals.css              # Global styles
│   ├── components/
│   │   ├── AudioPlayer.js           # Music player
│   │   ├── DeveloperModal.js        # Developer info modal
│   │   ├── Navigation.js            # Sidebar navigation
│   │   ├── ParticleBackground.js    # Particle effects
│   │   └── ThemeToggle.js           # Theme switcher
│   ├── context/
│   │   ├── AuthContext.js           # Authentication state
│   │   └── ThemeContext.js          # Theme state
│   ├── public/
│   │   ├── audio/                   # Music files (ADD YOUR AUDIO HERE)
│   │   └── images/                  # Images (ADD YOUR IMAGES HERE)
│   ├── package.json
│   ├── tailwind.config.js
│   └── next.config.js
├── backend/
│   ├── models/
│   │   ├── User.js                  # User schema
│   │   └── Message.js               # Message schema
│   ├── routes/
│   │   ├── auth.js                  # Auth endpoints
│   │   ├── users.js                 # User endpoints
│   │   └── chat.js                  # Chat endpoints
│   ├── middleware/
│   │   └── auth.js                  # JWT middleware
│   ├── uploads/                     # User uploads
│   ├── server.js                    # Main server file
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
cd c:\Users\tanis\OneDrive\Desktop\slight
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env with your settings:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/nirvana-guild
# JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

### 3. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Create .env.local file
copy .env.local.example .env.local

# Edit .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:5000
# NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

### 4. Start MongoDB
Make sure MongoDB is running:
```bash
# Windows (if MongoDB is installed as service)
net start MongoDB

# Or use MongoDB Compass / Atlas
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

## 🎵 Adding Audio File

1. Create the audio directory:
   ```bash
   mkdir frontend/public/audio
   ```

2. Add your audio file:
   - Place your MP3 file at: `frontend/public/audio/smells-like-teen-spirit.mp3`
   - Or update the path in `frontend/components/AudioPlayer.js`

## 🖼️ Adding Developer Image

1. Create the images directory:
   ```bash
   mkdir frontend/public/images
   ```

2. Add developer image:
   - Place your image at: `frontend/public/images/developer-placeholder.png`
   - Update paths in:
     - `frontend/components/DeveloperModal.js`
     - `frontend/app/dashboard/developer/page.js`

## 📝 Customization Guide

### Update Developer Information

**DeveloperModal.js** (`frontend/components/DeveloperModal.js`):
```javascript
const developerInfo = {
  name: 'Your Name',
  role: 'Your Role',
  bio: 'Your bio',
  instagram: '@your_instagram',
  freefire: 'YOUR_FF_ID',
  discord: 'yourdiscord#1234',
  image: '/images/your-image.png'
};
```

**Developer Page** (`frontend/app/dashboard/developer/page.js`):
Update the same information in the `developerInfo` object.

### Theme Customization

Edit `frontend/tailwind.config.js` to customize colors:
```javascript
colors: {
  'gothic-dark': '#0a0a0a',      // Dark mode background
  'gothic-crimson': '#8b0000',   // Primary accent
  'gothic-blood': '#dc143c',     // Secondary accent
  // Add more custom colors...
}
```

### Fonts

The project uses Google Fonts:
- **Cinzel** - Gothic titles
- **Crimson Text** - Body text
- **Inter** - UI elements

Change fonts in `frontend/app/globals.css` import statement.

## 🔒 Default User Roles

When creating users manually in MongoDB:
```javascript
{
  username: "admin",
  password: "hashed_password",
  role: "owner",  // or "officer", "developer", "member"
  profilePicture: "/uploads/default-avatar.png"
}
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verify token

### Users
- `GET /api/users/members` - Get all members
- `GET /api/users/profile/:userId` - Get user profile
- `POST /api/users/update-profile-picture` - Update profile picture
- `GET /api/users/me` - Get current user

### Chat
- `GET /api/chat/messages` - Get recent messages
- `GET /api/chat/messages/paginated` - Get paginated messages

### Socket Events
- `user_connected` - User joins chat
- `send_message` - Send message
- `receive_message` - Receive message
- `user_joined` - User joined notification
- `user_left` - User left notification
- `typing` - Typing indicator

## 🎨 Design System

### Dark Mode (Default)
- Background: Deep black (#0a0a0a)
- Primary: Crimson red (#8b0000, #dc143c)
- Accent: Neon violet (#8b00ff)
- Text: Light gray to white

### Light Mode
- Background: Gothic cream (#f5e6d3)
- Primary: Warm red (#8b2e2e)
- Accent: Gold (#d4af37, #ffbf00)
- Text: Dark gothic (#2a1a1a)

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongosh

# Or connect to MongoDB Atlas and update MONGODB_URI in .env
```

### Port Already in Use
```bash
# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Socket.io Connection Fails
- Check that backend is running on port 5000
- Verify CORS settings in `backend/server.js`
- Check firewall settings

### Images Not Loading
- Ensure `backend/uploads` directory exists
- Check file permissions
- Verify `NEXT_PUBLIC_API_URL` in frontend `.env.local`

## 📦 Build for Production

### Frontend
```bash
cd frontend
npm run build
npm start
```

### Backend
```bash
cd backend
npm start
```

## 🔐 Security Notes

⚠️ **IMPORTANT FOR PRODUCTION:**
1. Change `JWT_SECRET` to a strong random string
2. Use environment variables for all secrets
3. Enable HTTPS
4. Set up proper MongoDB authentication
5. Configure CORS properly
6. Add rate limiting
7. Implement input validation
8. Set secure cookie flags

## 📄 License

MIT License - Feel free to use for your guild!

## 🤝 Contributing

This is a custom guild website. Feel free to fork and customize for your own guild!

## 📞 Support

For issues or questions, contact the developer through the in-app developer modal.

---

## 🎮 First Steps After Installation

1. ✅ Install all dependencies (frontend & backend)
2. ✅ Set up MongoDB
3. ✅ Configure environment variables
4. ✅ Start backend server
5. ✅ Start frontend server
6. ✅ Visit http://localhost:3000
7. ✅ Create your first account (will be a member)
8. ✅ Manually update your role to "owner" in MongoDB
9. ✅ Add your audio file to `/public/audio/`
10. ✅ Add your developer image to `/public/images/`
11. ✅ Update developer info in components
12. ✅ Customize colors and theme
13. ✅ Invite your guild members!

---

**Built with 🖤 for the Nirvana Guild**

*Dark. Gothic. Animated.*
