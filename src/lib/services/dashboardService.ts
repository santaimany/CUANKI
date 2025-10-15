import axiosInstance from '@/lib/axios';
import type { DailySavingResponse, CalendarStatusResponse, ReceiptTodayResponse } from '@/types/api';

/**
 * Get calendar status with daily budget and expense information
 * @param month - Month number (1-12), defaults to current month
 * @param year - Year number, defaults to current year
 */
export const getCalendarStatus = async (month?: number, year?: number): Promise<CalendarStatusResponse> => {
    try {
        const params = new URLSearchParams();
        if (month) params.append('month', month.toString());
        if (year) params.append('year', year.toString());
        
        const queryString = params.toString();
        const url = queryString ? `/api/calendar-status?${queryString}` : '/api/calendar-status';
        const response = await axiosInstance.get(url);
        
        console.log('Calendar Status API Response:', response.data);
        
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
        
        throw new Error('Failed to fetch calendar status data');
    }
};

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

/**
 * Get today's receipt with all transactions
 * Returns total expenses and transaction list for today
 */
export const getReceiptToday = async (): Promise<ReceiptTodayResponse> => {
    try {
        const response = await axiosInstance.get('/api/receipt-today');
        
        console.log('Receipt Today API Response:', response.data);
        
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
        
        throw new Error('Failed to fetch receipt today data');
    }
};
