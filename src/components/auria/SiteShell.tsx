import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight, Lock, Phone, Mail, Clock } from "lucide-react";
import { useEffect, useState, type ReactNode, type MouseEvent } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { useTranslation } from "react-i18next";
import { RequestAccessModal, openRequestAccess } from "./RequestAccessModal";
import { ScrollProgress } from "./ScrollProgress";
import { LanguageSwitcher } from "./LanguageSwitcher";

type NavLink = {
  key: "home" | "about" | "howWeWork" | "services" | "industries" | "contact";
  to: "/" | "/services" | "/industries" | "/how-we-work" | "/about" | "/contact";
  hash?: string;
};

const links: readonly NavLink[] = [
  { key: "home",       to: "/" },
  { key: "about",      to: "/about" },
  { key: "howWeWork",  to: "/how-we-work" },
  { key: "services",   to: "/services" },
  { key: "industries", to: "/industries" },
  { key: "contact",    to: "/contact" },
];

export function AuriaLogo({ className = "size-7", animate = true }: { className?: string; animate?: boolean }) {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
        opacity: { delay: i * 0.15, duration: 0.25 },
      },
    }),
  };
  return (
    <motion.svg
      viewBox="0 0 64 64"
      className={`auria-logo ${className}`}
      aria-hidden
      initial={animate ? "hidden" : "visible"}
      animate="visible"
      whileHover={{ rotate: [0, -3, 3, 0], transition: { duration: 0.6 } }}
    >
      <defs>
        <linearGradient id="auriaGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5C36B" />
          <stop offset="55%" stopColor="#D9A24B" />
          <stop offset="100%" stopColor="#8C5E1F" />
        </linearGradient>
      </defs>
      <motion.rect
        x="0.5" y="0.5" width="63" height="63"
        fill="#0B0E12"
        stroke="url(#auriaGold)"
        strokeOpacity="0.35"
        strokeWidth="1"
        initial={animate ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
      <motion.path
        d="M 6 56 L 32 10 L 58 56"
        fill="none"
        stroke="url(#auriaGold)"
        strokeWidth="3"
        strokeLinejoin="miter"
        strokeLinecap="square"
        custom={0}
        variants={draw}
      />
      <motion.path
        d="M 15 54 L 32 22 L 49 54"
        fill="none"
        stroke="url(#auriaGold)"
        strokeWidth="3"
        strokeLinejoin="miter"
        strokeLinecap="square"
        custom={1}
        variants={draw}
      />
      <motion.path
        d="M 24 52 L 32 34 L 40 52"
        fill="none"
        stroke="url(#auriaGold)"
        strokeWidth="3"
        strokeLinejoin="miter"
        strokeLinecap="square"
        custom={2}
        variants={draw}
      />
    </motion.svg>
  );
}

export function AuriaMark({ animate = true }: { animate?: boolean }) {
  const letters = ["A", "U", "R", "I", "A"];
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="AURIA home">
      <AuriaLogo className="size-7" animate={animate} />
      <span
        className="auria-wordmark text-[13px] font-semibold tracking-widest uppercase text-foreground"
        aria-label="AURIA"
      >
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            className="auria-letter inline-block"
            initial={animate ? { opacity: 0, y: 6 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {ch}
          </motion.span>
        ))}
      </span>
    </Link>
  );
}

function LiveClock() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const utc = mounted && now
    ? `${String(now.getUTCHours()).padStart(2, "0")}:${String(now.getUTCMinutes()).padStart(2, "0")}:${String(now.getUTCSeconds()).padStart(2, "0")}`
    : "--:--:--";
  return (
    <span className="mono inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground" suppressHydrationWarning>
      <span className="status-dot" style={{ background: "#10B981", color: "#10B981" }} /> {utc} UTC
    </span>
  );
}

function useHideOnScroll(threshold = 12) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        if (Math.abs(delta) > 4) {
          if (delta > 0 && y > threshold) {
            setHidden(true);
          } else if (delta < 0) {
            setHidden(false);
          }
          lastY = y;
        }
        if (y <= 0) setHidden(false);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return hidden;
}

// Session-scoped flag: true once the SiteHeader has mounted in this browser
// tab. Persists across component remounts triggered by client-side navigation,
// resets on a full page reload. Used to make the entrance animation a
// one-time-per-session intro that only fires if the first page the user lands
// on is home.
let headerIntroPlayed = false;

