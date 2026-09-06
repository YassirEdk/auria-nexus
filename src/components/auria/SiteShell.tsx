import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "motion/react";

type NavLink = { label: string; to: "/" | "/contact"; hash?: string };

const links: readonly NavLink[] = [
  { label: "Index",    to: "/" },
  { label: "Studio",   to: "/", hash: "company" },
  { label: "Practice", to: "/", hash: "services" },
  { label: "Sectors",  to: "/", hash: "sectors" },
  { label: "Process",  to: "/", hash: "process" },
  { label: "Contact",  to: "/contact" },
];

export function Grain() {
  return <div className="grain" aria-hidden />;
}

export function AuriaMark({ blend = false }: { blend?: boolean }) {
  return (
    <Link to="/" className={`display inline-flex items-baseline gap-2 ${blend ? "nav-blend" : ""}`} aria-label="AURIA home">
      <span className="text-[15px] font-black tracking-[0.02em]">AURIA</span>
      <span className="mono text-[10px] uppercase tracking-[0.24em] opacity-60">/ 2026</span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

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

  return (
    <header className="fixed inset-x-0 top-0 z-50 nav-blend">
      <div className="site-container flex items-center justify-between px-6 py-8">
        <AuriaMark />
        <nav className="hidden items-center gap-12 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              hash={link.hash}
              onClick={goToSection(link)}
              className="link-underline text-[15px] font-medium tracking-tight"
              activeProps={link.hash ? undefined : { className: "link-underline text-[15px] font-medium tracking-tight" }}
              activeOptions={{ exact: link.to === "/" && !link.hash }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          className="grid size-11 place-items-center lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <nav
          className="fixed inset-x-0 top-24 z-40 h-[calc(100vh-6rem)] overflow-y-auto bg-black lg:hidden"
          aria-label="Mobile"
        >
          <ul className="divide-y divide-white/10">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  hash={link.hash}
                  onClick={goToSection(link)}
                  className="display block px-6 py-8 text-4xl font-medium tracking-tight text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[color:var(--ghost)] text-black">
      <div className="site-container border-b border-black/20 px-6 py-8 lg:py-14">
        <h2 className="display font-black uppercase leading-[0.86] tracking-[-0.03em]" style={{ fontSize: "clamp(3rem, 12vw, 15rem)" }}>
          <Link to="/contact" className="block">
            Start a<br />
            <span className="italic font-thin">project</span>
          </Link>
        </h2>
      </div>
      <div className="site-container grid gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="mono text-[10px] uppercase tracking-[0.22em] text-black/50">/ Channels</p>
          <ul className="mt-6 space-y-2 text-lg">
            <li><a className="wavy-underline" href="#">LinkedIn</a></li>
            <li><a className="wavy-underline" href="#">WeChat</a></li>
            <li><a className="wavy-underline" href="#">Instagram</a></li>
          </ul>
        </div>
        <div>
          <p className="mono text-[10px] uppercase tracking-[0.22em] text-black/50">/ Contact</p>
          <a href="mailto:hello@auria.trade" className="display mt-6 block text-3xl font-medium tracking-tight wavy-underline">
            hello@auria.trade
          </a>
          <p className="mono mt-6 text-xs uppercase tracking-widest text-black/60">
            China · Global operations
          </p>
        </div>
        <div className="flex flex-col items-start justify-between gap-6 md:items-end">
          <p className="mono text-[10px] uppercase tracking-[0.22em] text-black/50">/ Node 001</p>
          <p className="mono max-w-xs text-right text-xs uppercase tracking-widest text-black/60">
            © 2026 AURIA · All rights reserved · Registered in the People&apos;s Republic of China
          </p>
        </div>
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.main>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Grain />
      <SiteHeader />
      <PageTransition>{children}</PageTransition>
      <SiteFooter />
    </>
  );
}
