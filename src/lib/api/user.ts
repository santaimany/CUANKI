import { axiosInstance } from '@/lib/axios';
import { 
  GreetingUsersResponse, 
  GoalsProgressResponse, 
  UserAccountsResponse,
  ExpenseCategoriesResponse,
  UpdateAccountBalanceRequest,
  UpdateAccountBalanceResponse,
  UpdateAccountAllocationRequest,
  UpdateAccountAllocationResponse,
  UserProfileResponse,
} from '@/types/api';

/**
 * Fetches user greeting data including daily budget
 * Requires authentication token
 */
export async function getUserGreeting(): Promise<GreetingUsersResponse> {
  try {
    const response = await axiosInstance.get<GreetingUsersResponse>('/api/greeting-user');
    return response.data;
  } catch (error) {
   
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

    throw error;
  }
}

/**
 * Updates account allocation (type and/or balance)
 * Can update only type, only balance, or both
 * Requires authentication token
 */
export async function updateAccountAllocation(
  data: UpdateAccountAllocationRequest
): Promise<UpdateAccountAllocationResponse> {
  try {
    const response = await axiosInstance.put<UpdateAccountAllocationResponse>(
      '/api/update-account-allocation',
      data
    );
    return response.data;
  } catch (error) {
  
    throw error;
  }
}

/**
 * Deletes a bank account by account_id
 * Requires authentication token
 */
export async function deleteAccount(accountId: number): Promise<{ status: string; message: string }> {
  try {
    const response = await axiosInstance.delete<{ status: string; message: string }>(
      `/api/account/${accountId}`
    );
    return response.data;
  } catch (error) {
    
    throw error;
  }
}

export async function getUserProfile(): Promise<UserProfileResponse> {
  try {
    const response = await axiosInstance.get<UserProfileResponse>('/api/profile');
    return response.data;
  } catch (error) {

    throw error;
  } 
}
