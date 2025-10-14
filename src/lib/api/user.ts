import { axiosInstance } from '@/lib/axios';
import { 
  GreetingUsersResponse, 
  GoalsProgressResponse, 
  UserAccountsResponse,
  ExpenseCategoriesResponse,
  UpdateAccountBalanceRequest,
  UpdateAccountBalanceResponse
} from '@/types/api';

/**
 * Fetches user greeting data including daily budget
 * Requires authentication token
 */
export async function getUserGreeting(): Promise<GreetingUsersResponse> {
  try {
    const response = await axiosInstance.get<GreetingUsersResponse>('/api/greeting-users');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user greeting:', error);
    throw error;
  }
}

/**
 * Fetches user goals progress including main saving target, finance plan, and goals
 * Requires authentication token
 */
export async function getGoalsProgress(): Promise<GoalsProgressResponse> {
  try {
    const response = await axiosInstance.get<GoalsProgressResponse>('/api/goals-progress');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch goals progress:', error);
    throw error;
  }
}

/**
 * Fetches user bank accounts with balances
 * Requires authentication token
 */
export async function getUserAccounts(): Promise<UserAccountsResponse> {
  try {
    const response = await axiosInstance.get<UserAccountsResponse>('/api/user-accounts');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user accounts:', error);
    throw error;
  }
}

/**
 * Fetches expense categories list
 * Requires authentication token
 */
export async function getExpenseCategories(): Promise<ExpenseCategoriesResponse> {
  try {
    const response = await axiosInstance.get<ExpenseCategoriesResponse>('/api/expense-categories');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch expense categories:', error);
    throw error;
  }
}

/**
 * Updates account balance for a specific account type
 * Requires authentication token
 * Note: Change method (put/patch/post) based on your backend API documentation
 */
export async function updateAccountBalance(
  data: UpdateAccountBalanceRequest
): Promise<UpdateAccountBalanceResponse> {
  try {
    // Try PATCH method - common for partial updates
    const response = await axiosInstance.put<UpdateAccountBalanceResponse>(
      '/api/update-account-balance',
      data
    );
    return response.data;
  } catch (error) {
    console.error('Failed to update account balance:', error);
    throw error;
  }
}
