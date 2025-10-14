export interface User {
  name: string;
  username: string | null;
  age?: number | null;
  origin_id?: number | null;
  origin?: string | null;
  status?: string | null;
  has_completed_onboarding?: boolean; // Deprecated - use field checks instead
}

export interface DailyBudget {
  current_amount: number;
  initial_amount: number;
  difference: number;
  is_reduced: boolean;
  formatted: {
    current_amount: string;
    initial_amount: string;
    difference: string;
  };
  kebutuhan_balance: number;
  days_in_month: number;
  source: string;
  budget_records_count: number;
}

export interface GreetingUsersResponse {
  status: string;
  message: string;
  data: {
    user: User;
    daily_budget: DailyBudget;
  };
}

export interface AuthResponse {
  status: string;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

// Goals Progress Types
export interface MainSavingTarget {
  amount: number;
  current_amount: number;
  progress_percentage: number;
  formatted_amount: string;
  formatted_current: string;
}

export interface FinancePlan {
  monthly_income: string;
  income_date: number;
  monthly_saving_target: string;
  saving_target_duration_years: number;
  saving_target_duration_months: number;
  total_saving_target: number;
  emergency_target_amount: number | null;
  formatted: {
    monthly_income: string;
    monthly_saving_target: string;
    saving_target_duration: string;
    total_saving_target: string;
    emergency_target_amount: string;
  };
}

export interface Goal {
  type: 'saving' | 'emergency';
  goal_name: string;
  target_amount: number | null;
  current_amount: number;
  remaining_amount: number;
  progress_percentage: number;
  target_duration_years?: number;
  target_duration_months?: number;
  target_date?: string;
  days_remaining?: number;
  monthly_saving_needed?: number;
  is_completed: boolean;
  formatted: {
    target_amount: string;
    current_amount: string;
    remaining_amount: string;
    progress_percentage: string;
    monthly_saving_needed?: string;
    target_date?: string;
    days_remaining?: string;
  };
}

export interface GoalsSummary {
  total_goals: number;
  completed_goals: number;
  total_target_amount: number;
  total_current_amount: number;
  overall_progress: number;
  formatted: {
    total_target_amount: string;
    total_current_amount: string;
    overall_progress: string;
  };
}

export interface GoalsProgressResponse {
  status: string;
  data: {
    main_saving_target: MainSavingTarget;
    finance_plan: FinancePlan;
    goals: Goal[];
    summary: GoalsSummary;
  };
}

// User Accounts Types
export interface UserAccount {
  value: string;
  label: string;
  account_id: number;
  account_name: string;
  type: string;
  balance: string;
  formatted_balance: string;
}

export interface UserAccountsResponse {
  status: string;
  data: {
    accounts: UserAccount[];
    total_options: number;
  };
}

// Expense Categories Types
export interface ExpenseCategory {
  id: number;
  user_id: number | null;
  name: string;
  created_at: string | null;
  updated_at: string | null;
}

export type ExpenseCategoriesResponse = ExpenseCategory[];

// Update Account Balance Types
export interface UpdateAccountBalanceRequest {
  account_id: number;
  type: string;
  balance_per_type: number;
}

export interface UpdateAccountBalanceResponse {
  account_id: number;
  type: string;
  balance_per_type: number;
}
