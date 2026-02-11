import React from 'react';
import { UserProgress } from '../types';
import { Trophy, Medal, Crown } from 'lucide-react';
import { MOCK_CLASSMATES } from '../constants';

interface LeaderboardProps {
  currentUser: UserProgress;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ currentUser }) => {
  // Merge current user with mock classmates and sort by XP
  const allStudents = [
    ...MOCK_CLASSMATES,
    { 
      name: currentUser.profile.name, 
      xp: currentUser.xp, 
      classId: currentUser.profile.classId,
      id: currentUser.profile.studentId 
    }
  ];

  // Remove duplicates if user exists in mock data (simulated based on ID)
  const uniqueStudents = Array.from(new Map(allStudents.map(item => [item.id, item])).values());
  
  // Sort descending
  const sortedStudents = uniqueStudents.sort((a, b) => b.xp - a.xp);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Crown size={24} className="text-yellow-500" fill="currentColor" />;
      case 1: return <Medal size={24} className="text-gray-400" fill="currentColor" />;
      case 2: return <Medal size={24} className="text-orange-400" fill="currentColor" />;
      default: return <span className="font-bold text-gray-400 w-6 text-center">{index + 1}</span>;
    }
  };

  return (
    <div className="p-6 pb-24 md:pb-6">
      <div className="text-center mb-8 pt-4">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
           <Trophy size={32} className="text-yellow-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Class {currentUser.profile.classId} Leaderboard</h2>
        <p className="text-gray-500">Top students this semester</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
          <span>Rank / Student</span>
          <span>XP</span>
        </div>
        
        <div className="divide-y divide-gray-50">
          {sortedStudents.map((student, index) => {
            const isMe = student.id === currentUser.profile.studentId;
            return (
              <div 
                key={student.id} 
                className={`p-4 flex items-center justify-between transition ${isMe ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 flex justify-center">
                    {getRankIcon(index)}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${isMe ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className={`font-bold ${isMe ? 'text-indigo-700' : 'text-gray-800'}`}>
                        {student.name} {isMe && '(You)'}
                      </p>
                      <span className="text-[10px] text-gray-400 uppercase font-bold">Class {student.classId}</span>
                    </div>
                  </div>
                </div>
                
                <div className={`font-mono font-bold ${isMe ? 'text-indigo-600' : 'text-gray-600'}`}>
                  {student.xp.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Teacher View Note */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl flex gap-3 items-start">
        <div className="bg-blue-200 p-1 rounded-full text-blue-700 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        </div>
        <p className="text-xs text-blue-800 leading-relaxed">
            <strong>Privacy Note:</strong> You can see everyone's score to compete, but detailed progress reports are only visible to you and your teacher.
        </p>
      </div>
    </div>
  );
};