const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const authMiddleware = require('../middleware/authMiddleware');
const { loginRateLimiter } = require('../middleware/rateLimiter');

/**
 * @route   POST /api/auth/login
 * @desc    Admin login and generate JWT token
 * @access  Public
 */
router.post(
  '/login',
  loginRateLimiter,
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  async (req, res) => {
    try {
      console.log('🔐 Login attempt:', req.body.email);
      
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('❌ Validation errors:', errors.array());
        return res.status(400).json({ 
          success: false, 
          errors: errors.array() 
        });
      }

      const { email, password } = req.body;
      console.log('📧 Looking for admin with email:', email);

      // Check if admin exists
      const admin = await Admin.findOne({ where: { email } });
      if (!admin) {
        console.log('❌ Admin not found for email:', email);
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid credentials' 
        });
      }

      console.log('✅ Admin found:', admin.email);
      console.log('🔑 Comparing password...');

      // Verify password
      const isMatch = await admin.comparePassword(password);
      console.log('🔑 Password match:', isMatch);
      
      if (!isMatch) {
        console.log('❌ Password mismatch');
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid credentials' 
        });
      }

      console.log('✅ Login successful for:', admin.email);

      // Generate JWT token
      const token = jwt.sign(
        { 
          id: admin.id, 
          email: admin.email 
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        success: true,
        message: 'Login successful',
        token,
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email
        }
      });
    } catch (error) {
      console.error('❌ Login error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Server error during login' 
      });
    }
  }
);

/**
 * @route   POST /api/auth/register
 * @desc    Register a new admin
 * @access  Protected (requires existing admin authentication)
 */
router.post(
  '/register',
  authMiddleware,
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  async (req, res) => {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          success: false, 
          errors: errors.array() 
        });
      }

      const { username, email, password } = req.body;

      // Check if admin already exists
      const existingAdmin = await Admin.findOne({ 
        where: { 
          [require('sequelize').Op.or]: [{ email }, { username }]
        } 
      });
      
      if (existingAdmin) {
        return res.status(400).json({ 
          success: false, 
          message: 'Admin already exists' 
        });
      }

      // Create new admin
      const admin = await Admin.create({
        username,
        email,
        password
      });

      res.status(201).json({
        success: true,
        message: 'Admin registered successfully',
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Server error during registration' 
      });
    }
  }
);

module.exports = router;
