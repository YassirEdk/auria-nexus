import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState, type ReactNode, type MouseEvent } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { RequestAccessModal, openRequestAccess } from "./RequestAccessModal";
import { ScrollProgress } from "./ScrollProgress";

type NavLink = {
  label: string;
  to: "/" | "/services" | "/industries" | "/how-we-work" | "/about" | "/contact";
  hash?: string;
};

const links: readonly NavLink[] = [
  { label: "Home",        to: "/" },
  { label: "About",       to: "/about" },
  { label: "How We Work", to: "/how-we-work" },
  { label: "Services",    to: "/services" },
  { label: "Industries",  to: "/industries" },
  { label: "Contact",     to: "/contact" },
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
                key={link.label}
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
                  <span>{link.label}</span>
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
          className="inline-flex"
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          <button
            type="button"
            onClick={openRequestAccess}
            className="island-cta island-cta--compact"
            aria-label="Apply now"
          >
            <span>
              Apply<span className="hidden sm:inline">&nbsp;Now</span>
            </span>
            <ArrowUpRight className="size-3.5" />
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
              <li key={link.label}>
                <Link
                  to={link.to}
                  hash={link.hash}
                  onClick={goToSection(link)}
                  className="flex min-h-[52px] items-center justify-between px-5 py-4 text-base font-medium text-foreground active:bg-white/5 sm:px-6 sm:py-5"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="size-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-line p-5 sm:p-6">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openRequestAccess();
              }}
              className="btn-primary w-full justify-center"
            >
              Apply Now <ArrowUpRight className="size-3.5" />
            </button>
          </div>
        </nav>
      )}
    </motion.header>
  );
}

export function SiteFooter() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-40 h-11 border-t border-line bg-background/90 backdrop-blur-md sm:h-12">
      <span aria-hidden className="site-footer__beam" />
      <div className="site-container flex h-full items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <AuriaLogo className="size-5" />
          <span className="text-[11px] font-semibold tracking-widest uppercase text-foreground">AURIA</span>
          <span className="hidden mono text-[10px] uppercase tracking-widest text-sub-muted sm:inline">© 2026 · v1.0</span>
        </div>

        <div className="hidden md:flex items-center gap-5 mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span className="status-dot" style={{ background: "#10B981", color: "#10B981" }} />
            <span>07 nodes</span>
          </span>
          <span className="text-sub-muted/60">·</span>
          <span className="inline-flex items-center gap-2">
            <span className="status-dot" style={{ background: "#3B82F6", color: "#3B82F6" }} />
            <span>04 lanes</span>
          </span>
          <span className="text-sub-muted/60">·</span>
          <span className="inline-flex items-center gap-2">
            <span className="status-dot" style={{ background: "#F59E0B", color: "#F59E0B" }} />
            <span>01 watch</span>
          </span>
          <span className="text-sub-muted/60">·</span>
          <span className="hidden lg:inline text-sub-muted">china → global</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link to="/contact" className="mono hidden text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground sm:inline">
            hello@auria.io
          </Link>
          <span aria-hidden className="site-header__rule hidden h-5 w-px sm:block" />
          <div className="flex items-center gap-2.5 sm:gap-3">
            <a href="#" aria-label="LinkedIn" className="text-muted-foreground transition-colors hover:text-foreground">
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001A2.5 2.5 0 0 1 4.98 3.5zM3 9.75h4v11H3v-11zM10 9.75h3.8v1.5h.05c.53-1 1.83-2.05 3.76-2.05 4.02 0 4.76 2.65 4.76 6.09v5.46h-4v-4.85c0-1.16-.02-2.66-1.62-2.66-1.62 0-1.87 1.26-1.87 2.57v4.94H10v-11z"/>
              </svg>
            </a>
            <a href="#" aria-label="X / Twitter" className="text-muted-foreground transition-colors hover:text-foreground">
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                <path d="M18.244 2H21l-6.53 7.46L22 22h-6.79l-4.72-6.18L4.9 22H2.14l6.98-7.98L2 2h6.91l4.27 5.65L18.24 2zm-2.38 18h1.83L7.24 4H5.28l10.58 16z"/>
              </svg>
            </a>
            <a href="#" aria-label="GitHub" className="text-muted-foreground transition-colors hover:text-foreground">
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.94 3.2 9.13 7.64 10.61.56.1.77-.24.77-.54v-1.9c-3.11.68-3.77-1.5-3.77-1.5-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.94.1-.73.39-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.09 1.14a10.7 10.7 0 0 1 5.62 0c2.15-1.44 3.09-1.14 3.09-1.14.61 1.54.23 2.68.11 2.96.71.78 1.15 1.78 1.15 3 0 4.3-2.62 5.24-5.11 5.52.4.34.76 1.02.76 2.06v3.06c0 .3.2.65.78.54A11.26 11.26 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5z"/>
              </svg>
            </a>
          </div>
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
