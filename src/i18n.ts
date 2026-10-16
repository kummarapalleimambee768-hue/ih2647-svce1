import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import te from './locales/te.json';
import hi from './locales/hi.json';
import ta from './locales/ta.json';
import kn from './locales/kn.json';
import copy from './locales/copy.json';

const supportedLanguages = ['en', 'te', 'hi', 'ta', 'kn'];
const savedLanguage = localStorage.getItem('mom_journey_lang') || 'en';
const initialLanguage = supportedLanguages.includes(savedLanguage.split('-')[0]) ? savedLanguage : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: { ...en, copy: {} } },
      te: { translation: { ...te, copy: copy.te } },
      hi: { translation: { ...hi, copy: copy.hi } },
      ta: { translation: { ...ta, copy: copy.ta } },
      kn: { translation: { ...kn, copy: copy.kn } },
    },
    lng: initialLanguage,
    fallbackLng: 'en',
    supportedLngs: supportedLanguages,
    nonExplicitSupportedLngs: false,
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('languageChanged', (language) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = language.split('-')[0];
  }
});

if (typeof document !== 'undefined') {
  document.documentElement.lang = i18n.resolvedLanguage || i18n.language || 'en';
}

export const changeAppLanguage = (lang: string) => {
  const supportedLanguage = supportedLanguages.includes(lang.split('-')[0]) ? lang.split('-')[0] : 'en';
  void i18n.changeLanguage(supportedLanguage);
  localStorage.setItem('mom_journey_lang', supportedLanguage);
};

export default i18n;
