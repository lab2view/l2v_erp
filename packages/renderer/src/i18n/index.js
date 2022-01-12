import { createI18n } from 'vue-i18n';
import en from './en';
import fr from './fr';

const i18n = createI18n({
  locale: 'fr', // set locale
  fallbackLocale: 'fr',
  messages: {
    en,
    fr,
  },
});

export default i18n;