export function SiteHeader() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const hidden = useHideOnScroll();
  // Play the entrance animation on the very first SiteHeader mount of this
  // session — no matter which route the user lands on. Every subsequent
  // client-side navigation skips it.
  const shouldAnimate = !headerIntroPlayed;
  useEffect(() => {
    headerIntroPlayed = true;
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  const goToSection = (link: NavLink) => (e: MouseEvent) => {
    if (!link.hash) return;
    e.preventDefault();
    if (pathname === link.to) {
      document.getElementById(link.hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate({ to: link.to, hash: link.hash });
    }
    setOpen(false);
  };

  const isActive = (link: NavLink) => {
    if (link.hash) return false;
    if (link.to === "/") return pathname === "/";
    return pathname === link.to || pathname.startsWith(link.to + "/");
  };

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 pointer-events-none"
      initial={shouldAnimate ? { y: -100, opacity: 0, filter: "blur(6px)" } : false}
      animate={{
        y: hidden && !open ? -120 : 0,
        opacity: hidden && !open ? 0 : 1,
        filter: "blur(0px)",
      }}
      transition={{ type: "spring", stiffness: 240, damping: 26, mass: 0.8, delay: 0.05 }}
    >
      <motion.div
        className="island pointer-events-auto flex items-center gap-2 sm:gap-3 lg:gap-4"
        initial={shouldAnimate ? "hidden" : false}
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { delayChildren: 0.35, staggerChildren: 0.06 } },
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -12 },
            show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          <AuriaMark animate={shouldAnimate} />
        </motion.div>
        <motion.span
          aria-hidden
          className="island__rule hidden lg:block"
          variants={{
            hidden: { opacity: 0, scaleY: 0 },
            show: { opacity: 1, scaleY: 1, transition: { duration: 0.35 } },
          }}
        />
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {links.map((link) => {
            const active = isActive(link);
            return (
              <motion.div
                key={link.key}
                variants={{
                  hidden: { opacity: 0, y: -8 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <Link
                  to={link.to}
                  hash={link.hash}
                  onClick={goToSection(link)}
                  className={[
                    "island-nav-link",
                    active ? "island-nav-link--active" : "",
                  ].join(" ")}
                >
                  {active && <span aria-hidden className="island-nav-link__dot" />}
                  <span>{t(`nav.${link.key}`)}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>
        <motion.span
          aria-hidden
          className="island__rule hidden lg:block"
          variants={{
            hidden: { opacity: 0, scaleY: 0 },
            show: { opacity: 1, scaleY: 1, transition: { duration: 0.35 } },
          }}
        />
        <motion.div
          className="flex items-center gap-2"
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          <span className="hidden lg:inline-flex">
            <LanguageSwitcher compact />
          </span>
          <Link
            to="/login"
            className="island-cta island-cta--ghost island-cta--compact hidden lg:inline-flex"
            aria-label={t("cta.clientSpace")}
          >
            <Lock className="size-3.5" />
            <span>{t("cta.clientSpace")}</span>
          </Link>
          <button
            type="button"
            onClick={openRequestAccess}
            className="island-cta island-cta--compact"
            aria-label={t("cta.applyNow")}
          >
            <span>{t("cta.applyNow")}</span>
            <ArrowUpRight className="size-3.5 rtl:-scale-x-100" />
          </button>
        </motion.div>
        <motion.button
          className="island-menu-btn lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
          }}
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </motion.button>
      </motion.div>

      {open && (
        <nav
          className="pointer-events-auto fixed inset-x-3 top-[68px] z-40 max-h-[calc(100dvh-96px)] overflow-y-auto rounded-2xl border border-line bg-background/95 shadow-2xl backdrop-blur-xl lg:hidden"
          aria-label="Mobile"
        >
          <ul className="divide-y divide-line">
            {links.map((link) => (
              <li key={link.key}>
                <Link
                  to={link.to}
                  hash={link.hash}
                  onClick={goToSection(link)}
                  className="flex min-h-[52px] items-center justify-between px-5 py-4 text-base font-medium text-foreground active:bg-white/5 sm:px-6 sm:py-5"
                >
                  <span>{t(`nav.${link.key}`)}</span>
                  <ArrowUpRight className="size-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="grid gap-3 border-t border-line p-5 sm:p-6">
            <div className="flex justify-center pb-1">
              <LanguageSwitcher />
            </div>
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm font-medium text-heading transition-colors active:bg-white/5"
            >
              <Lock className="size-3.5" /> {t("cta.clientSpace")}
            </Link>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openRequestAccess();
              }}
              className="btn-primary w-full justify-center"
            >
              {t("cta.applyNow")} <ArrowUpRight className="size-3.5 rtl:-scale-x-100" />
            </button>
          </div>
        </nav>
      )}
    </motion.header>
  );
}

function FooterClocks() {
  const [now, setNow] = useState<Date>(() => new Date());
  const [localTz, setLocalTz] = useState<string>(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    } catch {
      return "UTC";
    }
  });

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) setLocalTz(tz);
    } catch {}
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const fmt = (tz: string) => {
    try {
      return new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: tz,
      }).format(now);
    } catch {
      return "--:--:--";
    }
  };

  const cityLabel = (tz: string) => {
    const raw = tz.split("/").pop() || tz;
    return raw.replace(/_/g, " ");
  };

  const isSameAsChina = localTz === "Asia/Shanghai";

  return (
    <div
      dir="ltr"
      className="hidden md:flex items-center gap-4 rounded-full border border-line/70 bg-white/[0.02] px-4 py-1.5 mono text-[10px] uppercase tracking-widest text-muted-foreground"
    >
      <Clock className="size-3.5 flex-none text-sub-muted" />
      <span className="inline-flex items-center gap-2">
        <span className="status-dot" style={{ background: "#EF4444", color: "#EF4444" }} />
        <span>Shanghai</span>
        <span className="tabular-nums text-foreground">{fmt("Asia/Shanghai")}</span>
      </span>
      {!isSameAsChina && (
        <>
          <span aria-hidden className="h-3 w-px bg-line" />
          <span className="inline-flex items-center gap-2">
            <span className="status-dot" style={{ background: "#10B981", color: "#10B981" }} />
            <span>{cityLabel(localTz)}</span>
            <span className="tabular-nums text-foreground">{fmt(localTz)}</span>
          </span>
        </>
      )}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-40 h-11 border-t border-line bg-background/90 backdrop-blur-md sm:h-12">
      <span aria-hidden className="site-footer__beam" />
      <div className="site-container flex h-full items-center gap-4">
        {/* Brand */}
        <div className="flex flex-none items-center gap-2 sm:gap-2.5">
          <AuriaLogo className="size-5 flex-none" />
          <span className="hidden text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground sm:inline">
            AURIA
          </span>
          <span className="hidden lg:inline mono text-[9px] uppercase tracking-widest text-sub-muted">
            v1.0 · © 2026
          </span>
        </div>

        {/* Local times */}
        <div className="flex min-w-0 flex-1 justify-center">
          <FooterClocks />
        </div>

        {/* Contact */}
        <div dir="ltr" className="flex flex-none items-center gap-2 sm:gap-3.5">
          <a
            href="tel:+8619730315177"
            aria-label="Call China +86 19730315177"
            className="group mono inline-flex items-center gap-1 text-[9px] tracking-wider text-muted-foreground transition-colors hover:text-heading sm:gap-1.5 sm:text-[10px]"
          >
            <Phone className="size-3.5 flex-none text-blue transition-transform group-hover:-translate-y-px" />
            <span className="whitespace-nowrap">+86 197 3031 5177</span>
          </a>
          <span aria-hidden className="hidden h-4 w-px flex-none bg-line sm:block" />
          <Link
            to="/contact"
            aria-label="Email aureacompany907@gmail.com"
            className="group mono hidden items-center gap-1.5 text-[10px] tracking-wider text-muted-foreground transition-colors hover:text-heading sm:inline-flex"
          >
            <Mail className="size-3.5 flex-none text-blue transition-transform group-hover:-translate-y-px" />
            <span className="hidden lg:inline">aureacompany907@gmail.com</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hash = useRouterState({ select: (s) => s.location.hash });
  const introReady = useIntroReady();

  useEffect(() => {
    if (!introReady) return;
    if (!hash) return;
    const id = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => window.clearTimeout(id);
  }, [pathname, hash, introReady]);

  if (!introReady) {
    return <main className="pb-16 sm:pb-14" aria-hidden />;
  }

  return (
    <motion.main
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="pb-16 sm:pb-14"
    >
      {children}
    </motion.main>
  );
}

