'use client';
import React, { useEffect, useState } from 'react';
import { getDailySaving } from '@/lib/services/dashboardService';

const BudgetSisa = () => {
  const [dailySaving, setDailySaving] = useState<string>('Rp 0');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDailySaving = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await getDailySaving();
        
        // Set daily saving dengan formatted value dari backend
        if (response.data?.formatted?.daily_saving) {
          setDailySaving(response.data.formatted.daily_saving);
        }
        
        console.log('Daily Saving:', response.data.daily_saving);
      } catch (err) {
        console.error('Failed to fetch daily saving:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
        setDailySaving('Rp 0'); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchDailySaving();
  }, []);

  return (
    <div className="bg-[#00F5A0] rounded-2xl p-6 text-black">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Budget Sisa</h3>
        <div className="w-3 h-3 bg-black rounded-full"></div>
      </div>
      
      <div className="flex items-center gap-1">
        {isLoading && (
          <span className="text-sm font-medium animate-pulse">Loading...</span>
        )}
        {!isLoading && error && (
          <span className="text-sm font-medium text-red-600">Error loading data</span>
        )}
        {!isLoading && !error && (
          <span className="text-sm font-medium">{dailySaving}</span>
        )}
      </div>
    </div>
  );
};

export default BudgetSisa;