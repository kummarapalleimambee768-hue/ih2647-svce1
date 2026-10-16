import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import {
  Users,
  ShieldCheck,
  Lock,
  Share2,
  CheckCircle2,
  XCircle,
  Copy,
  Sparkles,
  Heart,
  Calendar,
  Baby,
  Activity,
  FolderLock
} from 'lucide-react';
import { LocalizedCopy } from '../components/LocalizedCopy';

export const FamilySharingPage: React.FC = () => {
  const { t } = useTranslation();
  const {
    currentUser,
    activeSisterKey,
    allSistersData,
    permissions,
    updatePermissions,
    switchSisterAccount
  } = useApp();

  const [inviteEmail, setInviteEmail] = useState('');
  const [generatedInviteCode, setGeneratedInviteCode] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Sisters other than the currently logged-in sister
  const otherSistersKeys = Object.keys(allSistersData).filter((k) => k !== activeSisterKey);

  const handleGenerateInvite = (e: React.FormEvent) => {
    e.preventDefault();
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGeneratedInviteCode(code);
    setInviteEmail('');
  };

  const handleCopyCode = () => {
    if (generatedInviteCode) {
      navigator.clipboard.writeText(generatedInviteCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return <LocalizedCopy>{((
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            {t('family.title')}
          </h1>
          <p className="text-xs text-slate-500 mt-1">{t('family.subtitle')}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-cream-100 border border-cream-200 text-slate-700 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-bloom-600" />
            <span>Active Profile: {currentUser?.fullName}</span>
          </span>
        </div>
      </div>

      {/* Strict Privacy Declaration */}
      <div className="p-5 rounded-3xl bg-sage-50 border border-sage-200/80 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-sage-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-sage-900 leading-relaxed">
          <strong>Granular Privacy Architecture:</strong> Each sister maintains an isolated, independent medical profile. Only the milestones and dates that you explicitly toggle below are visible to your sisters. Medical documents and personal clinician notes are strictly private and never exposed.
        </div>
      </div>

      {/* Other Sisters' Consented Status (The Sister Circle Hub) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Sisters in Your Circle</span>
          </h3>
          <span className="text-xs text-slate-400">Showing consented updates</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {otherSistersKeys.map((key) => {
            const sister = allSistersData[key];
            if (!sister) return null;

            const sisPerms = sister.permissions;

            return (
              <div
                key={key}
                className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={sister.profile.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80'}
                      alt={sister.profile.fullName}
                      className="w-12 h-12 rounded-2xl object-cover border border-bloom-100"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">
                        {sister.profile.fullName}
                      </h4>
                      <p className="text-xs text-slate-500">{sister.profile.email}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => switchSisterAccount(key)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-bloom-50 text-slate-700 hover:text-bloom-700 text-xs font-semibold border border-slate-200 transition-colors"
                  >
                    Switch to {sister.profile.fullName.split(' ')[0]}
                  </button>
                </div>

                {/* Consented Information Grid */}
                <div className="p-4 rounded-2xl bg-cream-50/70 border border-cream-200/80 space-y-2 text-xs">
                  {sisPerms.sharePregnancyWeek && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Baby className="w-3.5 h-3.5 text-bloom-600" />
                        Current Milestone:
                      </span>
                      <span className="font-extrabold text-slate-900">
                        Week {sister.pregnancy.currentWeek} • Trimester {sister.pregnancy.currentTrimester}
                      </span>
                    </div>
                  )}

                  {sisPerms.shareDueDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-lavender-600" />
                        Estimated Due Date:
                      </span>
                      <span className="font-semibold text-slate-800">
                        {sister.pregnancy.estimatedDueDate} ({sister.pregnancy.daysRemaining} days remaining)
                      </span>
                    </div>
                  )}

                  {sisPerms.shareAppointments && sister.appointments.length > 0 && (
                    <div className="flex items-center justify-between pt-1 border-t border-cream-200">
                      <span className="text-slate-500">Upcoming Visit:</span>
                      <span className="font-medium text-bloom-700 truncate max-w-[200px]">
                        {sister.appointments[0].title} (Week {sister.appointments[0].gestationalWeek})
                      </span>
                    </div>
                  )}

                  {sisPerms.shareSymptoms && (
                    <div className="flex items-center justify-between pt-1 border-t border-cream-200">
                      <span className="text-slate-500">Recent Sensations:</span>
                      <span className="font-medium text-slate-700">
                        {sister.symptoms.slice(0, 2).map((s) => s.symptomName).join(', ') || 'Resting well'}
                      </span>
                    </div>
                  )}

                  {/* Private Documents Safeguard Notification */}
                  <div className="pt-2 border-t border-cream-200 flex items-center gap-1.5 text-[11px] text-slate-400">
                    <FolderLock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Medical documents are kept private by sister's consent.</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Your Consent & Sharing Controls */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-bloom-600" />
            <span>{t('family.sharingPermissions')}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Choose what information your sisters can see. Changes take effect immediately.
          </p>
        </div>

        <div className="space-y-3">
          {/* Share Week */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800">{t('family.shareWeek')}</span>
              <p className="text-[11px] text-slate-500">Allows sisters to view your current week & baby fruit size.</p>
            </div>
            <button
              onClick={() => updatePermissions({ sharePregnancyWeek: !permissions.sharePregnancyWeek })}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                permissions.sharePregnancyWeek ? 'bg-bloom-500' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  permissions.sharePregnancyWeek ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Share Due Date */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800">Share Estimated Due Date</span>
              <p className="text-[11px] text-slate-500">Allows countdown to birth celebration.</p>
            </div>
            <button
              onClick={() => updatePermissions({ shareDueDate: !permissions.shareDueDate })}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                permissions.shareDueDate ? 'bg-bloom-500' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  permissions.shareDueDate ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Share Appointments */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800">{t('family.shareAppointments')}</span>
              <p className="text-[11px] text-slate-500">Sisters can see upcoming scan dates to cheer you on.</p>
            </div>
            <button
              onClick={() => updatePermissions({ shareAppointments: !permissions.shareAppointments })}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                permissions.shareAppointments ? 'bg-bloom-500' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  permissions.shareAppointments ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Share Symptoms */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800">{t('family.shareSymptoms')}</span>
              <p className="text-[11px] text-slate-500">Share symptom names (nausea, kicks) for sisterly advice.</p>
            </div>
            <button
              onClick={() => updatePermissions({ shareSymptoms: !permissions.shareSymptoms })}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                permissions.shareSymptoms ? 'bg-bloom-500' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  permissions.shareSymptoms ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Share Medical Documents (Strictly Locked Default) */}
          <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 flex items-center justify-between">
            <div className="flex items-start gap-2">
              <FolderLock className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-rose-950">{t('family.shareDocuments')}</span>
                <p className="text-[11px] text-rose-700">Strictly locked for patient privacy and confidentiality.</p>
              </div>
            </div>
            <button
              onClick={() => updatePermissions({ shareDocuments: !permissions.shareDocuments })}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                permissions.shareDocuments ? 'bg-red-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  permissions.shareDocuments ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Revoke All Sharing Button */}
        <div className="pt-2 border-t border-slate-100 flex justify-end">
          <button
            onClick={() =>
              updatePermissions({
                sharePregnancyWeek: false,
                shareDueDate: false,
                shareAppointments: false,
                shareSymptoms: false,
                shareBabyMilestones: false,
                shareDocuments: false,
              })
            }
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 text-xs font-bold transition-colors border border-slate-200"
          >
            {t('family.revokeAccess')}
          </button>
        </div>
      </div>

      {/* Invite Another Sister via Code */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-4">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Users className="w-4 h-4 text-bloom-600" />
          <span>{t('family.inviteSister')}</span>
        </h3>

        <form onSubmit={handleGenerateInvite} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="Sister's Email (e.g. sister@family.com)"
            className="flex-1 px-4 py-2.5 rounded-2xl border border-slate-200 text-xs"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-2xl bg-bloom-500 hover:bg-bloom-600 text-white font-bold text-xs shadow-md shadow-bloom-500/20"
          >
            Generate Invitation Code
          </button>
        </form>

        {generatedInviteCode && (
          <div className="p-4 rounded-2xl bg-cream-100 border border-cream-200 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">
                Invitation Code (Valid for 7 Days):
              </span>
              <span className="text-lg font-mono font-extrabold text-slate-900 tracking-widest">
                {generatedInviteCode}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-cream-50 flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copySuccess ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  ))}</LocalizedCopy>;
};
