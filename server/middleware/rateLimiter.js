/**
 * Rate Limiting Middleware
 * Prevents brute force attacks on authentication endpoints
 */

const loginAttempts = new Map();

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of loginAttempts.entries()) {
    if (now - data.firstAttempt > 3600000) { // 1 hour
      loginAttempts.delete(ip);
    }
  }
}, 3600000);

/**
 * Rate limit login attempts
 * Max 5 failed attempts per IP per hour
 */
const loginRateLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!loginAttempts.has(ip)) {
    loginAttempts.set(ip, {
      count: 0,
      firstAttempt: now,
      blockedUntil: null
    });
  }
  
  const attempts = loginAttempts.get(ip);
  
  // Check if IP is currently blocked
  if (attempts.blockedUntil && now < attempts.blockedUntil) {
    const remainingTime = Math.ceil((attempts.blockedUntil - now) / 1000 / 60);
    return res.status(429).json({
      success: false,
      message: `Too many login attempts. Please try again in ${remainingTime} minutes.`
    });
  }
  
  // Reset if block period has passed
  if (attempts.blockedUntil && now >= attempts.blockedUntil) {
    attempts.count = 0;
    attempts.firstAttempt = now;
    attempts.blockedUntil = null;
  }
  
  // Check if exceeded max attempts
  if (attempts.count >= 5) {
    attempts.blockedUntil = now + (15 * 60 * 1000); // Block for 15 minutes
    return res.status(429).json({
      success: false,
      message: 'Too many login attempts. Please try again in 15 minutes.'
    });
  }
  
  // Track this attempt
  const originalJson = res.json.bind(res);
  res.json = function(data) {
    // If login failed, increment counter
    if (data && !data.success && res.statusCode === 401) {
      attempts.count++;
    } else if (data && data.success) {
      // Reset on successful login
      loginAttempts.delete(ip);
    }
    return originalJson(data);
  };
  
  next();
};

/**
 * General API rate limiter
 * Max 100 requests per minute per IP
 */
const apiRateLimiter = (() => {
  const requests = new Map();
  
  // Clean up old entries every minute
  setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of requests.entries()) {
      if (now - data.windowStart > 60000) { // 1 minute
        requests.delete(ip);
      }
    }
  }, 60000);
  
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    if (!requests.has(ip)) {
      requests.set(ip, {
        count: 1,
        windowStart: now
      });
      return next();
    }
    
    const data = requests.get(ip);
    
    // Reset window if expired
    if (now - data.windowStart > 60000) {
      data.count = 1;
      data.windowStart = now;
      return next();
    }
    
    // Check if exceeded limit
    if (data.count >= 100) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.'
      });
    }
    
    data.count++;
    next();
  };
})();

module.exports = {
  loginRateLimiter,
  apiRateLimiter
};
