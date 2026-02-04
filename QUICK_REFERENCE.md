# Quick Reference Guide

## 🚀 Quick Start Commands

### Installation
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running the Application
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Access Points
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/api/health

---

## 📝 Environment Variables

### Backend `.env`
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nirvana-guild
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

---

## 🗂️ File Locations for Assets

### Add Audio File
```
frontend/public/audio/smells-like-teen-spirit.mp3
```

### Add Developer Image
```
frontend/public/images/developer-placeholder.png
```

---

## 🎨 Customization Quick Links

### Developer Info
1. `frontend/components/DeveloperModal.js` - Lines 8-15
2. `frontend/app/dashboard/developer/page.js` - Lines 7-39

### Colors
- `frontend/tailwind.config.js` - Lines 11-27

### Guild Name
- `frontend/app/page.js` - Line 63
- `frontend/components/Navigation.js` - Line 59
- `frontend/app/layout.js` - Line 8

---

## 🔧 Common MongoDB Commands

### Start MongoDB
```bash
# Windows
net start MongoDB

# Check connection
mongosh
```

### Create Owner User
```javascript
// In mongosh or MongoDB Compass
use nirvana-guild

db.users.updateOne(
  { username: "your_username" },
  { $set: { role: "owner" } }
)
```

### View All Users
```javascript
db.users.find().pretty()
```

### View All Messages
```javascript
db.messages.find().sort({ createdAt: -1 }).limit(10)
```

---

## 🐛 Troubleshooting Commands

### Kill Process on Port (Windows)
```bash
# Find process
netstat -ano | findstr :5000

# Kill process
taskkill /PID <PID_NUMBER> /F
```

### Clear Node Modules
```bash
# Backend
cd backend
rmdir /s /q node_modules
npm install

# Frontend
cd frontend
rmdir /s /q node_modules
npm install
```

### Reset MongoDB Database
```javascript
// In mongosh
use nirvana-guild
db.dropDatabase()
```

---

## 📡 API Endpoints Quick Reference

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify token

### Users
- `GET /api/users/members` - Get all members
- `GET /api/users/me` - Get current user
- `POST /api/users/update-profile-picture` - Update profile pic

### Chat
- `GET /api/chat/messages?limit=50` - Get recent messages

---

## 🎮 Test Scenarios

### Test Registration
1. Go to http://localhost:3000
2. Click "New to Nirvana"
3. Fill username and password
4. Optional: Upload profile picture
5. Click "Create Account" or "Skip"

### Test Login
1. Go to http://localhost:3000
2. Click "Already a Member"
3. Enter credentials
4. Should redirect to dashboard

### Test Chat
1. Login with user 1
2. Open another browser/incognito
3. Login with user 2
4. Send messages from both
5. Messages should appear in real-time

### Test Profile Picture
1. Login
2. Go to Profile page
3. Click "Change Picture"
4. Select image
5. Click "Upload"

---

## 🎨 CSS Classes Quick Reference

### Role Badges
```css
.role-owner    /* Gold gradient */
.role-officer  /* Purple gradient */
.role-developer /* Cyan gradient */
.role-member   /* Gray gradient */
```

### Effects
```css
.glass-effect      /* Glass morphism */
.btn-glow          /* Button hover glow */
.glow-effect       /* Text glow */
.gothic-title      /* Large gothic title */
```

### Theme Classes
```css
dark:             /* Dark mode specific */
light:            /* Light mode specific */
```

---

## 📦 Package Scripts

### Backend
```bash
npm run dev      # Development with nodemon
npm start        # Production mode
```

### Frontend
```bash
npm run dev      # Development server
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Run ESLint
```

### Root
```bash
npm run dev:frontend    # Start Next.js
npm run dev:backend     # Start Express
npm run install:all     # Install all deps
npm run build           # Build frontend
```

---

## 🔍 Debug Tips

### Check Backend Running
```bash
curl http://localhost:5000/api/health
```

### Check Socket Connection
Open browser console on chat page:
```javascript
// Should see:
"Connected to chat server"
```

### View Environment Variables
```bash
# Backend
cd backend
type .env

# Frontend
cd frontend
type .env.local
```

### Check MongoDB Connection
```javascript
// In server.js console output
"✓ MongoDB Connected"
```

---

## 📱 Browser Testing

### Recommended Browsers
- Chrome/Edge (best support)
- Firefox
- Safari

### Test Responsive
1. Open DevTools (F12)
2. Toggle device toolbar
3. Test mobile sizes:
   - iPhone 12 Pro
   - iPad
   - Desktop 1920x1080

---

## 🎯 Deployment Checklist

- [ ] Update JWT_SECRET in production
- [ ] Set NODE_ENV=production
- [ ] Configure MongoDB Atlas URI
- [ ] Update frontend API URLs
- [ ] Build frontend: `npm run build`
- [ ] Test all features
- [ ] Enable HTTPS
- [ ] Configure CORS for production domain
- [ ] Set up MongoDB backups
- [ ] Configure rate limiting
- [ ] Add error monitoring

---

## 🔗 Useful Links

- Next.js Docs: https://nextjs.org/docs
- MongoDB Docs: https://docs.mongodb.com
- Socket.io Docs: https://socket.io/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion
- Express.js: https://expressjs.com

---

## 💡 Pro Tips

1. **Keep backend running** when testing frontend
2. **Check MongoDB is running** before starting backend
3. **Clear browser cache** if styles don't update
4. **Use incognito mode** for testing multiple users
5. **Check browser console** for Socket.io errors
6. **Monitor terminal outputs** for server errors
7. **Restart servers** after .env changes

---

## 📞 Getting Help

1. Check PROJECT_SUMMARY.md for feature status
2. Read SETUP.md for installation issues
3. See CUSTOMIZATION.md for branding
4. Review README.md for full documentation
5. Check code comments for implementation details

---

**Quick tip**: Bookmark this file for instant access to commands! 🔖
