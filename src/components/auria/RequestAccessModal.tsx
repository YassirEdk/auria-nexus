import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, X, ShieldCheck, MapPin, Clock, HelpCircle } from "lucide-react";

const EVENT = "auria:request-access";
const WA_NUMBER = "212625461733";
const EMAIL = "aureacompany907@gmail.com";

export function openRequestAccess() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(EVENT));
  }
}

function WhatsAppLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#25D366"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.004c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"
      />
      <path
        fill="#fff"
        d="M9.53 7.33c-.18-.4-.36-.41-.53-.42l-.45-.01c-.16 0-.41.06-.63.29-.22.23-.83.81-.83 1.98s.85 2.3.97 2.46c.12.16 1.65 2.64 4.07 3.6 2.01.79 2.42.63 2.86.59.44-.04 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19-.71-.63-1.19-1.42-1.33-1.66-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.32-.74-1.8z"
      />
    </svg>
  );
}

function GmailLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#4caf50" d="M45 16.2l-5 2.75-5 4.75V40h7a3 3 0 0 0 3-3V16.2z" />
      <path fill="#1e88e5" d="M3 16.2l3.61 1.71L13 23.7V40H6a3 3 0 0 1-3-3V16.2z" />
      <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" />
      <path fill="#c62828" d="M3 12.3v3.9l10 7.5V11.2L9.88 8.86C6.24 6.13 3 8.85 3 12.3z" />
      <path fill="#fbc02d" d="M45 12.3v3.9l-10 7.5V11.2l3.12-2.34C41.76 6.13 45 8.85 45 12.3z" />
    </svg>
  );
}

