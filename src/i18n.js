import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import cn from './locales/cn.json';
import hk from './locales/hk.json';
import ja from './locales/ja.json';

i18n
  .use(HttpApi) // Load translations from backend files
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources: {
      en: {
        translation: en,
      },
      cn: {
        translation: cn,
      },
      hk: {
        translation: hk,
      },
      ja: {
        translation: ja,
      },
    },
    supportedLngs: ['en', 'cn', 'hk', 'ja'], // List of supported languages
    fallbackLng: 'en', // Fallback language if detection fails
    lng: "cn",
    debug: true, // Enable debug mode in development
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
