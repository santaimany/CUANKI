'use client';
import React, { useEffect, useState } from 'react';
import { GoalHeader, GoalList } from '@/components/dashboard/goals';
import SavingsChart from '@/components/dashboard/SavingsChart';
import UserProfile from '@/components/dashboard/UserProfile';
import AIReminder from '@/components/dashboard/AIReminder';
import { GreetingUsersResponse, UserProfileResponse } from '@/types/api';
import { getUserGreeting, getUserProfile } from '@/lib/api/user';
import AddEditGoalModal from '@/components/dashboard/goals/AddEditGoalModal';
import DeleteConfirmModal from '@/components/dashboard/goals/DeleteConfirmModal';
import { useGoals } from '@/hooks/useGoals';
import type { Goal, CreateGoalRequest, UpdateGoalRequest } from '@/lib/services/goalsService';
import { useToast } from '@/context/ToastContext';
import LoadingScreen from '@/components/commons/LoadingScreen';
import TourAnchor from '@/components/tour/TourAnchor';

export default function GoalsPage() {
  const { goals, summary, loading, fetchGoals, addGoal, editGoal, removeGoal } = useGoals();
  const [userData, setUserData] = useState<GreetingUsersResponse | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(null);
  
  // Modal states
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const { showError, showSuccess } = useToast();

  const fetchUserData = React.useCallback(async () => {
    try {
      const [greetingData, profileData] = await Promise.all([
        getUserGreeting(),
        getUserProfile()
      ]);
      setUserData(greetingData);
      setUserProfile(profileData);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      // Don't show error for user data as it's not critical for goals page
    }
  }, []);

  useEffect(() => {
    fetchGoals();
    fetchUserData();
  }, [fetchGoals, fetchUserData]);


  // Modal handlers
  const handleAddGoal = () => {
    setSelectedGoal(null);
    setIsEditMode(false);
    setShowAddEditModal(true);
  };

  const handleEditGoal = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsEditMode(true);
    setShowAddEditModal(true);
  };

  const handleDeleteGoal = (goal: Goal) => {
    setSelectedGoal(goal);
    setShowDeleteModal(true);
  };

  const handleSaveGoal = async (data: CreateGoalRequest | UpdateGoalRequest) => {
    try {
      if (isEditMode && selectedGoal) {
        await editGoal(selectedGoal.id, data as UpdateGoalRequest);
        showSuccess('Goal berhasil diupdate');
      } else {
        await addGoal(data as CreateGoalRequest);
        showSuccess('Goal berhasil ditambahkan');
      }
      setShowAddEditModal(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Gagal menyimpan goal';
      showError(errorMessage);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedGoal) return;
    
    try {
      await removeGoal(selectedGoal.id);
      showSuccess('Goal berhasil dihapus');
      setShowDeleteModal(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Gagal menghapus goal';
      showError(errorMessage);
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
          <TourAnchor id="goals-header" variant="main">
            <GoalHeader
              goalName={summary ? `Total ${summary.total_goals} Goals` : "Goals Kamu"}
              currentAmount={totalCurrentAmount}
              targetAmount={totalTargetAmount}
              formattedCurrent={formattedTotalCurrent}
              formattedTarget={formattedTotalTarget}
            />
          </TourAnchor>

          {/* Savings Chart */}
          <TourAnchor id="goals-chart" variant="main">
            <SavingsChart />
          </TourAnchor>

          {/* Action Buttons */}
          <TourAnchor id="goals-actions" variant="main" className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button 
              onClick={handleAddGoal}
              className="bg-gradient-to-r from-[#A3FFD6] to-[#0EFF95] border-b-2 border-white text-black font-bold px-6 sm:px-8 md:px-9 py-3 sm:py-4 rounded-2xl sm:rounded-3xl hover:shadow-lg hover:scale-105 transition-all duration-200 text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Tambah Goals
            </button>
          </TourAnchor>

          {/* Goal List */}
          <TourAnchor id="goals-list" variant="main">
            <GoalList 
              goals={goals} 
              onEdit={handleEditGoal}
              onDelete={handleDeleteGoal}
            />
          </TourAnchor>
        </div>

        {/* Right Column - User Profile & AI Reminder - Hidden on mobile, shown on lg+ */}
        <TourAnchor id="goals-profile" variant="desktop" className="hidden lg:flex lg:col-span-1 flex-col gap-6">
          <UserProfile userData={userData} userProfile={userProfile} />
          <TourAnchor id="goals-reminder" variant="desktop">
            <AIReminder page="goals" />
          </TourAnchor>
        </TourAnchor>

        {/* AI Reminder Floating Button - Mobile only */}
        <TourAnchor id="goals-reminder" variant="mobile" className="block lg:hidden">
          <AIReminder page="goals" isFloating={true} />
        </TourAnchor>
      </div>

      {/* Modals */}
      {showAddEditModal && (
        <AddEditGoalModal
          isOpen={showAddEditModal}
          onClose={() => setShowAddEditModal(false)}
          onSave={handleSaveGoal}
          editGoal={isEditMode ? selectedGoal : undefined}
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
