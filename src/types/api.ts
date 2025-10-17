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
  account_allocation_id: number;
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

// Update Account Allocation Types
export interface UpdateAccountAllocationRequest {
  account_allocation_id: number;  // Required - ID dari allocation yang mau diupdate
  new_type?: string;              // Optional - Type baru
  new_balance?: string;           // Optional - Balance baru
}

export interface AccountAllocation {
  allocation_id: number;
  type: string;
  balance_per_type: string;
  formatted_balance: string;
}

export interface UpdatedAccount {
  account_id: number;
  bank_name: string;
  current_balance: string;
  allocations: AccountAllocation[];
  formatted_balance: string;
}

export interface ChangeSummary {
  allocation_id: number;
  changes_made: {
    type_changed: boolean;
    balance_changed: boolean;
  };
  original_values: {
    type: string;
    balance: string;
  };
  new_values: {
    type: string;
    balance: string;
  };
  total_banks: number;
  change_log: {
    balance_change?: {
      old_balance: string;
      new_balance: string;
      balance_change: number;
    };
    type_change?: {
      old_type: string;
      new_type: string;
    };
  };
}

export interface UpdateAccountAllocationResponse {
  status: string;
  message: string;
  data: {
    change_summary: ChangeSummary;
    updated_accounts: UpdatedAccount[];
    budget_tracking: null | Record<string, unknown>;
  };
}

// Daily Saving Types
export interface DailySavingBudget {
  current_daily_budget: number;
  initial_daily_budget: number;
  difference: number;
  is_reduced: boolean;
}

export interface DailySavingResponse {
  status: string;
  data: {
    daily_saving: number;
    budget: DailySavingBudget;
    budget_records_count: number;
    formatted: {
      daily_saving: string;
      current_daily_budget: string;
      initial_daily_budget: string;
      budget_difference: string;
    };
  };
}

// Calendar Status Types
export interface CalendarDate {
  date: string;
  day: number;
  day_name: string;
  is_today: boolean;
  is_past: boolean;
  is_future: boolean;
  status: 'no-budget' | 'under-budget' | 'overbudget' | 'today-normal' | 'today-overbudget' | 'future';
  daily_budget: number;
  daily_expenses: number;
  remaining_budget: number;
  over_budget_amount: number;
  is_over_budget: boolean;
  expense_count: number;
  formatted: {
    date: string;
    daily_budget: string;
    daily_expenses: string;
    remaining_budget: string;
    over_budget_amount: string;
  };
}

export interface CalendarSummary {
  total_month_initial_budget: number;
  total_month_current_budget: number;
  total_month_expenses: number;
  remaining_month_budget: number;
  over_budget_days_count: number;
  days_with_expenses: number;
  average_daily_expenses: number;
  formatted: {
    month_year: string;
    total_month_initial_budget: string;
    total_month_current_budget: string;
    total_month_expenses: string;
    remaining_month_budget: string;
    over_budget_days: string;
    days_with_expenses: string;
  };
}

export interface CalendarStatusResponse {
  status: string;
  data: {
    month: number;
    year: number;
    month_name: string;
    days_in_month: number;
    calendar_dates: CalendarDate[];
    summary: CalendarSummary;
  };
}

// Receipt Today Types
export interface Transaction {
  id: number;
  category_name: string;
  note: string;
  amount: string;
  is_income: boolean;
  expense_time: string;
  expense_date_raw: string;
  formatted_amount: string;
}

export interface ReceiptTodayResponse {
  status: string;
  data: {
    date: string;
    total_expenses: number;
    total_transactions: number;
    formatted_date: string;
    formatted_total_expenses: string;
    transactions: Transaction[];
  };
}

