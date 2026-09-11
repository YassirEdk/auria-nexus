import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, X, ShieldCheck, MapPin, Clock } from "lucide-react";

const EVENT = "auria:request-access";

export function openRequestAccess() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(EVENT));
  }
}

export function RequestAccessModal() {
  const { t, i18n } = useTranslation();
  const rtl = i18n.language === "ar";
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});
  const setField = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  // WhatsApp desk that receives applications.
  const WA_NUMBER = "212625461733";

  const sendToWhatsApp = () => {
    const val = (k: string) => (form[k] || "").trim() || "—";
    const label = (k: string) => t(`requestAccess.${k}`);
    const lines = [
      t("requestAccess.waGreeting", { name: (form["fullName"] || "").trim() || "—" }),
      "",
      `${label("company")}: ${val("company")}`,
      `${label("email")}: ${val("email")}`,
      `${label("country")}: ${val("country")}`,
      `${label("volume")}: ${val("volume")}`,
      `${label("sourcing")}: ${val("sourcing")}`,
      `${label("message")}: ${val("message")}`,
    ];
    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, "_blank", "noopener");
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
                  sendToWhatsApp();
                  setOpen(false);
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
                    <span className="label-mono">{t(`requestAccess.${field}`)}</span>
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
                  <span className="label-mono">{t("requestAccess.message")}</span>
                  <textarea
                    rows={4}
                    value={form["message"] ?? ""}
                    onChange={(e) => setField("message", e.target.value)}
                    placeholder={t("requestAccess.messagePh")}
                    className="field-input resize-none"
                  />
                </label>
                <div className="flex flex-wrap items-center justify-between gap-3 sm:col-span-2">
                  <span className="status-badge tone-green">
                    <span className="status-dot" style={{ background: "#10B981", color: "#10B981" }} /> {t("requestAccess.encrypted")}
                  </span>
                  <button type="submit" className="btn-primary">
                    {t("requestAccess.submit")} <ArrowUpRight className="size-3.5 rtl:-scale-x-100" />
                  </button>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="relative mono flex items-center justify-between border-t border-line px-6 py-3 text-[10px] uppercase tracking-widest text-sub-muted md:px-8">
              <span className="inline-flex items-center gap-2">
                <span className="status-dot" style={{ background: "#10B981", color: "#10B981" }} />
                {t("requestAccess.channelEncrypted")}
              </span>
              <span>hello@auria.trade</span>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
