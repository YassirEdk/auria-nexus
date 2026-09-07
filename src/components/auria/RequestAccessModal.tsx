import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, X, ShieldCheck, MapPin, Clock } from "lucide-react";

const EVENT = "auria:request-access";

export function openRequestAccess() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(EVENT));
  }
}

export function RequestAccessModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener(EVENT, onOpen as EventListener);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(EVENT, onOpen as EventListener);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const html = document.documentElement;
    const prevBody = body.style.overflow;
    const prevHtml = html.style.overflow;
    const scrollY = window.scrollY;
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    return () => {
      body.style.overflow = prevBody;
      html.style.overflow = prevHtml;
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="ra-backdrop"
            className="fixed inset-0 z-[100] bg-background/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            key="ra-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="scan-line-container panel fixed right-0 top-0 z-[101] flex h-full w-full max-w-[560px] flex-col overflow-hidden border-l border-line shadow-2xl"
            role="dialog"
            aria-modal="true"
          >
            {/* Ambient glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(ellipse at 20% 0%, rgba(59,130,246,0.14), transparent 55%), radial-gradient(ellipse at 90% 100%, rgba(16,185,129,0.08), transparent 60%)",
              }}
            />

            {/* Header */}
            <div className="relative flex items-start justify-between border-b border-line p-6 md:p-8">
              <div>
                <span className="status-badge tone-blue">
                  <span className="status-dot" style={{ background: "#3B82F6", color: "#3B82F6" }} />
                  Application · Intake
                </span>
                <h2 className="mt-4 text-2xl font-bold leading-tight text-heading md:text-3xl">
                  Apply to work<br />
                  <span className="text-muted-foreground">with an AURIA operator.</span>
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-9 shrink-0 place-items-center border border-line bg-black/60 text-muted-foreground transition-colors hover:border-blue/60 hover:text-heading"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Body */}
            <div className="relative flex-1 overflow-hidden p-6 md:p-8">
              <p className="text-[13px] leading-6 text-muted-foreground">
                We take on a limited number of new mandates each quarter. Submit your brief to be reviewed by an operator — response within one working day.
              </p>

              <ul className="mt-6 grid gap-3 border-y border-line py-5 sm:grid-cols-3">
                {[
                  { icon: ShieldCheck, t: "Corroborated", s: "no disclosure" },
                  { icon: MapPin, t: "4 CN offices", s: "on-site" },
                  { icon: Clock, t: "≤ 48h reply", s: "scoping call" },
                ].map(({ icon: Icon, t, s }) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="grid size-8 shrink-0 place-items-center border border-line bg-black/40">
                      <Icon className="size-4 text-blue" />
                    </span>
                    <div>
                      <p className="text-[12px] font-semibold text-heading">{t}</p>
                      <p className="mono text-[9px] uppercase tracking-widest text-sub-muted">{s}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <form
                className="mt-6 grid gap-4 sm:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setOpen(false);
                }}
              >
                {[
                  ["Full Name", "text", "Your name", false],
                  ["Company", "text", "Company name", false],
                  ["Business Email", "email", "name@company.com", true],
                  ["Country", "text", "Country", false],
                  ["Estimated Volume", "text", "Qty or budget", false],
                  ["What are you sourcing?", "text", "Product or category", true],
                ].map(([label, type, placeholder, wide]) => (
                  <label key={String(label)} className={`space-y-2 ${wide ? "sm:col-span-2" : ""}`}>
                    <span className="label-mono">{label}</span>
                    <input type={type as string} placeholder={placeholder as string} className="field-input" />
                  </label>
                ))}
                <label className="space-y-2 sm:col-span-2">
                  <span className="label-mono">Message</span>
                  <textarea rows={4} placeholder="Specifications, timeline and destination" className="field-input resize-none" />
                </label>
                <div className="flex flex-wrap items-center justify-between gap-3 sm:col-span-2">
                  <span className="status-badge tone-green">
                    <span className="status-dot" style={{ background: "#10B981", color: "#10B981" }} /> Encrypted
                  </span>
                  <button type="submit" className="btn-primary">
                    Submit Application <ArrowUpRight className="size-3.5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="relative mono flex items-center justify-between border-t border-line px-6 py-3 text-[10px] uppercase tracking-widest text-sub-muted md:px-8">
              <span className="inline-flex items-center gap-2">
                <span className="status-dot" style={{ background: "#10B981", color: "#10B981" }} />
                channel · encrypted
              </span>
              <span>hello@auria.trade</span>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
