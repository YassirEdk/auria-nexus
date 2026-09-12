import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";
import { Home, ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "motion/react";

import appCss from "../styles.css?url";
import "@/i18n";
import { useApplyStoredLanguage } from "@/i18n/useLanguage";
import {
  GLOBAL_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  DEFAULT_OG_IMAGE,
  organizationJsonLd,
  websiteJsonLd,
  serviceJsonLd,
  jsonLdScript,
} from "@/lib/seo";

function AuriaMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="auria404" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5C36B" />
          <stop offset="55%" stopColor="#D9A24B" />
          <stop offset="100%" stopColor="#8C5E1F" />
        </linearGradient>
      </defs>
      <path d="M 6 56 L 32 10 L 58 56" fill="none" stroke="url(#auria404)" strokeWidth="3" strokeLinejoin="miter" strokeLinecap="square" />
      <path d="M 15 54 L 32 22 L 49 54" fill="none" stroke="url(#auria404)" strokeWidth="3" strokeLinejoin="miter" strokeLinecap="square" />
      <path d="M 24 52 L 32 34 L 40 52" fill="none" stroke="url(#auria404)" strokeWidth="3" strokeLinejoin="miter" strokeLinecap="square" />
    </svg>
  );
}

const notFoundContainer: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.15, staggerChildren: 0.08 } },
};

const notFoundItem: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function NotFoundComponent() {
  // Order mirrors the header nav (SiteShell links), minus Home & Contact
  // which are already the primary buttons above.
  const quickLinks = [
    { to: "/about", label: "About" },
    { to: "/how-we-work", label: "How we work" },
    { to: "/services", label: "Services" },
    { to: "/industries", label: "Industries" },
  ] as const;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-16">
      {/* ambient gold glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, #D9A24B 0%, transparent 70%)" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* giant logo watermark behind the content */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 w-[min(90vw,720px)] -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 1.15, rotate: -2 }}
        animate={{ opacity: 0.07, scale: 1, rotate: 0 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <AuriaMark className="w-full" />
      </motion.div>

      <motion.div
        className="relative z-10 w-full max-w-lg text-center"
        variants={notFoundContainer}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={notFoundItem}
          className="mono text-[11px] uppercase tracking-[0.35em]"
          style={{ color: "#D9A24B" }}
        >
          Error · 404
        </motion.p>

        <motion.h1
          variants={notFoundItem}
          className="mt-4 text-7xl font-bold tracking-tight sm:text-8xl"
          style={{ color: "var(--heading)" }}
        >
          404
        </motion.h1>

        <motion.h2
          variants={notFoundItem}
          className="mt-4 text-xl font-semibold"
          style={{ color: "var(--heading)" }}
        >
          This lane doesn't exist.
        </motion.h2>
        <motion.p
          variants={notFoundItem}
          className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground"
        >
          The page you're looking for has been moved, renamed, or never shipped.
          Let's route you back to a working destination.
        </motion.p>

        <motion.div
          variants={notFoundItem}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link to="/" className="btn-gold">
            <Home className="size-4" />
            Back to home
          </Link>
          <Link to="/contact" className="btn-gold-line">
            Contact us
            <ArrowUpRight className="size-4 rtl:-scale-x-100" />
          </Link>
        </motion.div>

        <motion.div
          variants={notFoundItem}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {quickLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="mono text-[11px] uppercase tracking-widest text-sub-muted transition-colors hover:text-blue"
            >
              {l.label}
            </Link>
          ))}
        </motion.div>

        <motion.div
          variants={notFoundItem}
          className="mono mt-12 flex items-center justify-center gap-2 border-t border-line pt-5 text-[10px] uppercase tracking-widest text-sub-muted"
        >
          AURIA · Shanghai hq · lat 31.23 · lng 121.47
        </motion.div>
      </motion.div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "AURIA — Global Sourcing, Trading & Logistics from China" },
      {
        name: "description",
        content:
          "AURIA is a global trading and sourcing company in China. We source China products, manage manufacturing, quality control and international logistics for buyers worldwide.",
      },
      { name: "keywords", content: GLOBAL_KEYWORDS.join(", ") },
      { name: "author", content: SITE_NAME },
      { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" },
      { name: "googlebot", content: "index,follow,max-image-preview:large,max-snippet:-1" },
      { name: "bingbot", content: "index,follow" },
      { name: "theme-color", content: "#0a0a0a" },
      { name: "referrer", content: "strict-origin-when-cross-origin" },
      { name: "format-detection", content: "telephone=no" },
      { name: "application-name", content: SITE_NAME },
      { name: "apple-mobile-web-app-title", content: SITE_NAME },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:title", content: "AURIA — Global Sourcing, Trading & Logistics from China" },
      { property: "og:description", content: "Source China products with a trusted trading and logistics partner on the ground in Shanghai, Shenzhen, Guangzhou and Yiwu." },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "fr_FR" },
      { property: "og:locale:alternate", content: "ar_AE" },
      { property: "og:locale:alternate", content: "zh_CN" },
      { property: "og:locale:alternate", content: "es_ES" },
      { property: "og:locale:alternate", content: "de_DE" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@auria" },
      { name: "twitter:title", content: "AURIA — Global Sourcing, Trading & Logistics from China" },
      { name: "twitter:description", content: "Your global gateway to China: sourcing, manufacturing, quality control and logistics." },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
      { name: "geo.region", content: "CN" },
      { name: "geo.placename", content: "Shanghai · Shenzhen · Guangzhou · Yiwu" },
      { name: "geo.position", content: "31.2304;121.4737" },
      { name: "ICBM", content: "31.2304, 121.4737" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
    ],
    scripts: [
      jsonLdScript(organizationJsonLd()),
      jsonLdScript(websiteJsonLd()),
      jsonLdScript(serviceJsonLd()),
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const perfDetectScript = `(function(){try{
var d=document.documentElement;
var nav=navigator||{};
var mem=nav.deviceMemory||8;
var cores=nav.hardwareConcurrency||8;
var conn=nav.connection||{};
var save=!!conn.saveData;
var slowNet=/(^|\\W)(2g|slow-2g|3g)/i.test(conn.effectiveType||'');
var coarse=matchMedia&&matchMedia('(pointer:coarse)').matches;
var small=innerWidth<900;
var xsmall=innerWidth<480;
var reduce=matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
// Explicit signals always trigger lite. For CPU/RAM heuristics, require BOTH
// weak (mem<=4 AND cores<=4) so browsers like Brave that spoof one value for
// fingerprint protection don't get falsely downgraded.
var lite=save||slowNet||reduce||(mem<=4&&cores<=4)||(coarse&&small)||xsmall;
if(lite){d.classList.add('perf-lite');d.setAttribute('data-perf','lite');}
if(coarse)d.classList.add('is-touch');
if(small)d.classList.add('is-mobile');
// Expose primitive values for React hooks without re-probing.
d.setAttribute('data-viewport', small ? (xsmall ? 'xs' : 'sm') : 'lg');
}catch(e){}})();`;

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: perfDetectScript }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useApplyStoredLanguage();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
