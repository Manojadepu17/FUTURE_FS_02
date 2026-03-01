# Netlify Frontend Deployment Guide

## 🚀 Deploy React Frontend to Netlify (FREE)

### Step 1: Prepare Frontend

Update API URL to point to your Glitch backend:

**Edit: `client/src/services/api.js`**

Change the base URL to your Glitch backend URL:
```javascript
const API_URL = 'https://your-project-name.glitch.me/api';
```

Then commit:
```bash
git add client/src/services/api.js
git commit -m "Update API URL for Glitch backend"
git push
```

### Step 2: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub (completely free)
3. Click **"Add new site"** → **"Import an existing project"**
4. Select **GitHub** → Choose your **FUTURE_FS_02** repository
5. Configure build settings:
   - **Base directory:** `client`
   - **Build command:** `npm run build`
   - **Publish directory:** `client/build`
6. Click **"Deploy site"**

### Step 3: Get Frontend URL

After deployment (2-3 minutes):
- Netlify will give you a URL like: `https://your-site-name.netlify.app`
- Copy this URL

### Step 4: Update Backend CORS

1. Go back to your **Glitch** project
2. Open the **`.env`** file
3. Update `CLIENT_URL` with your Netlify URL:
```env
CLIENT_URL=https://your-site-name.netlify.app
```

### Step 5: Test Your App!

Visit your Netlify URL: `https://your-site-name.netlify.app`

Default login credentials:
- **Email:** `admin@minicrm.com`
- **Password:** `admin123`

---

## 🎉 Complete Deployment!

✅ Backend: Glitch (API server)  
✅ Frontend: Netlify (React app)  
✅ Database: Railway MySQL  

All completely FREE!
