import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../components/LanguageSelector';
import { FOUR_SAFE_EXERCISES } from '../data/exerciseRoutines';
import {
  Heart,
  ShieldCheck,
  Sparkles,
  Apple,
  Dumbbell,
  Mic,
  ArrowRight,
  Clock,
  CheckCircle2,
  Lock,
  Globe,
  Download
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-900 selection:bg-bloom-100 selection:text-bloom-800">
      {/* Top Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-bloom-500 to-lavender-500 flex items-center justify-center text-white shadow-md shadow-bloom-500/20">
            <Heart className="w-5 h-5 fill-white/30" />
          </div>
          <div>
            <span className="text-xl font-bold font-display bg-gradient-to-r from-bloom-600 via-rose-600 to-lavender-700 bg-clip-text text-transparent">
              Mom Journey AI
            </span>
            <span className="block text-[10px] text-slate-500 font-medium -mt-1 tracking-wider uppercase">
              Maternal Health Companion
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSelector variant="minimal" />
          <Link
            to="/login"
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-bloom-600 hover:bg-slate-100 transition-colors"
          >
            {t('auth.login')}
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-bloom-500 hover:bg-bloom-600 text-white shadow-md shadow-bloom-500/25 transition-all transform hover:scale-105 active:scale-95"
          >
            {t('auth.register')}
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Soothing background decorative glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-bloom-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-lavender-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-100 border border-cream-300/80 text-xs font-semibold text-bloom-700 mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Evidence-Based Pregnancy Health • Safe Exercises & Nutrition</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight font-display mb-6">
          Your Loving, Clinical-Grade{' '}
          <span className="bg-gradient-to-r from-bloom-500 via-rose-500 to-lavender-600 bg-clip-text text-transparent">
            Pregnancy Companion
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Explore trimester-safe exercises with recommended durations, verify Indian & USDA nutrition without invented numbers, and navigate your maternal journey with voice-controlled AI.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14">
          <Link
            to="/dashboard"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-bloom-500 to-bloom-600 hover:from-bloom-600 hover:to-bloom-700 text-white font-bold text-sm shadow-xl shadow-bloom-500/25 flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95"
          >
            <span>Launch Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/exercise"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-200 shadow-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Dumbbell className="w-4 h-4 text-bloom-600" />
            <span>Explore Safe Exercises</span>
          </Link>
        </div>

        {/* Four Safe Exercises Showcase */}
        <div className="max-w-5xl mx-auto text-left">
          <div className="flex items-center justify-between mb-4 px-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">
                Four Core Safe Exercises for Pregnancy
              </h2>
              <p className="text-xs text-slate-500">
                ACOG-recommended low-impact activities with tailored durations and safety tips
              </p>
            </div>
            <Link
              to="/exercise"
              className="text-xs font-bold text-bloom-600 hover:underline flex items-center gap-1"
            >
              <span>View All Guidance</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FOUR_SAFE_EXERCISES.map((ex) => (
              <div
                key={ex.id}
                className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{ex.icon}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cream-200 text-amber-900">
                      T1-T3
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{ex.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-bloom-700 font-extrabold mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{ex.recommendedDuration}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-3 leading-relaxed">
                    {ex.shortSummary}
                  </p>
                </div>

                <Link
                  to={`/exercise?trimester=all`}
                  className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-bloom-600 hover:text-bloom-700 flex items-center justify-between"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-16 bg-gradient-to-b from-white to-cream-50/70 border-y border-slate-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold font-display text-slate-900 mb-3">
              Modern Maternal Health & Technology
            </h2>
            <p className="text-xs text-slate-600">
              Grounded in clinically reviewed ACOG, WHO, and ICMR-NIN guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-bloom-100 text-bloom-600 flex items-center justify-center mb-4">
                <Mic className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Voice Recognition Assistant</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Speak hands-free commands like "Open safe exercises", "Show second trimester exercises", or "Read the safety tips" with browser speech recognition and audio answers.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-bloom-600 flex items-center justify-center mb-4">
                <Apple className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Verified AI Food Scanner</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Scan Indian foods like idli, dosa, dal, khichdi, and sabzi. Accurate nutrition calculated from verified tables—no invented numbers.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-lavender-100 text-lavender-600 flex items-center justify-center mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">5 Indian Languages</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complete, natural translations in English, Telugu (తెలుగు), Hindi (हिन्दी), Tamil (தமிழ்), and Kannada (ಕನ್ನಡ).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Notice Footer */}
      <footer className="py-12 bg-white border-t border-slate-200 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-rose-700 font-semibold text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>Supportive Maternal Health Information • Not a Medical Device</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Mom Journey AI is an educational and supportive pregnancy wellness companion. It does not provide medical diagnoses, alter prescribed medication, or replace the clinical guidance of licensed obstetricians and healthcare professionals. For emergencies, dial 108/112 immediately.
          </p>
          <p className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} Mom Journey AI. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
