'use client';
import React from 'react';
import { GoalHeader, GoalList } from '@/components/dashboard/goals';
import SavingsChart from '@/components/dashboard/SavingsChart';
import UserProfile from '@/components/dashboard/UserProfile';
import AIReminder from '@/components/dashboard/AIReminder';

export default function GoalsPage() {
  return (
    <div className="min-h-screen bg-[#363256] pb-20 md:pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 h-full p-3 sm:p-4 md:p-6 pb-20 md:pb-6">
        {/* Left Column - Main Content (3 columns) */}
        <div className="lg:col-span-3 space-y-4 sm:space-y-6">
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

        {/* Right Column - User Profile & AI Reminder - Hidden on mobile, shown on lg+ */}
        <div className="hidden lg:flex lg:col-span-1 flex-col gap-6">
          <UserProfile />
          <AIReminder />
        </div>
      </div>
    </div>
  );
}
