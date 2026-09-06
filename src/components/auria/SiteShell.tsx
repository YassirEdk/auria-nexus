import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useScroll, useSpring } from "motion/react";

type NavLink = { label: string; num: string; to: "/" | "/contact"; hash?: string };

const links: readonly NavLink[] = [
  { label: "Home",     num: "00", to: "/" },
  { label: "Company",  num: "01", to: "/", hash: "company" },
  { label: "Services", num: "02", to: "/", hash: "services" },
  { label: "Sectors",  num: "03", to: "/", hash: "sectors" },
  { label: "Process",  num: "04", to: "/", hash: "process" },
  { label: "Contact",  num: "05", to: "/contact" },
];

export function AuriaMark() {
  return (
    <Link to="/" className="group inline-flex items-center gap-3" aria-label="AURIA home">
      <span className="relative grid size-7 place-items-center border border-accent/60 text-[10px] font-medium text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
        A
      </span>
      <span className="font-display text-[15px] font-medium tracking-[0.32em]">AURIA</span>
    </Link>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.3 });
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-60 h-px origin-left bg-accent"
      style={{ scaleX }}
      aria-hidden
    />
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const goToSection = (link: NavLink) => (e: MouseEvent) => {
    if (!link.hash) return;
    if (pathname === link.to) {
      e.preventDefault();
      document.getElementById(link.hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    } else {
      e.preventDefault();
      navigate({ to: link.to, hash: link.hash });
      setOpen(false);
    }
  };

  return (
    <>
      <ScrollProgress />
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-border bg-background/85 backdrop-blur-md"
            : "border-transparent bg-background/0"
        }`}
      >
        <div className="site-container flex h-16 items-center justify-between lg:h-20">
          <AuriaMark />
          <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                hash={link.hash}
                onClick={goToSection(link)}
                className="nav-item"
                activeProps={link.hash ? undefined : { className: "nav-item is-active" }}
                activeOptions={{ exact: link.to === "/" && !link.hash }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-6 lg:flex">
            <span className="readout"><span className="dot" /> Available</span>
            <Link
              to="/contact"
              className="mono inline-flex items-center gap-2 border border-accent bg-accent px-4 py-2 text-[11px] font-medium uppercase tracking-widest text-accent-foreground transition-colors duration-300 hover:bg-transparent hover:text-accent"
            >
              Start <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
          <button
            className="grid size-10 place-items-center border border-border-strong text-foreground lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
        {open && (
          <nav
            className="absolute inset-x-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border bg-background lg:hidden"
            aria-label="Mobile"
          >
            <ul className="divide-y divide-border">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    hash={link.hash}
                    onClick={goToSection(link)}
                    className="flex items-baseline justify-between px-6 py-5 text-lg font-medium hover:text-accent"
                    activeProps={link.hash ? undefined : { className: "flex items-baseline justify-between px-6 py-5 text-lg font-medium text-accent" }}
                    activeOptions={{ exact: link.to === "/" && !link.hash }}
                  >
                    <span>{link.label}</span>
                    <span className="mono text-xs text-muted-foreground">/{link.num}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-border p-6">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mono flex items-center justify-between border border-accent bg-accent px-5 py-4 text-xs font-medium uppercase tracking-widest text-accent-foreground"
              >
                Start a project <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="site-container grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-6">
          <AuriaMark />
          <p className="max-w-xs text-sm leading-6 text-muted-foreground">
            A precision network for sourcing, manufacturing and logistics between China and the world.
          </p>
          <p className="readout"><span className="dot" /> Systems online · 24 / 7</p>
        </div>
        <div className="space-y-4">
          <p className="tag">Navigate</p>
          <ul className="space-y-2 text-sm">
            {links.slice(1).map((link) => (
              <li key={link.label}>
                <Link to={link.to} hash={link.hash} className="text-muted-foreground transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <p className="tag">Channels</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>LinkedIn</li>
            <li>WeChat</li>
            <li>Instagram</li>
          </ul>
        </div>
        <div className="space-y-4">
          <p className="tag">Nodes</p>
          <ul className="mono space-y-2 text-sm text-muted-foreground">
            <li>CN · Shanghai</li>
            <li>NL · Rotterdam</li>
            <li>AE · Dubai</li>
          </ul>
        </div>
      </div>
      <div className="site-container flex flex-col gap-3 border-t border-border py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
        <span className="mono uppercase tracking-widest text-muted-foreground">© 2026 AURIA · All rights reserved</span>
        <span className="mono uppercase tracking-widest text-muted-foreground">v1.0 · Global Operations</span>
      </div>
    </footer>
  );
}

function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hash = useRouterState({ select: (s) => s.location.hash });

  useEffect(() => {
    if (!hash) return;
    const id = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => window.clearTimeout(id);
  }, [pathname, hash]);

  return (
    <motion.main
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <PageTransition>{children}</PageTransition>
      <SiteFooter />
    </>
  );
}
