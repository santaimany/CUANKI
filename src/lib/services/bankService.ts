import apiClient from '../axios';

/**
 * Interface untuk Available Allocation
 */
export interface AvailableAllocation {
  allocation_id: number;
  account_id: number;
  account_name: string | null;
  bank_name: string;
  type: string;
  current_balance: number;
  formatted_balance: string;
  last_updated: string;
}

/**
 * Response dari API available allocations
 */
export interface AvailableAllocationsResponse {
  status: string;
  message: string;
  data: {
    allocations: AvailableAllocation[];
  };
}

/**
 * Get available allocations for goals
 * Returns allocations with type "Tabungan"
 */
export const getAvailableAllocations = async (): Promise<AvailableAllocationsResponse> => {
  const response = await apiClient.get('/api/goals/available-allocations');
  return response.data;
};

/**
 * Get savings allocation from available allocations
 * Returns the allocation_id for the first savings type found
 */
export const getSavingsAllocationId = async (): Promise<number | null> => {
  try {
    const response = await getAvailableAllocations();
    
    // Cari allocation dengan type "Tabungan"
    const savingsAllocation = response.data.allocations.find(
      allocation => allocation.type.toLowerCase() === 'tabungan'
    );
    
    return savingsAllocation ? savingsAllocation.allocation_id : null;
  } catch (error) {
    console.error('Error fetching savings allocation:', error);
    throw error;
  }
};

/**
 * Get full allocation details for display
 */
export const getSavingsAllocation = async (): Promise<AvailableAllocation | null> => {
  try {
    const response = await getAvailableAllocations();
    
    // Cari allocation dengan type "Tabungan"
    const savingsAllocation = response.data.allocations.find(
      allocation => allocation.type.toLowerCase() === 'tabungan'
    );
    
    return savingsAllocation || null;
  } catch (error) {
    console.error('Error fetching savings allocation:', error);
    throw error;
  }
};
