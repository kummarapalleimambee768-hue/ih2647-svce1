import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import {
  ClipboardList,
  Plus,
  Trash2,
  FolderLock,
  Heart,
  ShieldCheck,
  Calendar,
  Filter,
  FileText,
  AlertCircle
} from 'lucide-react';
import { LocalizedCopy } from '../components/LocalizedCopy';

export const MedicalHistoryPage: React.FC = () => {
  const { t } = useTranslation();
  const {
    currentUser,
    currentPregnancy,
    medicalHistory,
    addMedicalHistory,
    deleteMedicalHistory,
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isAdding, setIsAdding] = useState(false);
  const [category, setCategory] = useState<'condition' | 'allergy' | 'surgery' | 'family_history' | 'previous_pregnancy'>('condition');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [diagnosedDate, setDiagnosedDate] = useState('');
  const [clinicianNotes, setClinicianNotes] = useState('');

  const filteredHistory = medicalHistory.filter((item) =>
    categoryFilter === 'all' ? true : item.category === categoryFilter
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addMedicalHistory({
      category,
      title: title.trim(),
      details: details.trim() || undefined,
      diagnosedDate: diagnosedDate || undefined,
      clinicianNotes: clinicianNotes.trim() || undefined,
    });

    setIsAdding(false);
    setTitle('');
    setDetails('');
    setDiagnosedDate('');
    setClinicianNotes('');
  };

  return <LocalizedCopy>{((
    <div className="space-y-6 animate-fadeIn">
      {/* Title & Quick Link to Documents */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            {t('nav.medicalHistory')}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Private clinical background, allergies, prior pregnancies, and clinician consultations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/medical-history/documents"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-md transition-all"
          >
            <FolderLock className="w-4 h-4" />
            <span>Private Document Vault</span>
          </Link>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-bloom-500 hover:bg-bloom-600 text-white font-bold text-xs shadow-md shadow-bloom-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{isAdding ? 'Cancel' : 'Add Entry'}</span>
          </button>
        </div>
      </div>

      {/* Maternal Clinical Profile Overview Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft">
        <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-bloom-600" />
          <span>Mother's Verified Clinical Profile</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[10px]">Blood Group</span>
            <span className="font-extrabold text-slate-900 text-base">{currentUser?.bloodGroup || 'B+'}</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[10px]">Gestational Age</span>
            <span className="font-extrabold text-bloom-600 text-base">Week {currentPregnancy?.currentWeek || 12}</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[10px]">Active Allergies</span>
            <span className="font-bold text-slate-800">
              {currentUser?.allergies && currentUser.allergies.length > 0
                ? currentUser.allergies.join(', ')
                : 'None known'}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[10px]">Known Conditions</span>
            <span className="font-bold text-slate-800">
              {currentUser?.existingConditions && currentUser.existingConditions.length > 0
                ? currentUser.existingConditions.join(', ')
                : 'None reported'}
            </span>
          </div>
        </div>
      </div>

      {/* Add Entry Form */}
      {isAdding && (
        <form
          onSubmit={handleAddSubmit}
          className="p-6 rounded-3xl bg-white border border-bloom-200 shadow-elevated space-y-4"
        >
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Plus className="w-4 h-4 text-bloom-600" />
            <span>Add Medical History Record</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Category:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white"
              >
                <option value="condition">Medical Condition</option>
                <option value="allergy">Allergy</option>
                <option value="surgery">Previous Surgery / Procedure</option>
                <option value="family_history">Family Medical History</option>
                <option value="previous_pregnancy">Previous Pregnancy History</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Title:
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Subclinical Hypothyroidism, Penicillin Allergy"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Diagnosed Date / Approximate Year:
              </label>
              <input
                type="date"
                value={diagnosedDate}
                onChange={(e) => setDiagnosedDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Doctor's Recommendation / Notes:
              </label>
              <input
                type="text"
                value={clinicianNotes}
                onChange={(e) => setClinicianNotes(e.target.value)}
                placeholder="e.g. Advised monthly TSH blood check"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Clinical Details:
            </label>
            <textarea
              rows={2}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="e.g. Managed well on 25mcg fasting levothyroxine since initial pregnancy confirmation."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
            />
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
              Save Record
            </button>
          </div>
        </form>
      )}

      {/* History List */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-bloom-600" />
            <span>Recorded Medical History</span>
          </h3>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {['all', 'condition', 'allergy', 'previous_pregnancy', 'surgery', 'family_history'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition-all ${
                  categoryFilter === cat
                    ? 'bg-bloom-500 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {filteredHistory.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-8">
            No medical history entries under this filter.
          </p>
        ) : (
          <div className="space-y-3">
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 hover:bg-slate-100/60 transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{item.title}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full capitalize bg-cream-200 text-amber-900">
                      {item.category.replace('_', ' ')}
                    </span>
                    {item.diagnosedDate && (
                      <span className="text-[10px] text-slate-400">
                        Date: {item.diagnosedDate}
                      </span>
                    )}
                  </div>

                  {item.details && <p className="text-xs text-slate-600">{item.details}</p>}

                  {item.clinicianNotes && (
                    <p className="text-[11px] text-bloom-700 font-medium bg-bloom-50/70 p-2 rounded-xl border border-bloom-100">
                      Doctor's Note: {item.clinicianNotes}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => deleteMedicalHistory(item.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors self-end sm:self-start"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  ))}</LocalizedCopy>;
};
