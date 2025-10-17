'use client';
import React from 'react';
import { Badge } from '@/lib/services/badgesService';

interface BadgeItemProps {
  badge: Badge;
}

const BadgeItem: React.FC<BadgeItemProps> = ({ badge }) => {
  const getBadgeIcon = (badgeName: string) => {
    const name = badgeName.toLowerCase();
    
    if (name.includes('rajin')) {
      return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    }
    
    if (name.includes('disiplin')) {
      return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      );
    }
    
    if (name.includes('ahli')) {
      return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
        </svg>
      );
    }
    
    if (name.includes('master') || name.includes('pengelola')) {
      return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    
    if (name.includes('legenda')) {
      return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    }
    
    if (name.includes('sukses') || name.includes('calon')) {
      return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      );
    }
    
    if (name.includes('hemat') || name.includes('pendekar')) {
      return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      );
    }
    
    if (name.includes('reward')) {
      return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      );
    }
    
    // Default star icon
    return (
      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    );
  };

  return (
    <div className={`
      rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg transition-all duration-200 hover:scale-105
      ${badge.earned 
        ? 'bg-gradient-to-r from-[#A3FFD6] to-[#0EFF95] text-[#363256]' 
        : 'bg-[#7971BC] text-white'
      }
    `}>
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Badge Icon */}
        <div className={`
          w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0
          ${badge.earned ? 'bg-[#363256]' : 'bg-[#50488A]'}
        `}>
          {getBadgeIcon(badge.name)}
        </div>

        {/* Badge Info */}
        <div className="flex-1 min-w-0">
          <h3 className={`
            text-base sm:text-lg md:text-xl font-bold truncate mb-1
            ${badge.earned ? 'text-[#363256]' : 'text-white'}
          `}>
            {badge.name}
          </h3>
          <p className={`
            text-xs sm:text-sm mb-2
            ${badge.earned ? 'text-[#363256]/80' : 'text-white/80'}
          `}>
            {badge.description}
          </p>
          
          {/* Progress Bar */}
          {!badge.earned && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-white/60">Progress</span>
                <span className="text-white/80">
                  {typeof badge.progress.current === 'string' 
                    ? Number.parseFloat(badge.progress.current).toLocaleString('id-ID')
                    : badge.progress.current.toLocaleString('id-ID')
                  } / {badge.progress.required.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-[#00F5A0] h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(badge.progress.percentage, 100)}%` }}
                />
              </div>
              <div className="text-right">
                <span className="text-[#00F5A0] text-xs font-medium">
                  {badge.progress.percentage.toFixed(1)}%
                </span>
              </div>
            </div>
          )}
          
          {/* Earned Badge */}
          {badge.earned && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#363256]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-[#363256] text-xs font-medium">Earned!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BadgeItem;