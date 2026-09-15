import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { LANGUAGES, STORAGE_KEY } from "./index";
import { DEFAULT_LOCALE, dirFor, isLocale, LOCALES, type Locale } from "@/lib/locale";

function applyDocumentLang(code: string) {
  if (typeof document === "undefined") return;
  const el = document.documentElement;
  el.setAttribute("lang", code);
  el.setAttribute("dir", dirFor(code));
}

// Strip the leading /$lang segment from a pathname, returning the path that
// should be preserved when switching languages. "/en/services" -> "/services";
// "/en" -> "/"; "/" -> "/".
function pathWithoutLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return "/";
  if (isLocale(segments[0])) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname;
}

function localeFromPath(pathname: string): Locale {
  const seg = pathname.split("/").filter(Boolean)[0];
  return isLocale(seg) ? seg : DEFAULT_LOCALE;
}

/** Keep i18next's language and the <html lang/dir> attributes in sync with the
 *  /$lang URL segment. Mount once, high in the tree (see routes/$lang.tsx). */
export function useSyncLanguageWithUrl() {
  const { i18n } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    const code = localeFromPath(pathname);
    if (code !== i18n.language) i18n.changeLanguage(code);
    applyDocumentLang(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
  }, [pathname, i18n]);
}

/** Current language + a setter that navigates to the same page under the
 *  requested locale prefix. */
export function useLanguage() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const current = localeFromPath(pathname) || (i18n.language as Locale);

  const setLanguage = useCallback(
    (code: Locale) => {
      if (!(LOCALES as readonly string[]).includes(code)) return;
      const rest = pathWithoutLocale(pathname);
      const target = rest === "/" ? `/${code}` : `/${code}${rest}`;
      // `resetScroll: false` keeps the user anchored at their current scroll
      // position — the language swap is not a "new page" from their point of
      // view, it's the same content in a different tongue.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      navigate({ to: target as any, resetScroll: false });
    },
    [navigate, pathname],
  );

  return { current, setLanguage, languages: LANGUAGES };
}
