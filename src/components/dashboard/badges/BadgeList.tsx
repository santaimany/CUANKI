'use client';
import React from 'react';
import { Badge } from '@/lib/services/badgesService';
import BadgeItem from './BadgeItem';

interface BadgeListProps {
  badges: Badge[];
  totalBadges: number;
  earnedBadges: number;
  onRefresh?: () => void;
}

const BadgeList: React.FC<BadgeListProps> = ({ 
  badges, 
  totalBadges, 
  earnedBadges, 
  onRefresh 
}) => {
  if (badges.length === 0) {
    return (
      <div className="bg-[#7971BC] rounded-2xl sm:rounded-3xl p-8 text-center">
        <p className="text-white/70 text-lg">Belum ada badges</p>
        {onRefresh && (
          <button 
            onClick={onRefresh}
            className="mt-4 bg-[#00F5A0] text-[#363256] px-4 py-2 rounded-lg font-medium hover:bg-[#00e68f] transition-colors"
          >
            Refresh
          </button>
        )}
      </div>
    );
  }

  // Sort badges: earned badges first, then by progress percentage
  const sortedBadges = [...badges].sort((a, b) => {
    if (a.earned && !b.earned) return -1;
    if (!a.earned && b.earned) return 1;
    if (!a.earned && !b.earned) {
      return b.progress.percentage - a.progress.percentage;
    }
    return 0;
  });

  return (
    <div className="space-y-4">
      {/* Badges Progress Header */}
      <div className=" rounded-2xl sm:rounded-3xl p-4 sm:p-6">
        <div className="space-y-3">
          <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold">
            Badges:
          </h2>
          <div className="flex justify-end">
            <span className="text-white/80 text-sm sm:text-base">
              {earnedBadges}/{totalBadges} Badges Collected
            </span>
          </div>
        </div>
      </div>

      {/* Badge Items */}
      {sortedBadges.map((badge) => (
        <BadgeItem 
          key={badge.id} 
          badge={badge} 
        />
      ))}
    </div>
  );
};

export default BadgeList;