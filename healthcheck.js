/**
 * System Health Check Script
 * Run this to verify all components are working correctly
 */

console.log('\n=== Mini CRM System Health Check ===\n');

const checks = {
  backend: false,
  frontend: false,
  database: false
};

// Check Backend
console.log('Checking Backend API...');
fetch('http://localhost:5000/api/health')
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      console.log('✅ Backend API is running');
      checks.backend = true;
    }
  })
  .catch(err => {
    console.log('❌ Backend API error:', err.message);
  });

// Check Frontend
console.log('Checking Frontend...');
fetch('http://localhost:3000')
  .then(res => {
    if (res.status === 200) {
      console.log('✅ Frontend is running');
      checks.frontend = true;
    }
  })
  .catch(err => {
    console.log('❌ Frontend error:', err.message);
  });

setTimeout(() => {
  console.log('\n=== Summary ===');
  console.log('Backend:', checks.backend ? '✅ Working' : '❌ Not responding');
  console.log('Frontend:', checks.frontend ? '✅ Working' : '❌ Not responding');
  console.log('\nIf all checks passed, your CRM is ready to use!');
  console.log('Access it at: http://localhost:3000');
  console.log('Login: admin@crm.com / admin123\n');
}, 2000);
