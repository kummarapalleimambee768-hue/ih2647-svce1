import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Activity, Dumbbell, Apple, HeartPulse, Mic } from 'lucide-react';
import { VoiceAssistantModal } from './VoiceAssistantModal';

export const BottomNav: React.FC = () => {
  const { t } = useTranslation();
  const [voiceOpen, setVoiceOpen] = useState(false);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 md:hidden shadow-lg">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {/* Dashboard */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                isActive ? 'text-bloom-600 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`
            }
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight">{t('nav.dashboard', 'Dashboard')}</span>
          </NavLink>

          {/* Safe Exercises */}
          <NavLink
            to="/exercise"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                isActive ? 'text-bloom-600 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`
            }
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <Dumbbell className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight">{t('nav.exercise', 'Exercises')}</span>
          </NavLink>

          {/* Center Voice Mic Button */}
          <button
            type="button"
            onClick={() => setVoiceOpen(true)}
            className="-mt-5 w-12 h-12 rounded-full bg-gradient-to-tr from-bloom-500 to-bloom-600 text-white shadow-lg shadow-bloom-500/30 flex items-center justify-center active:scale-95 transition-transform"
            title="Voice Commands"
          >
            <Mic className="w-6 h-6 animate-pulse" />
          </button>

          {/* Nutrition */}
          <NavLink
            to="/nutrition"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                isActive ? 'text-bloom-600 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`
            }
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <Apple className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight">{t('nav.nutrition', 'Nutrition')}</span>
          </NavLink>

          {/* Symptoms */}
          <NavLink
            to="/symptoms"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                isActive ? 'text-bloom-600 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`
            }
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <HeartPulse className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight">{t('nav.symptoms', 'Symptoms')}</span>
          </NavLink>
        </div>
      </nav>

      <VoiceAssistantModal isOpen={voiceOpen} onClose={() => setVoiceOpen(false)} />
    </>
  );
};
