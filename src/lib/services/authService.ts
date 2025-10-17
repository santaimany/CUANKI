import axiosInstance from '@/lib/axios';

export interface RegisterRequest {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    message?: string;
    data?: {
        token?: string;
        user?: {
            id: number;
            email: string;
            first_name: string;
            last_name: string;
            username?: string | null;
            age?: number | null;
            origin_id?: number | null;
            status?: string | null;
            origin?: string | null;
            has_completed_onboarding?: boolean; // Deprecated - use field checks instead
        };
    };
}

export const registerUser = async (data: RegisterRequest): Promise<AuthResponse> => {
    try {
        const response = await axiosInstance.post('/api/register', data);
        
        console.log('Register API Response:', response.data);
        
        // Save access_token from response.data.data
        const token = response.data.data?.access_token || response.data.data?.token || response.data.token;
        if (token) {
            localStorage.setItem('token', token);
            console.log('Token saved to localStorage:', token.substring(0, 20) + '...');
        } else {
            console.error('No access_token found in register response:', response.data);
        }
        
        // Optional: Save refresh_token if needed
        const refreshToken = response.data.data?.refresh_token;
        if (refreshToken) {
            localStorage.setItem('refresh_token', refreshToken);
        }
        
        return response.data;
    } catch (error: unknown) {
        // Extract error message from backend response (Axios error structure)
        if (typeof error === 'object' && error !== null && 'response' in error) {
            const axiosError = error as { response?: { data?: { message?: string; error?: string } } };
            const backendMessage = axiosError.response?.data?.message || axiosError.response?.data?.error;
            
            if (backendMessage) {
                throw new Error(backendMessage);
            }
        }
        
        if (error instanceof Error) {
            throw error;
        }
        
        throw new Error('Registration failed. Please try again.');
    }
};

export const loginUser = async (data: LoginRequest): Promise<AuthResponse> => {
    try {
        const response = await axiosInstance.post('/api/login', data);
        
        console.log('Login API Response:', response.data);
        
        // Save access_token from response.data.data (same structure as register)
        const token = response.data.data?.access_token || response.data.data?.token || response.data.token;
        if (token) {
            localStorage.setItem('token', token);
            console.log('Token saved to localStorage:', token.substring(0, 20) + '...');
        } else {
            console.error('No access_token found in login response:', response.data);
        }
        
        // Optional: Save refresh_token if needed
        const refreshToken = response.data.data?.refresh_token;
        if (refreshToken) {
            localStorage.setItem('refresh_token', refreshToken);
        }
        
        return response.data;
    } catch (error: unknown) {
        // Extract error message from backend response (Axios error structure)
        if (typeof error === 'object' && error !== null && 'response' in error) {
            const axiosError = error as { response?: { data?: { message?: string; error?: string } } };
            const backendMessage = axiosError.response?.data?.message || axiosError.response?.data?.error;
            
            if (backendMessage) {
                throw new Error(backendMessage);
            }
        }
        
        if (error instanceof Error) {
            throw error;
        }
        
        throw new Error('Login failed. Please try again.');
    }
};

export const logout = (showNotification = true) => {
    // Clear all auth-related data
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('onboarding_completed');
    
    if (showNotification && typeof window !== 'undefined') {
        // Import toast dynamically to avoid SSR issues
        import('react-hot-toast').then(({ default: toast }) => {
            toast.success('Anda telah logout');
        });
        
        // Redirect to login page after a brief delay
        setTimeout(() => {
            window.location.href = '/login';
        }, 1000);
    }
};

// Helper function to get base URL
const getBaseURL = (): string => {
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
        return '/api/proxy'; // Production (Vercel) - use proxy
    }
    return process.env.NEXT_PUBLIC_API_URL || 'http://103.186.0.127'; // Development
};

/**
 * Initiate Google OAuth login flow
 * Redirects user to backend Google OAuth endpoint
 */
export const initiateGoogleLogin = (): void => {
    const baseURL = getBaseURL(); 
    const googleAuthUrl = `${baseURL}/api/auth/google`;
    
    console.log('🔐 Initiating Google OAuth login:', googleAuthUrl);
    
    // Redirect to Google OAuth
    window.location.href = googleAuthUrl;
};
