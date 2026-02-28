# 📊 Mini CRM - Customer Relationship Management System

A professional, full-stack CRM web application for managing customer leads with a beautiful modern UI featuring glassmorphism design, JWT authentication, and complete CRUD operations.

![Tech Stack](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)

## 🚀 Deploy Your Own

Want to get a **public live URL** to share on LinkedIn? 

👉 **[Quick Deploy Guide](QUICK_DEPLOY.md)** (5 minutes) | **[Detailed Deployment](DEPLOYMENT.md)**

---

## ✨ Features

### 🔐 Authentication System
- Secure JWT-based admin login
- Password hashing with bcrypt
- Protected routes and middleware
- Auto token refresh handling

### 📈 Lead Management (Full CRUD)
- View all leads in a beautiful dashboard
- Create new leads from contact forms
- Update lead status (New → Contacted → Converted)
- Add and edit follow-up notes
- Delete leads with confirmation
- Search leads by name or email
- Filter by status

### 📊 Dashboard Analytics
- **Total Leads** - Overview of all leads
- **New Leads** - Fresh inquiries
- **Contacted Leads** - Follow-up in progress
- **Converted Leads** - Successfully closed deals

### 🎨 Modern Professional UI
- Gradient animated backgrounds
- Glassmorphism cards with blur effects
- Smooth animations and transitions
- Responsive design (Mobile, Tablet, Desktop)
- Status badges with color coding
- Toast notifications
- Loading spinners
- Modal dialogs
- Empty states

### 🎯 Additional Features
- Real-time statistics
- Sort and filter functionality
- Lead source tracking
- Timestamp tracking
- Professional color palette
- Google Fonts (Poppins)

## 🛠️ Tech Stack

### Frontend
- **React.js 18.2** - UI framework
- **React Router DOM** - Navigation
- **Axios** - HTTP client
- **CSS3** - Modern styling with animations
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin support

## 📁 Project Structure

```
mini-crm/
│
├── client/                      # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── LoadingSpinner.js
│   │   │   ├── LoadingSpinner.css
│   │   │   ├── Toast.js
│   │   │   ├── Toast.css
│   │   │   ├── StatCard.js
│   │   │   ├── StatCard.css
│   │   │   ├── Modal.js
│   │   │   └── Modal.css
│   │   ├── pages/               # Page components
│   │   │   ├── Login.js
│   │   │   ├── Login.css
│   │   │   ├── Dashboard.js
│   │   │   └── Dashboard.css
│   │   ├── context/             # React Context
│   │   │   └── AuthContext.js
│   │   ├── services/            # API services
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── .env
│   └── package.json
│
├── server/                      # Node.js Backend
│   ├── models/                  # Database models
│   │   ├── Admin.js
│   │   └── Lead.js
│   ├── routes/                  # API routes
│   │   ├── authRoutes.js
│   │   └── leadRoutes.js
│   ├── middleware/              # Custom middleware
│   │   └── authMiddleware.js
│   ├── config/                  # Configuration
│   │   └── db.js
│   ├── server.js               # Entry point
│   ├── seed.js                 # Database seeder
│   ├── .env
│   └── package.json
│
├── package.json                 # Root package.json
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager

### Installation

1. **Clone or Download the Project**
   ```bash
   cd C:\Users\DELL\Desktop\CRM
   ```

2. **Install Dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Configure Environment Variables**

   The `.env` files are already created with default values:
   
   **Server (.env)** - Located at `server/.env`:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/mini-crm
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
   CLIENT_URL=http://localhost:3000
   ```

   **Client (.env)** - Located at `client/.env`:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start MongoDB**

   Make sure MongoDB is running on your system:
   
   **Windows:**
   ```bash
   # If MongoDB is installed as a service (default)
   net start MongoDB
   
   # Or run manually
   mongod
   ```

   **Mac/Linux:**
   ```bash
   # Start MongoDB service
   sudo systemctl start mongod
   
   # Or run manually
   mongod --dbpath /path/to/data/directory
   ```

5. **Seed the Database**

   Create initial admin user and sample leads:
   ```bash
   cd server
   npm run seed
   ```

   This will create:
   - **Admin User:**
     - Email: `admin@crm.com`
     - Password: `admin123`
   - **5 Sample Leads** with different statuses

