import React, { useState } from 'react';
import { User, Key, School } from 'lucide-react';
import { StudentProfile } from '../types';

interface LoginProps {
  onLogin: (profile: StudentProfile) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [classId, setClassId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !classId || !studentId) {
      setError('Please fill in all fields');
      return;
    }
    
    // In a real app, we would validate against a backend
    onLogin({ name, classId, studentId });
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col items-center justify-center p-6">
      <div className="mb-8 text-center">
        <div className="w-20 h-20 bg-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg transform rotate-3">
          <span className="text-4xl">🎓</span>
        </div>
        <h1 className="text-3xl font-extrabold text-indigo-900">English Master</h1>
        <p className="text-indigo-600 font-medium">Global Success Grade 9</p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm border border-indigo-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Student Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                placeholder="Nguyen Van A"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Class</label>
            <div className="relative">
              <School className="absolute left-3 top-3 text-gray-400" size={20} />
              <input 
                type="text" 
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                placeholder="9A"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Student ID / Email</label>
            <div className="relative">
              <Key className="absolute left-3 top-3 text-gray-400" size={20} />
              <input 
                type="text" 
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                placeholder="hs12345"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-indigo-700 transition transform active:scale-95 mt-4"
          >
            Start Learning
          </button>
        </form>
      </div>
      
      <p className="mt-8 text-xs text-gray-400 text-center">
        Access limited to students of Global Success program.
        <br/>Contact teacher for login issues.
      </p>
    </div>
  );
};