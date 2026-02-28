const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

/**
 * Lead Model
 * Stores customer lead information from contact forms
 */
const Lead = sequelize.define('Lead', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Name is required'
      }
    }
  },
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
    set(value) {
      this.setDataValue('email', value.toLowerCase().trim());
    }
  },
  phone: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: ''
  },
  source: {
    type: DataTypes.ENUM('Website', 'LinkedIn', 'Referral', 'Other'),
    defaultValue: 'Website',
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('new', 'contacted', 'converted'),
    defaultValue: 'new',
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: ''
  }
}, {
  tableName: 'leads',
  timestamps: true
});

module.exports = Lead;
