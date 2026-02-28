const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const Lead = require('../models/Lead');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @route   GET /api/leads
 * @desc    Get all leads with filtering and sorting
 * @access  Protected
 */
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, search, sortBy = 'createdAt', order = 'DESC' } = req.query;

    // Build query
    let where = {};
    
    if (status && status !== 'all') {
      where.status = status;
    }

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } }
      ];
    }

    // Execute query with sorting
    const leads = await Lead.findAll({
      where,
      order: [[sortBy, order.toUpperCase()]]
    });

    res.json({
      success: true,
      count: leads.length,
      leads
    });
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching leads' 
    });
  }
});

/**
 * @route   GET /api/leads/stats
 * @desc    Get lead statistics
 * @access  Protected
 */
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const total = await Lead.count();
    const newLeads = await Lead.count({ where: { status: 'new' } });
    const contacted = await Lead.count({ where: { status: 'contacted' } });
    const converted = await Lead.count({ where: { status: 'converted' } });

    res.json({
      success: true,
      stats: {
        total,
        new: newLeads,
        contacted,
        converted
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching statistics' 
    });
  }
});

/**
 * @route   POST /api/leads
 * @desc    Create a new lead
 * @access  Protected (Admin only)
 */
router.post(
  '/',
  authMiddleware,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('phone').optional(),
    body('source').optional().isIn(['Website', 'LinkedIn', 'Referral', 'Other'])
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

      const { name, email, phone, source, notes } = req.body;

      // Create new lead
      const lead = await Lead.create({
        name,
        email,
        phone: phone || '',
        source: source || 'Website',
        notes: notes || ''
      });

      res.status(201).json({
        success: true,
        message: 'Lead created successfully',
        lead
      });
    } catch (error) {
      console.error('Create lead error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error creating lead' 
      });
    }
  }
);

/**
 * @route   PUT /api/leads/:id
 * @desc    Update a lead
 * @access  Protected
 */
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { status, notes, name, email, phone, source } = req.body;

    // Find lead
    const lead = await Lead.findByPk(req.params.id);
    
    if (!lead) {
      return res.status(404).json({ 
        success: false, 
        message: 'Lead not found' 
      });
    }

    // Update fields
    const updateData = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (source) updateData.source = source;

    await lead.update(updateData);

    res.json({
      success: true,
      message: 'Lead updated successfully',
      lead
    });
  } catch (error) {
    console.error('Update lead error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating lead' 
    });
  }
});

/**
 * @route   DELETE /api/leads/:id
 * @desc    Delete a lead
 * @access  Protected
 */
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);

    if (!lead) {
      return res.status(404).json({ 
        success: false, 
        message: 'Lead not found' 
      });
    }

    await lead.destroy();

    res.json({
      success: true,
      message: 'Lead deleted successfully'
    });
  } catch (error) {
    console.error('Delete lead error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting lead' 
    });
  }
});

module.exports = router;
