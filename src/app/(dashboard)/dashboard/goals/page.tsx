'use client';
import React from 'react';
import { GoalHeader, GoalList } from '@/components/dashboard/goals';
import SavingsChart from '@/components/dashboard/SavingsChart';
import UserProfile from '@/components/dashboard/UserProfile';
import AIReminder from '@/components/dashboard/AIReminder';

export default function GoalsPage() {
  return (
    <div className="min-h-screen bg-[#363256] p-3 sm:p-4 md:p-6 pb-20 md:pb-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Main Layout - Stacked on mobile, 2 columns on desktop */}
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
          {/* Left Column - Main Content */}
          <div className="flex-1 space-y-4 sm:space-y-6">
            {/* Goal Header with Progress */}
            <GoalHeader
              goalName="Tabungan kamu"
              currentAmount={60000}
              targetAmount={100000}
            />

            {/* Savings Chart */}
            <SavingsChart />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button className="bg-gradient-to-r from-[#A3FFD6] to-[#0EFF95] border-b-2 border-white text-black font-bold px-6 sm:px-8 md:px-9 py-3 sm:py-4 rounded-2xl sm:rounded-3xl hover:shadow-lg transition-all text-sm sm:text-base">
                + Tambah goals
              </button>
              <button className="bg-[#DF4000] border-b-2 border-white text-white font-bold px-6 sm:px-8 md:px-9 py-3 sm:py-4 rounded-2xl sm:rounded-3xl hover:shadow-lg transition-all text-sm sm:text-base">
                - Hapus goals
              </button>
            </div>

            {/* Goal List */}
            <GoalList />
          </div>

          {/* Right Column - User Profile & AI Reminder - Hidden on mobile */}
          <div className="hidden md:block md:w-80 flex-shrink-0 space-y-6">
            {/* User Profile at top */}
            <div className="flex justify-end">
              <UserProfile />
            </div>

            {/* AI Reminder below */}
            <AIReminder />
          </div>
        </div>
      </div>
    </div>
  );
}
