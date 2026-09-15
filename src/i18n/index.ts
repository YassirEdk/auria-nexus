import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en";
import fr from "./locales/fr";
import ar from "./locales/ar";
import { DEFAULT_LOCALE, dirFor as _dirFor, type Locale } from "@/lib/locale";

export const LANGUAGES = [
  { code: "en", label: "English", short: "EN", dir: "ltr" as const },
  { code: "fr", label: "Français", short: "FR", dir: "ltr" as const },
  { code: "ar", label: "العربية", short: "AR", dir: "rtl" as const },
];

export type LanguageCode = Locale;

export const STORAGE_KEY = "auria-lang";

export const dirFor = _dirFor;

// Initialise synchronously with English on both server and first client render
// to avoid hydration mismatches; the URL's /$lang segment then drives the
// runtime language via useSyncLanguageWithUrl in the $lang layout route.
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    ar: { translation: ar },
  },
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
