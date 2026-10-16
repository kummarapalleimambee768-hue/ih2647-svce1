import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { changeAppLanguage } from '../i18n';
import {
  Settings,
  Globe,
  Key,
  ShieldCheck,
  Download,
  Trash2,
  User,
  Heart,
  Save,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { LocalizedCopy } from '../components/LocalizedCopy';

export const SettingsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const {
    currentUser,
    currentPregnancy,
    aiApiKey,
    setAiApiKey,
    aiProvider,
    setAiProvider,
    logout,
  } = useApp();

  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [bloodGroup, setBloodGroup] = useState(currentUser?.bloodGroup || 'B+');
  const [emergencyName, setEmergencyName] = useState(currentUser?.emergencyContactName || '');
  const [emergencyPhone, setEmergencyPhone] = useState(currentUser?.emergencyContactPhone || '');
  const [localApiKey, setLocalApiKey] = useState(aiApiKey || '');
  const [localProvider, setLocalProvider] = useState<'gemini' | 'openai'>(aiProvider || 'gemini');
  const [saveToast, setSaveToast] = useState(false);

  const handleLanguageChange = (code: string) => {
    changeAppLanguage(code);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setAiApiKey(localApiKey.trim());
    setAiProvider(localProvider);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleExportData = () => {
    const backup = {
      profile: currentUser,
      pregnancy: currentPregnancy,
      exportedAt: new Date().toISOString(),
      note: 'Mom Journey AI Personal Medical Export',
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mom_journey_records_${currentUser?.fullName?.replace(/\s+/g, '_')}.json`;
    a.click();
  };

  return <LocalizedCopy>{((
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Profile & Application Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your personal profile, 5-language preferences, AI API configurations, and data privacy
        </p>
      </div>

      {saveToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Settings successfully saved!</span>
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* 1. Language Preference */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-3">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Globe className="w-4 h-4 text-bloom-600" />
            <span>Application Language (5 Indian Languages)</span>
          </h3>
          <p className="text-xs text-slate-500">
            Switches the interface, guidance, and chatbot context immediately:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2">
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
                onClick={() => handleLanguageChange(lang.code)}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  i18n.language === lang.code
                    ? 'bg-bloom-50 border-bloom-500 text-bloom-900 font-bold shadow-sm'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-bloom-200'
                }`}
              >
                <div className="text-base font-bold">{lang.native}</div>
                <div className="text-[11px] text-slate-500">{lang.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Personal Profile Settings */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <User className="w-4 h-4 text-lavender-600" />
            <span>Maternal Personal Profile</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name:</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Blood Group:</label>
              <input
                type="text"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Emergency Contact Name:</label>
              <input
                type="text"
                value={emergencyName}
                onChange={(e) => setEmergencyName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Emergency Contact Phone:</label>
              <input
                type="tel"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs"
              />
            </div>
          </div>
        </div>

        {/* 3. AI Service Configuration */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Key className="w-4 h-4 text-amber-500" />
            <span>AI Model & Vision Provider Configuration</span>
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Mom Journey AI functions immediately using our offline clinical knowledge engine. If you wish to enable live cloud vision and generative LLM models, enter your personal API key below:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">LLM Provider:</label>
              <select
                value={localProvider}
                onChange={(e) => setLocalProvider(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs bg-white"
              >
                <option value="gemini">Google Gemini 1.5 Flash (Recommended)</option>
                <option value="openai">OpenAI GPT-4o-mini</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                API Key (Stored locally in your browser):
              </label>
              <input
                type="password"
                value={localApiKey}
                onChange={(e) => setLocalApiKey(e.target.value)}
                placeholder="AIzaSy... or sk-..."
                className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs font-mono"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-cream-100/70 border border-cream-200 text-[11px] text-slate-600">
            <strong>Key Security:</strong> Keys are never logged or exposed in frontend bundles. When no key is entered, Mom Journey AI operates safely with clinically reviewed offline responses.
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-bloom-500 to-bloom-600 hover:from-bloom-600 hover:to-bloom-700 text-white font-bold text-xs shadow-md shadow-bloom-500/20 flex items-center gap-2 transition-all transform hover:scale-105"
          >
            <Save className="w-4 h-4" />
            <span>Save All Settings</span>
          </button>
        </div>
      </form>

      {/* 4. Data Export & Account Actions */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-4">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Download className="w-4 h-4 text-slate-700" />
          <span>Health Data Export & Sign Out</span>
        </h3>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleExportData}
            className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 border border-slate-200"
          >
            <Download className="w-4 h-4" />
            <span>Export Health Records (JSON)</span>
          </button>

          <button
            type="button"
            onClick={logout}
            className="px-4 py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center gap-2 border border-rose-200"
          >
            <Trash2 className="w-4 h-4" />
            <span>Sign Out of Profile</span>
          </button>
        </div>
      </div>
    </div>
  ))}</LocalizedCopy>;
};
