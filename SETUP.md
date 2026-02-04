# Setup Instructions

## Quick Start Guide

### 1. Install Dependencies

```bash
# Install all dependencies at once
npm run install:all

# Or manually:
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure Environment

**Backend (.env):**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nirvana-guild
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

### 3. Start Development Servers

**Option 1 - Separate Terminals:**

Terminal 1:
```bash
cd backend
npm run dev
```

Terminal 2:
```bash
cd frontend
npm run dev
```

**Option 2 - Run Scripts:**
```bash
# From root directory
npm run dev:backend    # Terminal 1
npm run dev:frontend   # Terminal 2
```

### 4. Access the Application

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Backend Health Check: http://localhost:5000/api/health

### 5. Add Required Assets

**Audio File:**
- Create: `frontend/public/audio/`
- Add: `smells-like-teen-spirit.mp3`

**Developer Image:**
- Create: `frontend/public/images/`
- Add: `developer-placeholder.png`

### 6. Create First User

1. Go to http://localhost:3000
2. Click "New to Nirvana"
3. Register with username and password
4. To make yourself owner, update MongoDB:

```javascript
// In MongoDB Compass or mongosh
db.users.updateOne(
  { username: "your_username" },
  { $set: { role: "owner" } }
)
```

## Development Tips

### MongoDB

**Local MongoDB:**
```bash
# Start MongoDB service (Windows)
net start MongoDB

# Check if running
mongosh
```

**MongoDB Atlas:**
Update `MONGODB_URI` in backend `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nirvana-guild
```

### Check Backend Status

```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{
  "status": "ok",
  "message": "Nirvana Guild Server Running"
}
```

### Hot Reload

- Frontend: Auto-reloads on file changes
- Backend: Using nodemon for auto-restart

### Testing Socket.io

Open browser console on chat page:
```javascript
// Should see:
"Connected to chat server"
```

## Common Commands

```bash
# Root directory
npm run dev:frontend        # Start Next.js dev server
npm run dev:backend         # Start Express dev server
npm run install:all         # Install all dependencies

# Backend
cd backend
npm run dev                 # Development with nodemon
npm start                   # Production

# Frontend
cd frontend
npm run dev                 # Development server
npm run build               # Build for production
npm start                   # Run production build
npm run lint                # Run ESLint
```

## Folder Structure Created

```
✓ backend/
  ✓ models/
  ✓ routes/
  ✓ middleware/
  ✓ uploads/
  ✓ server.js

✓ frontend/
  ✓ app/
    ✓ dashboard/
      ✓ chat/
      ✓ members/
      ✓ developer/
      ✓ profile/
  ✓ components/
  ✓ context/
  ✓ public/ (create audio/ and images/ subdirectories)
```

## Next Steps

1. ✅ Dependencies installed
2. ✅ Environment configured
3. ✅ Servers running
4. ✅ First user created
5. ⏳ Add audio file
6. ⏳ Add developer image
7. ⏳ Customize developer info
8. ⏳ Invite guild members!

## Troubleshooting

### Port conflicts
```bash
# Windows - Kill process on port
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### MongoDB not connecting
- Check MongoDB service is running
- Verify connection string in .env
- Check firewall/antivirus settings

### Images not loading
- Ensure backend/uploads exists
- Check file permissions
- Verify API_URL in frontend .env.local

### Socket.io not connecting
- Backend must be running
- Check CORS settings
- Verify SOCKET_URL in frontend .env.local
