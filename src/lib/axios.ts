import axios from 'axios';
import toast from 'react-hot-toast';


let lastUnauthorizedToast = 0;
const TOAST_THROTTLE_DURATION = 5000;

const getBaseURL = () => {
  
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
        return '/api/proxy';
    }
    
    const url = process.env.NEXT_PUBLIC_API_URL || 'http://103.186.0.127';

    return url.replace(/^['"]|['"]$/g, '').trim();
};

const baseURL = getBaseURL();

if (process.env.NODE_ENV === 'development') {
    console.log('🌐 API Base URL:', baseURL);
} else {
    console.log('🌐 Using API Proxy for production');
}

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 15000, // 15 seconds timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            
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
            const { status } = error.response;
            
            // Handle unauthorized (401) error
            if (status === 401) {
                // Check if this is a login request - if so, don't show session expired message
                const isLoginRequest = error.config?.url?.includes('/login') || 
                                     error.config?.url?.includes('/api/login');
                
                if (isLoginRequest) {
                   
                } else {
                  
                    // Throttle unauthorized toast untuk mencegah spam
                    const now = Date.now();
                    if (now - lastUnauthorizedToast > TOAST_THROTTLE_DURATION) {
                        lastUnauthorizedToast = now;
                        
                        // Show toast notification for session expired
                        toast.error('Sesi Anda telah berakhir. Silakan login kembali.', {
                            duration: 3000,
                        });
                    }
                    
                    // Clear token from localStorage (only once per session)
                    if (localStorage.getItem('token')) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('refresh_token');
                        localStorage.removeItem('onboarding_completed');
                        
                        // Only redirect if we're in browser environment
                        if (globalThis.window !== undefined) {
                            // Check if we're not already on login/register pages to avoid infinite redirect
                            const currentPath = globalThis.window.location.pathname;
                            const authPaths = ['/login', '/register', '/auth/google/callback'];
                            
                            if (!authPaths.some(path => currentPath.startsWith(path))) {
                                console.log('🔄 Redirecting to login page...');
                                // Delay redirect slightly to show toast
                                setTimeout(() => {
                                    globalThis.window.location.href = '/login';
                                }, 1500);
                            }
                        }
                    }
                }
            }
            
        } else if (error.request) {
            
            
            
            
            
            
            
            if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
                console.warn('⏰ Request timeout detected');
                
                const timeoutError = new Error('Koneksi timeout. Periksa koneksi internet Anda dan coba lagi.');
                timeoutError.name = 'TimeoutError';
                return Promise.reject(timeoutError);
            } else if (error.message.includes('Network Error')) {
                console.warn('🌐 Network error detected');
                
                const networkError = new Error('Gagal terhubung ke server. Periksa koneksi internet Anda.');
                networkError.name = 'NetworkError';
                return Promise.reject(networkError);
            }
        } else {
            return Promise.reject(error);
        }
    }
);

export { axiosInstance };
export default axiosInstance;
