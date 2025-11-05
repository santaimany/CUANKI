import { useState, useCallback } from 'react';
import { 
  getGoals, 
  createGoal, 
  updateGoal, 
  deleteGoal,
  type Goal, 
  type GoalsSummary,
  type CreateGoalRequest,
  type UpdateGoalRequest
} from '@/lib/services/goalsService';

export const useGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [summary, setSummary] = useState<GoalsSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGoals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getGoals();
      setGoals(response.data.goals);
      setSummary(response.data.summary);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal memuat data goals';
      setError(errorMessage);
      console.error('Error fetching goals:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addGoal = useCallback(async (data: CreateGoalRequest) => {
    try {
      setLoading(true);
      setError(null);
      await createGoal(data);
      await fetchGoals(); // Refresh goals list
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal menambahkan goal';
      setError(errorMessage);
      console.error('Error creating goal:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchGoals]);

  const editGoal = useCallback(async (id: number, data: UpdateGoalRequest) => {
    try {
      setLoading(true);
      setError(null);
      await updateGoal(id, data);
      await fetchGoals(); // Refresh goals list
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal mengupdate goal';
      setError(errorMessage);
      console.error('Error updating goal:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchGoals]);

  const removeGoal = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await deleteGoal(id);
      await fetchGoals(); // Refresh goals list
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal menghapus goal';
      setError(errorMessage);
      console.error('Error deleting goal:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchGoals]);

  return {
    goals,
    summary,
    loading,
    error,
    fetchGoals,
    addGoal,
    editGoal,
    removeGoal
  };
};
