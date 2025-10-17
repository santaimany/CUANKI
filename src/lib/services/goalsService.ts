import apiClient from '../axios';

// Types for Goals API
export interface Goal {
  id: number;
  goal_name: string;
  target_amount: number;
  current_amount: string;
  target_deadline: string;
  progress_percentage: number;
  is_achieved: boolean;
  remaining_amount: number;
  over_achievement?: number;
  days_remaining: number;
  is_overdue?: boolean;
  account_info: {
    allocation_id: number;
    allocation_type: string;
    account_name: string | null;
    bank_name: string;
    current_balance?: string;
  };
  formatted: {
    target_amount: string;
    current_amount: string;
    remaining_amount?: string;
    progress_text: string;
    target_deadline: string;
    status: string;
    progress_percentage: string;
  };
  created_at: string;
  updated_at: string;
}

export interface GoalsSummary {
  total_goals: number;
  achieved_goals: number;
  in_progress_goals: number;
  achievement_rate: number;
}

export interface GoalsFilters {
  status: string;
  sort_by: string;
  sort_order: string;
}

export interface GoalsResponse {
  status: string;
  message: string;
  data: {
    goals: Goal[];
    summary: GoalsSummary;
    filters: GoalsFilters;
  };
}

export interface GoalDetailResponse {
  status: string;
  message: string;
  data: {
    goal: Goal;
  };
}

export interface CreateGoalRequest {
  goal_name: string;
  target_amount: number;
  target_deadline: string;
  account_allocation_id: number;
}

export interface UpdateGoalRequest {
  goal_name: string;
  target_amount: number;
  target_deadline: string;
}

// API Functions
export const getGoals = async (): Promise<GoalsResponse> => {
  const response = await apiClient.get('/api/goals');
  return response.data;
};

export const getGoalDetail = async (id: number): Promise<GoalDetailResponse> => {
  const response = await apiClient.get(`/api/goals/${id}`);
  return response.data;
};

export const createGoal = async (goalData: CreateGoalRequest): Promise<GoalDetailResponse> => {
  const response = await apiClient.post('/api/goals', goalData);
  return response.data;
};

export const updateGoal = async (id: number, goalData: UpdateGoalRequest): Promise<GoalDetailResponse> => {
  const response = await apiClient.put(`/api/goals/${id}`, goalData);
  return response.data;
};

export const deleteGoal = async (id: number): Promise<{ status: string; message: string }> => {
  const response = await apiClient.delete(`/api/goals/${id}`);
  return response.data;
};