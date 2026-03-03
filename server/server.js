require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./config/db');
const { apiRateLimiter } = require('./middleware/rateLimiter');

// Import routes
const authRoutes = require('./routes/authRoutes');
const leadRoutes = require('./routes/leadRoutes');

// Initialize Express app
const app = express();

// Connect to MySQL
connectDB();

// Security: CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' })); // Limit payload size
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security: Prevent parameter pollution
app.use((req, res, next) => {
  // Remove __proto__ and constructor from request body
  const sanitize = (obj) => {
    if (obj && typeof obj === 'object') {
      delete obj.__proto__;
      delete obj.constructor;
      Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object') sanitize(obj[key]);
      });
    }
    return obj;
  };
  req.body = sanitize(req.body);
  next();
});

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Apply rate limiting to all API routes
app.use('/api', apiRateLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Mini CRM API is running',
    timestamp: new Date().toISOString()
  });
});

// Temporary seed endpoint for initial setup (remove after first use)
app.post('/api/setup-database', async (req, res) => {
  try {
    console.log('🌱 Starting database setup...');
    const Admin = require('./models/Admin');
    const Lead = require('./models/Lead');
    const { sequelize } = require('./config/db');

    console.log('📊 Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');

    console.log('🔍 Checking for existing admin...');
    const existingAdmin = await Admin.findOne({ where: { email: 'admin@minicrm.com' } });
    if (existingAdmin) {
      console.log('⚠️  Admin already exists');
      return res.status(400).json({ 
        success: false, 
        message: 'Database already seeded. Admin user exists.' 
      });
    }

    console.log('🔨 Syncing database tables...');
    await sequelize.sync();
    console.log('✅ Tables synced');

    console.log('👤 Creating admin user...');
    await Admin.create({
      username: 'admin',
      email: 'admin@minicrm.com',
      password: 'admin123'
    });
    console.log('✅ Admin created');

    console.log('📝 Creating sample leads...');
    const sampleLeads = [
      {
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '+1234567890',
        source: 'Website',
        status: 'new',
        notes: 'Interested in our premium package'
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        phone: '+1234567891',
        source: 'LinkedIn',
        status: 'contacted',
        notes: 'Follow up next week'
      },
      {
        name: 'Mike Williams',
        email: 'mike.w@example.com',
        phone: '+1234567892',
        source: 'Referral',
        status: 'converted',
        notes: 'Successfully closed the deal'
      }
    ];

    await Lead.bulkCreate(sampleLeads);
    console.log('✅ Sample leads created');

    console.log('🎉 Database setup complete!');
    res.json({ 
      success: true, 
      message: 'Database seeded successfully!',
      credentials: {
        email: 'admin@minicrm.com',
        password: 'admin123'
      }
    });
  } catch (error) {
    console.error('❌ SEED ERROR:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ 
      success: false, 
      message: 'Error seeding database',
      error: error.message,
      details: error.toString()
    });
  }
});

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  // Serve React app for any non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
} else {
  // 404 handler for development
  app.use((req, res) => {
    res.status(404).json({ 
      success: false, 
      message: 'Route not found' 
    });
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
