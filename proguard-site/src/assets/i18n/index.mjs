let currentLocaleData = {};
let currentLocale = 'fa';

/**
 * Lazily loads a locale JSON file.
 * @param {string} locale - The locale to load (e.g., 'en', 'fa').
 * @returns {Promise<object>} The loaded locale data.
 */
export async function loadLocale(locale) {
  try {
    const response = await fetch(`/assets/i18n/${locale}.json`);
    if (!response.ok) throw new Error(`Failed to load locale: ${locale}`);
    const data = await response.json();
    currentLocaleData = data;
    currentLocale = locale;
    
    document.documentElement.lang = locale;
    document.documentElement.dir = data._meta?.direction || 'ltr';

    return data;
  } catch (error) {
    console.error('i18n Error:', error);
    return {};
  }
}

/**
 * Translates a key using the currently loaded locale data.
 * @param {string} key - The hierarchical key (e.g., 'global.title').
 * @param {Record<string, string>} [params] - Optional parameters for placeholder replacement.
 * @returns {string} The translated string or the key itself as a fallback.
 */
export function t(key, params = {}) {
  let text = key.split('.').reduce((obj, i) => (obj ? obj[i] : undefined), currentLocaleData);

  if (text === undefined) {
    console.warn(`Translation key not found: ${key}`);
    return key;
  }

  if (params) {
    for (const [paramKey, paramValue] of Object.entries(params)) {
      text = text.replace(new RegExp(`{${paramKey}}`, 'g'), paramValue);
    }
  }

  return text;
}