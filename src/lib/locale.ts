// Supported UI locales. Add a code here after (a) its translation file exists
// in src/i18n/locales/, (b) it is registered in src/i18n/index.ts, and (c) it
// is added to LANGUAGES in that same file so the switcher can offer it.
export const LOCALES = ["en", "fr", "ar"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(v: unknown): v is Locale {
  return typeof v === "string" && (LOCALES as readonly string[]).includes(v);
}

export function dirFor(locale: string): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

// Map a UI locale to the region-tagged code Open Graph expects.
export const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  ar: "ar_AE",
};

// Pick the best supported locale from an Accept-Language header, e.g.
// "fr-FR,fr;q=0.9,en;q=0.7" -> "fr". Falls back to DEFAULT_LOCALE.
export function pickLocaleFromAcceptLanguage(header: string | null | undefined): Locale {
  if (!header) return DEFAULT_LOCALE;
  const parts = header
    .split(",")
    .map((s) => {
      const [tag, ...params] = s.trim().split(";");
      const q = params
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="));
      const weight = q ? Number(q.slice(2)) : 1;
      return { tag: (tag || "").toLowerCase(), weight: Number.isFinite(weight) ? weight : 1 };
    })
    .sort((a, b) => b.weight - a.weight);
  for (const p of parts) {
    const primary = p.tag.split("-")[0];
    if (isLocale(primary)) return primary;
  }
  return DEFAULT_LOCALE;
}
