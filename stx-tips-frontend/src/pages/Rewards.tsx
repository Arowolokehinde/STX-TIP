import React from 'react';
import { Gift, ChevronRight, Lock } from 'lucide-react';

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  unlocked: boolean;
}

export const Rewards: React.FC = () => {
  const rewards: Reward[] = [
    {
      id: '1',
      title: 'Early Supporter',
      description: 'Receive 10% bonus on all tips for being an early platform adopter',
      points: 1000,
      unlocked: true
    },
    {
      id: '2',
      title: 'Tip Master',
      description: 'Unlock exclusive badge after receiving 100 tips',
      points: 2500,
      unlocked: false
    },
    {
      id: '3',
      title: 'High Roller',
      description: 'Get VIP status after receiving 1000 STX in tips',
      points: 5000,
      unlocked: false
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Rewards</h1>

      <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl shadow-sm p-6 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <Gift className="h-8 w-8" />
          <div>
            <h2 className="text-xl font-bold">Your Points</h2>
            <p className="text-white/80">Earn points with every transaction</p>
          </div>
        </div>
        <p className="text-4xl font-bold">750</p>
        <p className="text-white/80">points earned</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold">Available Rewards</h2>
        {rewards.map((reward) => (
          <div
            key={reward.id}
            className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-bold">{reward.title}</h3>
                {!reward.unlocked && <Lock className="h-4 w-4 text-gray-400" />}
              </div>
              <p className="text-gray-500">{reward.description}</p>
              <p className="text-sm font-medium text-violet-600">{reward.points} points required</p>
            </div>
            <ChevronRight className="h-6 w-6 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
};