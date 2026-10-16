import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { LanguageSelector } from './LanguageSelector';
import { EmergencyModal } from './EmergencyModal';
import { VoiceAssistantModal } from './VoiceAssistantModal';
import {
  Heart,
  ShieldAlert,
  Menu,
  X,
  User,
  LogOut,
  Calendar,
  Activity,
  Apple,
  Dumbbell,
  MessageCircleQuestion,
  FileText,
  Clock,
  Mic
} from 'lucide-react';
import { LocalizedCopy } from './LocalizedCopy';

export const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { currentUser, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);

  const navLinks = [
    { to: '/dashboard', label: t('nav.dashboard', 'Dashboard'), icon: Activity },
    { to: '/exercise', label: t('nav.exercise', 'Safe Exercises'), icon: Dumbbell },
    { to: '/nutrition', label: t('nav.nutrition', 'AI Food Scanner'), icon: Apple },
    { to: '/food-diary', label: t('nav.foodDiary', 'Food Diary'), icon: Apple },
    { to: '/symptoms', label: t('nav.symptoms', 'Symptoms Tracker'), icon: Activity },
    { to: '/appointments', label: t('nav.appointments', 'Appointments'), icon: Calendar },
    { to: '/assistant', label: t('nav.assistant', 'AI Assistant'), icon: MessageCircleQuestion },
    { to: '/reminders', label: t('nav.reminders', 'Reminders'), icon: Clock },
    { to: '/medical-history', label: t('nav.medicalHistory', 'Medical History'), icon: FileText },
  ];

  return <LocalizedCopy>{((
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-sm transition-all">
        {/* Urgent Emergency Protocol Banner */}
        <div className="bg-rose-50/90 border-b border-rose-100/80 px-4 py-1 text-xs text-rose-800 flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-200/80 text-rose-900">
              SAFETY PROTOCOL
            </span>
            <span className="truncate">
              Severe pain, bleeding, or leaking fluid?
            </span>
            <button
              onClick={() => setEmergencyOpen(true)}
              className="underline font-semibold hover:text-red-700 ml-1 cursor-pointer flex-shrink-0"
            >
              Open Emergency Triage SOS
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-bloom-500 to-lavender-500 flex items-center justify-center text-white shadow-md shadow-bloom-500/20 group-hover:scale-105 transition-transform">
                <Heart className="w-5 h-5 fill-white/30" />
              </div>
              <div>
                <span className="text-xl font-bold font-display bg-gradient-to-r from-bloom-600 via-rose-600 to-lavender-700 bg-clip-text text-transparent">
                  Mom Journey AI
                </span>
                <span className="block text-[10px] text-slate-500 font-medium -mt-1 tracking-wider uppercase">
                  Maternal Wellness Companion
                </span>
              </div>
            </Link>

            {/* Quick Navigation Links on Desktop */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                to="/dashboard"
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  location.pathname === '/dashboard'
                    ? 'bg-bloom-50 text-bloom-700 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {t('nav.dashboard', 'Dashboard')}
              </Link>
              <Link
                to="/exercise"
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  location.pathname === '/exercise'
                    ? 'bg-bloom-50 text-bloom-700 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {t('nav.exercise', 'Safe Exercises')}
              </Link>
              <Link
                to="/nutrition"
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  location.pathname === '/nutrition'
                    ? 'bg-bloom-50 text-bloom-700 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {t('nav.nutrition', 'Food Scanner')}
              </Link>
              <Link
                to="/assistant"
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  location.pathname === '/assistant'
                    ? 'bg-bloom-50 text-bloom-700 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {t('nav.assistant', 'AI Assistant')}
              </Link>
            </nav>

            {/* Actions: Voice Mic, Emergency SOS, Language, Profile */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Voice Command Button */}
              <button
                onClick={() => setVoiceOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-100 hover:bg-cream-200 border border-cream-200 text-slate-800 font-bold text-xs transition-all transform hover:scale-105 active:scale-95"
                title="Speak Voice Commands"
              >
                <Mic className="w-3.5 h-3.5 text-bloom-600 animate-pulse" />
                <span className="hidden sm:inline">Voice</span>
              </button>

              {/* Emergency SOS Button */}
              <button
                onClick={() => setEmergencyOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/30 transition-all transform hover:scale-105 active:scale-95 animate-pulse"
                title="Immediate Emergency Assistance"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">SOS</span>
              </button>

              {/* Language Selector */}
              <LanguageSelector variant="minimal" />

              {/* User Profile Pill */}
              <Link
                to="/settings"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-bloom-100 text-bloom-700 flex items-center justify-center text-xs font-bold">
                  {currentUser?.fullName?.charAt(0) || 'M'}
                </div>
                <span className="text-xs font-medium text-slate-700 max-w-[100px] truncate">
                  {currentUser?.fullName?.split(' ')[0] || 'Profile'}
                </span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 md:hidden"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold ${
                      isActive
                        ? 'bg-bloom-50 text-bloom-700 border border-bloom-200'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-bloom-500" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <div className="flex items-center justify-between pt-1">
                <Link
                  to="/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 hover:text-bloom-600"
                >
                <User className="w-4 h-4" />
                <span>Account & Settings</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-semibold text-rose-600 flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>

      {/* Emergency SOS Modal */}
      <EmergencyModal isOpen={emergencyOpen} onClose={() => setEmergencyOpen(false)} />

      {/* Voice Assistant Modal */}
      <VoiceAssistantModal isOpen={voiceOpen} onClose={() => setVoiceOpen(false)} />
    </>
  ))}</LocalizedCopy>;
};
