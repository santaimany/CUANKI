'use client';
import React, { useState, useEffect } from 'react';
import AssetSummary from '@/components/dashboard/aset/AssetSummary';
import AssetCards from '@/components/dashboard/aset/AssetCards';
import AssetProgress from '@/components/dashboard/aset/AssetProgress';
import UserProfile from '@/components/dashboard/UserProfile';
import AIReminder from '@/components/dashboard/AIReminder';
import { UserAccount, GreetingUsersResponse, UserProfileResponse } from '@/types/api';
import { getUserGreeting, getUserProfile } from '@/lib/api/user';
import LoadingScreen from '@/components/commons/LoadingScreen';

export default function AsetPage() {
  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<GreetingUsersResponse | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [greetingData, profileData] = await Promise.all([
            getUserGreeting(),
            getUserProfile()
          ]);
          setUserData(greetingData);
          setUserProfile(profileData);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        } finally {
          // Simulate loading delay for now
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      };

      fetchData();
    }, []);

 

  const handleAccountsChange = (updatedAccounts: UserAccount[]) => {
    setAccounts(updatedAccounts);
  };

      if (loading) {
    return (
      <div className="pb-20 lg:pb-0 flex items-center justify-center min-h-screen">
        <LoadingScreen  />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#363256] pb-20 lg:pb-6">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6 h-full p-3 sm:p-4 lg:p-6 pb-20 lg:pb-6">
        {/* Left Column - Main Content (3 columns) */}
        <div className="xl:col-span-3 space-y-4 sm:space-y-6">
          {/* Title */}
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold">
            Kategori aset kamu
          </h1>
          
          {/* Asset Summary with Pie Chart */}
          <AssetSummary accounts={accounts} />

          {/* Asset Cards with Pagination and Action Buttons */}
          <AssetCards showButtons={true} onAccountsChange={handleAccountsChange} />

          {/* Saving Progress */}
          <AssetProgress />
        </div>

        {/* Right Column - User Profile & AI Reminder - Hidden on mobile, shown on lg+ */}
        <div className="hidden lg:hidden xl:flex xl:col-span-1 flex-col gap-6">
          <UserProfile userData={userData} userProfile={userProfile} />
          <AIReminder page="asset" />
        </div>
        
        {/* AI Reminder Floating Button - Mobile only */}
        <div className="block xl:hidden">
          <AIReminder page="asset" isFloating={true} />
        </div>
      </div>
    </div>
  );
}
