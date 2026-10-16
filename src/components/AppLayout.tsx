import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar } from './Navbar';
import { BottomNav } from './BottomNav';
import { VoiceAssistantModal } from './VoiceAssistantModal';
import {
  LayoutDashboard,
  Dumbbell,
  Camera,
  UtensilsCrossed,
  ActivitySquare,
  Stethoscope,
  ClipboardList,
  FolderLock,
  Bot,
  BellRing,
  Settings,
  Mic,
  Sparkles
} from 'lucide-react';
import { LocalizedCopy } from './LocalizedCopy';

export const AppLayout: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [voiceOpen, setVoiceOpen] = useState(false);

  const sidebarLinks = [
    { to: '/dashboard', label: t('nav.dashboard', 'Dashboard'), icon: LayoutDashboard },
    { to: '/exercise', label: t('nav.exercise', 'Safe Exercises'), icon: Dumbbell, highlight: true },
    { to: '/nutrition', label: t('nav.nutrition', 'AI Food Scanner'), icon: Camera },
    { to: '/food-diary', label: t('nav.foodDiary', 'Food Diary'), icon: UtensilsCrossed },
    { to: '/symptoms', label: t('nav.symptoms', 'Symptoms Tracker'), icon: ActivitySquare },
    { to: '/appointments', label: t('nav.appointments', 'Appointments'), icon: Stethoscope },
    { to: '/reminders', label: t('nav.reminders', 'Reminders'), icon: BellRing },
    { to: '/assistant', label: t('nav.assistant', 'AI Assistant'), icon: Bot },
    { to: '/medical-history', label: t('nav.medicalHistory', 'Medical History'), icon: ClipboardList },
    { to: '/medical-history/documents', label: t('nav.documents', 'Private Documents'), icon: FolderLock },
    { to: '/settings', label: t('nav.settings', 'Settings'), icon: Settings },
  ];

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/';

  if (isAuthPage) {
    return <LocalizedCopy>{(<Outlet />)}</LocalizedCopy>;
  }

  return <LocalizedCopy>{((
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col text-slate-800">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 flex gap-6">
        {/* Desktop Sidebar (Simplified, Modern, Uncluttered) */}
        <aside className="hidden lg:block w-60 flex-shrink-0">
          <div className="sticky top-24 space-y-4">
            {/* Voice Assistant Shortcut Card in Sidebar */}
            <div
              onClick={() => setVoiceOpen(true)}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-bloom-500 to-bloom-600 text-white cursor-pointer shadow-md shadow-bloom-500/20 hover:scale-[1.02] transition-transform flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                  <Mic className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <span className="text-xs font-bold block">Voice Commands</span>
                  <span className="text-[10px] text-white/80">Speak hands-free</span>
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-3 border border-slate-200/80 shadow-soft">
              <p className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Maternal Care Navigation
              </p>
              <nav className="space-y-1 mt-1">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      end={link.to === '/medical-history'}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-bloom-500 to-bloom-600 text-white shadow-sm shadow-bloom-500/30 font-bold'
                            : link.highlight
                            ? 'text-bloom-700 bg-bloom-50/60 hover:bg-bloom-100 font-bold'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-cream-100'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span>{link.label}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Workspace Content Area */}
        <main className="flex-1 min-w-0 pb-20 md:pb-8">
          <Outlet />
        </main>
      </div>

      <BottomNav />
      <VoiceAssistantModal isOpen={voiceOpen} onClose={() => setVoiceOpen(false)} />
    </div>
  ))}</LocalizedCopy>;
};
