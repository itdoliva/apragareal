import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en.json'
import translationPT from './locales/pt.json'
// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init

const resources = {
  pt: { translation: translationPT },
  en: { translation: translationEN },
}

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  }, (err, t) => {
    if (err) return console.log('something went wrong loading', err);
  });


export default i18n;