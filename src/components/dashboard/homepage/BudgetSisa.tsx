'use client';
import React, { useEffect, useState } from 'react';
import { getDailySaving } from '@/lib/services/dashboardService';

const BudgetSisa = () => {
  const [dailySaving, setDailySaving] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDailySaving = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await getDailySaving();
        

        if (response.data?.daily_saving) {
          setDailySaving(response.data.daily_saving);
        }
        

      } catch (err) {
       
        setError(err instanceof Error ? err.message : 'Failed to load data');
        setDailySaving(0); 
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
          <span className="text-sm font-medium">
            Rp {dailySaving.toLocaleString('id-ID')}
          </span>
        )}
      </div>
    </div>
  );
};

export default BudgetSisa;