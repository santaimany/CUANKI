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
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Registration failed');
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
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Login failed');
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};
