import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { Heart, Mail, Lock, User, ArrowRight } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signup } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const res = await signup(fullName, email, password);
      if (res.success) {
        navigate('/onboarding');
      } else {
        setError(res.error || 'Failed to create account.');
      }
    } catch (err: any) {
      setError(err?.message || 'Error creating account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-bloom-50/50 via-[#FFFDF9] to-lavender-50/40 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-bloom-500 to-lavender-500 flex items-center justify-center text-white shadow-md shadow-bloom-500/25 group-hover:scale-105 transition-transform">
            <Heart className="w-6 h-6 fill-white/30" />
          </div>
        </Link>
        <h2 className="text-3xl font-extrabold text-slate-900 font-display">
          Create Your Profile
        </h2>
        <p className="mt-2 text-xs text-slate-500">
          Begin your personalized, supportive pregnancy journey
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/90 backdrop-blur-md py-8 px-6 sm:px-10 shadow-elevated rounded-3xl border border-bloom-100">
          {error && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('auth.fullName')}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Shalini Roy"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-bloom-500/20 focus:border-bloom-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('auth.email')}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. shalini@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-bloom-500/20 focus:border-bloom-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('auth.password')}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-bloom-500/20 focus:border-bloom-500 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-bloom-500 to-bloom-600 hover:from-bloom-600 hover:to-bloom-700 text-white font-bold text-sm shadow-md shadow-bloom-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <span>{loading ? 'Creating...' : 'Continue to Onboarding'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            <Link to="/login" className="text-bloom-600 font-semibold hover:underline">
              {t('auth.hasAccount')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
