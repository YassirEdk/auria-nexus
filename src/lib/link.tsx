// Locale-aware Link wrapper. Import from here in place of @tanstack/react-router
// so links automatically inherit the current `/$lang` prefix from the URL.
//
// Accepts a `to` written as if there were no locale segment (e.g. "/about",
// "/", "/services") and rewrites it to `/{lang}/about` under the hood. If a
// path is already locale-prefixed (starts with a supported locale segment) it
// is passed through unchanged so callers can still escape when they need to.
import { Link as TSLink, useParams } from "@tanstack/react-router";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { DEFAULT_LOCALE, isLocale, LOCALES, type Locale } from "./locale";

export function useLang(): Locale {
  const params = useParams({ strict: false }) as { lang?: string };
  return isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
}

function alreadyPrefixed(path: string): boolean {
  const seg = path.split("/").filter(Boolean)[0];
  return !!seg && (LOCALES as readonly string[]).includes(seg);
}

export function localizePath(path: string, lang: Locale): string {
  if (!path.startsWith("/")) path = `/${path}`;
  if (alreadyPrefixed(path)) return path;
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

// Deliberately loose: TanStack's typed Link needs `to` to be a known route +
// its params, which this wrapper computes at runtime. We accept the union of
// what any caller might reasonably pass and forward through as any — the
// typed variant lives inside TSLink and still validates the resolved target.
type LooseLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  to: string;
  hash?: string | undefined;
  search?: unknown;
  params?: unknown;
  replace?: boolean | undefined;
  preload?: false | "intent" | "viewport" | "render" | undefined;
  activeProps?: unknown;
  inactiveProps?: unknown;
  disabled?: boolean | undefined;
  children?: ReactNode | undefined;
};

export const Link = forwardRef<HTMLAnchorElement, LooseLinkProps>(function Link(
  { to, ...rest },
  ref,
) {
  const lang = useLang();
  const target = localizePath(to, lang);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <TSLink ref={ref} to={target as any} {...(rest as any)} />;
});
