import React from 'react';
import { UserProgress } from '../types';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Flame, Star, Shield, RotateCcw } from 'lucide-react';

interface DashboardProps {
  user: UserProgress;
}

const mockData = [
  { name: 'Mon', xp: 400 },
  { name: 'Tue', xp: 300 },
  { name: 'Wed', xp: 600 },
  { name: 'Thu', xp: 200 },
  { name: 'Fri', xp: 450 },
  { name: 'Sat', xp: 100 },
  { name: 'Sun', xp: 300 },
];

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div className="p-6 space-y-6 pb-24 md:pb-6">
      <header className="flex justify-between items-center mb-6">
        <div>
           <h1 className="text-2xl font-extrabold text-gray-800">Hi, {user.profile.name.split(' ')[0]}! 👋</h1>
           <p className="text-gray-500 text-sm">Let's keep up the good work!</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-indigo-200 shadow-sm">
             <span className="font-bold text-indigo-700 text-xs">{user.profile.classId}</span>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-orange-50 border border-orange-100 p-3 rounded-2xl flex flex-col items-center justify-center">
             <Flame className="text-orange-500 mb-1" size={20} fill="currentColor" />
             <span className="font-bold text-lg text-gray-800">{user.streak}</span>
             <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wide">Day Streak</span>
        </div>
        <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-2xl flex flex-col items-center justify-center">
             <Star className="text-yellow-500 mb-1" size={20} fill="currentColor" />
             <span className="font-bold text-lg text-gray-800">{user.xp}</span>
             <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wide">Total XP</span>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-3 rounded-2xl flex flex-col items-center justify-center">
             <Shield className="text-blue-500 mb-1" size={20} fill="currentColor" />
             <span className="font-bold text-lg text-gray-800">{user.level}</span>
             <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wide">Level</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-bold text-gray-600">Level Progress</h2>
            <span className="text-xs font-bold text-indigo-600">{user.xp % 1000} / 1000 XP</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
            <div className="bg-indigo-600 h-3 rounded-full transition-all duration-1000" style={{ width: `${(user.xp % 1000) / 10}%` }}></div>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Weekly Activity</h2>
        <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} />
                    <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                    <Bar dataKey="xp" fill="#6366f1" radius={[6, 6, 6, 6]} barSize={12} />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* Review Suggestion */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-200">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="font-bold text-lg">Weakness Review</h3>
                <p className="text-indigo-200 text-sm">Unit 1: Pronunciation</p>
            </div>
            <div className="bg-white/20 p-2 rounded-lg">
                <RotateCcw size={20} />
            </div>
        </div>
        <button className="w-full bg-white text-indigo-600 py-3 rounded-xl font-bold text-sm hover:bg-indigo-50 transition">
            Practice Now
        </button>
      </div>
    </div>
  );
};