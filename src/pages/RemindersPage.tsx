import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import {
  BellRing,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Pill,
  Droplet,
  Heart,
  Calendar
} from 'lucide-react';
import { LocalizedCopy } from '../components/LocalizedCopy';

export const RemindersPage: React.FC = () => {
  const { t } = useTranslation();
  const { reminders, addReminder, toggleReminder, deleteReminder } = useApp();

  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reminderType, setReminderType] = useState<'medication' | 'hydration' | 'appointment' | 'wellness'>('medication');
  const [reminderTime, setReminderTime] = useState('09:00');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addReminder({
      title: title.trim(),
      description: description.trim() || undefined,
      reminderType,
      reminderTime,
      isRecurring: true,
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
      isActive: true,
    });

    setIsAdding(false);
    setTitle('');
    setDescription('');
    setReminderTime('09:00');
  };

  return <LocalizedCopy>{((
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            {t('nav.reminders')}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Personalized prenatal vitamin schedules, hydration goals, and doctor visit reminders
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-bloom-500 hover:bg-bloom-600 text-white font-bold text-xs shadow-md shadow-bloom-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? 'Cancel' : 'Add Reminder'}</span>
        </button>
      </div>

      {/* Add Reminder Form */}
      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-3xl bg-white border border-bloom-200 shadow-elevated space-y-4"
        >
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <BellRing className="w-4 h-4 text-bloom-600" />
            <span>Create In-App Reminder</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Title:</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Folic Acid 5mg with breakfast"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category:</label>
              <select
                value={reminderType}
                onChange={(e) => setReminderType(e.target.value as any)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white"
              >
                <option value="medication">Clinician-Prescribed Medication / Supplement</option>
                <option value="hydration">Hydration / Tender Coconut Water</option>
                <option value="appointment">Antenatal Appointment Reminder</option>
                <option value="wellness">Daily Wellness / Fetal Kick Count</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Time:</label>
              <input
                type="time"
                required
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Description / Notes:</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Take with warm water after breakfast"
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
              Save Reminder
            </button>
          </div>
        </form>
      )}

      {/* Reminders List */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">Active & Daily Reminders</h3>

        {reminders.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-8">
            No reminders configured. Add your daily prenatal vitamins or hydration goals.
          </p>
        ) : (
          <div className="space-y-3">
            {reminders.map((rem) => (
              <div
                key={rem.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                  rem.isActive
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-slate-100/60 border-slate-100 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleReminder(rem.id)}
                    className={`w-6 h-6 rounded-xl border flex items-center justify-center transition-colors ${
                      rem.isActive
                        ? 'bg-bloom-500 border-bloom-600 text-white'
                        : 'bg-white border-slate-300'
                    }`}
                  >
                    {rem.isActive && <CheckCircle2 className="w-4 h-4" />}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{rem.title}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full capitalize bg-cream-200 text-amber-900">
                        {rem.reminderType}
                      </span>
                    </div>
                    {rem.description && (
                      <p className="text-xs text-slate-500 mt-0.5">{rem.description}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-extrabold text-bloom-600 px-2.5 py-1 rounded-xl bg-bloom-50 border border-bloom-100">
                    {rem.reminderTime}
                  </span>
                  <button
                    onClick={() => deleteReminder(rem.id)}
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
    </div>
  ))}</LocalizedCopy>;
};
