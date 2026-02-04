# Customization Guide

## 🎨 Branding & Content

### 1. Guild Name
The guild name "NIRVANA" appears in multiple places:

**Update in:**
- `frontend/app/page.js` - Landing page title
- `frontend/components/Navigation.js` - Sidebar logo
- `frontend/app/layout.js` - Page metadata
- `README.md` - Documentation

### 2. Developer Information

**DeveloperModal Component** (`frontend/components/DeveloperModal.js`):
```javascript
const developerInfo = {
  name: 'Your Name Here',
  role: 'Your Role Here',
  bio: 'Your bio description...',
  instagram: '@your_instagram',
  freefire: 'YOUR_FF_ID',
  discord: 'yourusername#1234',
  image: '/images/your-photo.png'
};
```

**Developer Page** (`frontend/app/dashboard/developer/page.js`):
```javascript
const developerInfo = {
  name: 'Your Name Here',
  title: 'Your Title',
  bio: 'Your longer bio...',
  skills: [
    { name: 'Skill 1', level: 90 },
    // Add your skills...
  ],
  social: {
    instagram: '@your_instagram',
    discord: 'yourusername#1234',
    freefire: 'YOUR_FF_ID',
    github: 'github.com/yourusername',
  },
  achievements: [
    { icon: '🏆', title: 'Achievement', desc: 'Description' },
    // Add your achievements...
  ],
};
```

### 3. Audio File

**Change background music:**

1. Add your music file to `frontend/public/audio/your-music.mp3`
2. Update `frontend/components/AudioPlayer.js`:
```javascript
<audio ref={audioRef} loop>
  <source src="/audio/your-music.mp3" type="audio/mpeg" />
</audio>
```
3. Update the display name:
```javascript
<p className="text-xs ...">
  Your Song Name
</p>
```

### 4. Images

**Landing Page Background:**
- Add custom images to `frontend/public/images/`
- Update CSS in `frontend/app/globals.css`

**Developer Photos:**
- Replace placeholder at `frontend/public/images/developer-placeholder.png`
- Update paths in DeveloperModal and Developer page

**Favicon:**
- Add `favicon.ico` to `frontend/app/favicon.ico`

## 🎨 Styling & Theme

### Colors

**Tailwind Config** (`frontend/tailwind.config.js`):

```javascript
colors: {
  // Dark mode
  'gothic-dark': '#0a0a0a',
  'gothic-crimson': '#8b0000',
  'gothic-blood': '#dc143c',
  
  // Light mode
  'gothic-light': '#2a1a1a',
  'gothic-gold': '#d4af37',
  'gothic-amber': '#ffbf00',
  
  // Add your custom colors
  'your-color': '#hexcode',
}
```

### Fonts

**Change fonts** in `frontend/app/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap');
```

Then update `tailwind.config.js`:
```javascript
fontFamily: {
  gothic: ['YourFont', 'serif'],
}
```

### Animations

**Custom animations** in `tailwind.config.js`:
```javascript
animation: {
  'your-animation': 'yourKeyframes 1s ease-in-out',
},
keyframes: {
  yourKeyframes: {
    '0%': { /* styles */ },
    '100%': { /* styles */ },
  },
}
```

## 📝 Text Content

### Landing Page

**Update welcome text** in `frontend/app/page.js`:
```javascript
<p className="text-2xl font-gothic-text...">
  Your Custom Tagline Here
</p>
```

### Dashboard

**Update statistics** in `frontend/app/dashboard/page.js`:
```javascript
<StatCard title="Your Stat" value="100" icon="🎮" />
```

### Role Descriptions

**Update in** `frontend/app/dashboard/profile/page.js`:
```javascript
const descriptions = {
  owner: 'Your custom owner description',
  officer: 'Your custom officer description',
  developer: 'Your custom developer description',
  member: 'Your custom member description',
};
```

## 🎭 Role System

### Add New Role

1. **Update User Model** (`backend/models/User.js`):
```javascript
role: {
  type: String,
  enum: ['member', 'officer', 'owner', 'developer', 'your-new-role'],
  default: 'member'
}
```

2. **Add CSS** in `frontend/app/globals.css`:
```css
.role-your-new-role {
  @apply bg-gradient-to-r from-color1 to-color2 text-white;
}
```

3. **Update role ordering** in `backend/routes/users.js`:
```javascript
const roleOrder = { 
  owner: 0, 
  officer: 1, 
  your-new-role: 2,
  developer: 3, 
  member: 4 
};
```

## 🔧 Features

### Disable Music Player

Comment out in `frontend/app/page.js`:
```javascript
{/* <AudioPlayer /> */}
```

### Change Page Titles

Update in `frontend/app/layout.js`:
```javascript
export const metadata = {
  title: 'Your Guild Name - Your Tagline',
  description: 'Your description',
};
```

### Add New Navigation Item

In `frontend/components/Navigation.js`:
```javascript
const navItems = [
  // ...existing items
  { name: 'New Page', path: '/dashboard/newpage', icon: '🆕' },
];
```

Then create the page at `frontend/app/dashboard/newpage/page.js`

## 🌐 Deployment

### Environment Variables

**Production Backend (.env):**
```env
PORT=5000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=super_secure_random_string_for_production
NODE_ENV=production
```

**Production Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXT_PUBLIC_SOCKET_URL=https://your-api-domain.com
```

### Build Commands

**Frontend:**
```bash
npm run build
npm start
```

**Backend:**
```bash
npm start
```

## 🔐 Security

### Change JWT Secret

Generate a secure secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Update in `backend/.env`:
```env
JWT_SECRET=your_generated_secret_here
```

### File Upload Limits

Change in `backend/routes/auth.js`:
```javascript
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});
```

## 📊 Database

### Add Custom Fields to User

1. Update `backend/models/User.js`:
```javascript
yourField: {
  type: String,
  default: ''
}
```

2. Update registration in `backend/routes/auth.js`
3. Update profile page in frontend

### Backup MongoDB

```bash
# Export database
mongodump --db nirvana-guild --out ./backup

# Import database
mongorestore --db nirvana-guild ./backup/nirvana-guild
```

## 🎮 Quick Customization Checklist

- [ ] Update guild name everywhere
- [ ] Add your developer information
- [ ] Add your audio file
- [ ] Add your developer image
- [ ] Customize colors/theme
- [ ] Update social media links
- [ ] Change fonts (optional)
- [ ] Update page titles and descriptions
- [ ] Test all features
- [ ] Create your owner account
- [ ] Add guild members

## 📞 Need Help?

Check the main README.md for troubleshooting or refer to:
- Next.js docs: https://nextjs.org/docs
- MongoDB docs: https://docs.mongodb.com
- Socket.io docs: https://socket.io/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion
