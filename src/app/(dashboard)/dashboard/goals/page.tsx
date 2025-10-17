'use client';
import React, { useEffect, useState } from 'react';
import { GoalHeader, GoalList } from '@/components/dashboard/goals';
import SavingsChart from '@/components/dashboard/SavingsChart';
import UserProfile from '@/components/dashboard/UserProfile';
import AIReminder from '@/components/dashboard/AIReminder';
import AddEditGoalModal from '@/components/dashboard/goals/AddEditGoalModal';
import DeleteConfirmModal from '@/components/dashboard/goals/DeleteConfirmModal';
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
import { useToast } from '@/context/ToastContext';
import LoadingScreen from '@/components/commons/LoadingScreen';

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [summary, setSummary] = useState<GoalsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [editMode, setEditMode] = useState(false);
  
  const { showError, showSuccess } = useToast();

  const fetchGoals = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await getGoals();
      setGoals(response.data.goals);
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error fetching goals:', error);
      showError('Gagal memuat data goals');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const handleRefresh = () => {
    fetchGoals();
  };

  // Modal handlers
  const handleAddGoal = () => {
    setSelectedGoal(null);
    setEditMode(false);
    setShowAddEditModal(true);
  };

  const handleEditGoal = (goal: Goal) => {
    setSelectedGoal(goal);
    setEditMode(true);
    setShowAddEditModal(true);
  };

  const handleDeleteGoal = (goal: Goal) => {
    setSelectedGoal(goal);
    setShowDeleteModal(true);
  };

  const handleCreateGoal = async (data: CreateGoalRequest) => {
    try {
      await createGoal(data);
      showSuccess('Goal berhasil ditambahkan');
      setShowAddEditModal(false);
      fetchGoals();
    } catch (error) {
      console.error('Error creating goal:', error);
      showError('Gagal menambahkan goal');
    }
  };

  const handleUpdateGoal = async (data: UpdateGoalRequest) => {
    if (!selectedGoal) return;
    
    try {
      await updateGoal(selectedGoal.id, data);
      showSuccess('Goal berhasil diupdate');
      setShowAddEditModal(false);
      fetchGoals();
    } catch (error) {
      console.error('Error updating goal:', error);
      showError('Gagal mengupdate goal');
    }
  };

  const handleSaveGoal = async (data: CreateGoalRequest | UpdateGoalRequest) => {
    if (editMode && selectedGoal) {
      await handleUpdateGoal(data as UpdateGoalRequest);
    } else {
      await handleCreateGoal(data as CreateGoalRequest);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedGoal) return;
    
    try {
      await deleteGoal(selectedGoal.id);
      showSuccess('Goal berhasil dihapus');
      setShowDeleteModal(false);
      fetchGoals();
    } catch (error) {
      console.error('Error deleting goal:', error);
      showError('Gagal menghapus goal');
    }
  };

  // Calculate totals for header
  const totalTargetAmount = goals.reduce((sum, goal) => sum + goal.target_amount, 0);
  const totalCurrentAmount = goals.reduce((sum, goal) => sum + Number.parseFloat(goal.current_amount), 0);
  const formattedTotalTarget = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(totalTargetAmount);
  const formattedTotalCurrent = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(totalCurrentAmount);

    if (loading) {
    return (
      <div className="pb-20 md:pb-0 flex items-center justify-center min-h-screen">
        <LoadingScreen  />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#363256] pb-20 md:pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 h-full p-3 sm:p-4 md:p-6 pb-20 md:pb-6">
        {/* Left Column - Main Content (3 columns) */}
        <div className="lg:col-span-3 space-y-4 sm:space-y-6">
          {/* Goal Header with Progress */}
          <GoalHeader
            goalName={summary ? `Total ${summary.total_goals} Goals` : "Goals Kamu"}
            currentAmount={totalCurrentAmount}
            targetAmount={totalTargetAmount}
            formattedCurrent={formattedTotalCurrent}
            formattedTarget={formattedTotalTarget}
          />

          {/* Savings Chart */}
          <SavingsChart />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button 
              onClick={handleAddGoal}
              className="bg-gradient-to-r from-[#A3FFD6] to-[#0EFF95] border-b-2 border-white text-black font-bold px-6 sm:px-8 md:px-9 py-3 sm:py-4 rounded-2xl sm:rounded-3xl hover:shadow-lg hover:scale-105 transition-all duration-200 text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Tambah Goals
            </button>
          </div>

          {/* Goal List */}
          <GoalList 
            goals={goals} 
            onRefresh={handleRefresh}
            onEdit={handleEditGoal}
            onDelete={handleDeleteGoal}
          />
        </div>

        {/* Right Column - User Profile & AI Reminder - Hidden on mobile, shown on lg+ */}
        <div className="hidden lg:flex lg:col-span-1 flex-col gap-6">
          <UserProfile />
          <AIReminder page="goals" />
        </div>
        
        {/* AI Reminder Floating Button - Mobile only */}
        <div className="block lg:hidden">
          <AIReminder page="goals" isFloating={true} />
        </div>
      </div>

      {/* Modals */}
      {showAddEditModal && (
        <AddEditGoalModal
          isOpen={showAddEditModal}
          onClose={() => setShowAddEditModal(false)}
          onSave={handleSaveGoal}
          editGoal={editMode ? selectedGoal : undefined}
        />
      )}

      {showDeleteModal && selectedGoal && (
        <DeleteConfirmModal
          goal={selectedGoal}
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
