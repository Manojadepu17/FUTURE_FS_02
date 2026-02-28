# 🔒 Mini CRM Security Documentation

## Security Features Implemented

### ✅ Authentication & Authorization

**1. JWT Token-Based Authentication**
- Secure token generation with strong secret key
- Token expiration: 7 days
- Bearer token authentication scheme
- Automatic token validation on protected routes

**2. Password Security**
- bcrypt hashing with salt (10 rounds)
- Passwords never stored in plain text
- Automatic hashing on user creation and updates
- Minimum password length: 6 characters

**3. Protected Routes**
- Frontend: Protected route component redirects unauthorized users
- Backend: Authentication middleware on all sensitive endpoints
  - GET /api/leads - Requires auth
  - POST /api/leads - Public (for contact forms)
  - PUT /api/leads/:id - Requires auth
  - DELETE /api/leads/:id - Requires auth
  - GET /api/leads/stats - Requires auth
  - POST /api/auth/register - Requires auth (admin only)

### ✅ Input Validation & Sanitization

**1. Express-Validator**
- Email format validation
- Password strength requirements
- Input sanitization on all forms
- Error message standardization

**2. Parameter Pollution Prevention**
- Removes dangerous properties (__proto__, constructor)
- Prevents prototype pollution attacks
- Recursive object sanitization

**3. SQL Injection Protection**
- Sequelize ORM with parameterized queries
- No raw SQL queries
- Input validation on all database operations

### ✅ Rate Limiting

**1. Login Rate Limiting**
- Maximum 5 failed attempts per IP
- 15-minute block after exceeding limit
- Automatic cleanup of tracking data
- Prevents brute force attacks

**2. API Rate Limiting**
- Maximum 100 requests per minute per IP
- Applies to all /api routes
- Prevents DoS attacks
- Auto-reset after 1 minute

### ✅ CORS Configuration

**1. Restricted Origins**
- Only allows configured frontend URL
- Credentials support enabled
- Prevents unauthorized cross-origin requests

### ✅ Security Best Practices

**1. Environment Variables**
- Sensitive data in .env file
- Strong JWT secret (128 characters)
- Database credentials protected
- .env file in .gitignore

**2. Error Handling**
- Generic error messages to users (no stack traces)
- Detailed logging server-side only
- Proper HTTP status codes
- Centralized error handler

**3. Token Management**
- Auto-logout on 401 errors
- Token stored in localStorage (client)
- Tokens sent via Authorization header
- Automatic token inclusion in API requests

**4. Database Security**
- Prepared statements via Sequelize
- Input validation before queries
- Email uniqueness constraints
- Username uniqueness constraints

### ✅ Frontend Security

**1. Protected Routes**
- Authentication check before rendering
- Automatic redirect to login
- Token validation

**2. API Interceptors**
- Automatic token attachment
- 401 error handling
- Automatic logout on unauthorized

**3. XSS Prevention**
- React escapes output by default
- No dangerouslySetInnerHTML used
- Input sanitization

## Security Recommendations for Production

### 🔴 CRITICAL - Must Do Before Production

1. **Change JWT Secret**
   ```bash
   # Generate a new strong secret
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
   Update in `server/.env`: `JWT_SECRET=<generated_secret>`

2. **Enable HTTPS**
   - Use SSL/TLS certificates
   - Deploy behind a reverse proxy (nginx/Apache)
   - Force HTTPS redirection

3. **Update CORS**
   - Set CLIENT_URL to production domain
   - Remove localhost from allowed origins

4. **Secure Database**
   - Use strong MySQL root password
   - Create dedicated database user
   - Limit database user permissions
   - Update DB_PASSWORD in .env

5. **Environment Variables**
   - Set NODE_ENV=production
   - Never commit .env file
   - Use secure secret management service

### 🟡 RECOMMENDED - Should Do

1. **Add Helmet.js**
   ```bash
   npm install helmet
   ```
   Add to server.js for security headers

2. **Use express-rate-limit Package**
   ```bash
   npm install express-rate-limit
   ```
   More robust than custom implementation

3. **Add Content Security Policy**
   - Prevent XSS attacks
   - Control resource loading

4. **Session Management**
   - Consider shorter token expiration
   - Implement refresh tokens
   - Add logout on all devices feature

5. **Logging**
   - Use Winston or Morgan for structured logging
   - Log all authentication attempts
   - Monitor for suspicious activity

6. **Database Backups**
   - Automated daily backups
   - Off-site backup storage
   - Test restore procedures

7. **Monitoring**
   - Add error tracking (Sentry)
   - Monitor API response times
   - Alert on unusual activity

### 🟢 OPTIONAL - Nice to Have

1. **Two-Factor Authentication (2FA)**
2. **Email Verification**
3. **Password Reset via Email**
4. **Account Lockout Policy**
5. **Security Audit Logging**
6. **IP Whitelisting**
7. **DDoS Protection (Cloudflare)**
8. **Penetration Testing**

## Current Security Status

| Feature | Status | Level |
|---------|--------|-------|
| Password Hashing | ✅ Implemented | High |
| JWT Authentication | ✅ Implemented | High |
| Protected Routes | ✅ Implemented | High |
| Input Validation | ✅ Implemented | Medium |
| Rate Limiting | ✅ Implemented | Medium |
| SQL Injection Protection | ✅ Implemented | High |
| XSS Protection | ✅ Implemented | Medium |
| CORS Configuration | ✅ Implemented | Medium |
| Strong JWT Secret | ✅ Implemented | High |
| Registration Protection | ✅ Implemented | High |
| HTTPS | ❌ Not Implemented | Critical |
| Helmet Headers | ❌ Not Implemented | Medium |
| 2FA | ❌ Not Implemented | Low |

## Testing Security

### Test Login Rate Limiting
```bash
# Try to login 6 times with wrong password
# Should get blocked on 6th attempt
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"wrong@email.com","password":"wrongpass"}'
```

### Test Protected Routes
```bash
# Try to access leads without token - should fail
curl http://localhost:5000/api/leads

# Login and get token
TOKEN=$(curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@crm.com","password":"admin123"}' \
  | jq -r '.token')

# Access with token - should succeed
curl http://localhost:5000/api/leads \
  -H "Authorization: Bearer $TOKEN"
```

### Test SQL Injection Protection
```bash
# Try SQL injection in email field - should be sanitized
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@crm.com OR 1=1--","password":"test"}'
```

## Security Checklist

Before deploying to production:

- [ ] Changed JWT_SECRET to strong random value
- [ ] Enabled HTTPS
- [ ] Updated CORS to production domain
- [ ] Set strong MySQL password
- [ ] Set NODE_ENV=production
- [ ] Removed console.log statements
- [ ] Added security headers (Helmet)
- [ ] Tested all authentication flows
- [ ] Tested rate limiting
- [ ] Verified protected routes
- [ ] Checked for SQL injection vulnerabilities
- [ ] Tested XSS prevention
- [ ] Set up monitoring/logging
- [ ] Created database backups
- [ ] Performed security audit

---

**Last Updated:** March 1, 2026  
**Security Level:** Development (Not production-ready until checklist completed)
