'use client';

import React, { useState, useEffect } from 'react';
import { getAIReminder } from '@/lib/services/dashboardService';
import type { AIReminderData } from '@/types/api';
import { useToast } from '@/context/ToastContext';

interface AIReminderProps {
  page: 'asset' | 'goals' | 'transaction';
  isFloating?: boolean;
}

const AIReminder: React.FC<AIReminderProps> = ({ page, isFloating = false }) => {
  const [reminderData, setReminderData] = useState<AIReminderData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFloatingOpen, setIsFloatingOpen] = useState(false);
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

  // Helper function to truncate text - responsive word limit
  const getDisplayText = (text: string) => {
    if (!text) return '';
    const words = text.split(' ');
    // Different word limits for mobile vs desktop
    const WORD_LIMIT_MOBILE = 20; // Shorter for mobile
    const WORD_LIMIT_DESKTOP = 35; // Longer for desktop
    
    // Use window width to determine limit (fallback to mobile if SSR)
    const isMobile = globalThis.window !== undefined && globalThis.window.innerWidth < 640;
    const WORD_LIMIT = isMobile ? WORD_LIMIT_MOBILE : WORD_LIMIT_DESKTOP;
    
    if (words.length <= WORD_LIMIT || isExpanded) {
      return text;
    }
    
    return words.slice(0, WORD_LIMIT).join(' ') + '...';
  };

  // Check if text needs truncation - responsive
  const shouldShowReadMore = (text: string) => {
    if (!text) return false;
    const words = text.split(' ');
    const isMobile = globalThis.window !== undefined && globalThis.window.innerWidth < 640;
    const WORD_LIMIT = isMobile ? 20 : 35;
    return words.length > WORD_LIMIT;
  };

  // Fetch AI reminder based on page context
  useEffect(() => {
    const fetchAIReminder = async () => {
      setLoading(true);
      try {
        const response = await getAIReminder(page);
        setReminderData(response.data);
      } catch (error) {
        if (error instanceof Error) {
          showError("Gagal memuat AI reminder");
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

  // Render floating button mode
  if (isFloating) {
    return (
      <>
        {/* Floating Button */}
        <button
          onClick={() => setIsFloatingOpen(!isFloatingOpen)}
          className="fixed bottom-24 right-4 z-40 w-14 h-14 bg-[#00F5A0] rounded-full shadow-lg flex items-center justify-center hover:bg-[#00E68F] transition-colors duration-200 hover:scale-105 transform"
        >
          <svg 
            className="w-6 h-6 text-[#50488A]" 
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
        </button>

        {/* Floating Panel */}
        {isFloatingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-[#50488A] rounded-2xl overflow-hidden max-w-md w-full max-h-[80vh] overflow-y-auto">
              {/* Header with Close Button */}
              <div className="flex items-center bg-[#0EFF95] p-4 gap-3">
                <div className="flex items-center flex-1">
                  <div className="w-8 h-8 text-[#50488A] flex items-center justify-center">
                    <svg 
                      className="w-5 h-5" 
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
                  <h3 className="text-lg text-[#50488A] font-bold ml-2">AI Reminder</h3>
                </div>
                <button
                  onClick={() => setIsFloatingOpen(false)}
                  className="w-8 h-8 text-[#50488A] hover:bg-black/10 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="bg-[#50488A] p-4 text-white">
                {loading ? (
                  <div className="flex items-center justify-center py-6">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span className="ml-2 text-white/70 text-sm">Memuat AI reminder...</span>
                  </div>
                ) : (
                  <>
                    {/* Priority Badge */}
                    {reminderData?.priority_level && (
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-3 ${
                        getPriorityBgClass(reminderData.priority_level)
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1 ${
                          getPriorityDotClass(reminderData.priority_level)
                        }`}></span>
                        Priority: {reminderData.priority_level}
                      </div>
                    )}

                    {/* Main Content */}
                    <div className="text-white/90 leading-relaxed mb-4">
                      <div className="transition-all duration-300 ease-in-out">
                        <p className="text-sm">
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
                          className="mt-3 text-[#00F5A0] hover:text-[#00E68F] text-sm font-medium transition-colors underline flex items-center gap-1"
                        >
                          {isExpanded ? (
                            <>
                              <span>Sembunyikan</span>
                              <svg className="w-4 h-4 transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </>
                          ) : (
                            <>
                              <span>Baca selengkapnya</span>
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                    
                    {/* Context Summary */}
                    {reminderData?.context_analysis && (
                      <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="grid grid-cols-1 gap-2 text-xs text-white/70">
                          {reminderData.context_analysis.account_count > 0 && (
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-[#00F5A0] rounded-full"></span>
                              <span>Akun: {reminderData.context_analysis.account_count}</span>
                            </div>
                          )}
                          {reminderData.context_analysis.savings_rate > 0 && (
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                              <span>Savings Rate: {reminderData.context_analysis.savings_rate}%</span>
                            </div>
                          )}
                          {reminderData.context_analysis.emergency_fund_months > 0 && (
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                              <span>Dana Darurat: {reminderData.context_analysis.emergency_fund_months} bulan</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Render normal mode
  return (
    <div className="bg-[#50488A] rounded-2xl overflow-hidden">
      {/* Header - Responsive design */}
      <div className="flex items-center bg-[#0EFF95] p-3 sm:p-4 gap-2 sm:gap-3">
        <div className="flex items-center justify-start flex-1">
          <div className="w-8 h-8 sm:w-10 sm:h-10 text-[#50488A] flex items-center justify-center">
            <svg 
              className="w-5 h-5 sm:w-6 sm:h-6" 
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
          <h3 className="text-lg sm:text-xl text-[#50488A] font-bold ml-2">AI Reminder</h3>
          
          {/* Priority Badge - Mobile position */}
          {reminderData?.priority_level && (
            <div className={`ml-auto inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              getPriorityBgClass(reminderData.priority_level)
            }`}>
              <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-1 ${
                getPriorityDotClass(reminderData.priority_level)
              }`}></span>
              <span className="hidden sm:inline">Priority: </span>
              {reminderData.priority_level}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#50488A] p-4 sm:p-6 text-white">
        {loading ? (
          <div className="flex items-center justify-center py-6 sm:py-4">
            <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white"></div>
            <span className="ml-2 text-white/70 text-sm sm:text-base">Memuat AI reminder...</span>
          </div>
        ) : (
          <>
            {/* Main Content - Better mobile typography */}
            <div className="text-white/90 leading-relaxed mb-4">
              <div className="transition-all duration-300 ease-in-out">
                <p className="text-sm sm:text-base text-left sm:text-right">
                  {reminderData?.reminder ? 
                    formatTextWithBold(getDisplayText(reminderData.reminder)) :
                    'Halo! Jangan lupa catat pengeluaran kamu hari ini ya. Konsisten mencatat membantu kamu lebih aware dengan keuangan! 💪'
                  }
                </p>
              </div>
              
              {/* Read More/Less Button - Mobile optimized */}
              {reminderData?.reminder && shouldShowReadMore(reminderData.reminder) && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-3 text-[#00F5A0] hover:text-[#00E68F] text-sm font-medium transition-colors underline flex items-center gap-1 sm:ml-auto"
                >
                  {isExpanded ? (
                    <>
                      <span>Sembunyikan</span>
                      <svg className="w-4 h-4 transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>Baca selengkapnya</span>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </>
                  )}
                </button>
              )}
            </div>
            
            {/* Context Summary - Mobile optimized */}
            {reminderData?.context_analysis && (
              <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-white/70">
                  {reminderData.context_analysis.account_count > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#00F5A0] rounded-full"></span>
                      <span>Akun: {reminderData.context_analysis.account_count}</span>
                    </div>
                  )}
                  {reminderData.context_analysis.savings_rate > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                      <span>Savings Rate: {reminderData.context_analysis.savings_rate}%</span>
                    </div>
                  )}
                  {reminderData.context_analysis.emergency_fund_months > 0 && (
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                      <span>Dana Darurat: {reminderData.context_analysis.emergency_fund_months} bulan</span>
                    </div>
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
