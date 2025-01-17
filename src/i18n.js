import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import LanguageResources from './resources';

i18n
  .use(HttpApi) // Load translations from backend files
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources: LanguageResources, // Load translation resources
    supportedLngs: ['en', 'cn', 'hk', 'ja'], // List of supported languages
    fallbackLng: 'en', // Fallback language if detection fails
    lng: "en",
    debug: true, // Enable debug mode in development
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
