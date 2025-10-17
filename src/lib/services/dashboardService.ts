import axiosInstance from '@/lib/axios';
import type { 
  DailySavingResponse, 
  CalendarStatusResponse, 
  ReceiptTodayResponse,
  UserAccountsResponse,
  AddExpenseRequest,
  AddIncomeRequest,
  TransactionResponse,
  ExpenseDetailResponse,
  IncomeDetailResponse,
  MonthlyExpensesResponse,
  CreateMonthlyExpenseRequest,
  UpdateMonthlyExpenseRequest
} from '@/types/api';

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

/**
 * Get user accounts for transaction selection
 */
export const getUserAccounts = async (): Promise<UserAccountsResponse> => {
    try {
        const response = await axiosInstance.get('/api/user-accounts');
        
        console.log('User Accounts API Response:', response.data);
        
        return response.data;
    } catch (error: unknown) {
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
        
        throw new Error('Failed to fetch user accounts');
    }
};

/**
 * Add expense transaction
 */
export const addExpense = async (data: AddExpenseRequest): Promise<TransactionResponse> => {
    try {
        const response = await axiosInstance.post('/api/add-expense', data);
        
        console.log('Add Expense API Response:', response.data);
        
        return response.data;
    } catch (error: unknown) {
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
        
        throw new Error('Failed to add expense');
    }
};

/**
 * Add income transaction
 */
export const addIncome = async (data: AddIncomeRequest): Promise<TransactionResponse> => {
    try {
        const response = await axiosInstance.post('/api/add-income', data);
        
        console.log('Add Income API Response:', response.data);
        
        return response.data;
    } catch (error: unknown) {
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
        
        throw new Error('Failed to add income');
    }
};

/**
 * Get detail receipt for expenses by date
 * @param date - Date in YYYY-MM-DD format (optional, defaults to today)
 */
export const getDetailReceiptExpense = async (date?: string): Promise<ExpenseDetailResponse> => {
    try {
        const params = new URLSearchParams();
        if (date) params.append('date', date);
        
        const queryString = params.toString();
        const url = queryString ? `/api/detail-receipt-expense?${queryString}` : '/api/detail-receipt-expense';
        const response = await axiosInstance.get(url);
        
        console.log('Detail Receipt Expense API Response:', response.data);
        
        return response.data;
    } catch (error: unknown) {
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
        
        throw new Error('Failed to fetch expense detail receipt');
    }
};

/**
 * Get detail receipt for incomes by date
 * @param date - Date in YYYY-MM-DD format (optional, defaults to today)
 */
export const getDetailReceiptIncome = async (date?: string): Promise<IncomeDetailResponse> => {
    try {
        const params = new URLSearchParams();
        if (date) params.append('date', date);
        
        const queryString = params.toString();
        const url = queryString ? `/api/detail-receipt-incomes?${queryString}` : '/api/detail-receipt-incomes';
        const response = await axiosInstance.get(url);
        
        console.log('Detail Receipt Income API Response:', response.data);
        
        return response.data;
    } catch (error: unknown) {
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
        
        throw new Error('Failed to fetch income detail receipt');
    }
};

/**
 * Get monthly expenses
 * @param month - Month number (1-12), optional
 * @param year - Year number, optional
 */
export const getMonthlyExpenses = async (month?: number, year?: number): Promise<MonthlyExpensesResponse> => {
    try {
        const params = new URLSearchParams();
        if (month) params.append('month', month.toString());
        if (year) params.append('year', year.toString());
        
        const queryString = params.toString();
        const url = queryString ? `/api/monthly-expenses?${queryString}` : '/api/monthly-expenses';
        const response = await axiosInstance.get(url);
        
        console.log('Monthly Expenses API Response:', response.data);
        
        return response.data;
    } catch (error: unknown) {
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
        
        throw new Error('Failed to fetch monthly expenses');
    }
};

/**
 * Create monthly expense
 */
export const createMonthlyExpense = async (data: CreateMonthlyExpenseRequest): Promise<TransactionResponse> => {
    try {
        const response = await axiosInstance.post('/api/monthly-expenses', data);
        
        console.log('Create Monthly Expense API Response:', response.data);
        
        return response.data;
    } catch (error: unknown) {
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
        
        throw new Error('Failed to create monthly expense');
    }
};

/**
 * Update monthly expense
 * @param id - Monthly expense ID
 * @param data - Update data
 */
export const updateMonthlyExpense = async (id: number, data: UpdateMonthlyExpenseRequest): Promise<TransactionResponse> => {
    try {
        const response = await axiosInstance.put(`/api/monthly-expenses/${id}`, data);
        
        console.log('Update Monthly Expense API Response:', response.data);
        
        return response.data;
    } catch (error: unknown) {
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
        
        throw new Error('Failed to update monthly expense');
    }
};
