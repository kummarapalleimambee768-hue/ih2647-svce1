import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { getWeekMilestone, PREGNANCY_WEEKS_DATA } from '../data/pregnancyMilestones';
import {
  Baby,
  Calendar,
  Sparkles,
  AlertTriangle,
  Apple,
  Activity,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { LocalizedCopy } from '../components/LocalizedCopy';

export const PregnancyTimelinePage: React.FC = () => {
  const { currentPregnancy } = useApp();
  const defaultWeek = currentPregnancy?.currentWeek || 12;
  const [selectedWeek, setSelectedWeek] = useState(defaultWeek);

  const milestone = getWeekMilestone(selectedWeek);

  const trimesterTabs = [
    { num: 1, label: 'Trimester 1 (W 1–13)', range: [4, 8, 12] },
    { num: 2, label: 'Trimester 2 (W 14–27)', range: [16, 20, 24] },
    { num: 3, label: 'Trimester 3 (W 28–40)', range: [28, 32, 36, 40] },
  ];

  return <LocalizedCopy>{((
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Week-by-Week Pregnancy Guidance
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Clinically reviewed fetal development & maternal wellness guidance (ACOG & WHO)
          </p>
        </div>

        {/* Current week reminder badge */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedWeek(defaultWeek)}
            className="px-3.5 py-1.5 rounded-full bg-bloom-100 text-bloom-700 text-xs font-bold border border-bloom-200 hover:bg-bloom-200 transition-colors"
          >
            Jump to My Week ({defaultWeek})
          </button>
        </div>
      </div>

      {/* Week Selector Ribbon */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-soft">
        <div className="flex items-center justify-between mb-3 px-2">
          <button
            onClick={() => setSelectedWeek((prev) => Math.max(4, prev - 1))}
            disabled={selectedWeek <= 4}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-bold text-slate-800">
            Selected: <span className="text-bloom-600 font-extrabold text-base">Week {selectedWeek}</span> •{' '}
            Trimester {milestone.trimester}
          </span>
          <button
            onClick={() => setSelectedWeek((prev) => Math.min(40, prev + 1))}
            disabled={selectedWeek >= 40}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 disabled:opacity-30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Week Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {[4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40].map((w) => {
            const isCurrent = w === selectedWeek;
            const isUserWeek = w === defaultWeek;
            return (
              <button
                key={w}
                onClick={() => setSelectedWeek(w)}
                className={`flex-shrink-0 w-11 h-11 rounded-2xl flex flex-col items-center justify-center text-xs font-bold transition-all ${
                  isCurrent
                    ? 'bg-bloom-500 text-white shadow-md shadow-bloom-500/30 scale-105'
                    : isUserWeek
                    ? 'bg-bloom-100 text-bloom-700 border-2 border-bloom-400'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="text-[10px] leading-none opacity-80">W</span>
                <span className="text-sm font-extrabold">{w}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Week Guidance Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Fetal Development & Maternal Symptoms */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <span className="text-5xl">{milestone.babyFruitIcon}</span>
                <div>
                  <span className="text-xs font-bold text-bloom-600 uppercase tracking-wider">
                    Week {selectedWeek} • Trimester {milestone.trimester}
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">
                    Baby is the size of a {milestone.babyFruitComparison}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-cream-100 p-3 rounded-2xl border border-cream-200">
                <div className="text-center px-2">
                  <span className="text-xs text-slate-500">Approx Length</span>
                  <p className="text-sm font-extrabold text-slate-900">{milestone.lengthCm} cm</p>
                </div>
                <div className="h-6 w-px bg-slate-300" />
                <div className="text-center px-2">
                  <span className="text-xs text-slate-500">Approx Weight</span>
                  <p className="text-sm font-extrabold text-slate-900">{milestone.weightGrams} g</p>
                </div>
              </div>
            </div>

            {/* Development Highlights */}
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Baby className="w-4 h-4 text-bloom-600" />
                  <span>Key Fetal Anatomical Milestones</span>
                </h3>
                <ul className="space-y-2">
                  {milestone.babyMilestones.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-lavender-600" />
                  <span>Common Maternal Changes & Symptoms</span>
                </h3>
                <ul className="space-y-2">
                  {milestone.momBodyChanges.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-lavender-500 flex-shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Nutrition & Safe Exercise Focus */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-rose-50/70 border border-rose-100 space-y-2">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
                <Apple className="w-4 h-4 text-bloom-600" />
                <span>Trimester Nutrition Guidance</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">{milestone.nutritionFocus}</p>
            </div>

            <div className="p-5 rounded-3xl bg-sage-50/70 border border-sage-100 space-y-2">
              <div className="flex items-center gap-2 text-sage-800 font-bold text-xs uppercase tracking-wider">
                <Activity className="w-4 h-4 text-sage-700" />
                <span>Safe Movement Suggestion</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">{milestone.exerciseTip}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Tests & Red Flag Warning Signs */}
        <div className="space-y-6">
          {/* Recommended Clinical Tests */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-blue-600" />
              <span>Recommended Antenatal Tests</span>
            </h3>
            <ul className="space-y-2">
              {milestone.upcomingClinicalTests.map((tst, i) => (
                <li key={i} className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-blue-950 font-medium">
                  {tst}
                </li>
              ))}
            </ul>
          </div>

          {/* Red Flag Warning Signs */}
          <div className="p-6 rounded-3xl bg-red-50/80 border border-red-200 shadow-soft space-y-3">
            <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>When to Seek Immediate Care</span>
            </div>
            <p className="text-xs text-red-800 leading-relaxed">
              Contact your obstetrician or maternity emergency triage room immediately if you notice:
            </p>
            <ul className="space-y-1.5 text-xs text-red-900 list-disc list-inside">
              {milestone.redFlagWarnings.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>

          {/* Reference Citation */}
          <div className="p-4 rounded-2xl bg-cream-100/70 border border-cream-200 text-center">
            <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-bloom-600" />
              <span>Reviewed against WHO & ACOG Guidelines for Prenatal Care</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  ))}</LocalizedCopy>;
};
