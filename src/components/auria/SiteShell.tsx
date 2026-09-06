import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/services", "Services"],
  ["/industries", "Industries"],
  ["/how-we-work", "How We Work"],
  ["/contact", "Contact"],
] as const;

export function AuriaMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-3" aria-label="AURIA home">
      <span className="relative grid size-8 place-items-center border border-brand/50 text-[11px] font-semibold text-brand transition-transform duration-500 group-hover:rotate-45">
        <span className="-rotate-0 group-hover:-rotate-45">A</span>
      </span>
      {!compact && <span className="font-display text-lg font-semibold tracking-[0.24em]">AURIA</span>}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "glass-nav py-3" : "py-5"}`}>
      <div className="site-container flex items-center justify-between">
        <AuriaMark />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {links.map(([to, label]) => (
            <Link key={to} to={to} className="nav-link" activeProps={{ className: "nav-link text-brand" }}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button asChild variant="auriaGhost" size="lg">
            <Link to="/contact">Start a Partnership <ArrowUpRight /></Link>
          </Button>
        </div>
        <Button variant="iconGhost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav className="glass-nav absolute inset-x-0 top-full border-t border-border p-6 lg:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-1">
            {links.map(([to, label]) => (
              <Link key={to} to={to} onClick={() => setOpen(false)} className="py-3 text-xl font-medium">{label}</Link>
            ))}
            <Button asChild variant="auria" size="lg" className="mt-4"><Link to="/contact">Start a Partnership <ArrowUpRight /></Link></Button>
          </div>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-ink py-12 text-ink-foreground">
      <div className="site-container grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <div><AuriaMark /><p className="mt-5 max-w-md text-sm text-ink-muted">International Trading · Sourcing · Manufacturing · Logistics</p></div>
        <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
          <div className="space-y-3"><p className="eyebrow">Navigate</p>{links.slice(1).map(([to,label]) => <Link key={to} to={to} className="block text-ink-muted transition-colors hover:text-brand">{label}</Link>)}</div>
          <div className="space-y-3"><p className="eyebrow">Social</p><span className="block text-ink-muted">LinkedIn</span><span className="block text-ink-muted">WeChat</span><span className="block text-ink-muted">Instagram</span></div>
          <div className="space-y-3"><p className="eyebrow">Operations</p><span className="block text-ink-muted">China</span><span className="block text-ink-muted">Global</span></div>
        </div>
      </div>
      <div className="site-container mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-ink-muted sm:flex-row sm:justify-between"><span>© 2026 AURIA. All rights reserved.</span><span>China · Global Operations</span></div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return <><SiteHeader /><main>{children}</main><SiteFooter /></>;
}