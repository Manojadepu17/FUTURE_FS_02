const { Sequelize } = require('sequelize');
const path = require('path');

/**
 * Database Connection Configuration
 * Supports MySQL and SQLite via DB_DIALECT.
 */
const dialect = (process.env.DB_DIALECT || 'sqlite').toLowerCase();
const isMySQL = dialect === 'mysql';

const commonConfig = {
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

if (isMySQL) {
  const missing = ['DB_HOST', 'DB_NAME', 'DB_USER'].filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing required MySQL environment variables: ${missing.join(', ')}`);
  }
}

const sqlitePath = process.env.DB_STORAGE || path.join(__dirname, '..', 'database.sqlite');

const sequelize = isMySQL
  ? new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD || '',
      {
        ...commonConfig,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 3306),
        dialect: 'mysql',
        dialectOptions: {
          connectTimeout: 60000,
          charset: 'utf8mb4'
        },
        define: {
          charset: 'utf8mb4',
          collate: 'utf8mb4_unicode_ci'
        }
      }
    )
  : new Sequelize({
      ...commonConfig,
      dialect: 'sqlite',
      storage: sqlitePath
    });

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    if (isMySQL) {
      console.log(`✅ MySQL Connected: ${process.env.DB_HOST}:${process.env.DB_PORT || 3306}/${process.env.DB_NAME}`);
    } else {
      console.log(`✅ SQLite Connected: ${sqlitePath}`);
    }
    
    // Sync all models with database
    const syncOptions = process.env.NODE_ENV === 'production' ? { alter: false } : { alter: true };
    await sequelize.sync(syncOptions);
    console.log('✅ Database synchronized');
  } catch (error) {
    console.error(`❌ Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
