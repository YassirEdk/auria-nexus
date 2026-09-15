// Pathless layout for /$lang/*. Validates the URL locale, redirects to the
// default locale for unknown values, and keeps i18n + <html lang/dir> in sync
// with the current URL segment.
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { DEFAULT_LOCALE, isLocale } from "@/lib/locale";
import { useSyncLanguageWithUrl } from "@/i18n/useLanguage";

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.lang)) {
      // Unknown segment (e.g. an old flat path someone still has bookmarked
      // like /about) — bounce to the same path under the default locale.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw redirect({ to: `/${DEFAULT_LOCALE}/${params.lang}` as any, replace: true });
    }
  },
  component: LocaleLayout,
});

function LocaleLayout() {
  useSyncLanguageWithUrl();
  return <Outlet />;
}
