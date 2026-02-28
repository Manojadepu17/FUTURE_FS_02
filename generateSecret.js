#!/usr/bin/env node

/**
 * Generate a secure JWT secret for production use
 * Run: node generateSecret.js
 */

const crypto = require('crypto');

const secret = crypto.randomBytes(64).toString('base64');

console.log('\n🔐 Generated JWT Secret:\n');
console.log('━'.repeat(80));
console.log(secret);
console.log('━'.repeat(80));
console.log('\n✅ Copy this secret and add it to your environment variables as JWT_SECRET\n');
console.log('💡 On Render: Dashboard → Environment → Add Environment Variable\n');
