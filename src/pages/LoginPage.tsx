import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { Heart, Mail, Lock, ArrowRight, Sparkles, UserCheck, Mic, Volume2 } from 'lucide-react';
import { LanguageSelector } from '../components/LanguageSelector';
import { VoiceAssistantModal } from '../components/VoiceAssistantModal';
import { LocalizedCopy } from '../components/LocalizedCopy';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, loginAsDemoSister } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate('/dashboard');
      } else {
        // Fallback: log in as demo profile if not found
        loginAsDemoSister('sister-1-ananya');
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred during sign in.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (sisterId: 'sister-1-ananya' | 'sister-2-priya' | 'sister-3-meera' = 'sister-1-ananya') => {
    loginAsDemoSister(sisterId);
    navigate('/dashboard');
  };

  return <LocalizedCopy>{((
    <div className="min-h-screen bg-gradient-to-b from-bloom-50/50 via-[#FFFDF9] to-lavender-50/40 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 relative">
      {/* Top Bar with Language Selector and Voice Assistant Button */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2.5 z-10">
        <button
          type="button"
          onClick={() => setIsVoiceOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white border border-bloom-200 text-bloom-700 text-xs font-bold shadow-sm transition-all hover:scale-105"
          title="Open AI Voice Assistant for hands-free voice login"
        >
          <Mic className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
          <span>Voice Login</span>
        </button>
        <LanguageSelector />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-bloom-500 to-lavender-500 flex items-center justify-center text-white shadow-md shadow-bloom-500/25 group-hover:scale-105 transition-transform">
            <Heart className="w-6 h-6 fill-white/30" />
          </div>
        </Link>
        <h2 className="text-3xl font-extrabold text-slate-900 font-display">
          Welcome to Mom Journey AI
        </h2>
        <p className="mt-2 text-xs text-slate-500">
          Sign in or speak your name to access your private pregnancy dashboard
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/95 backdrop-blur-md py-7 px-6 sm:px-10 shadow-elevated rounded-3xl border border-bloom-100 space-y-5">
          {error && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {error}
            </div>
          )}

          {/* AI Voice Recognition Card on Login */}
          <div
            onClick={() => setIsVoiceOpen(true)}
            className="p-3.5 rounded-2xl bg-gradient-to-r from-bloom-500 via-rose-500 to-lavender-500 text-white cursor-pointer hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner">
                  <Mic className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-xs">AI Voice Login & Recognition</h4>
                  <p className="text-[11px] text-white/90">Say: "Log in as Ananya" or "अनन्या लॉगिन"</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-white/25 text-[11px] font-bold">
                Speak Now
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('auth.email', 'Email Address')}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. ananya@momjourney.ai"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-bloom-500/20 focus:border-bloom-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('auth.password', 'Password')}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-bloom-500/20 focus:border-bloom-500 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-bloom-500 to-bloom-600 hover:from-bloom-600 hover:to-bloom-700 text-white font-bold text-sm shadow-md shadow-bloom-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <span>{loading ? 'Signing in...' : t('auth.login', 'Sign In')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Sister Demo Profiles */}
          <div className="pt-4 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Instant Sister Demo Profiles:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('sister-1-ananya')}
                className="p-2 rounded-xl bg-bloom-50/80 hover:bg-bloom-100 border border-bloom-200 text-center transition-colors"
              >
                <span className="font-bold text-xs text-bloom-950 block">Ananya</span>
                <span className="text-[10px] text-bloom-700">Week 24 (T2)</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('sister-2-priya')}
                className="p-2 rounded-xl bg-lavender-50/80 hover:bg-lavender-100 border border-lavender-200 text-center transition-colors"
              >
                <span className="font-bold text-xs text-lavender-950 block">Priya</span>
                <span className="text-[10px] text-lavender-700">Week 10 (T1)</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('sister-3-meera')}
                className="p-2 rounded-xl bg-rose-50/80 hover:bg-rose-100 border border-rose-200 text-center transition-colors"
              >
                <span className="font-bold text-xs text-rose-950 block">Meera</span>
                <span className="text-[10px] text-rose-700">Week 34 (T3)</span>
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500">
            <Link to="/signup" className="text-bloom-600 font-semibold hover:underline">
              {t('auth.noAccount', "Don't have an account? Sign up")}
            </Link>
          </div>
        </div>
      </div>

      {/* Voice Assistant Modal */}
      <VoiceAssistantModal isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />
    </div>
  ))}</LocalizedCopy>;
};

