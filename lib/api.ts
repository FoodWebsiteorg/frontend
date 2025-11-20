import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth endpoints
export const authAPI = {
  signupCustomer: (data: any) => api.post('/auth/signup-customer', data),
  signupProvider: (data: any) => api.post('/auth/signup-provider', data),
  login: (data: any) => api.post('/auth/login', data),
  loginOTP: (data: any) => api.post('/auth/login-otp', data),
  sendOTP: (data: any) => api.post('/auth/send-otp', data),
  forgotPassword: (data: any) => api.post('/auth/forgot-password', data),
  resetPassword: (data: any) => api.post('/auth/reset-password', data),
};

// Provider endpoints
export const providerAPI = {
  getProviders: (params?: any) => api.get('/provider', { params }),
  getProvider: (id: string) => api.get(`/provider/${id}`),
  updateProvider: (id: string, data: any) => api.put(`/provider/${id}`, data),
  uploadIdProof: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/provider/upload-id', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  updateOnlineStatus: (id: string, onlineStatus: boolean) =>
    api.put(`/provider/${id}/online-status`, { onlineStatus }),
};

// Customer endpoints
export const customerAPI = {
  getProfile: () => api.get('/customer/profile'),
  getBookings: () => api.get('/customer/bookings'),
  getPayments: () => api.get('/customer/payments'),
};

// Booking endpoints
export const bookingAPI = {
  create: (data: any) => api.post('/booking/create', data),
  confirmOTP: (data: any) => api.post('/booking/confirm-otp', data),
  updateStatus: (id: string, status: string) =>
    api.put(`/booking/status/${id}`, { status }),
  getCustomerBookings: (id: string) => api.get(`/booking/customer/${id}`),
  getProviderBookings: (id: string) => api.get(`/booking/provider/${id}`),
};

// Payment endpoints
export const paymentAPI = {
  create: (data: any) => api.post('/payment/create', data),
  getHistory: () => api.get('/payment/history'),
  getInvoice: (id: string) => api.get(`/payment/invoice/${id}`),
};

// Admin endpoints
export const adminAPI = {
  getPendingProviders: () => api.get('/admin/providers/pending'),
  verifyProvider: (providerId: string) =>
    api.put('/admin/providers/verify', { providerId }),
  getBookings: () => api.get('/admin/bookings'),
  getPayments: () => api.get('/admin/payments'),
  getStats: () => api.get('/admin/stats'),
};

// Upload endpoints
export const uploadAPI = {
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

