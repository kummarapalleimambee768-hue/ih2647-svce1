import React from 'react';
import { useTranslation } from 'react-i18next';
import { changeAppLanguage } from '../i18n';
import { Globe } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
];

export const LanguageSelector: React.FC<{ variant?: 'minimal' | 'full'; onLanguageChange?: (lang: string) => void }> = ({
  variant = 'minimal',
  onLanguageChange,
}) => {
  const { i18n } = useTranslation();
  const rawLang = i18n.language || localStorage.getItem('mom_journey_lang') || 'en';
  const currentLang = rawLang.split('-')[0];

  const handleSelect = (langCode: string) => {
    changeAppLanguage(langCode);
    if (onLanguageChange) {
      onLanguageChange(langCode);
    }
  };

  if (variant === 'full') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => handleSelect(lang.code)}
            className={`p-3 rounded-2xl border text-left transition-all ${
              currentLang === lang.code
                ? 'bg-bloom-50 border-bloom-400 text-bloom-900 shadow-sm'
                : 'bg-white border-slate-200 text-slate-700 hover:border-bloom-200'
            }`}
          >
            <div className="text-base font-bold">{lang.native}</div>
            <div className="text-xs text-slate-500">{lang.label}</div>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative inline-flex items-center">
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-cream-100 hover:bg-cream-200 border border-slate-200/80 text-xs font-medium text-slate-700 cursor-pointer">
        <Globe className="w-3.5 h-3.5 text-bloom-500" />
        <select
          value={currentLang}
          onChange={(e) => handleSelect(e.target.value)}
          className="bg-transparent border-none outline-none cursor-pointer pr-1 text-slate-800 font-semibold"
        >
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code} className="text-slate-900 bg-white">
              {l.native} ({l.code.toUpperCase()})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
