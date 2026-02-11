import React from 'react';
import { Unit, UserProgress } from '../types';
import { Lock, Check } from 'lucide-react';

interface UnitListProps {
  units: Unit[];
  userProgress: UserProgress;
  onSelectUnit: (unit: Unit) => void;
}

export const UnitList: React.FC<UnitListProps> = ({ units, userProgress, onSelectUnit }) => {
  return (
    <div className="p-6 pb-24 md:pb-6 space-y-6">
      <h1 className="text-2xl font-extrabold text-gray-800 mb-6">Course Map</h1>
      
      <div className="space-y-6 relative">
        {/* Connector Line */}
        <div className="absolute left-8 top-8 bottom-8 w-1 bg-gray-200 rounded-full -z-10" />

        {units.map((unit, index) => {
          const isLocked = index > 0 && !userProgress.completedUnits.includes(units[index - 1].id) && !userProgress.completedUnits.includes(unit.id);
          const isCompleted = userProgress.completedUnits.includes(unit.id);
          
          return (
            <div key={unit.id} className="flex items-center gap-4 group">
               {/* Icon Circle */}
               <div className={`
                    w-16 h-16 rounded-full flex items-center justify-center border-4 z-10 transition-transform duration-300
                    ${isLocked ? 'bg-gray-100 border-gray-300 text-gray-400' : 
                      isCompleted ? 'bg-green-100 border-green-500 text-green-600' : 
                      'bg-white border-indigo-500 text-indigo-600 shadow-lg scale-110'}
               `}>
                    {isLocked ? <Lock size={24} /> : isCompleted ? <Check size={28} strokeWidth={3} /> : <span className="font-extrabold text-xl">{unit.id}</span>}
               </div>

               {/* Card */}
               <button 
                disabled={isLocked}
                onClick={() => onSelectUnit(unit)}
                className={`flex-1 text-left p-4 rounded-2xl transition-all ${
                    isLocked ? 'bg-gray-50 opacity-60 grayscale' : 'bg-white shadow-sm hover:shadow-md border border-gray-100'
                }`}
               >
                 <div className="flex justify-between items-start">
                    <div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${unit.color.replace('bg-', 'text-').replace('500', '700')} bg-opacity-10 mb-2 inline-block`}>
                            Unit {unit.id}
                        </span>
                        <h3 className="font-bold text-gray-800">{unit.topic}</h3>
                        <p className="text-xs text-gray-500 line-clamp-1">{unit.description}</p>
                    </div>
                    <img src={unit.image} alt="Unit" className="w-12 h-12 rounded-lg object-cover bg-gray-200" />
                 </div>
               </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};