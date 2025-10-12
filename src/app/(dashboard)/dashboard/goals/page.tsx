'use client';
import React from 'react';
import { GoalHeader, GoalList } from '@/components/dashboard/goals';
import SavingsChart from '@/components/dashboard/SavingsChart';
import UserProfile from '@/components/dashboard/UserProfile';
import AIReminder from '@/components/dashboard/AIReminder';

export default function GoalsPage() {
  return (
    <div className="min-h-screen bg-[#363256] p-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Main Layout - 2 Columns from top */}
        <div className="flex gap-6">
          {/* Left Column - Main Content */}
          <div className="flex-1 space-y-6">
            {/* Goal Header with Progress */}
            <GoalHeader
              goalName="Tabungan kamu"
              currentAmount={60000}
              targetAmount={100000}
            />

            {/* Savings Chart */}
            <SavingsChart />

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 bg-gradient-to-r from-[#A3FFD6] to-[#0EFF95] border-b-2 border-white text-black font-bold py-4 rounded-3xl hover:shadow-lg transition-all">
                + Tambah goals
              </button>
              <button className="flex-1 bg-[#DF4000] border-b-2 border-[#8B2800] text-white font-bold py-4 rounded-3xl hover:shadow-lg transition-all">
                - Hapus goals
              </button>
            </div>

            {/* Goal List */}
            <GoalList />
          </div>

          {/* Right Column - User Profile & AI Reminder */}
          <div className="w-80 flex-shrink-0 space-y-6">
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
