import { createRequire } from "module";
const require = createRequire(import.meta.url);

const translations = {
  uk: require("../data/uk.json"),
  en: require("../data/en.json"),
};

/**
 * @param {string} lang
 * @returns {typeof import('../data/uk.json')}
 */
export const t = (lang) => translations[lang] ?? translations.uk;
