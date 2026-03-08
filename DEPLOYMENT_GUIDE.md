# Mini CRM Deployment Guide

## Architecture
- **Backend (API)**: Deploy on Render
- **Frontend**: Deploy on Vercel or Netlify
- **Database**: MySQL on freesqldatabase.com

---

## Step 1: Deploy Backend on Render ✅

Your backend is already deployed and running!

**Backend URL**: `https://future-fs-02-qsr7.onrender.com`

### Backend Configuration (Already Done):
- ✅ MySQL database connected: `sql12.freesqldatabase.com`
- ✅ Database synchronized
- ✅ API endpoints working

### Test Your Backend:
```bash
# Health check
curl https://future-fs-02-qsr7.onrender.com/api/health

# Check database
curl https://future-fs-02-qsr7.onrender.com/api/check-database
```

---

## Step 2: Deploy Frontend on Vercel

### Option A: Deploy via Vercel Dashboard (Easiest)

1. **Go to**: https://vercel.com
2. **Sign in** with GitHub
3. **Import your project**:
   - Click "Add New" → "Project"
   - Select your GitHub repository
4. **Configure the project**:
   - Framework Preset: **Create React App**
   - Root Directory: **client** ← IMPORTANT!
   - Build Command: `npm run build`
   - Output Directory: `build`
5. **Add Environment Variable**:
   - Name: `REACT_APP_API_URL`
   - Value: `https://future-fs-02-qsr7.onrender.com/api`
6. **Deploy**!

Your frontend will be live at: `https://your-project.vercel.app`

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to client folder
cd client

# Login to Vercel
vercel login

# Deploy
vercel

# When prompted:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name: mini-crm
# - Directory: ./ (it's already in client folder)
# - Override settings? No

# Set environment variable
vercel env add REACT_APP_API_URL
# Enter: https://future-fs-02-qsr7.onrender.com/api

# Deploy to production
vercel --prod
```

---

## Step 3: Update Backend CORS

After deploying the frontend, update Render environment variables:

1. Go to Render Dashboard → Your Service → Environment
2. Update `CLIENT_URL` to your Vercel URL:
   ```
   CLIENT_URL=https://your-project.vercel.app
   ```
3. Click "Save Changes" (will auto-redeploy)

---

## Step 4: Test Full System

1. **Visit your frontend**: `https://your-project.vercel.app`
2. **Login with**:
   - Username: `admin`
   - Password: `admin123`
3. **Test features**:
   - Dashboard loads
   - View leads
   - Add new lead
   - Update lead status

---

## Alternative: Deploy Frontend on Netlify

### Deploy via Netlify (Drag & Drop)

1. **Build your frontend locally**:
   ```bash
   cd client
   npm run build
   ```

2. **Go to**: https://app.netlify.com
3. **Drag the `client/build` folder** to the deploy zone
4. **Configure**:
   - Site settings → Environment variables
   - Add: `REACT_APP_API_URL` = `https://future-fs-02-qsr7.onrender.com/api`
5. **Redeploy** from Settings

---

## Troubleshooting

### Backend Issues

**MySQL Connection Failed**:
- Verify credentials in Render environment variables
- Check if freesqldatabase.com database is active
- Test connection: `node server/test-mysql.js` (locally)

**CORS Errors**:
- Update `CLIENT_URL` in Render to match your frontend URL
- Make sure frontend URL doesn't have trailing slash

### Frontend Issues

**API Calls Failing**:
- Check `REACT_APP_API_URL` contains `/api` at the end
- Verify backend is running: visit `https://future-fs-02-qsr7.onrender.com/api/health`
- Check browser console for CORS errors

**Build Fails on Vercel**:
- Make sure Root Directory is set to `client`
- Check build logs for missing dependencies
- Try building locally first: `cd client && npm run build`

---

## Current Status

✅ **Backend**: Running on Render with MySQL  
✅ **Database**: Connected to freesqldatabase.com  
⏳ **Frontend**: Ready to deploy on Vercel/Netlify  

**Next Step**: Deploy frontend using the guide above!