// User Accounts Types
export interface UserAccount {
  value: string;
  label: string;
  account_id: number;
  account_allocation_id: number;
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

// Transaction Add Types
export interface AddExpenseRequest {
  tanggal: string;
  total: number;
  notes: string;
  kategori: number;
  bank_allocation_id: number;
}

export interface AddIncomeRequest {
  tanggal: string;
  total: number;
  notes: string;
  bank_allocation_id: number;
}

export interface TransactionResponse {
  status: string;
  message: string;
  data?: Record<string, unknown>;
}

// Expense Detail Receipt Types
export interface ExpenseItem {
  expense_id: number;
  category: {
    id: number;
    name: string;
    note: string | null;
  };
  note: string;
  amount: string;
  expense_date: string;
  expense_time: string;
  expense_type: string;
  is_monthly_expense: boolean;
  frequency: string;
  from_bank: {
    code_name: string;
    bank_name: string;
    account_id: number;
  };
  timestamps: {
    created_at: string;
    expense_date_full: string;
  };
  formatted: {
    amount: string;
    expense_date: string;
    expense_time: string;
    expense_datetime: string;
    expense_type: string;
  };
}

export interface ExpenseDetailResponse {
  status: string;
  message: string;
  data: {
    target_date: string;
    date_info: {
      date: string;
      day_name: string;
      formatted_date: string;
      is_today: boolean;
      is_past: boolean;
      is_future: boolean;
    };
    summary: {
      total_expenses: number;
      expense_count: number;
      average_per_expense: number;
      formatted: {
        total_expenses: string;
        expense_count: string;
        average_per_expense: string;
      };
    };
    expenses: ExpenseItem[];
    navigation: {
      previous_date: string | null;
      next_date: string | null;
      has_previous: boolean;
      has_next: boolean;
      formatted: {
        previous_date: string | null;
        next_date: string | null;
      };
    };
    debug_info: {
      requested_date: string;
      target_date: string;
      query_date_start: string;
      query_date_end: string;
      timezone: string;
    };
  };
}

// Income Detail Receipt Types
export interface IncomeItem {
  income_id: number;
  income_source: string;
  note: string;
  amount: string;
  actual_amount: string | null;
  received_date: string;
  received_time: string;
  frequency: string;
  confirmation_status: string;
  is_manual: boolean;
  to_bank: {
    code_name: string;
    bank_name: string;
    account_id: number;
  };
  timestamps: {
    created_at: string;
    received_date_full: string;
  };
  formatted: {
    amount: string;
    actual_amount: string | null;
    received_date: string;
    received_time: string;
    received_datetime: string;
    confirmation_status: string;
    frequency: string;
    income_source: string;
  };
}

export interface IncomeDetailResponse {
  status: string;
  message: string;
  data: {
    target_date: string;
    date_info: {
      date: string;
      day_name: string;
      formatted_date: string;
      is_today: boolean;
      is_past: boolean;
      is_future: boolean;
    };
    summary: {
      total_incomes: number;
      income_count: number;
      average_per_income: number;
      confirmed_incomes: number;
      pending_incomes: number;
      manual_incomes: number;
      formatted: {
        total_incomes: string;
        income_count: string;
        average_per_income: string;
        confirmed_incomes: string;
        pending_incomes: string;
      };
    };
    incomes: IncomeItem[];
    navigation: {
      previous_date: string | null;
      next_date: string | null;
      has_previous: boolean;
      has_next: boolean;
      formatted: {
        previous_date: string | null;
        next_date: string | null;
      };
    };
    debug_info: {
      requested_date: string;
      target_date: string;
      query_date_start: string;
      query_date_end: string;
      timezone: string;
    };
  };
}

// Monthly Expenses Types
export interface MonthlyExpenseItem {
  id: number;
  category: {
    id: number;
    name: string;
    icon: string | null;
  };
  total_amount: string;
  current_amount: string;
  used_amount: string;
  usage_percentage: number;
  is_over_budget: boolean;
  month: number;
  year: number;
  note: string;
  formatted: {
    total_amount: string;
    current_amount: string;
    used_amount: string;
    usage_percentage: string;
  };
  created_at: string;
}

export interface MonthlyExpensesResponse {
  status: string;
  data: {
    monthly_expenses: MonthlyExpenseItem[];
    total_budget: number;
    total_used: number;
    total_remaining: number;
    month: number;
    year: number;
    month_name: string;
  };
}

export interface CreateMonthlyExpenseRequest {
  expense_category_id: number;
  total_amount: number;
  note: string;
}

export interface UpdateMonthlyExpenseRequest {
  total_amount: number;
  note: string;
}

// AI Reminder Types
export interface AIReminderRequest {
  page: 'asset' | 'goals' | 'transaction';
}

export interface AIReminderContextAnalysis {
  account_count: number;
  total_balance: number;
  savings_balance: number;
  emergency_balance: number;
  monthly_income: string;
  emergency_fund_months: number;
  savings_rate: number;
  account_diversity: string;
}

export interface AIReminderData {
  page: string;
  reminder: string;
  context_analysis: AIReminderContextAnalysis;
  priority_level: 'low' | 'medium' | 'high';
  action_suggestions: string[];
}

export interface AIReminderResponse {
  status: string;
  message: string;
  data: AIReminderData;
}
