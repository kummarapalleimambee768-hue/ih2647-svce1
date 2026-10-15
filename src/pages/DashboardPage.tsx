import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { getWeekMilestone } from '../data/pregnancyMilestones';
import { FOUR_SAFE_EXERCISES } from '../data/exerciseRoutines';
import {
  Baby,
  Calendar,
  Sparkles,
  Apple,
  Dumbbell,
  Heart,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Stethoscope,
  ChevronRight,
  Mic,
  UtensilsCrossed,
  MessageCircle,
  Download,
  Droplet
} from 'lucide-react';
import { VoiceAssistantModal } from '../components/VoiceAssistantModal';

export const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const {
    currentUser,
    currentPregnancy,
    appointments,
    reminders,
    foodDiary,
    toggleReminder,
  } = useApp();

  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  const currentWeek = currentPregnancy?.currentWeek || 12;
  const currentTrimester = currentPregnancy?.currentTrimester || 1;
  const milestone = getWeekMilestone(currentWeek);

  // Today's nutrition tally
  const todayCalories = foodDiary.reduce((sum, m) => sum + (m.totalCalories || 0), 0);
  const todayProtein = foodDiary.reduce((sum, m) => sum + (m.totalProtein || 0), 0);
  const todayFolate = foodDiary.reduce((sum, m) => sum + (m.totalFolate || 0), 0);

  const nextAppointment = appointments.find((a) => !a.isCompleted) || appointments[0];

  return (
    <div className="space-y-6 animate-fadeIn max-w-6xl mx-auto">
      {/* 1. Hero Pregnancy Status Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-bloom-500 via-rose-500 to-lavender-600 text-white p-6 sm:p-8 shadow-elevated">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-white/95">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {t('dashboard.trimester', { trimester: currentTrimester, defaultValue: `Trimester ${currentTrimester}` })} • {t('dashboard.week', { week: currentWeek, defaultValue: `Week ${currentWeek}` })}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
              {t('dashboard.welcome', 'Welcome back')}, {currentUser?.fullName?.split(' ')[0] || 'Mom'}! 🌸
            </h1>

            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              {t('dashboard.daysRemaining', { days: currentPregnancy?.daysRemaining || 196, defaultValue: `${currentPregnancy?.daysRemaining || 196} days to Estimated Due Date` })} ({currentPregnancy?.estimatedDueDate || '2027-04-29'}).
            </p>

            {/* Quick Action Button within Hero */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <Link
                to="/exercise"
                className="px-4 py-2 rounded-xl bg-white text-bloom-700 font-bold text-xs shadow-md hover:bg-cream-100 transition-colors flex items-center gap-1.5"
              >
                <Dumbbell className="w-3.5 h-3.5" />
                <span>{t('nav.exercise', 'Safe Exercises')}</span>
              </Link>

              <button
                type="button"
                onClick={() => setVoiceModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <Mic className="w-3.5 h-3.5 animate-pulse" />
                <span>{t('voice.title', 'Voice Command')}</span>
              </button>

              <a
                href="/mom-journey-ai-full-project.zip"
                download="mom-journey-ai-full-project.zip"
                className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                title="Download entire project code zipfile"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Project (.ZIP)</span>
              </a>
            </div>
          </div>

          {/* Baby Size Widget */}
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-center flex-shrink-0 min-w-[210px]">
            <span className="text-4xl sm:text-5xl block mb-2">{milestone.babyFruitIcon}</span>
            <p className="text-xs text-white/80 font-medium">{t('dashboard.babySize', 'Baby is the size of a')}</p>
            <h3 className="text-xl font-extrabold text-white">{milestone.babyFruitComparison}</h3>
            <div className="mt-2 text-xs text-white/90 font-medium flex items-center justify-center gap-2">
              <span>Approx. {milestone.lengthCm} cm</span>
              <span>•</span>
              <span>{milestone.weightGrams} g</span>
            </div>
          </div>
        </div>

        {/* 40-Week Progress Indicator */}
        <div className="mt-6 pt-5 border-t border-white/20">
          <div className="flex items-center justify-between text-xs text-white/90 mb-2 font-medium">
            <span>Conception</span>
            <span className="font-bold underline">Week {currentWeek} of 40 Completed</span>
            <span>Birth</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-white/20 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-white shadow-sm transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(100, Math.round((currentWeek / 40) * 100))}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Main Dashboard Cards Grid (Simplified, Clear, Easy to Navigate) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Safe Exercises Hub */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft hover:shadow-elevated transition-shadow flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base font-display">{t('nav.exercise', 'Safe Exercises')}</h3>
                  <p className="text-[11px] text-slate-500">4 evidence-based routines</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                ACOG Approved
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Safe, low-impact physical activity with recommended durations and safety tips:
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {FOUR_SAFE_EXERCISES.map((ex) => (
                <div key={ex.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-800 block text-xs">{ex.icon} {ex.name}</span>
                  <span className="text-[10px] text-slate-500">{ex.recommendedDuration}</span>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/exercise"
            className="w-full py-3 px-4 rounded-2xl bg-bloom-500 hover:bg-bloom-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-bloom-500/20 transition-all"
          >
            <span>{t('exercise.learnMore', 'Open Safe Exercises')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Card 2: AI Food Scanner & Verified Nutrition */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft hover:shadow-elevated transition-shadow flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 text-bloom-600 flex items-center justify-center">
                  <Apple className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base font-display">{t('nav.nutrition', 'AI Food Scanner')}</h3>
                  <p className="text-[11px] text-slate-500">Verified Indian & USDA data</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cream-200 text-amber-900">
                Accurate Macros
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Scan meal photos or search Indian dishes without hallucinated calorie counts.
            </p>

            {/* Quick Nutrient Glance */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 text-[10px] block">{t('scanner.calories', 'Calories')}</span>
                <span className="font-bold text-slate-800 text-sm">{todayCalories}</span>
                <span className="text-[9px] text-slate-400 block">kcal</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 text-[10px] block">{t('scanner.protein', 'Protein')}</span>
                <span className="font-bold text-bloom-600 text-sm">{todayProtein}</span>
                <span className="text-[9px] text-slate-400 block">g</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 text-[10px] block">{t('scanner.folate', 'Folate')}</span>
                <span className="font-bold text-lavender-700 text-sm">{todayFolate}</span>
                <span className="text-[9px] text-slate-400 block">mcg</span>
              </div>
            </div>
          </div>

          <Link
            to="/nutrition"
            className="w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <span>{t('dashboard.scanMeal', 'Scan Food / Meal')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Card 3: AI Pregnancy Assistant & Voice */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft hover:shadow-elevated transition-shadow flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-lavender-100 text-lavender-700 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base font-display">{t('nav.assistant', 'AI Health Assistant')}</h3>
                  <p className="text-[11px] text-slate-500">Supportive Prenatal Guidance</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setVoiceModalOpen(true)}
                className="p-1.5 rounded-full bg-bloom-50 hover:bg-bloom-100 text-bloom-600 border border-bloom-200"
                title={t('voice.title', 'Voice Command')}
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Ask about symptoms, trimester nutrition, and clinical safety. Speaks multiple Indian languages.
            </p>

            <div className="p-3 rounded-2xl bg-cream-50 border border-cream-200 text-xs text-slate-700 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sample Inquiries:</span>
              <p className="italic text-slate-600">"What foods soothe morning nausea?"</p>
              <p className="italic text-slate-600">"How to prepare for my next appointment?"</p>
            </div>
          </div>

          <Link
            to="/assistant"
            className="w-full py-3 px-4 rounded-2xl bg-lavender-600 hover:bg-lavender-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-lavender-600/20 transition-all"
          >
            <span>{t('dashboard.askAI', 'Open AI Chat')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Card 4: Upcoming Antenatal Appointment */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft hover:shadow-elevated transition-shadow flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base font-display">{t('nav.appointments', 'Doctor Appointments')}</h3>
                  <p className="text-[11px] text-slate-500">Next clinical checkup</p>
                </div>
              </div>
            </div>

            {nextAppointment ? (
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-blue-950">{nextAppointment.title}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-200 text-blue-800">
                    Week {nextAppointment.gestationalWeek}
                  </span>
                </div>
                <p className="text-xs text-slate-600 flex items-center gap-1 font-semibold text-blue-800">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(nextAppointment.appointmentDate).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                </p>
                <p className="text-[11px] text-slate-500">
                  {nextAppointment.doctorName} • {nextAppointment.clinicOrHospital}
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-3">No upcoming visits scheduled.</p>
            )}
          </div>

          <Link
            to="/appointments"
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-800 hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <span>View All Appointments</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Card 5: Daily Reminders & Vitamin Schedule */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft hover:shadow-elevated transition-shadow flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base font-display">{t('nav.reminders', 'Daily Reminders')}</h3>
                  <p className="text-[11px] text-slate-500">Supplements & Hydration</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {reminders.slice(0, 2).map((rem) => (
                <div
                  key={rem.id}
                  onClick={() => toggleReminder(rem.id)}
                  className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between cursor-pointer hover:bg-slate-100/70 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                        rem.isActive ? 'bg-bloom-500 border-bloom-600 text-white' : 'border-slate-300'
                      }`}
                    >
                      {rem.isActive && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">{rem.title}</span>
                      <span className="text-[10px] text-slate-400">{rem.description}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 px-1.5 py-0.5 rounded bg-white">
                    {rem.reminderTime}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/reminders"
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-800 hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <span>Manage Reminders</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Card 6: Symptoms & Emergency Safety Notice */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft hover:shadow-elevated transition-shadow flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 text-red-600 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base font-display">Clinical Safety</h3>
                  <p className="text-[11px] text-slate-500">Emergency Protocol Ready</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Log daily sensations or check urgent red flags (bleeding, severe abdominal pain, fluid leaks).
            </p>

            <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-100 text-xs text-rose-900">
              <span className="font-bold block mb-0.5">Need immediate assistance?</span>
              <span>Call 108/112 or contact your obstetrician right away.</span>
            </div>
          </div>

          <Link
            to="/symptoms"
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-800 hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <span>Track Physical Symptoms</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
      />
    </div>
  );
};
