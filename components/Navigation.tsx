import React from 'react';
import { Home, BookOpen, BarChart2, User, Trophy } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  setView: (view: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'units', icon: BookOpen, label: 'Units' },
    { id: 'leaderboard', icon: Trophy, label: 'Rank' },
    { id: 'stats', icon: BarChart2, label: 'Stats' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50 md:sticky md:top-0 md:h-screen md:w-20 md:flex-col md:border-r md:border-t-0 md:justify-start md:pt-8">
      <div className="flex justify-around items-center h-16 md:flex-col md:h-auto md:gap-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col items-center justify-center w-full md:w-auto p-1 md:p-3 rounded-xl transition-all ${
              currentView === item.id
                ? 'text-indigo-600 md:bg-indigo-50'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <item.icon size={24} strokeWidth={currentView === item.id ? 2.5 : 2} />
            <span className="text-[10px] mt-1 font-medium md:hidden">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};