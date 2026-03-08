require('dotenv').config();

/**
 * Quick MySQL Connection Test
 * Tests the connection to your freesqldatabase MySQL
 */
async function testConnection() {
  console.log('🔍 Testing MySQL Connection...\n');
  
  // Show configuration (hide password)
  console.log('Configuration:');
  console.log(`  DB_HOST: ${process.env.DB_HOST}`);
  console.log(`  DB_PORT: ${process.env.DB_PORT}`);
  console.log(`  DB_NAME: ${process.env.DB_NAME}`);
  console.log(`  DB_USER: ${process.env.DB_USER}`);
  console.log(`  DB_PASSWORD: ${process.env.DB_PASSWORD ? '***' + process.env.DB_PASSWORD.slice(-3) : '(empty)'}`);
  console.log(`  DB_DIALECT: ${process.env.DB_DIALECT}\n`);

  try {
    const mysql = require('mysql2/promise');
    
    console.log('📡 Attempting to connect...');
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectTimeout: 60000,
      charset: 'utf8mb4'
    });

    console.log('✅ Connected to MySQL server!\n');

    // Test database access
    console.log('📂 Checking database access...');
    const [databases] = await connection.query('SHOW DATABASES');
    console.log('Available databases:', databases.map(db => db.Database).join(', '));

    // Try to use the specified database
    try {
      await connection.query(`USE \`${process.env.DB_NAME}\``);
      console.log(`✅ Successfully switched to database: ${process.env.DB_NAME}\n`);
      
      // Show existing tables
      const [tables] = await connection.query('SHOW TABLES');
      if (tables.length > 0) {
        console.log('Existing tables:', tables.map(t => Object.values(t)[0]).join(', '));
      } else {
        console.log('No tables found (database is empty)');
      }
    } catch (dbError) {
      console.log(`⚠️  Database '${process.env.DB_NAME}' not found or inaccessible`);
      console.log('   You may need to create it first using createDB.js\n');
    }

    await connection.end();
    console.log('\n✅ Connection test successful!');
    console.log('\nNext steps:');
    console.log('1. Run: node createDB.js (to create database if needed)');
    console.log('2. Run: node seed.js (to create tables and add sample data)');
    console.log('3. Run: npm start (to start the server)');
    
  } catch (error) {
    console.error('\n❌ Connection failed!');
    console.error('Error:', error.message);
    console.error('\nCommon issues:');
    console.error('• Wrong credentials (check DB_USER, DB_PASSWORD)');
    console.error('• Wrong hostname (check DB_HOST)');
    console.error('• Firewall blocking port 3306');
    console.error('• Database host requires SSL/TLS connection');
    console.error('\nPlease verify your credentials from freesqldatabase.com');
    process.exit(1);
  }
}

testConnection();
