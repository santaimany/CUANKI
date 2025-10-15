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
      } catch (error) {
        console.error('Error fetching accounts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  // Color mapping based on account type
  const getColorByType = (type: string) => {
    const colorMap: Record<string, string> = {
      'Kebutuhan': 'bg-[#00F5A0]',
      'Tabungan': 'bg-[#15803d]',
      'Darurat': 'bg-[#6ee7b7]',
      'default': 'bg-[#0d9488]'
    };
    return colorMap[type] || colorMap['default'];
  };

  if (loading) {
    return (
      <div className="p-8 bg-[#363256]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white/10 rounded-2xl p-6 animate-pulse">
              <div className="h-4 bg-white/20 rounded w-20 mb-2"></div>
              <div className="h-6 bg-white/20 rounded w-32"></div>
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
    <div className="p-8 bg-[#363256] h-full flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {displayAccounts.map((account, index) => (
          <AccountCard
            key={`${account.account_id}-${account.type}-${index}`}
            accountName={`${account.account_name} - ${account.type}`}
            balance={parseFloat(account.balance)}
            color={getColorByType(account.type)}
          />
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