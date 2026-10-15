import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import {
  Activity,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  AlertCircle,
  HelpCircle,
  Flame,
  ShieldAlert
} from 'lucide-react';
import { EmergencyModal } from '../components/EmergencyModal';

const COMMON_SYMPTOMS = [
  'Morning Nausea',
  'Fatigue / Exhaustion',
  'Heartburn / Acid Reflux',
  'Lower Back Pain',
  'Braxton Hicks Contractions',
  'Leg Cramps (Calf)',
  'Swollen Feet / Ankles',
  'Frequent Urination',
  'Breast Tenderness',
  'Constipation',
  'Headache',
  'Insomnia / Sleep Disturbance',
];

const RED_FLAG_SYMPTOMS = [
  'Heavy vaginal bleeding',
  'Severe continuous abdominal pain',
  'Continuous leaking of fluid',
  'Sudden severe swelling of face or hands',
  'Severe headache with blurred vision / spots',
  'Significant decrease or absence of baby movement',
];

export const SymptomTrackerPage: React.FC = () => {
  const { t } = useTranslation();
  const { currentPregnancy, symptoms, addSymptom, deleteSymptom } = useApp();

  const [isAdding, setIsAdding] = useState(false);
  const [symptomName, setSymptomName] = useState('Morning Nausea');
  const [customSymptom, setCustomSymptom] = useState('');
  const [severity, setSeverity] = useState<'mild' | 'moderate' | 'severe'>('mild');
  const [frequency, setFrequency] = useState('Daily in morning');
  const [notes, setNotes] = useState('');
  const [triggers, setTriggers] = useState('');
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [alertWarning, setAlertWarning] = useState<string | null>(null);

  const currentWeek = currentPregnancy?.currentWeek || 12;

  const handleSelectSymptom = (name: string) => {
    setSymptomName(name);
    // Check if red flag
    if (RED_FLAG_SYMPTOMS.includes(name)) {
      setAlertWarning('⚠️ This is a potential red-flag symptom that may require immediate clinical evaluation.');
    } else {
      setAlertWarning(null);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = customSymptom.trim() || symptomName;
    const isRedFlag = RED_FLAG_SYMPTOMS.includes(finalName) || severity === 'severe';

    addSymptom({
      pregnancyWeek: currentWeek,
      symptomName: finalName,
      severity,
      frequency,
      notes,
      triggers,
      isRedFlagAlert: isRedFlag,
    });

    if (isRedFlag) {
      setEmergencyModalOpen(true);
    }

    setIsAdding(false);
    setCustomSymptom('');
    setNotes('');
    setTriggers('');
    setAlertWarning(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            {t('nav.symptoms')}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Log physical sensations, frequency, triggers, and review clinical safety flags
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-bloom-500 hover:bg-bloom-600 text-white font-bold text-xs shadow-md shadow-bloom-500/20 transition-all transform hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? 'Cancel' : 'Log New Symptom'}</span>
        </button>
      </div>

      {/* Add Symptom Form Modal/Box */}
      {isAdding && (
        <form
          onSubmit={handleAddSubmit}
          className="p-6 rounded-3xl bg-white border border-bloom-200 shadow-elevated space-y-4"
        >
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Activity className="w-4 h-4 text-bloom-600" />
            <span>Record Symptom for Week {currentWeek}</span>
          </h3>

          {alertWarning && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-900 font-semibold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{alertWarning}</span>
              </div>
              <button
                type="button"
                onClick={() => setEmergencyModalOpen(true)}
                className="px-2.5 py-1 rounded-xl bg-red-600 text-white text-[11px] font-bold"
              >
                Emergency Advice
              </button>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Select Common Symptom:
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {COMMON_SYMPTOMS.map((sym) => (
                <button
                  key={sym}
                  type="button"
                  onClick={() => handleSelectSymptom(sym)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                    symptomName === sym && !customSymptom
                      ? 'bg-bloom-500 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {sym}
                </button>
              ))}
            </div>

            <div className="mt-2">
              <input
                type="text"
                value={customSymptom}
                onChange={(e) => setCustomSymptom(e.target.value)}
                placeholder="Or type a custom symptom description..."
                className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Severity Level:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['mild', 'moderate', 'severe'] as const).map((sev) => (
                  <button
                    key={sev}
                    type="button"
                    onClick={() => setSeverity(sev)}
                    className={`py-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                      severity === sev
                        ? sev === 'severe'
                          ? 'bg-red-500 text-white border-red-600 shadow-sm'
                          : sev === 'moderate'
                          ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                          : 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Frequency / Timing:
              </label>
              <input
                type="text"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                placeholder="e.g. Morning after waking up, 3 times daily"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Potential Triggers (Optional):
              </label>
              <input
                type="text"
                value={triggers}
                onChange={(e) => setTriggers(e.target.value)}
                placeholder="e.g. Spicy food, long standing, missed lunch"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Personal Notes & Relief Measures:
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Sips of lemon water helped relieve nausea"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-bloom-500 hover:bg-bloom-600 text-white text-xs font-bold shadow-md shadow-bloom-500/20"
            >
              Save Symptom Entry
            </button>
          </div>
        </form>
      )}

      {/* Symptoms History List */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">Symptom Log History</h3>

        {symptoms.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-8">
            No symptoms recorded yet. Track your daily physical well-being using the button above.
          </p>
        ) : (
          <div className="space-y-3">
            {symptoms.map((sym) => (
              <div
                key={sym.id}
                className={`p-4 rounded-2xl border transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  sym.isRedFlagAlert
                    ? 'bg-red-50/70 border-red-200'
                    : 'bg-slate-50/80 border-slate-200/80'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{sym.symptomName}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                        sym.severity === 'severe'
                          ? 'bg-red-100 text-red-800'
                          : sym.severity === 'moderate'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {sym.severity}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 font-semibold">
                      Week {sym.pregnancyWeek}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">
                    {sym.frequency && <span className="font-medium">{sym.frequency} • </span>}
                    {sym.notes}
                  </p>

                  {sym.triggers && (
                    <p className="text-[11px] text-slate-500 italic">Triggers: {sym.triggers}</p>
                  )}
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <span className="text-[10px] text-slate-400">
                    {new Date(sym.recordedAt).toLocaleDateString([], {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>

                  <button
                    onClick={() => deleteSymptom(sym.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <EmergencyModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
      />
    </div>
  );
};
