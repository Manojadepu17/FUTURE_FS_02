# 🚀 Deploy Mini CRM to Replit

This guide will help you deploy your Mini CRM application to Replit.

## 📋 Prerequisites

Before deploying to Replit, you need:
1. A Replit account (free or paid)
2. A MySQL database (since Replit doesn't provide MySQL by default)

## 🗄️ Database Options

### Option 1: Railway MySQL (Recommended - Free Tier)
1. Go to [Railway.app](https://railway.app)
2. Create a new project
3. Add MySQL database
4. Get your connection credentials

### Option 2: PlanetScale (Free Tier)
1. Go to [PlanetScale.com](https://planetscale.com)
2. Create a new database
3. Get connection string

### Option 3: Aiven MySQL (Free Tier)
1. Go to [Aiven.io](https://aiven.io)
2. Create MySQL service
3. Get connection details

## 🚀 Step-by-Step Deployment

### Step 1: Push Code to GitHub

Your code is already initialized with Git. Now push to GitHub:

```bash
# If you haven't already created the repository
gh repo create FUTURE_FS_02 --public --source=. --remote=origin --push

# OR if using git commands manually:
git remote add origin https://github.com/YOUR_USERNAME/FUTURE_FS_02.git
git branch -M main
git push -u origin main
```

### Step 2: Import to Replit

1. Go to [Replit](https://replit.com)
2. Click **"Create Repl"**
3. Select **"Import from GitHub"**
4. Enter your repository URL: `https://github.com/YOUR_USERNAME/FUTURE_FS_02`
5. Click **"Import from GitHub"**

### Step 3: Configure Environment Variables

In Replit, go to the **Secrets** tab (lock icon 🔒) and add:

```env
NODE_ENV=production
PORT=5000

# Database Configuration (from your MySQL provider)
DB_HOST=your_mysql_host_here
DB_PORT=3306
DB_NAME=mini_crm
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT Secret (use this secure one or generate new)
JWT_SECRET=8f7c3b2a1e9d4f6c8b5a3e7d2f9c1b8e4a6d3c9f7e2b5d8a1c4e7f9b2d6a3c5e8f1b4d7a2c5e9f3b6d8a1e4c7f2b9d5a8c3e6f1b7d4a9c2e5f8b3d6a1c4

# Client URL (will be your Replit frontend URL)
CLIENT_URL=https://your-repl-name.your-username.repl.co
```

### Step 4: Create Database Tables

In the Replit Shell, run:

```bash
cd server
node createDB.js
node seed.js
```

This will create the database structure and add the admin account.

### Step 5: Update Frontend API URL

After deployment, you'll get a Replit URL like:
```
https://your-repl-name.your-username.repl.co
```

Update the frontend to use this URL:

1. In Replit, open `client/.env.production`
2. Update:
```env
REACT_APP_API_URL=https://your-repl-name.your-username.repl.co/api
```

### Step 6: Run the Application

Click the **"Run"** button in Replit. This will:
1. Install dependencies
2. Start the backend server
3. The backend will be available at the Replit URL

### Step 7: Deploy Frontend Separately (Recommended)

For better performance, deploy the frontend to **Vercel** or **Netlify**:

#### Option A: Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd client
vercel --prod
```

3. Set environment variable in Vercel:
```
REACT_APP_API_URL=https://your-repl-name.your-username.repl.co/api
```

#### Option B: Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build and deploy:
```bash
cd client
npm run build
netlify deploy --prod --dir=build
```

3. Set environment variable in Netlify dashboard:
```
REACT_APP_API_URL=https://your-repl-name.your-username.repl.co/api
```

## 🔐 Login Credentials

After deployment, login with:
- **Email:** admin@crm.com
- **Password:** admin123

**⚠️ IMPORTANT:** Change the admin password after first login!

## 🧪 Testing Your Deployment

1. Visit your Replit URL + `/api/health`
   - Example: `https://your-repl-name.your-username.repl.co/api/health`
   - Should return: `{"success": true, "message": "Mini CRM API is running"}`

2. Test login endpoint:
```bash
curl -X POST https://your-repl-name.your-username.repl.co/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@crm.com","password":"admin123"}'
```

## 📝 Post-Deployment Checklist

- [ ] Database is accessible from Replit
- [ ] Environment variables are set correctly
- [ ] Database tables are created
- [ ] Admin account is seeded
- [ ] Backend health check returns success
- [ ] Login endpoint works
- [ ] Frontend can connect to backend
- [ ] CORS is configured correctly

## ⚠️ Common Issues

### Issue 1: "Cannot connect to database"
**Solution:** Check your database credentials in Secrets. Make sure the database host allows external connections.

### Issue 2: "CORS Error"
**Solution:** Update `CLIENT_URL` in Replit Secrets to match your frontend URL exactly.

### Issue 3: "401 Unauthorized"
**Solution:** Check that JWT_SECRET is set in environment variables.

## 🔧 Maintenance

### Viewing Logs
Check the Replit console for server logs and errors.

### Restarting the Server
Click the "Stop" button and then "Run" again in Replit.

### Updating Code
1. Push changes to GitHub
2. In Replit, go to Version Control
3. Pull latest changes
4. Restart the server

## 💡 Tips

1. **Keep Replit Active:** Free Replits sleep after inactivity. Consider:
   - Upgrading to Replit Hacker plan
   - Using UptimeRobot to ping your app every 5 minutes

2. **Database Backups:** Regularly export your database data

3. **Environment Variables:** Never commit `.env` files to GitHub

4. **Monitoring:** Use services like Better Uptime or Pingdom to monitor your deployment

## 🆘 Need Help?

- [Replit Documentation](https://docs.replit.com)
- [Railway MySQL Docs](https://docs.railway.app/databases/mysql)
- [Vercel Documentation](https://vercel.com/docs)

---

**Your Mini CRM is now live! 🎉**
