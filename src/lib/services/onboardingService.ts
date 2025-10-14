import axiosInstance from '@/lib/axios';

// Form User (Step 1)
export interface FormUserRequest {
    username: string;
    age: number;
    origin_id: number;
    status: string; // mahasiswa, pekerja, dll
}

// Form Account (Step 2)
export interface FormAccountRequest {
    bank_id: number;
}

// Form Plan (Step 3)
export interface FormPlanRequest {
    monthly_income: number;
    income_date: number; // tanggal 1-31
    saving_target_amount: number;
    saving_target_duration: number; // dalam bulan
}

// List Bank Response
export interface Bank {
    id: number;
    code_name: string;
    bank_name: string;
}

// List Origin Response
export interface Origin {
    id: number;
    city_province: string;
    created_at: string | null;
    updated_at: string | null;
}

export interface ApiResponse {
    success: boolean;
    message?: string;
    data?: Record<string, unknown>;
}

// Submit Form User
export const submitFormUser = async (data: FormUserRequest): Promise<ApiResponse> => {
    try {
        const response = await axiosInstance.post('/api/form/user', data);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Failed to submit user form');
    }
};

// Submit Form Account
export const submitFormAccount = async (data: FormAccountRequest): Promise<ApiResponse> => {
    try {
        const response = await axiosInstance.post('/api/form/account', data);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Failed to submit account form');
    }
};

// Submit Form Plan
export const submitFormPlan = async (data: FormPlanRequest): Promise<ApiResponse> => {
    try {
        const response = await axiosInstance.post('/api/form/plan', data);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Failed to submit plan form');
    }
};

// Get List Bank
export const getListBank = async (): Promise<Bank[]> => {
    try {
        const response = await axiosInstance.get('/api/listbank');
        return response.data.data || response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Failed to fetch bank list');
    }
};

// Get List Origin
export const getListOrigin = async (): Promise<Origin[]> => {
    try {
        const response = await axiosInstance.get('/api/origins');
        return response.data.data || response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Failed to fetch origin list');
    }
};

// Advice Card
export interface AdviceCard {
    id: string;
    title: string;
    content: string;
    sources?: string[];
}

// Advice Response
export interface AdviceResponse {
    status: string; // "success" or "error"
    message?: string;
    cards?: AdviceCard[]; // Array of advice cards
}

// Get AI Advice (called after onboarding completion)
export const getAdvice = async (): Promise<AdviceResponse> => {
    try {
        const response = await axiosInstance.get('/api/advice');
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Failed to fetch advice');
    }
};
