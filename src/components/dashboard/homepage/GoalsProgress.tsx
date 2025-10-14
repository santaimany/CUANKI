'use client';
import React, { useEffect, useState } from 'react';
import { getGoalsProgress } from '@/lib/api/user';
import { GoalsProgressResponse } from '@/types/api';

const GoalsProgress = () => {
  const [goalsData, setGoalsData] = useState<GoalsProgressResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoalsProgress = async () => {
      try {
        const data = await getGoalsProgress();
        setGoalsData(data);
      } catch (error) {
        console.error('Error fetching goals progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoalsProgress();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-tl from-[#7971BC] to-[#373456/10] rounded-2xl p-6 text-white">
        <div className="animate-pulse">
          <div className="h-6 bg-white/20 rounded w-32 mb-4"></div>
          <div className="h-3 bg-white/20 rounded w-full"></div>
        </div>
      </div>
    );
  }

  const mainTarget = goalsData?.data?.main_saving_target;
  
  // Safely extract values
  const progressPercentage = typeof mainTarget?.progress_percentage === 'number' 
    ? mainTarget.progress_percentage 
    : 0;
  
  const currentAmount = typeof mainTarget?.formatted_current === 'string'
    ? mainTarget.formatted_current
    : 'Rp 0';
    
  const targetAmount = typeof mainTarget?.formatted_amount === 'string'
    ? mainTarget.formatted_amount
    : 'Rp 0';

  console.log('GoalsProgress data:', { mainTarget, progressPercentage, currentAmount, targetAmount });

  return (
    <div className="bg-gradient-to-tl from-[#7971BC] to-[#373456/10] rounded-2xl p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Goals Progress</h3>
        <span className="text-base font-medium">
          {currentAmount}/{targetAmount}
        </span>
      </div>
      <div className="w-full bg-[#BDB7DC] rounded-full h-3">
        <div 
          className="bg-[#00F5A0] h-3 rounded-full transition-all duration-500" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default GoalsProgress;