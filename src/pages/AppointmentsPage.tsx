import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import {
  Stethoscope,
  Plus,
  Trash2,
  Calendar,
  Clock,
  CheckCircle2,
  Hospital,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { LocalizedCopy } from '../components/LocalizedCopy';

export const AppointmentsPage: React.FC = () => {
  const { t } = useTranslation();
  const {
    currentPregnancy,
    appointments,
    addAppointment,
    toggleAppointmentComplete,
    deleteAppointment,
  } = useApp();

  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [appointmentType, setAppointmentType] = useState<'routine_checkup' | 'ultrasound' | 'blood_test' | 'glucose_screen'>('routine_checkup');
  const [doctorName, setDoctorName] = useState('');
  const [clinicOrHospital, setClinicOrHospital] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [gestationalWeek, setGestationalWeek] = useState(currentPregnancy?.currentWeek || 12);
  const [notes, setNotes] = useState('');
  const [questionsInput, setQuestionsInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const questions = questionsInput
      ? questionsInput.split('\n').map((q) => q.trim()).filter(Boolean)
      : [];

    addAppointment({
      title: title || 'Antenatal Checkup',
      appointmentType,
      doctorName: doctorName || 'Obstetrician',
      clinicOrHospital: clinicOrHospital || 'Maternity Clinic',
      appointmentDate: appointmentDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      gestationalWeek: Number(gestationalWeek),
      notes,
      questionsToAsk: questions,
      isCompleted: false,
    });

    setIsAdding(false);
    setTitle('');
    setDoctorName('');
    setClinicOrHospital('');
    setAppointmentDate('');
    setNotes('');
    setQuestionsInput('');
  };

  return <LocalizedCopy>{((
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            {t('nav.appointments')}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track antenatal checkups, ultrasound scans, and questions for your doctor
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-bloom-500 hover:bg-bloom-600 text-white font-bold text-xs shadow-md shadow-bloom-500/20 transition-all transform hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? 'Cancel' : 'Schedule Appointment'}</span>
        </button>
      </div>

      {/* Add Appointment Form */}
      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-3xl bg-white border border-bloom-200 shadow-elevated space-y-4"
        >
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-bloom-600" />
            <span>Add Antenatal Appointment</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Appointment Title:
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 24-Week Glucose Screen & Growth Check"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Appointment Type:
              </label>
              <select
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value as any)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white"
              >
                <option value="routine_checkup">Routine Antenatal Checkup</option>
                <option value="ultrasound">Ultrasound / Sonography Scan</option>
                <option value="blood_test">Blood / Urine Laboratory Test</option>
                <option value="glucose_screen">Glucose Tolerance Test (OGTT)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Doctor Name:
              </label>
              <input
                type="text"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                placeholder="e.g. Dr. Sunita Rao, MD"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Hospital / Clinic:
              </label>
              <input
                type="text"
                value={clinicOrHospital}
                onChange={(e) => setClinicOrHospital(e.target.value)}
                placeholder="e.g. Apollo Cradle Hospital"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Date & Time:
              </label>
              <input
                type="datetime-local"
                required
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Questions to Ask Doctor (one per line):
            </label>
            <textarea
              rows={3}
              value={questionsInput}
              onChange={(e) => setQuestionsInput(e.target.value)}
              placeholder="e.g.&#10;Is the baby's growth on track?&#10;Can I take calcium and iron at the same time?&#10;When should I start birth classes?"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Special Instructions / Notes:
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Fast for 8 hours prior to the test, bring previous ultrasound films"
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
              Save Appointment
            </button>
          </div>
        </form>
      )}

      {/* Appointments List */}
      <div className="space-y-4">
        {appointments.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 text-center shadow-soft">
            <p className="text-xs text-slate-500">No appointments scheduled.</p>
          </div>
        ) : (
          appointments.map((apt) => (
            <div
              key={apt.id}
              className={`p-6 rounded-3xl border transition-all ${
                apt.isCompleted
                  ? 'bg-slate-50 border-slate-200 opacity-70'
                  : 'bg-white border-slate-200/90 shadow-soft'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full capitalize ${
                        apt.appointmentType === 'ultrasound'
                          ? 'bg-purple-100 text-purple-800'
                          : apt.appointmentType === 'glucose_screen'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-bloom-100 text-bloom-800'
                      }`}
                    >
                      {apt.appointmentType.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      Week {apt.gestationalWeek}
                    </span>
                    {apt.isCompleted && (
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completed
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{apt.title}</h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <span className="flex items-center gap-1 font-semibold text-bloom-700">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(apt.appointmentDate).toLocaleString([], {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Stethoscope className="w-3.5 h-3.5 text-slate-400" />
                      {apt.doctorName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Hospital className="w-3.5 h-3.5 text-slate-400" />
                      {apt.clinicOrHospital}
                    </span>
                  </div>

                  {apt.notes && (
                    <p className="text-xs text-slate-600 bg-cream-50 p-2.5 rounded-xl border border-cream-200">
                      <strong>Instructions:</strong> {apt.notes}
                    </p>
                  )}

                  {/* Questions to Ask Doctor */}
                  {apt.questionsToAsk && apt.questionsToAsk.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <HelpCircle className="w-3.5 h-3.5 text-lavender-600" />
                        Questions for the Doctor:
                      </p>
                      <ul className="space-y-1 text-xs text-slate-700 list-disc list-inside">
                        {apt.questionsToAsk.map((q, idx) => (
                          <li key={idx}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 self-end sm:self-start">
                  <button
                    onClick={() => toggleAppointmentComplete(apt.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      apt.isCompleted
                        ? 'bg-slate-200 text-slate-700 border-slate-300'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                    }`}
                  >
                    {apt.isCompleted ? 'Mark Pending' : 'Mark Complete'}
                  </button>
                  <button
                    onClick={() => deleteAppointment(apt.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  ))}</LocalizedCopy>;
};
