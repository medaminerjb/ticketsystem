// src/i18n.js
import { createI18n } from 'vue-i18n';

// Function to dynamically import locale messages
const loadLocaleMessages = async (locale) => {
  try {
    const messages = await import(`./locales/${locale}.json`);
    return messages.default;
  } catch (error) {
    console.error(`Failed to load locale messages for locale ${locale}:`, error);
    return {}; // Return an empty object or a fallback language
  }
};

// Create the Vue I18n instance
const i18n = createI18n({
  locale: 'en', // Set default locale
  fallbackLocale: 'en', // Set fallback locale
  messages: {}, // Initial empty messages object
});

// Load messages for the default locale
const loadInitialLocale = async () => {
  const messages = await loadLocaleMessages(i18n.global.locale);
  i18n.global.setLocaleMessage(i18n.global.locale, messages);
};

loadInitialLocale();

export default i18n;
