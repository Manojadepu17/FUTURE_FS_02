# Glitch Backend Deployment Guide

## 🚀 Quick Deploy to Glitch (100% FREE)

### Step 1: Create Glitch Project

1. Go to [glitch.com](https://glitch.com)
2. Sign up with GitHub (completely free)
3. Click **"New Project"** → **"Import from GitHub"**
4. Enter your repo URL: `https://github.com/Manojadepu17/FUTURE_FS_02`
5. Glitch will import your repository

### Step 2: Configure for Server Folder

After import:

1. Click **"Tools"** (bottom left) → **"Terminal"**
2. Run these commands:
```bash
# Move server files to root
cd /app
cp -r server/* .
rm -rf server client

# Install dependencies
npm install

# Refresh the project
refresh
```

### Step 3: Set Environment Variables

1. Click **".env"** file in the left sidebar (or create it)
2. Add these variables:

```env
NODE_ENV=production
PORT=3000

# Get Free MySQL from Railway or FreeSQLDatabase
DB_HOST=your-mysql-host
DB_PORT=3306
DB_NAME=your-database-name
DB_USER=your-username
DB_PASSWORD=your-password

# JWT Secret (use the one generated)
JWT_SECRET=/aH1Xo0+ofRr/ZnU9CYWHz965eCUgfoU2NWDXtQdgZR5oNINkyDN396UL1aX/+vNWykbmKWw6GS1kHez7cZgFA==

# Client URL (update after deploying frontend)
CLIENT_URL=https://your-frontend.netlify.app
```

### Step 4: Get Your Backend URL

1. Your Glitch backend URL will be: `https://your-project-name.glitch.me`
2. Copy this URL - you'll need it for the frontend

### Step 5: Test API

Visit: `https://your-project-name.glitch.me/api/health`

Should return:
```json
{
  "success": true,
  "message": "Mini CRM API is running"
}
```

---

## 🗄️ Free MySQL Database Options

### Option 1: Railway MySQL (Recommended)

1. Go to [railway.app](https://railway.app)
2. Create **"New Project"** → **"Add MySQL"**
3. Get credentials from Variables tab

### Option 2: FreeSQLDatabase.com

1. Go to [freesqldatabase.com](https://www.freesqldatabase.com)
2. Create free MySQL database
3. Get credentials via email

---

## ✅ Your Glitch Backend is Ready!

Next: Deploy frontend to Netlify (see NETLIFY_DEPLOY.md)
