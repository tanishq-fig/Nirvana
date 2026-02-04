# Production Deployment Guide

## 🚀 Deployment Overview

This guide covers deploying the Nirvana Guild website to production environments.

---

## 📋 Pre-Deployment Checklist

### Security
- [ ] Change JWT_SECRET to a secure random string
- [ ] Update MongoDB URI to production database
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure CORS for production domain
- [ ] Set secure cookie flags
- [ ] Enable rate limiting
- [ ] Add input validation
- [ ] Remove console.logs from production code
- [ ] Set NODE_ENV=production

### Testing
- [ ] Test all features locally
- [ ] Test with multiple users
- [ ] Test file uploads
- [ ] Test real-time chat
- [ ] Test on mobile devices
- [ ] Check responsive design
- [ ] Verify all API endpoints
- [ ] Test authentication flow

### Assets
- [ ] Add production audio file
- [ ] Add production developer image
- [ ] Optimize all images
- [ ] Update developer information
- [ ] Customize guild branding

---

## 🌐 Deployment Options

### Option 1: Vercel (Frontend) + Heroku/Railway (Backend)

#### Frontend on Vercel
1. Push code to GitHub
2. Import project to Vercel
3. Configure environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.herokuapp.com
   NEXT_PUBLIC_SOCKET_URL=https://your-backend.herokuapp.com
   ```
4. Deploy

#### Backend on Heroku
```bash
# Install Heroku CLI
heroku login

cd backend

# Create Heroku app
heroku create nirvana-guild-backend

# Set environment variables
heroku config:set MONGODB_URI="your_mongodb_atlas_uri"
heroku config:set JWT_SECRET="your_secure_secret"
heroku config:set NODE_ENV=production

# Deploy
git init
git add .
git commit -m "Deploy backend"
git push heroku main
```

### Option 2: VPS (DigitalOcean, AWS, etc.)

#### Server Requirements
- Ubuntu 20.04+ or similar
- Node.js 18+
- MongoDB installed or Atlas connection
- Nginx for reverse proxy
- SSL certificate (Let's Encrypt)

#### Setup Steps
```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 3. Install PM2
sudo npm install -g pm2

# 4. Install Nginx
sudo apt install nginx

# 5. Install MongoDB (or use Atlas)
# Follow MongoDB installation guide

# 6. Clone repository
git clone your-repo-url
cd nirvana-guild

# 7. Install dependencies
cd backend && npm install
cd ../frontend && npm install

# 8. Set up environment variables
cd backend
nano .env
# Add production values

cd ../frontend
nano .env.local
# Add production values

# 9. Build frontend
cd frontend
npm run build

# 10. Start with PM2
cd ../backend
pm2 start server.js --name nirvana-backend

cd ../frontend
pm2 start npm --name nirvana-frontend -- start

# 11. Save PM2 configuration
pm2 save
pm2 startup
```

#### Nginx Configuration
```nginx
# /etc/nginx/sites-available/nirvana

# Backend
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Frontend
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/nirvana /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### SSL with Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo certbot --nginx -d api.yourdomain.com
```

### Option 3: Docker Deployment

#### Create Dockerfile for Backend
```dockerfile
# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
```

#### Create Dockerfile for Frontend
```dockerfile
# frontend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=${MONGODB_URI}
      - JWT_SECRET=${JWT_SECRET}
      - NODE_ENV=production
    volumes:
      - ./backend/uploads:/app/uploads

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:5000
      - NEXT_PUBLIC_SOCKET_URL=http://backend:5000
    depends_on:
      - backend

  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

```bash
# Deploy with Docker
docker-compose up -d
```

---

## 🗄️ MongoDB Production Setup

### MongoDB Atlas (Recommended)
1. Create account at mongodb.com/cloud/atlas
2. Create new cluster
3. Add database user
4. Whitelist IP addresses (or 0.0.0.0/0 for all)
5. Get connection string
6. Update backend .env:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nirvana-guild
   ```

### Self-Hosted MongoDB
```bash
# Install MongoDB
sudo apt install mongodb

# Enable authentication
sudo nano /etc/mongod.conf
# Add:
security:
  authorization: enabled

# Create admin user
mongosh
use admin
db.createUser({
  user: "admin",
  pwd: "secure_password",
  roles: ["userAdminAnyDatabase"]
})

# Create app user
use nirvana-guild
db.createUser({
  user: "nirvana_app",
  pwd: "secure_password",
  roles: ["readWrite"]
})
```

---

## 🔒 Production Security

### Backend Updates
```javascript
// server.js - Add security middleware
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

```bash
# Install dependencies
npm install helmet express-rate-limit
```

### Environment Variables
Never commit .env files! Use platform environment settings:

**Vercel**: Settings → Environment Variables  
**Heroku**: `heroku config:set KEY=value`  
**VPS**: Use `.env` with proper permissions (chmod 600)

### JWT Secret Generation
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 📊 Monitoring & Maintenance

### PM2 Monitoring
```bash
pm2 status              # Check status
pm2 logs                # View logs
pm2 restart all         # Restart all
pm2 monit               # Real-time monitoring
```

### Log Management
```bash
# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# PM2 logs
pm2 logs nirvana-backend
pm2 logs nirvana-frontend
```

### Database Backups
```bash
# MongoDB backup
mongodump --uri="mongodb+srv://..." --out=/backups/$(date +%Y%m%d)

# Restore
mongorestore --uri="mongodb+srv://..." /backups/20240204
```

---

## 🔄 Continuous Deployment

### GitHub Actions (Example)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy Frontend to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
      
      - name: Deploy Backend to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: "nirvana-guild-backend"
          heroku_email: ${{ secrets.HEROKU_EMAIL }}
```

---

## 📱 Domain Setup

### DNS Configuration
```
# For yourdomain.com
Type    Name    Value               TTL
A       @       your_server_ip      3600
A       www     your_server_ip      3600
CNAME   api     api.yourdomain.com  3600
```

---

## ✅ Post-Deployment

- [ ] Test all features in production
- [ ] Verify SSL certificate
- [ ] Check mobile responsiveness
- [ ] Test real-time chat
- [ ] Monitor error logs
- [ ] Set up uptime monitoring
- [ ] Create first owner account
- [ ] Invite guild members

---

## 🆘 Troubleshooting Production

### Common Issues

**Socket.io not connecting:**
- Check CORS settings
- Verify WebSocket support
- Check firewall rules

**Images not loading:**
- Check CORS for image requests
- Verify upload directory permissions
- Check Next.js image domains config

**MongoDB connection failed:**
- Verify connection string
- Check IP whitelist
- Verify credentials

---

## 📞 Support

For deployment issues:
1. Check logs first
2. Verify environment variables
3. Test locally with production settings
4. Review security settings
5. Check firewall and ports

---

**Production Ready**: Follow this guide carefully for a successful deployment! 🚀
