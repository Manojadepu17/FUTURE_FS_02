# 🚀 Quick Deploy - 5 Minute Setup

## Prerequisites
- GitHub account
- Render account (free) at [render.com](https://render.com)

---

## Step 1: Push to GitHub (2 min)
```bash
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/YOUR_USERNAME/mini-crm.git
git branch -M main
git push -u origin main
```

---

## Step 2: Create MySQL Database on Render (1 min)
1. Go to [render.com](https://render.com) → **New +** → **MySQL**
2. Name: `mini-crm-db`
3. Click **Create Database**
4. **Copy** the connection details (Host, User, Password)

---

## Step 3: Deploy Web Service (2 min)
1. **New +** → **Web Service**
2. Connect GitHub repo
3. Settings:
   - **Build Command**: 
     ```
     npm install && cd server && npm install && cd ../client && npm install && npm run build
     ```
   - **Start Command**: 
     ```
     cd server && npm start
     ```

4. **Environment Variables** (click Advanced):
   ```
   NODE_ENV = production
   PORT = 10000
   DB_HOST = [from database]
   DB_PORT = 3306
   DB_NAME = mini_crm
   DB_USER = [from database]
   DB_PASSWORD = [from database]
   JWT_SECRET = [run: node generateSecret.js]
   CLIENT_URL = https://your-app.onrender.com
   ```

5. Click **Create Web Service**

---

## Step 4: Seed Database
Once deployed, in Render Shell:
```bash
cd server && npm run seed
```

---

## ✅ Done! Your Live URL:
`https://your-app-name.onrender.com`

**Login:**
- Email: `admin@minicrm.com`
- Password: `admin123`

---

## 📱 Share on LinkedIn

```
🚀 Check out my full-stack Mini CRM application!

Built with React, Node.js, Express & MySQL
featuring JWT auth, CRUD operations, and modern UI.

🔗 Live: https://your-app.onrender.com

#WebDevelopment #React #NodeJS #FullStack
```

---

**Need detailed help?** See [DEPLOYMENT.md](DEPLOYMENT.md)
