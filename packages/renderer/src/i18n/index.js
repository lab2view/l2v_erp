import { createI18n } from 'vue-i18n';
import en from './en';
import fr from './fr';
import datetimeFormats from './datetimeFormats';

const i18n = createI18n({
  locale: 'fr', // set locale
  fallbackLocale: 'fr',
  datetimeFormats,
  messages: {
    en,
    fr,
  },
});

export default i18n;
