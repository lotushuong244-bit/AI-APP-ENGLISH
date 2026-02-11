import React, { useState } from 'react';
import { Unit } from '../types';
import { ChevronLeft, Book, Headphones, Mic, PenTool, Speaker } from 'lucide-react';
import { PracticeMode } from './PracticeMode';

interface UnitDetailProps {
  unit: Unit;
  onBack: () => void;
  onScoreUpdate: (points: number) => void;
}

export const UnitDetail: React.FC<UnitDetailProps> = ({ unit, onBack, onScoreUpdate }) => {
  const [activePractice, setActivePractice] = useState<'menu' | 'vocab' | 'listening' | 'speaking' | 'grammar' | 'pronunciation'>('menu');

  if (activePractice !== 'menu') {
    return (
      <PracticeMode 
        unit={unit} 
        mode={activePractice} 
        onExit={() => setActivePractice('menu')}
        onScoreUpdate={onScoreUpdate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className={`${unit.color} text-white p-6 rounded-b-3xl shadow-lg relative`}>
        <button 
          onClick={onBack}
          className="absolute top-6 left-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="mt-8 text-center">
          <span className="uppercase tracking-wider text-xs font-bold opacity-80">Unit {unit.id}</span>
          <h1 className="text-3xl font-bold mt-1 mb-2">{unit.topic}</h1>
          <p className="text-white/90 text-sm">{unit.description}</p>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mt-4">
        <div className="col-span-full mb-2">
            <h2 className="text-lg font-bold text-gray-800">Start Learning</h2>
        </div>
        
        <button
          onClick={() => setActivePractice('vocab')}
          className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition active:scale-95"
        >
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <Book size={24} />
          </div>
          <div className="text-left flex-1">
            <h3 className="font-bold text-gray-800">Vocabulary</h3>
            <p className="text-sm text-gray-500">Learn {unit.vocab.length} new words</p>
          </div>
        </button>

        <button
          onClick={() => setActivePractice('listening')}
          className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition active:scale-95"
        >
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <Headphones size={24} />
          </div>
          <div className="text-left flex-1">
            <h3 className="font-bold text-gray-800">Listening</h3>
            <p className="text-sm text-gray-500">Practice comprehension</p>
          </div>
        </button>

        {unit.grammar && (
            <button
            onClick={() => setActivePractice('grammar')}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition active:scale-95"
            >
            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                <PenTool size={24} />
            </div>
            <div className="text-left flex-1">
                <h3 className="font-bold text-gray-800">Grammar</h3>
                <p className="text-sm text-gray-500">{unit.grammar.topic}</p>
            </div>
            </button>
        )}

        {unit.pronunciation && (
             <button
             onClick={() => setActivePractice('pronunciation')}
             className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition active:scale-95"
           >
             <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
               <Speaker size={24} />
             </div>
             <div className="text-left flex-1">
               <h3 className="font-bold text-gray-800">Pronunciation</h3>
               <p className="text-sm text-gray-500">Stress & Intonation</p>
             </div>
           </button>
        )}

        <button
          onClick={() => setActivePractice('speaking')}
          className="col-span-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition active:scale-95"
        >
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <Mic size={24} />
          </div>
          <div className="text-left flex-1">
            <h3 className="font-bold text-gray-800">Speaking</h3>
            <p className="text-sm text-gray-500">AI pronunciation check</p>
          </div>
        </button>
      </div>
    </div>
  );
};