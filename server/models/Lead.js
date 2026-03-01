const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

/**
 * Lead Model
 * Stores customer lead information from contact forms
 */
const Lead = sequelize.define('Lead', {
  // Primary Key
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'Unique identifier for each lead'
  },
  // Lead's full name
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Name is required'
      }
    },
    comment: 'Full name of the lead/customer'
  },
  // Lead's email address
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Please enter a valid email'
      },
      notEmpty: {
        msg: 'Email is required'
      }
    },
    set(emailValue) {
      // Normalize email: lowercase and trim whitespace
      this.setDataValue('email', emailValue.toLowerCase().trim());
    },
    comment: 'Email address of the lead'
  },
  // Lead's phone number
  phone: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: '',
    comment: 'Contact phone number (optional)'
  },
  // Source of the lead
  source: {
    type: DataTypes.ENUM('Website', 'LinkedIn', 'Referral', 'Other'),
    defaultValue: 'Website',
    allowNull: false,
    comment: 'Where the lead came from (acquisition channel)'
  },
  // Current status of the lead
  status: {
    type: DataTypes.ENUM('new', 'contacted', 'converted'),
    defaultValue: 'new',
    allowNull: false,
    comment: 'Current stage in the sales pipeline'
  },
  // Additional notes about the lead
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '',
    comment: 'Follow-up notes and additional information'
  }
}, {
  tableName: 'leads',
  timestamps: true, // Adds createdAt and updatedAt fields
  comment: 'Customer leads and prospects'
});

module.exports = Lead;