function SiteBackgroundFX() {
  return (
    <div aria-hidden className="site-bg-fx">
      <span className="site-bg-fx__grid" />
      <span className="site-bg-fx__blob site-bg-fx__blob--a" />
      <span className="site-bg-fx__blob site-bg-fx__blob--b" />
      <span className="site-bg-fx__noise" />
    </div>
  );
}


function shouldShowIntro() {
  if (typeof window === "undefined") return false;
  try {
    if (sessionStorage.getItem("auria:intro-played") === "1") return false;
  } catch { /* ignore */ }
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
  return true;
}

function useIntroReady() {
  const [ready, setReady] = useState(() => !shouldShowIntro());
  useEffect(() => {
    if (ready) return;
    const onDone = () => setReady(true);
    window.addEventListener("auria:intro-done", onDone);
    return () => window.removeEventListener("auria:intro-done", onDone);
  }, [ready]);
  return ready;
}

function IntroSplash() {
  const [visible, setVisible] = useState(shouldShowIntro);

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";
    try { sessionStorage.setItem("auria:intro-played", "1"); } catch { /* ignore */ }
    const t = window.setTimeout(() => {
      setVisible(false);
      window.dispatchEvent(new Event("auria:intro-done"));
    }, 2200);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="auria-intro"
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(217,162,75,0.12), transparent 60%), #06080B",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          aria-hidden
        >
          <motion.div
            className="flex flex-col items-center gap-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <AuriaLogo className="size-16" animate />
            <span
              className="auria-wordmark text-[22px] font-semibold uppercase tracking-[0.4em] text-foreground"
              aria-label="AURIA"
            >
              {["A", "U", "R", "I", "A"].map((ch, i) => (
                <motion.span
                  key={i}
                  className="auria-letter inline-block"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
            <motion.span
              className="mono text-[10px] uppercase tracking-[0.35em] text-sub-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              Intelligence · Trade · Assurance
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <IntroSplash />
      <SiteBackgroundFX />
      <ScrollProgress />
      <SiteHeader />
      <PageTransition>{children}</PageTransition>
      <SiteFooter />
      <RequestAccessModal />
    </>
  );
}
