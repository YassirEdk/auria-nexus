import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, Lock, Mail, Eye, EyeOff, ShieldCheck, Globe2, Boxes, AlertCircle, KeyRound, X } from "lucide-react";
import { AuriaLogo } from "@/components/auria/SiteShell";

const GOLD = "#F5C36B";

const highlights = [
  { icon: Boxes, title: "Live order dossiers", copy: "Every PO, inspection and shipment in one secure workspace." },
  { icon: Globe2, title: "Global lane tracking", copy: "ETA drift, customs status and lane risk from Shanghai to your port." },
  { icon: ShieldCheck, title: "Corroborated evidence", copy: "Two-source verified events — no single-source claims." },
];

function LoginPage() {
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-32 -top-32 size-[520px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.16), transparent 65%)" }}
        />
        <div
          className="absolute -bottom-40 -right-24 size-[560px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${GOLD}1f, transparent 65%)` }}
        />
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(circle at 50% 40%, #000 30%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 40%, #000 30%, transparent 78%)",
          }}
        />
      </div>

      <div className="relative grid min-h-screen lg:grid-cols-2">
        {/* Left — brand panel */}
        <aside className="relative hidden flex-col justify-between overflow-hidden border-r border-line p-10 lg:flex xl:p-14">
          <div className="flex items-center gap-3">
            <AuriaLogo className="size-8" />
            <span className="text-sm font-semibold uppercase tracking-[0.28em] text-heading">AURIA</span>
          </div>

          <div>
            <span className="label-mono" style={{ color: GOLD }}>
              Client Space · Espace client
            </span>
            <h1 className="mt-4 max-w-lg text-4xl font-bold leading-[1.06] tracking-tight text-heading xl:text-5xl">
              Your China operation, in one secure console.
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-muted-foreground">
              Sign in to track sourcing, production, inspections and live trade lanes — from the Shanghai hub to your door.
            </p>

            <ul className="mt-10 space-y-4">
              {highlights.map(({ icon: Icon, title, copy }) => (
                <li key={title} className="flex items-start gap-3.5">
                  <span
                    className="mt-0.5 grid size-9 flex-none place-items-center rounded-md border border-line"
                    style={{ background: "rgba(59,130,246,0.08)" }}
                  >
                    <Icon className="size-4 text-blue" />
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-heading">{title}</p>
                    <p className="text-[12px] leading-5 text-sub-muted">{copy}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="mono text-[10px] uppercase tracking-widest text-sub-muted">
            © 2026 AURIA · Encrypted session
          </p>
        </aside>

        {/* Right — login form */}
        <section className="flex items-center justify-center px-5 py-12 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[420px]"
          >
            {/* Top row: back to site (left) + mobile logo (right) */}
            <div className="mb-6 flex items-center justify-between gap-3">
              <Link
                to="/"
                className="mono flex cursor-pointer items-center gap-2 rounded-md border border-line px-3.5 py-2 text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-white/25 hover:bg-white/5 hover:text-heading"
              >
                <ArrowLeft className="size-3.5" />
                Back to site
              </Link>
              <div className="flex items-center gap-3 lg:hidden">
                <AuriaLogo className="size-7" />
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-heading">AURIA</span>
              </div>
            </div>

            <div className="panel p-6 sm:p-8">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] uppercase tracking-widest"
                style={{ color: GOLD, border: `1px solid ${GOLD}47`, background: `${GOLD}10` }}
              >
                <Lock className="size-3" />
                Client Space
              </span>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-heading">Sign in</h2>
              <p className="mt-1.5 text-[13px] text-muted-foreground">
                Welcome back. Enter your credentials to continue.
              </p>

              <form
                className="mt-7 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setError(false);
                  setSubmitting(true);
                  // No auth backend yet — always reject for now.
                  setTimeout(() => {
                    setSubmitting(false);
                    setError(true);
                  }, 700);
                }}
              >
                <label className="block space-y-2">
                  <span className="label-mono">Email</span>
                  <span className="relative block">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-sub-muted" />
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="name@company.com"
                      className="field-input pl-10"
                    />
                  </span>
                </label>

                <label className="block space-y-2">
                  <span className="flex items-center justify-between">
                    <span className="label-mono">Password</span>
                    <button
                      type="button"
                      onClick={() => setForgotOpen(true)}
                      className="mono cursor-pointer text-[10px] uppercase tracking-widest text-blue transition-colors hover:text-heading"
                    >
                      Forgot?
                    </button>
                  </span>
                  <span className="relative block">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-sub-muted" />
                    <input
                      type={showPw ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className="field-input px-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      aria-label={showPw ? "Hide password" : "Show password"}
                      className="absolute right-2.5 top-1/2 grid size-7 -translate-y-1/2 cursor-pointer place-items-center rounded text-sub-muted transition-colors hover:text-heading"
                    >
                      {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </span>
                </label>

                <label className="flex cursor-pointer items-center gap-2.5 pt-1 text-[13px] text-muted-foreground">
                  <input type="checkbox" className="size-4 cursor-pointer accent-blue" />
                  Keep me signed in for 30 days
                </label>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                    className="flex items-center gap-2 rounded-md border px-3 py-2.5 text-[13px]"
                    style={{ color: "#EF4444", borderColor: "rgba(239,68,68,0.28)", background: "rgba(239,68,68,0.08)" }}
                  >
                    <AlertCircle className="size-4 flex-none" />
                    Invalid email or password.
                  </motion.p>
                )}

                <button type="submit" disabled={submitting} className="btn-primary w-full cursor-pointer justify-center disabled:cursor-not-allowed">
                  {submitting ? "Signing in…" : "Sign in"}
                  {!submitting && <ArrowRight className="size-3.5" />}
                </button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-line" />
                <span className="mono text-[9px] uppercase tracking-widest text-sub-muted">New to AURIA</span>
                <span className="h-px flex-1 bg-line" />
              </div>

              <Link
                to="/contact"
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-line px-4 py-2.5 text-[13px] font-medium text-heading transition-colors hover:bg-white/5"
              >
                Request access
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

          </motion.div>
        </section>
      </div>

      <ForgotPasswordModal open={forgotOpen} onClose={() => setForgotOpen(false)} />
    </main>
  );
}

function ForgotPasswordModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // Reset transient state whenever the modal is opened.
  useEffect(() => {
    if (open) {
      setSubmitting(false);
      setNotFound(false);
    }
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center px-5"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 cursor-pointer bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Reset password"
            className="panel relative w-full max-w-[420px] p-6 sm:p-7"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 grid size-8 cursor-pointer place-items-center rounded-md text-sub-muted transition-colors hover:bg-white/5 hover:text-heading"
            >
              <X className="size-4" />
            </button>

            <span
              className="grid size-10 place-items-center rounded-lg border border-line"
              style={{ background: "rgba(59,130,246,0.08)" }}
            >
              <KeyRound className="size-4 text-blue" />
            </span>
            <h3 className="mt-4 text-xl font-bold tracking-tight text-heading">Reset your password</h3>
            <p className="mt-1.5 text-[13px] leading-6 text-muted-foreground">
              Enter the email linked to your Client Space and we'll send a reset link.
            </p>

            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setNotFound(false);
                setSubmitting(true);
                // No backend yet — always report the address as unknown.
                setTimeout(() => {
                  setSubmitting(false);
                  setNotFound(true);
                }, 700);
              }}
            >
              <label className="block space-y-2">
                <span className="label-mono">Email</span>
                <span className="relative block">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-sub-muted" />
                  <input
                    type="email"
                    required
                    autoFocus
                    autoComplete="email"
                    placeholder="name@company.com"
                    className="field-input pl-10"
                  />
                </span>
              </label>

              {notFound && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  className="flex items-center gap-2 rounded-md border px-3 py-2.5 text-[13px]"
                  style={{ color: "#EF4444", borderColor: "rgba(239,68,68,0.28)", background: "rgba(239,68,68,0.08)" }}
                >
                  <AlertCircle className="size-4 flex-none" />
                  There is no account linked to this email.
                </motion.p>
              )}

              <button type="submit" disabled={submitting} className="btn-primary w-full cursor-pointer justify-center disabled:cursor-not-allowed">
                {submitting ? "Checking…" : "Send reset link"}
                {!submitting && <ArrowRight className="size-3.5" />}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Client Space — Sign in · AURIA" },
      { name: "description", content: "Sign in to the AURIA Client Space to track sourcing, production and live trade lanes from China." },
    ],
  }),
  component: LoginPage,
});
