import { Transaction } from '@/lib/type';
import React from 'react';

interface TransactionCardProps {
  transaction: Transaction;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => (
  <div className="flex items-center justify-between py-3 border-b last:border-0 hover:bg-gray-50 transition-colors">
    <div className="flex items-center space-x-4">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-400 to-cyan-300 flex items-center justify-center text-white font-medium">
        {transaction.sender.slice(0, 2)}
      </div>
      <div>
        <p className="font-medium">
          {transaction.sender.slice(0, 6)}...{transaction.sender.slice(-4)}
        </p>
        <p className="text-sm text-gray-500">
          {new Date(transaction.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
    <span className="font-medium text-violet-600">+{transaction.amount} STX</span>
  </div>
);