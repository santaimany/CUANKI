'use client';

import React, { useState, useEffect } from 'react';
import { getAIReminder } from '@/lib/services/dashboardService';
import type { AIReminderData } from '@/types/api';
import { useToast } from '@/context/ToastContext';

interface AIReminderProps {
  page: 'asset' | 'goals' | 'transaction';
}

const AIReminder: React.FC<AIReminderProps> = ({ page }) => {
  const [reminderData, setReminderData] = useState<AIReminderData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { showError } = useToast();

  // Helper functions for priority styling
  const getPriorityBgClass = (priority: string) => {
    if (priority === 'high') return 'bg-red-500/20 text-red-300';
    if (priority === 'medium') return 'bg-yellow-500/20 text-yellow-300';
    return 'bg-green-500/20 text-green-300';
  };

  const getPriorityDotClass = (priority: string) => {
    if (priority === 'high') return 'bg-red-400';
    if (priority === 'medium') return 'bg-yellow-400';
    return 'bg-green-400';
  };

  // Helper function to format text with bold
  const formatTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return <strong key={`bold-${index}-${boldText.slice(0, 10)}`} className="font-bold text-white">{boldText}</strong>;
      }
      return <span key={`text-${index}-${part.slice(0, 10)}`}>{part}</span>;
    });
  };

  // Helper function to truncate text
  const getDisplayText = (text: string) => {
    if (!text) return '';
    const words = text.split(' ');
    const WORD_LIMIT = 30; // Limit to 30 words initially
    
    if (words.length <= WORD_LIMIT || isExpanded) {
      return text;
    }
    
    return words.slice(0, WORD_LIMIT).join(' ') + '...';
  };

  // Check if text needs truncation
  const shouldShowReadMore = (text: string) => {
    if (!text) return false;
    const words = text.split(' ');
    return words.length > 30;
  };

  // Fetch AI reminder based on page context
  useEffect(() => {
    const fetchAIReminder = async () => {
      setLoading(true);
      try {
        const response = await getAIReminder(page);
        setReminderData(response.data);
      } catch (error) {
        console.error('Error fetching AI reminder:', error);
        if (error instanceof Error) {
          showError(error.message);
        } else {
          showError('Gagal memuat AI reminder');
        }
        // Use fallback message if API fails
        setReminderData({
          page,
          reminder: 'Halo! Jangan lupa catat pengeluaran kamu hari ini ya. Konsisten mencatat membantu kamu lebih aware dengan keuangan! 💪',
          context_analysis: {
            account_count: 0,
            total_balance: 0,
            savings_balance: 0,
            emergency_balance: 0,
            monthly_income: '0',
            emergency_fund_months: 0,
            savings_rate: 0,
            account_diversity: 'unknown'
          },
          priority_level: 'medium',
          action_suggestions: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAIReminder();
  }, [page, showError]);

  return (
    
    <div className="bg-[#50488A] rounded-2xl">

      <div className="flex items-center bg-[#0EFF95] p-4 rounded-2xl gap-3  ">
        <div className="flex items-center justify-center flex-2 ">

        <div className="w-10 h-auto text-[#50488A]  rounded-full items-center ">
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" 
            />
          </svg>
        </div>
        <h3 className="text-xl text-[#50488A]  font-bold">AI Reminder</h3>

        </div>
      </div>

    <div className=" bg-[#50488A] rounded-xl p-6 text-white shadow-lg">
      {loading ? (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          <span className="ml-2 text-white/70">Memuat AI reminder...</span>
        </div>
      ) : (
        <>
          <div className="text-white/90 text-md text-right leading-relaxed mb-4">
            <div className="transition-all duration-300 ease-in-out">
              <p>
                {reminderData?.reminder ? 
                  formatTextWithBold(getDisplayText(reminderData.reminder)) :
                  'Halo! Jangan lupa catat pengeluaran kamu hari ini ya. Konsisten mencatat membantu kamu lebih aware dengan keuangan! 💪'
                }
              </p>
            </div>
            
            {/* Read More/Less Button */}
            {reminderData?.reminder && shouldShowReadMore(reminderData.reminder) && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-[#00F5A0] hover:text-[#00E68F] text-sm font-medium transition-colors underline flex items-center gap-1"
              >
                {isExpanded ? (
                  <>
                    Read less
                    <svg className="w-3 h-3 transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </>
                ) : (
                  <>
                    Read more
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </>
                )}
              </button>
            )}
          </div>
          
          {/* Priority Indicator */}
          {reminderData?.priority_level && (
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-2 ${
              getPriorityBgClass(reminderData.priority_level)
            }`}>
              <span className={`w-2 h-2 rounded-full mr-1 ${
                getPriorityDotClass(reminderData.priority_level)
              }`}></span>
              Priority: {reminderData.priority_level}
            </div>
          )}
          
          {/* Context Summary */}
          {reminderData?.context_analysis && (
            <div className="mt-4 p-3 bg-white/5 rounded-lg">
              <div className="grid grid-cols-2 gap-2 text-xs text-white/70">
                {reminderData.context_analysis.account_count > 0 && (
                  <span>Akun: {reminderData.context_analysis.account_count}</span>
                )}
                {reminderData.context_analysis.savings_rate > 0 && (
                  <span>Savings Rate: {reminderData.context_analysis.savings_rate}%</span>
                )}
                {reminderData.context_analysis.emergency_fund_months > 0 && (
                  <span>Dana Darurat: {reminderData.context_analysis.emergency_fund_months} bulan</span>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
    </div>
    
    
  );
};

export default AIReminder;
