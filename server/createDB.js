require('dotenv').config();
const mysql = require('mysql2/promise');

/**
 * Create Database Script
 * Creates the mini_crm database if it doesn't exist
 */
const createDatabase = async () => {
  try {
    // Connect to MySQL without specifying a database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    console.log('✅ Connected to MySQL');

    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'mini_crm'}`);
    console.log(`✅ Database '${process.env.DB_NAME || 'mini_crm'}' created/verified`);

    await connection.end();
    console.log('✅ Ready to seed database!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating database:', error.message);
    process.exit(1);
  }
};

createDatabase();