6. **Run the Application**

   **Option 1: Run Both (Recommended)**
   ```bash
   # From the root directory
   npm run dev
   ```
   This will start both the backend (port 5000) and frontend (port 3000) concurrently.

   **Option 2: Run Separately**
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev

   # Terminal 2 - Frontend
   cd client
   npm start
   ```

7. **Access the Application**

   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

   **Login Credentials:**
   - Email: `admin@crm.com`
   - Password: `admin123`

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/login       - Admin login
POST   /api/auth/register    - Register new admin (for setup)
```

### Leads Management
```
GET    /api/leads            - Get all leads (with filters)
GET    /api/leads/stats      - Get lead statistics
POST   /api/leads            - Create new lead
PUT    /api/leads/:id        - Update lead
DELETE /api/leads/:id        - Delete lead
```

### Example API Requests

**Login:**
```json
POST /api/auth/login
{
  "email": "admin@crm.com",
  "password": "admin123"
}
```

**Create Lead:**
```json
POST /api/leads
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "source": "Website",
  "notes": "Interested in premium package"
}
```

**Update Lead Status:**
```json
PUT /api/leads/64abc123def
{
  "status": "contacted",
  "notes": "Called and sent pricing info"
}
```

## 🎨 Design System

### Color Palette
- **Primary:** `#4F46E5` (Indigo)
- **Secondary:** `#6366F1` (Blue Indigo)
- **Accent:** `#22D3EE` (Cyan)
- **Success:** `#10b981` (Green)
- **Warning:** `#f59e0b` (Orange)
- **Error:** `#ef4444` (Red)

### Status Colors
- **New:** Blue (`#3b82f6`)
- **Contacted:** Orange (`#f59e0b`)
- **Converted:** Green (`#10b981`)

### Typography
- **Font Family:** Poppins (Google Fonts)
- **Weights:** 300, 400, 500, 600, 700

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration
- Environment variable security
- Token expiration handling
- XSS protection

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px - 767px)
- 📱 Tablets (768px - 1023px)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1400px+)

## 🧪 Testing the Application

### Manual Testing Checklist

1. **Authentication**
   - [ ] Login with valid credentials
   - [ ] Login with invalid credentials
   - [ ] Auto-redirect when not authenticated
   - [ ] Logout functionality

2. **Lead Management**
   - [ ] View all leads
   - [ ] Search leads by name/email
   - [ ] Filter by status
   - [ ] Update lead status
   - [ ] Add/edit notes
   - [ ] Delete lead
   - [ ] View statistics

3. **UI/UX**
   - [ ] Animations smooth
   - [ ] Responsive on mobile
   - [ ] Toasts appear correctly
   - [ ] Modal opens/closes
   - [ ] Loading states work

## 🚨 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongosh

# If connection fails, check MONGO_URI in server/.env
```

### Port Already in Use
```bash
# Kill process on port 5000 (Backend)
npx kill-port 5000

# Kill process on port 3000 (Frontend)
npx kill-port 3000
```

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🎯 Future Enhancements

- [ ] Email notifications
- [ ] Lead import/export (CSV)
- [ ] Advanced filtering and sorting
- [ ] Lead assignment to team members
- [ ] Activity timeline
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Analytics dashboard with charts
- [ ] Email templates
- [ ] Calendar integration

## 📝 Scripts Reference

```bash
# Root directory
npm run dev          # Run both client and server
npm run install-all  # Install all dependencies
npm run server       # Run server only
npm run client       # Run client only
npm run build        # Build for production

# Server directory
npm start            # Start server (production)
npm run dev          # Start with nodemon (development)
npm run seed         # Seed database

# Client directory
npm start            # Start development server
npm run build        # Create production build
```

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created with ❤️ for learning and demonstration purposes.

## 🙏 Acknowledgments

- React.js Documentation
- Express.js Documentation
- MongoDB Documentation
- Google Fonts (Poppins)
- Modern UI/UX Design Principles

---

### 🎉 Congratulations!

You now have a fully functional, production-ready Mini CRM system with:
- ✅ Beautiful modern UI
- ✅ Secure authentication
- ✅ Complete CRUD operations
- ✅ Real-time statistics
- ✅ Responsive design
- ✅ Professional code structure

**Happy Lead Managing! 🚀**