export function RequestAccessModal() {
  const { t, i18n } = useTranslation();
  const rtl = i18n.language === "ar";
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});
  const [showChannels, setShowChannels] = useState(false);
  const [error, setError] = useState(false);
  const channelsWrapRef = useRef<HTMLDivElement | null>(null);
  const REQUIRED = ["fullName", "company", "email", "country", "volume", "sourcing", "message"] as const;
  const setField = (key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (error) setError(false);
    // Editing after the channel picker is shown re-hides it so the send is re-confirmed.
    if (showChannels) setShowChannels(false);
  };

  const onSubmit = () => {
    if (!REQUIRED.every((k) => (form[k] || "").trim() !== "")) {
      setError(true);
      setShowChannels(false);
      return;
    }
    setError(false);
    setShowChannels(true);
  };

  const sendVia = (channel: "whatsapp" | "gmail") => {
    const name = (form["fullName"] || "").trim() || "—";
    const val = (k: string) => (form[k] || "").trim() || "—";
    const label = (k: string) => t(`requestAccess.${k}`);
    const body = [
      t("requestAccess.waGreeting", { name }),
      "",
      `${label("company")}: ${val("company")}`,
      `${label("email")}: ${val("email")}`,
      `${label("country")}: ${val("country")}`,
      `${label("volume")}: ${val("volume")}`,
      `${label("sourcing")}: ${val("sourcing")}`,
      `${label("message")}: ${val("message")}`,
    ].join("\n");

    if (channel === "whatsapp") {
      window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(body)}`, "_blank", "noopener");
    } else {
      const url =
        "https://mail.google.com/mail/?view=cm&fs=1" +
        `&to=${encodeURIComponent(EMAIL)}` +
        `&su=${encodeURIComponent(t("channel.subjectApplication", { name }))}` +
        `&body=${encodeURIComponent(body)}`;
      window.open(url, "_blank", "noopener");
    }
    setShowChannels(false);
  };

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

  // Dismiss the send-via popup when the user clicks outside it (the submit
  // button lives in the same wrapper, so re-clicking Submit Application still
  // re-opens the picker via the form's onSubmit).
  useEffect(() => {
    if (!showChannels) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      const node = channelsWrapRef.current;
      if (node && !node.contains(e.target as Node)) setShowChannels(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [showChannels]);

  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const html = document.documentElement;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyPadRight = body.style.paddingRight;
    const scrollbarW = window.innerWidth - html.clientWidth;
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    if (scrollbarW > 0) body.style.paddingRight = `${scrollbarW}px`;
    return () => {
      body.style.overflow = prevBodyOverflow;
      html.style.overflow = prevHtmlOverflow;
      body.style.paddingRight = prevBodyPadRight;
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
            initial={{ x: rtl ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: rtl ? "-100%" : "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={`scan-line-container panel fixed top-0 z-[101] flex h-full w-full max-w-[560px] flex-col overflow-hidden border-line shadow-2xl ${
              rtl ? "left-0 border-r" : "right-0 border-l"
            }`}
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
                  {t("requestAccess.badge")}
                </span>
                <h2 className="mt-4 text-2xl font-bold leading-tight text-heading md:text-3xl">
                  {t("requestAccess.title1")}<br />
                  <span className="text-muted-foreground">{t("requestAccess.title2")}</span>
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-9 shrink-0 place-items-center border border-line bg-black/60 text-muted-foreground transition-colors hover:border-blue/60 hover:text-heading"
                aria-label={t("requestAccess.close")}
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Body */}
            <div
              className="has-scrollbar relative flex-1 overflow-y-auto overscroll-contain p-6 md:p-8"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <p className="text-[13px] leading-6 text-muted-foreground">
                {t("requestAccess.intro")}
              </p>

              <ul className="mt-6 grid gap-3 border-y border-line py-5 sm:grid-cols-3">
                {[
                  { icon: ShieldCheck, t: t("requestAccess.feat1t"), s: t("requestAccess.feat1s") },
                  { icon: MapPin, t: t("requestAccess.feat2t"), s: t("requestAccess.feat2s") },
                  { icon: Clock, t: t("requestAccess.feat3t"), s: t("requestAccess.feat3s") },
                ].map(({ icon: Icon, t: title, s }) => (
                  <li key={title} className="flex items-start gap-3">
                    <span className="grid size-8 shrink-0 place-items-center border border-line bg-black/40">
                      <Icon className="size-4 text-blue" />
                    </span>
                    <div>
                      <p className="text-[12px] font-semibold text-heading">{title}</p>
                      <p className="mono text-[9px] uppercase tracking-widest text-sub-muted">{s}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <form
                className="mt-6 grid gap-4 sm:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit();
                }}
              >
                {([
                  ["fullName", "text", false],
                  ["company", "text", false],
                  ["email", "email", true],
                  ["country", "text", false],
                  ["volume", "text", false],
                  ["sourcing", "text", true],
                ] as const).map(([field, type, wide]) => (
                  <label key={field} className={`space-y-2 ${wide ? "sm:col-span-2" : ""}`}>
                    <span className="label-mono">
                      {t(`requestAccess.${field}`)} <span className="text-red">*</span>
                    </span>
                    <input
                      type={type}
                      value={form[field] ?? ""}
                      onChange={(e) => setField(field, e.target.value)}
                      placeholder={t(`requestAccess.${field}Ph`)}
                      className="field-input"
                    />
                  </label>
                ))}
                <label className="space-y-2 sm:col-span-2">
                  <span className="label-mono">
                    {t("requestAccess.message")} <span className="text-red">*</span>
                  </span>
                  <textarea
                    rows={4}
                    value={form["message"] ?? ""}
                    onChange={(e) => setField("message", e.target.value)}
                    placeholder={t("requestAccess.messagePh")}
                    className="field-input resize-none"
                  />
                </label>
                {error && (
                  <p role="alert" className="sm:col-span-2 text-[13px] font-medium text-red">
                    {t("requestAccess.fillAll")}
                  </p>
                )}
                <div className="flex flex-wrap items-center justify-between gap-3 sm:col-span-2">
                  <Link
                    to="/contact"
                    onClick={() => setOpen(false)}
                    className="group inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-line bg-black/40 px-[calc(1rem-1px)] py-[calc(0.65rem-1px)] text-[0.8125rem] font-semibold text-heading transition-all hover:border-blue/60 hover:bg-blue/[0.08]"
                  >
                    <HelpCircle className="size-3.5 text-blue" />
                    {t("requestAccess.haveQuestion")}
                  </Link>
                  <div className="relative" ref={channelsWrapRef}>
                    {showChannels && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.85, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute bottom-full left-1/2 z-20 mb-3 origin-bottom rounded-xl border border-line bg-[#0d1017]/95 p-3 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.75)] ring-1 ring-white/5 backdrop-blur-md"
                      >
                        <p className="mb-2.5 text-center mono text-[9px] uppercase tracking-[0.18em] text-sub-muted">
                          {t("channel.sendVia")}
                        </p>
                        <div className="flex items-stretch gap-2.5">
                          <button
                            type="button"
                            onClick={() => sendVia("whatsapp")}
                            aria-label={t("channel.whatsapp")}
                            className="group flex w-[84px] flex-col items-center gap-1.5 rounded-lg border border-line bg-white/[0.02] px-3 py-3 transition-all hover:-translate-y-0.5 hover:border-green/60 hover:bg-green/10"
                          >
                            <WhatsAppLogo className="size-7 transition-transform group-hover:scale-110" />
                            <span className="text-[11px] font-semibold text-heading">WhatsApp</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => sendVia("gmail")}
                            aria-label="Gmail"
                            className="group flex w-[84px] flex-col items-center gap-1.5 rounded-lg border border-line bg-white/[0.02] px-3 py-3 transition-all hover:-translate-y-0.5 hover:border-blue/60 hover:bg-blue/10"
                          >
                            <GmailLogo className="size-7 transition-transform group-hover:scale-110" />
                            <span className="text-[11px] font-semibold text-heading">Gmail</span>
                          </button>
                        </div>
                        <span
                          aria-hidden
                          className="absolute left-1/2 top-full -ml-1.5 -mt-1.5 size-3 rotate-45 rounded-[2px] border-b border-r border-line bg-[#0d1017]"
                        />
                      </motion.div>
                    )}
                    <button type="submit" className="btn-primary">
                      {t("requestAccess.submit")} <ArrowUpRight className="size-3.5 rtl:-scale-x-100" />
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="relative mono flex items-center justify-end border-t border-line px-6 py-3 text-[10px] uppercase tracking-widest text-sub-muted md:px-8">
              <span>aureacompany907@gmail.com</span>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
