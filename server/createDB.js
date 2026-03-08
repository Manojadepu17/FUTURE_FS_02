require('dotenv').config();

/**
 * Create Database Script
 * Creates the MySQL database when DB_DIALECT=mysql.
 */
const createDatabase = async () => {
  try {
    const dialect = (process.env.DB_DIALECT || 'sqlite').toLowerCase();

    if (dialect !== 'mysql') {
      console.log(`ℹ️ DB_DIALECT is '${dialect}'. Skipping MySQL database creation.`);
      process.exit(0);
    }

    const mysql = require('mysql2/promise');

    // Connect to MySQL without specifying a database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      connectTimeout: 60000,
      charset: 'utf8mb4'
    });

    console.log('✅ Connected to MySQL');

    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || 'mini_crm';
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`✅ Database '${dbName}' created/verified`);

    await connection.end();
    console.log('✅ Ready to seed database!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating database:', error.message);
    process.exit(1);
  }
};

createDatabase();
