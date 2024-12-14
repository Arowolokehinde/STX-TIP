import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Transaction } from '@/lib/type';

export const History: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  // Sample data - replace with real data in production
  const transactions: Transaction[] = [
    { id: '1', sender: '0x1234567890abcdef', recipient: '0xabcdef1234567890', amount: 10, timestamp: new Date('2024-12-09T10:00:00') },
    { id: '2', sender: '0x2345678901bcdef0', recipient: '0xbcdef01234567891', amount: 5, timestamp: new Date('2024-12-08T09:30:00') },
    { id: '3', sender: '0x3456789012cdef01', recipient: '0xcdef012334567892', amount: 15, timestamp: new Date('2024-12-07T09:00:00') },
    // Add more transactions as needed
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Transaction History</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <select
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 appearance-none bg-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Transactions</option>
            <option value="sent">Sent</option>
            <option value="received">Received</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="grid grid-cols-4 gap-4 p-4 border-b font-medium text-gray-500">
          <div>From</div>
          <div>To</div>
          <div>Amount</div>
          <div>Date</div>
        </div>
        <div className="divide-y">
          {transactions.map((tx) => (
            <div key={tx.id} className="grid grid-cols-4 gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="font-medium">{tx.sender.slice(0, 6)}...{tx.sender.slice(-4)}</div>
              <div className="font-medium">{tx.recipient.slice(0, 6)}...{tx.recipient.slice(-4)}</div>
              <div className="text-violet-600 font-medium">{tx.amount} STX</div>
              <div className="text-gray-500">{new Date(tx.timestamp).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};