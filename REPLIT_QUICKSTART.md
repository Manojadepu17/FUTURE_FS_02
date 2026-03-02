# Quick Start Guide for Replit Deployment

## 🎯 Fast Track Deployment

### 1. Get a MySQL Database (Choose One)

**Option A: Railway (Easiest)**
- Go to https://railway.app
- Click "Start a New Project" → "Provision MySQL"
- Copy the connection details

**Option B: PlanetScale**
- Go to https://planetscale.com
- Create a new database
- Get connection string

**Option C: Aiven**
- Go to https://aiven.io
- Create MySQL service
- Copy credentials

### 2. Push to GitHub

```bash
# In your local terminal (Windows PowerShell)
cd C:\Users\DELL\Desktop\CRM

# Create GitHub repo (if you have GitHub CLI)
gh repo create FUTURE_FS_02 --public --source=. --remote=origin --push

# OR manually
git remote add origin https://github.com/YOUR_USERNAME/FUTURE_FS_02.git
git branch -M main  
git push -u origin main
```

### 3. Import to Replit

1. Go to https://replit.com
2. Click "Create Repl"
3. Choose "Import from GitHub"
4. Enter: `https://github.com/YOUR_USERNAME/FUTURE_FS_02`
5. Click "Import from GitHub"

### 4. Set Environment Variables

In Replit, click the **Lock icon (🔒)** for Secrets and add:

```
NODE_ENV=production
PORT=5000
DB_HOST=your_host_from_railway_or_planetscale
DB_PORT=3306
DB_NAME=mini_crm
DB_USER=your_database_username
DB_PASSWORD=your_database_password
JWT_SECRET=8f7c3b2a1e9d4f6c8b5a3e7d2f9c1b8e4a6d3c9f7e2b5d8a1c4e7f9b2d6a3c5e8f1b4d7a2c5e9f3b6d8a1e4c7f2b9d5a8c3e6f1b7d4a9c2e5f8b3d6a1c4
CLIENT_URL=https://your-repl-name.your-username.repl.co
```

### 5. Setup Database

In Replit Shell, run:

```bash
bash setup-replit.sh
```

Or manually:
```bash
cd server
npm install
node createDB.js
node seed.js
```

### 6. Run the App

Click the **"Run"** button in Replit!

Your backend API will be available at:
```
https://your-repl-name.your-username.repl.co
```

### 7. Deploy Frontend (Optional but Recommended)

**Vercel (Best Performance):**
```bash
cd client
npm install -g vercel
vercel --prod
```

Set env variable: `REACT_APP_API_URL=https://your-repl-name.your-username.repl.co/api`

## 🧪 Test Your Deployment

Visit: `https://your-repl-name.your-username.repl.co/api/health`

You should see:
```json
{
  "success": true,
  "message": "Mini CRM API is running"
}
```

## 🔐 Default Login

- Email: `admin@crm.com`
- Password: `admin123`

---

**Full guide:** See [REPLIT_DEPLOY.md](./REPLIT_DEPLOY.md)
