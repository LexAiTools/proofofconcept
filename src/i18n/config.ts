import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enForms from './locales/en/forms.json';
import enAdmin from './locales/en/admin.json';
import enMessages from './locales/en/messages.json';
import enPages from './locales/en/pages.json';
import enAbout from './locales/en/about.json';
import enTestimonials from './locales/en/testimonials.json';
import enContact from './locales/en/contact.json';
import enPricing from './locales/en/pricing.json';

import plCommon from './locales/pl/common.json';
import plHome from './locales/pl/home.json';
import plForms from './locales/pl/forms.json';
import plAdmin from './locales/pl/admin.json';
import plMessages from './locales/pl/messages.json';
import plPages from './locales/pl/pages.json';
import plAbout from './locales/pl/about.json';
import plTestimonials from './locales/pl/testimonials.json';
import plContact from './locales/pl/contact.json';
import plPricing from './locales/pl/pricing.json';

const resources = {
  en: {
    common: enCommon,
    home: enHome,
    forms: enForms,
    admin: enAdmin,
      messages: enMessages,
      pages: enPages,
      about: enAbout,
      testimonials: enTestimonials,
      contact: enContact,
      pricing: enPricing,
  },
  pl: {
    common: plCommon,
    home: plHome,
    forms: plForms,
    admin: plAdmin,
      messages: plMessages,
      pages: plPages,
      about: plAbout,
      testimonials: plTestimonials,
      contact: plContact,
      pricing: plPricing,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'home', 'forms', 'admin', 'messages', 'pages', 'about', 'testimonials', 'contact', 'pricing'],
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
