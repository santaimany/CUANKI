'use client';
import React, { useEffect, useState } from 'react';
import { BadgeHeader, BadgeList } from '@/components/dashboard/badges';
import UserProfile from '@/components/dashboard/UserProfile';
import AIReminder from '@/components/dashboard/AIReminder';
import { getBadges, type Badge, type BadgesData } from '@/lib/services/badgesService';
import { GreetingUsersResponse, UserProfileResponse } from '@/types/api';
import { getUserGreeting, getUserProfile } from '@/lib/api/user';
import { useToast } from '@/context/ToastContext';
import LoadingScreen from '@/components/commons/LoadingScreen';
import TourAnchor from '@/components/tour/TourAnchor';

export default function BadgesPage() {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [badgesData, setBadgesData] = useState<BadgesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<GreetingUsersResponse | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(null);
  const { showError } = useToast();

  const fetchBadges = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await getBadges();
      setBadges(response.data.badges);
      setBadgesData(response.data);
    } catch (error) {
      console.error('Error fetching badges:', error);
      showError('Gagal memuat data badges');
    } finally {
      setLoading(false);
    }
  }, [showError]);

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
      // Don't show error for user data as it's not critical
    }
  }, []);

  useEffect(() => {
    fetchBadges();
    fetchUserData();
  }, [fetchBadges, fetchUserData]);

  const handleRefresh = () => {
    fetchBadges();
  };

     if (loading) {
     return (
       <div className="pb-20 md:pb-0 flex items-center justify-center min-h-screen">
         <LoadingScreen  />
       </div>
     );
   }

  // Get featured badge (first earned badge or badge with highest progress)
  const getFeaturedBadge = () => {
    if (badges.length === 0) return undefined;
    
    const earnedBadges = badges.filter(badge => badge.earned);
    if (earnedBadges.length > 0) {
      return {
        name: earnedBadges[0].name,
        description: earnedBadges[0].description
      };
    }
    
    // If no earned badges, get the one with highest progress
    const sortedByProgress = [...badges].sort((a, b) => b.progress.percentage - a.progress.percentage);
    return {
      name: sortedByProgress[0].name,
      description: sortedByProgress[0].description
    };
  };

  return (
    <div className="min-h-screen bg-[#363256] pb-20 md:pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 h-full p-3 sm:p-4 md:p-6 pb-20 md:pb-6">
        {/* Left Column - Main Content (3 columns) */}
        <div className="lg:col-span-3 space-y-4 sm:space-y-6">
          {/* Badge Header */}
          <TourAnchor id="badges-header" variant="main">
            <BadgeHeader
              featuredBadge={getFeaturedBadge()}
            />
          </TourAnchor>

          {/* Badge List */}
          <TourAnchor id="badges-list" variant="main">
            <BadgeList 
              badges={badges} 
              totalBadges={badgesData?.total_badges || 0}
              earnedBadges={badgesData?.earned_badges || 0}
              onRefresh={handleRefresh}
            />
          </TourAnchor>
        </div>

        {/* Right Column - User Profile & AI Reminder - Hidden on mobile, shown on lg+ */}
        <TourAnchor id="badges-profile" variant="desktop" className="hidden lg:flex lg:col-span-1 flex-col gap-6">
          <UserProfile userData={userData} userProfile={userProfile} />
        </TourAnchor>
        
        {/* AI Reminder Floating Button - Mobile only */}
        <TourAnchor id="badges-reminder" variant="mobile" className="block lg:hidden">
          <AIReminder page="goals" isFloating={true} />
        </TourAnchor>
      </div>
    </div>
  );
}
