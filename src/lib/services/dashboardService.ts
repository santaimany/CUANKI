import axiosInstance from '@/lib/axios';
import type { DailySavingResponse } from '@/types/api';

/**
 * Get daily saving information
 * Returns daily saving amount and budget details
 */
export const getDailySaving = async (): Promise<DailySavingResponse> => {
    try {
        const response = await axiosInstance.get('/api/daily-saving');
        
        console.log('Daily Saving API Response:', response.data);
        
        return response.data;
    } catch (error: unknown) {
        // Extract error message from backend response
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
        
        throw new Error('Failed to fetch daily saving data');
    }
};
