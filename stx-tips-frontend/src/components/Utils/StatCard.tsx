import { Stat } from '@/lib/type';
import React from 'react';

export const StatCard: React.FC<Stat> = ({ title, value, change, icon }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      {icon && <div className="text-violet-600">{icon}</div>}
    </div>
    <p className="text-2xl font-bold">{value}</p>
    <span className={`text-sm ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
      {change}
    </span>
  </div>
);