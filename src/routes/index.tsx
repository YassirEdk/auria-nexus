// Root `/` route: never renders — always redirects to the localized homepage.
//
// - On the server we read the Accept-Language header so Google/Bing land on
//   `/fr` or `/ar` in one hop (the crawler follows a 302 and indexes the
//   destination URL as the ranking target for that language).
// - On the client we fall back to `navigator.language`.
// - If nothing matches, DEFAULT_LOCALE ("en") wins.
import { createFileRoute, redirect } from "@tanstack/react-router";
import { DEFAULT_LOCALE, pickLocaleFromAcceptLanguage } from "@/lib/locale";

function detectLocale(): string {
  if (typeof globalThis !== "undefined") {
    // Server: TanStack Start exposes the incoming request via a lazily-imported
    // helper. Fall through silently if it isn't available (e.g. during static
    // prerender), leaving the client-side detection to run instead.
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const g = globalThis as any;
      const header: string | undefined =
        g.__acceptLanguageHeader ?? undefined;
      if (header) return pickLocaleFromAcceptLanguage(header);
    } catch {
      /* ignore */
    }
  }
  if (typeof navigator !== "undefined" && navigator.language) {
    return pickLocaleFromAcceptLanguage(navigator.language);
  }
  return DEFAULT_LOCALE;
}

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const lang = detectLocale();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    throw redirect({ to: `/${lang}` as any, replace: true });
  },
});
