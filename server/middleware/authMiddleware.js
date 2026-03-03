const jwt = require('jsonwebtoken');

/**
 * Authentication Middleware
 * Protects routes by verifying JWT token
 */
const authMiddleware = (req, res, next) => {
  try {
    console.log('🔐 Auth check for:', req.method, req.path);
    console.log('📋 Headers:', req.headers.authorization);
    
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      console.log('❌ No token provided');
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }

    console.log('🔑 Token received, verifying...');
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token valid for admin:', decoded.email);
    req.admin = decoded;
    next();
  } catch (error) {
    console.log('❌ Token verification failed:', error.message);
    res.status(401).json({ 
      success: false, 
      message: 'Invalid or expired token.' 
    });
  }
};

module.exports = authMiddleware;
