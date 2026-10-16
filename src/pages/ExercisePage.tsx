import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FOUR_SAFE_EXERCISES,
  SAFETY_TIPS,
  PregnancyExercise,
  SafetyTip,
} from '../data/exerciseRoutines';
import { triggerFileDownload } from '../services/voiceAssistant';
import {
  Dumbbell,
  Clock,
  Heart,
  CheckCircle2,
  AlertTriangle,
  Download,
  Info,
  ChevronRight,
  Sparkles,
  ShieldAlert,
  Mic,
  Droplet,
  Sun,
  Ear,
  X
} from 'lucide-react';
import { VoiceAssistantModal } from '../components/VoiceAssistantModal';
import { LocalizedCopy } from '../components/LocalizedCopy';

export const ExercisePage: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const trimesterParam = searchParams.get('trimester');

  const [selectedTrimester, setSelectedTrimester] = useState<number | 'all'>(() => {
    if (trimesterParam === '1') return 1;
    if (trimesterParam === '2') return 2;
    if (trimesterParam === '3') return 3;
    return 'all';
  });

  const [activeModalExercise, setActiveModalExercise] = useState<PregnancyExercise | null>(null);
  const [activeModalSafetyTip, setActiveModalSafetyTip] = useState<SafetyTip | null>(null);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [downloadToast, setDownloadToast] = useState(false);

  // Sync state if query param changes
  useEffect(() => {
    if (trimesterParam === '1') setSelectedTrimester(1);
    else if (trimesterParam === '2') setSelectedTrimester(2);
    else if (trimesterParam === '3') setSelectedTrimester(3);
  }, [trimesterParam]);

  const handleTrimesterChange = (trimester: number | 'all') => {
    setSelectedTrimester(trimester);
    if (trimester === 'all') {
      searchParams.delete('trimester');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ trimester: trimester.toString() });
    }
  };

  const handleDownload = () => {
    triggerFileDownload();
    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 2500);
  };

  const filteredExercises = FOUR_SAFE_EXERCISES.filter((ex) =>
    selectedTrimester === 'all'
      ? true
      : ex.trimesterApplicability.includes(selectedTrimester as 1 | 2 | 3)
  );

  return <LocalizedCopy>{((
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bloom-100 text-bloom-700 text-xs font-semibold mb-2">
            <Heart className="w-3.5 h-3.5 fill-bloom-500" />
            <span>Maternal Physical Activity Guidelines (ACOG & WHO)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            {t('exercise.title', 'Safe Exercises for Pregnancy')}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            {t('exercise.subtitle', 'Evidence-based low-impact movement designed to protect maternal joints and support healthy fetal development.')}
          </p>
        </div>

        {/* Action Buttons: Voice and Download */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <button
            onClick={() => setVoiceModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-bloom-200 hover:border-bloom-400 text-slate-800 text-xs font-bold shadow-soft transition-all hover:scale-105"
            title="Use Voice Commands"
          >
            <Mic className="w-4 h-4 text-bloom-600 animate-pulse" />
            <span className="hidden sm:inline">{t('voice.title', 'Voice Assistant')}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-bloom-500 to-bloom-600 hover:from-bloom-600 hover:to-bloom-700 text-white text-xs font-bold shadow-md shadow-bloom-500/20 transition-all hover:scale-105 active:scale-95"
            title="Download formatted guide"
          >
            <Download className="w-4 h-4" />
            <span>{t('exercise.downloadGuide', 'Download Guide')}</span>
          </button>
        </div>
      </div>

      {downloadToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Exercise Guide downloaded successfully! Check your downloads folder.</span>
        </div>
      )}

      {/* Trimester Filters */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-soft flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-2">
          {t('exercise.filterByStage', 'Filter by Stage:')}
        </span>
        <div className="flex items-center gap-2">
          {[
            { id: 'all', label: t('exercise.filterAll', 'All Trimesters') },
            { id: 1, label: t('exercise.filterT1', 'First Trimester (W 1–13)') },
            { id: 2, label: t('exercise.filterT2', 'Second Trimester (W 14–27)') },
            { id: 3, label: t('exercise.filterT3', 'Third Trimester (W 28–40)') },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTrimesterChange(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedTrimester === tab.id
                  ? 'bg-bloom-500 text-white shadow-sm shadow-bloom-500/25 scale-[1.02]'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/70'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* The 4 Core Exercises Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredExercises.map((exercise) => (
          <div
            key={exercise.id}
            className="p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-bloom-300 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Top Info Ribbon */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2.5 rounded-2xl bg-cream-100 border border-cream-200">
                    {exercise.icon}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-bloom-600 transition-colors font-display">
                      {exercise.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-bloom-700 font-extrabold mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{exercise.recommendedDuration}</span>
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                  T1 • T2 • T3
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {exercise.shortSummary}
              </p>

              {/* Benefits Checklist */}
              <div className="pt-2">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Proven Benefits:
                </p>
                <ul className="space-y-1.5">
                  {exercise.benefits.slice(0, 3).map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Learn More Button */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Safe for daily practice
              </span>
              <button
                type="button"
                onClick={() => setActiveModalExercise(exercise)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-bloom-50 text-slate-800 hover:text-bloom-700 text-xs font-bold flex items-center gap-1.5 transition-colors group-hover:bg-bloom-500 group-hover:text-white"
              >
                <span>Learn More</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Core Safety Tips Section */}
      <div className="pt-4">
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-bloom-600" />
            <h2 className="text-2xl font-bold text-slate-900 font-display">
              {t('exercise.safetyTipsTitle', 'Critical Pregnancy Safety Tips')}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t('exercise.safetyTipsSubtitle', 'Always adhere to these three core safety guidelines before, during, and after any movement.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAFETY_TIPS.map((tip) => (
            <div
              key={tip.id}
              className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 rounded-2xl bg-cream-100">
                    {tip.icon}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base font-display">
                    {tip.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {tip.shortDescription}
                </p>
                <ul className="space-y-2 pt-2 border-t border-slate-100">
                  {tip.detailedPoints.slice(0, 2).map((point, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-bloom-500 flex-shrink-0 mt-1.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-right">
                <button
                  type="button"
                  onClick={() => setActiveModalSafetyTip(tip)}
                  className="text-xs font-bold text-bloom-600 hover:text-bloom-700 underline"
                >
                  Read Full Protocol
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stop Immediately Warning Banner */}
      <div className="p-6 rounded-3xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-rose-950 text-sm">When to Stop Exercise Immediately:</h4>
            <p className="text-xs text-rose-900 mt-1 leading-relaxed">
              If you experience vaginal bleeding, fluid leakage, dizziness, chest pain, calf swelling, or regular painful contractions, cease activity right away and contact your obstetrician.
            </p>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="px-4 py-2 rounded-xl bg-white border border-rose-300 text-rose-800 text-xs font-bold hover:bg-rose-100 transition-colors flex-shrink-0 flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Save Guide (TXT)</span>
        </button>
      </div>

      {/* Learn More Interactive Modal for Selected Exercise */}
      {activeModalExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-bloom-100 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 rounded-2xl bg-cream-100">{activeModalExercise.icon}</span>
                <div>
                  <span className="text-xs font-bold text-bloom-600 uppercase tracking-wider">
                    Recommended: {activeModalExercise.recommendedDuration}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                    {activeModalExercise.name}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveModalExercise(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {activeModalExercise.shortSummary}
            </p>

            {/* How to Perform Step-by-Step */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Step-by-Step Instructions:
              </h4>
              <ol className="space-y-1.5 list-decimal list-inside text-xs text-slate-700">
                {activeModalExercise.howToPerform.map((step, idx) => (
                  <li key={idx} className="leading-relaxed">{step}</li>
                ))}
              </ol>
            </div>

            {/* Trimester-by-Trimester Adaptations */}
            <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Trimester Adaptations:
              </h4>
              <div className="text-xs text-slate-700 space-y-1">
                <p><strong>Trimester 1:</strong> {activeModalExercise.trimesterGuidance.firstTrimester}</p>
                <p><strong>Trimester 2:</strong> {activeModalExercise.trimesterGuidance.secondTrimester}</p>
                <p><strong>Trimester 3:</strong> {activeModalExercise.trimesterGuidance.thirdTrimester}</p>
              </div>
            </div>

            {/* Safety Precautions */}
            <div>
              <h4 className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-1.5">
                Important Safety Precautions:
              </h4>
              <ul className="space-y-1 list-disc list-inside text-xs text-slate-700">
                {activeModalExercise.safetyPrecautions.map((caution, idx) => (
                  <li key={idx}>{caution}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handleDownload}
                className="text-xs font-bold text-bloom-600 hover:underline flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Complete Guide</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModalExercise(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold"
              >
                Close Guidance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Safety Tip Full Modal */}
      {activeModalSafetyTip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{activeModalSafetyTip.icon}</span>
                <h3 className="font-bold text-slate-900 text-lg font-display">
                  {activeModalSafetyTip.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalSafetyTip(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">{activeModalSafetyTip.shortDescription}</p>

            <ul className="space-y-2 text-xs text-slate-700 list-disc list-inside bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {activeModalSafetyTip.detailedPoints.map((point, i) => (
                <li key={i} className="leading-relaxed">{point}</li>
              ))}
            </ul>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveModalSafetyTip(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
      />
    </div>
  ))}</LocalizedCopy>;
};
