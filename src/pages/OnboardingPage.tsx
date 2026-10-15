import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { calculateFromLMP, calculateFromEDD } from '../utils/pregnancyCalculations';
import { LanguageSelector } from '../components/LanguageSelector';
import {
  Heart,
  Calendar,
  Sparkles,
  Baby,
  ShieldCheck,
  ArrowRight,
  Info,
  Clock,
  Apple,
  AlertCircle
} from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentUser, saveOnboarding } = useApp();

  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [calculationMethod, setCalculationMethod] = useState<'lmp' | 'edd'>('lmp');
  const [lmpDate, setLmpDate] = useState('2026-07-20');
  const [eddDate, setEddDate] = useState('2027-04-26');
  const [pregnancyType, setPregnancyType] = useState<'singleton' | 'twins' | 'triplets'>('singleton');
  const [dietaryPreferences, setDietaryPreferences] = useState<'vegetarian' | 'non-vegetarian' | 'vegan' | 'satvik'>('vegetarian');
  const [preferredLanguage, setPreferredLanguage] = useState<'en' | 'te' | 'hi' | 'ta' | 'kn'>('en');
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [allergiesInput, setAllergiesInput] = useState('');
  const [conditionsInput, setConditionsInput] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');

  // Live calculation preview
  const previewResult =
    calculationMethod === 'lmp' && lmpDate
      ? calculateFromLMP(lmpDate)
      : calculationMethod === 'edd' && eddDate
      ? calculateFromEDD(eddDate)
      : calculateFromLMP(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const allergies = allergiesInput
      ? allergiesInput.split(',').map((s) => s.trim()).filter(Boolean)
      : [];
    const conditions = conditionsInput
      ? conditionsInput.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    saveOnboarding({
      fullName: fullName || 'Beloved Mom',
      lmpDate: calculationMethod === 'lmp' ? lmpDate : undefined,
      eddDate: calculationMethod === 'edd' ? eddDate : previewResult.estimatedDueDate,
      pregnancyType,
      dietaryPreferences,
      bloodGroup,
      allergies,
      existingConditions: conditions,
      preferredLanguage,
      emergencyName,
      emergencyPhone,
    });

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 via-white to-bloom-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bloom-100 text-bloom-700 text-xs font-semibold mb-3">
            <Heart className="w-3.5 h-3.5 fill-bloom-500" />
            <span>Maternal Health Profile Setup</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            {t('onboarding.title')}
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-lg mx-auto">
            {t('onboarding.subtitle')}
          </p>
        </div>

        {/* Live Calculation Preview Card */}
        <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-bloom-500 via-rose-500 to-lavender-600 text-white shadow-elevated">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-semibold tracking-wider text-bloom-100 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Live Gestational Age Calculation (Naegele's Rule)
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold mt-1">
                Week {previewResult.currentWeek} • Trimester {previewResult.currentTrimester}
              </h3>
              <p className="text-xs text-white/90 mt-1">
                Estimated Due Date: <span className="font-bold underline">{previewResult.estimatedDueDate}</span> •{' '}
                {previewResult.daysRemaining} days remaining
              </p>
            </div>
            <div className="text-center px-4 py-2 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20">
              <span className="text-2xl font-bold">{previewResult.progressPercentage}%</span>
              <p className="text-[10px] text-white/80">Journey Progress</p>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-white/70 italic flex items-center gap-1">
            <Info className="w-3.5 h-3.5" />
            <span>This is a supportive clinical estimate. You can adjust your EDD with your doctor's official scan results anytime.</span>
          </div>
        </div>

        {/* Main Onboarding Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200/80 space-y-6">
          {/* Section 1: Basic Info */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Baby className="w-5 h-5 text-bloom-500" />
              <span>1. Mother's Basic Information</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ananya Sharma"
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-bloom-500/20 focus:border-bloom-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Blood Group (if known)</label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-bloom-500/20 focus:border-bloom-500 bg-white"
                >
                  {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'Not Known Yet'].map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Pregnancy Dates */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-lavender-600" />
                <span>2. Gestational Dates</span>
              </h3>
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setCalculationMethod('lmp')}
                  className={`px-3 py-1 rounded-xl font-semibold transition-all ${
                    calculationMethod === 'lmp'
                      ? 'bg-bloom-100 text-bloom-700 border border-bloom-300'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  By LMP Date
                </button>
                <button
                  type="button"
                  onClick={() => setCalculationMethod('edd')}
                  className={`px-3 py-1 rounded-xl font-semibold transition-all ${
                    calculationMethod === 'edd'
                      ? 'bg-lavender-100 text-lavender-700 border border-lavender-300'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  By Clinician EDD
                </button>
              </div>
            </div>

            {calculationMethod === 'lmp' ? (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('onboarding.lmpLabel')}
                </label>
                <input
                  type="date"
                  required
                  value={lmpDate}
                  onChange={(e) => setLmpDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-bloom-500/20 focus:border-bloom-500"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('onboarding.eddLabel')}
                </label>
                <input
                  type="date"
                  required
                  value={eddDate}
                  onChange={(e) => setEddDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-bloom-500/20 focus:border-bloom-500"
                />
              </div>
            )}
          </div>

          {/* Section 3: Pregnancy Type & Dietary Preferences */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Apple className="w-5 h-5 text-sage-600" />
              <span>3. Dietary & Pregnancy Preferences</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('onboarding.pregnancyType')}
                </label>
                <select
                  value={pregnancyType}
                  onChange={(e) => setPregnancyType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm bg-white"
                >
                  <option value="singleton">{t('onboarding.singleton')}</option>
                  <option value="twins">{t('onboarding.twins')}</option>
                  <option value="triplets">{t('onboarding.triplets')}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('onboarding.dietaryPreference')}
                </label>
                <select
                  value={dietaryPreferences}
                  onChange={(e) => setDietaryPreferences(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm bg-white"
                >
                  <option value="vegetarian">{t('onboarding.veg')}</option>
                  <option value="non-vegetarian">{t('onboarding.nonVeg')}</option>
                  <option value="vegan">{t('onboarding.vegan')}</option>
                  <option value="satvik">Satvik / Jain Friendly</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Allergies & Existing Conditions */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('onboarding.conditions')}
              </label>
              <input
                type="text"
                value={conditionsInput}
                onChange={(e) => setConditionsInput(e.target.value)}
                placeholder="e.g. Hypothyroidism, Gestational Diabetes, Asthma (separate by commas)"
                className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('onboarding.allergies')}
              </label>
              <input
                type="text"
                value={allergiesInput}
                onChange={(e) => setAllergiesInput(e.target.value)}
                placeholder="e.g. Penicillin, Peanuts, Sulfa drugs (separate by commas)"
                className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm"
              />
            </div>
          </div>

          {/* Section 5: Language Selection */}
          <div className="pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 mb-2">
              {t('onboarding.language')}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { code: 'en', label: 'English', native: 'English' },
                { code: 'te', label: 'Telugu', native: 'తెలుగు' },
                { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
                { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
                { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
              ].map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setPreferredLanguage(lang.code as any)}
                  className={`p-2.5 rounded-2xl border text-center transition-all ${
                    preferredLanguage === lang.code
                      ? 'bg-bloom-50 border-bloom-500 text-bloom-900 font-bold shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-bloom-200'
                  }`}
                >
                  <div className="text-sm font-semibold">{lang.native}</div>
                  <div className="text-[10px] text-slate-500">{lang.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Section 6: Emergency Contact */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-red-500" />
              <span>4. Emergency Contact (Optional)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contact Name & Relationship</label>
                <input
                  type="text"
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                  placeholder="e.g. Rajesh Sharma (Spouse)"
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  placeholder="e.g. +91 98450 11223"
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-bloom-500 to-bloom-600 hover:from-bloom-600 hover:to-bloom-700 text-white font-bold text-base shadow-xl shadow-bloom-500/25 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-95"
            >
              <span>{t('onboarding.complete')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
