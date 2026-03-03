import axios from 'axios';

// API URL - check for env variable first, then fallback
const API_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? '/api' 
    : 'http://localhost:5000/api');

console.log('🔧 API Configuration:', {
  REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  NODE_ENV: process.env.NODE_ENV,
  API_URL: API_URL
});

/**
 * API Service
 * Centralized API calls with authentication
 */
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('📤 API Request:', config.method.toUpperCase(), config.url);
    console.log('🔑 Token present:', !!token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => {
    console.log('📥 API Response:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.config?.url, error.response?.status, error.message);
    if (error.response?.status === 401) {
      // Token expired or invalid
      console.log('🚪 Unauthorized - redirecting to login');
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      window.location.href = '/login';  
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => api.post('/auth/register', data)
};

// Leads API
export const leadsAPI = {
  getAll: (params) => api.get('/leads', { params }),
  getStats: () => api.get('/leads/stats'),
  create: (data) => api.post('/leads', data),
  update: (id, data) => api.put(`/leads/${id}`, data),
  delete: (id) => api.delete(`/leads/${id}`)
};

export default api;
