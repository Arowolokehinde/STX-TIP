import { ChartData } from '@/lib/type';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartProps {
  data: ChartData[];
}

export const Chart: React.FC<ChartProps> = ({ data }) => (
  <div className="h-80">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis dataKey="name" stroke="#666" />
        <YAxis stroke="#666" />
        <Tooltip 
          contentStyle={{ 
            background: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
          }} 
        />
        <Line 
          type="monotone" 
          dataKey="tips" 
          stroke="#8b5cf6" 
          strokeWidth={2}
          dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
          activeDot={{ r: 6, fill: '#8b5cf6' }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);