import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, Sparkles, Check } from 'lucide-react';

export const SisterSwitcher: React.FC = () => {
  const { allSistersData, activeSisterKey, switchSisterAccount } = useApp();

  const sisters = [
    { key: 'sister-1-ananya', name: 'Ananya', role: 'Sister 1', week: 12, trimester: 1, color: 'bg-rose-100 text-rose-700 border-rose-300' },
    { key: 'sister-2-priya', name: 'Priya', role: 'Sister 2', week: 24, trimester: 2, color: 'bg-lavender-100 text-lavender-700 border-lavender-300' },
    { key: 'sister-3-meera', name: 'Meera', role: 'Sister 3', week: 34, trimester: 3, color: 'bg-sage-100 text-sage-800 border-sage-300' },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-2 sm:p-2.5 border border-bloom-100 shadow-sm flex items-center justify-between gap-2 overflow-x-auto">
      <div className="flex items-center gap-2 pl-2">
        <div className="w-8 h-8 rounded-full bg-bloom-100 flex items-center justify-center text-bloom-600">
          <Users className="w-4 h-4" />
        </div>
        <div className="hidden md:block">
          <p className="text-xs font-semibold text-slate-800 flex items-center gap-1">
            <span>Sister Profiles</span>
            <Sparkles className="w-3 h-3 text-amber-500" />
          </p>
          <p className="text-[10px] text-slate-500">3 Sisters Pregnancy Journey</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        {sisters.map((s) => {
          const sisterData = allSistersData[s.key];
          const currentWeek = sisterData?.pregnancy?.currentWeek || s.week;
          const isActive = activeSisterKey === s.key;

          return (
            <button
              key={s.key}
              onClick={() => switchSisterAccount(s.key)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                isActive
                  ? 'bg-bloom-500 text-white border-bloom-600 shadow-sm shadow-bloom-500/25 scale-[1.02]'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-bloom-50 hover:border-bloom-200'
              }`}
            >
              <div className="flex items-center gap-1">
                {isActive && <Check className="w-3 h-3" />}
                <span>{s.name}</span>
              </div>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                W{currentWeek} • T{s.trimester}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
