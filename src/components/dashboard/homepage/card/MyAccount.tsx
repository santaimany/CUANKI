'use client';
import React, { useEffect, useState } from 'react';
import AccountCard from './AccountCard';
import { getUserAccounts } from '@/lib/api/user';
import { UserAccount } from '@/types/api';

const MyAccounts = () => {
  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getUserAccounts();
        setAccounts(response.data.accounts);
      } catch {
    
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  // Color mapping based on account type - same as AssetCards
  const getColorByType = (type: string) => {
    const colorMap: Record<string, string> = {
      'Kebutuhan': 'bg-[#00F5A0]',
      'Tabungan': 'bg-[#00D9D9]',
      'Darurat': 'bg-[#7BFFC7]',
      'default': 'bg-[#4DD4AC]'
    };
    return colorMap[type] || colorMap['default'];
  };

  if (loading) {
    return (
      <div className="p-8 bg-[#363256]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg flex flex-col bg-white/10 animate-pulse"
            >
              <div className="py-4 sm:py-5 px-4 sm:px-6">
                <div className="h-8 bg-white/20 rounded mx-auto w-20 mb-2"></div>
                <div className="h-4 bg-white/20 rounded mx-auto w-16"></div>
              </div>
              <div className="bg-white/20 py-3 sm:py-4 px-4 sm:px-6">
                <div className="h-6 bg-white/30 rounded mx-auto w-32"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show only first 4 accounts
  const displayAccounts = accounts.slice(0, 4);
  const hasMore = accounts.length > 4;

  return (
    <div className="p-6 sm:p-1 bg-[#363256] h-full flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {displayAccounts.map((account, index) => (
          <div className="min-w-0" key={`${account.account_id}-${account.type}-${index}`}>
            <AccountCard
              accountName={account.account_name}
              accountType={account.type}
              balance={Number.parseFloat(account.balance)}
              color={getColorByType(account.type)}
            />
          </div>
        ))}
      </div>
      
      {hasMore && (
        <div className="mt-6 text-center">
          <a 
            href="/dashboard/aset"
            className="inline-block px-6 py-2 bg-[#00F5A0] text-[#363256] rounded-xl font-semibold hover:bg-[#00D68F] transition-colors"
          >
            See All ({accounts.length} accounts)
          </a>
        </div>
      )}
    </div>
  );
};

export default MyAccounts;