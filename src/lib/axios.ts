import axios from 'axios';

// Get base URL - use proxy in production to avoid mixed content issues
const getBaseURL = () => {
    // In production (Vercel), use internal proxy to avoid HTTPS/HTTP mixed content
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
        return '/api/proxy';
    }
    
    // In development, use direct backend URL
    const url = process.env.NEXT_PUBLIC_API_URL || 'http://103.186.0.127';
    // Remove any surrounding quotes that might be in env variable
    return url.replace(/^['"]|['"]$/g, '').trim();
};

const baseURL = getBaseURL();

// Log for debugging (only in development)
if (process.env.NODE_ENV === 'development') {
    console.log('🌐 API Base URL:', baseURL);
} else {
    console.log('🌐 Using API Proxy for production');
}

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Tambahkan token dari localStorage
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log(`🔐 Request to ${config.url} with token:`, token.substring(0, 20) + '...');
        } else {
            console.warn(`⚠️ Request to ${config.url} without token`);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle error responses
        if (error.response) {
            // Server responded with error status
            console.error('Response Error:', error.response.data);
        } else if (error.request) {
            // Request made but no response
            console.error('Request Error:', error.request);
        } else {
            // Something else happened
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export { axiosInstance };
export default axiosInstance;
