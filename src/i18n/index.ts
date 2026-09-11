import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en";
import fr from "./locales/fr";
import ar from "./locales/ar";

export const LANGUAGES = [
  { code: "en", label: "English", short: "EN", dir: "ltr" as const },
  { code: "fr", label: "Français", short: "FR", dir: "ltr" as const },
  { code: "ar", label: "العربية", short: "AR", dir: "rtl" as const },
];

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

export const STORAGE_KEY = "auria-lang";

export function dirFor(code: string): "ltr" | "rtl" {
  return code === "ar" ? "rtl" : "ltr";
}

// Initialise synchronously with English on both server and first client render
// to avoid hydration mismatches; the stored/browser language is applied in an
// effect after mount (see useApplyStoredLanguage).
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    ar: { translation: ar },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
