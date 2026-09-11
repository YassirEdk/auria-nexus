import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LANGUAGES, STORAGE_KEY, dirFor, type LanguageCode } from "./index";

function applyDocumentLang(code: string) {
  if (typeof document === "undefined") return;
  const el = document.documentElement;
  el.setAttribute("lang", code);
  el.setAttribute("dir", dirFor(code));
}

/** Read the stored (or browser) language once on mount and apply it. Kept out
 *  of the initial render to avoid SSR/hydration mismatches. Mount this once,
 *  high in the tree. */
export function useApplyStoredLanguage() {
  const { i18n } = useTranslation();
  useEffect(() => {
    let next: string | null = null;
    try {
      next = localStorage.getItem(STORAGE_KEY);
    } catch {
      next = null;
    }
    if (!next) {
      const nav = navigator.language?.slice(0, 2).toLowerCase();
      if (nav && LANGUAGES.some((l) => l.code === nav)) next = nav;
    }
    const code = next && LANGUAGES.some((l) => l.code === next) ? next : "en";
    if (code !== i18n.language) i18n.changeLanguage(code);
    applyDocumentLang(code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** Current language + a setter that persists the choice and updates <html>. */
export function useLanguage() {
  const { i18n } = useTranslation();
  const current = i18n.language;
  const setLanguage = useCallback(
    (code: LanguageCode) => {
      i18n.changeLanguage(code);
      applyDocumentLang(code);
      try {
        localStorage.setItem(STORAGE_KEY, code);
      } catch {
        /* ignore */
      }
    },
    [i18n]
  );
  return { current, setLanguage, languages: LANGUAGES };
}
