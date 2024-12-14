import React from 'react';
import { Trophy, History, Gift, Settings, LogOut, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { NavItem } from '@/lib/type';

export const Sidebar: React.FC = () => {
  const { isOpen, setIsOpen, currentPage, setCurrentPage } = useAppContext();

  const navItems: NavItem[] = [
    { name: 'Dashboard', icon: <Trophy className="h-5 w-5" />, id: 'dashboard' },
    { name: 'History', icon: <History className="h-5 w-5" />, id: 'history' },
    { name: 'Rewards', icon: <Gift className="h-5 w-5" />, id: 'rewards' },
    { name: 'Settings', icon: <Settings className="h-5 w-5" />, id: 'settings' }
  ];

  return (
    <div className={`fixed top-0 left-0 h-full bg-gradient-to-b from-violet-900 to-purple-800 text-white w-64 p-6 transform transition-transform duration-200 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 z-30`}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">TipStack</h1>
        <button onClick={() => setIsOpen(false)} className="lg:hidden">
          <X className="h-6 w-6" />
        </button>
      </div>

      <nav className="space-y-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
              currentPage === item.id ? 'bg-white/10' : 'hover:bg-white/5'
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <button className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-white/5 text-red-300">
          <LogOut className="h-5 w-5" />
          <span>Disconnect</span>
        </button>
      </div>
    </div>
  );
};