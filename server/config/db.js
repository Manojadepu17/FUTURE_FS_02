const { Sequelize } = require('sequelize');

/**
 * MySQL Connection Configuration
 * Establishes connection to MySQL database using Sequelize
 */
const sequelize = new Sequelize(
  process.env.DB_NAME || 'mini_crm',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ MySQL Connected: ${process.env.DB_HOST || 'localhost'}`);
    
    // Sync all models with database
    await sequelize.sync({ alter: false });
    console.log('✅ Database synchronized');
  } catch (error) {
    console.error(`❌ MySQL Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
