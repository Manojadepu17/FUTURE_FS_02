require('dotenv').config();
const { sequelize } = require('./config/db');
const Admin = require('./models/Admin');
const Lead = require('./models/Lead');

/**
 * Database Seeder Script
 * Creates initial admin user and sample leads
 */
const seedDatabase = async () => {
  try {
    // Connect to MySQL
    await sequelize.authenticate();
    console.log('✅ Connected to MySQL');

    // Sync database (create tables if they don't exist)
    await sequelize.sync({ force: true }); // force: true will drop and recreate tables
    console.log('✅ Database synchronized');

    // Clear existing data (already done by force: true)
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const admin = await Admin.create({
      username: 'admin',
      email: 'admin@crm.com',
      password: 'admin123'
    });
    console.log('👤 Admin user created');
    console.log('   Email: admin@crm.com');
    console.log('   Password: admin123');

    // Create sample leads
    const sampleLeads = [
      {
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '+1234567890',
        source: 'Website',
        status: 'new',
        notes: 'Interested in our premium package'
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        phone: '+1234567891',
        source: 'LinkedIn',
        status: 'contacted',
        notes: 'Follow up next week'
      },
      {
        name: 'Mike Williams',
        email: 'mike.w@example.com',
        phone: '+1234567892',
        source: 'Referral',
        status: 'converted',
        notes: 'Successfully closed the deal'
      },
      {
        name: 'Emily Davis',
        email: 'emily.d@example.com',
        phone: '+1234567893',
        source: 'Website',
        status: 'new',
        notes: ''
      },
      {
        name: 'Robert Brown',
        email: 'robert.b@example.com',
        phone: '+1234567894',
        source: 'Other',
        status: 'contacted',
        notes: 'Sent pricing details'
      }
    ];

    await Lead.bulkCreate(sampleLeads);
    console.log(`📊 Created ${sampleLeads.length} sample leads`);

    console.log('\n✨ Database seeded successfully!');
    console.log('\n🚀 You can now run: npm run dev');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
