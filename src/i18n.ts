import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import te from './locales/te.json';
import hi from './locales/hi.json';
import ta from './locales/ta.json';
import kn from './locales/kn.json';

const savedLanguage = localStorage.getItem('mom_journey_lang') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      te: { translation: te },
      hi: { translation: hi },
      ta: { translation: ta },
      kn: { translation: kn },
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export const changeAppLanguage = (lang: string) => {
  i18n.changeLanguage(lang);
  localStorage.setItem('mom_journey_lang', lang);
  document.documentElement.lang = lang;
};

export default i18n;
