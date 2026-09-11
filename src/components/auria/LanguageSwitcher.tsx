import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/useLanguage";
import type { LanguageCode } from "@/i18n";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { current, setLanguage, languages } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const active = languages.find((l) => l.code === current) ?? languages[0]!;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line text-muted-foreground transition-colors hover:border-white/25 hover:text-heading ${
          compact ? "px-2.5 py-1.5" : "px-3 py-2"
        }`}
      >
        <Globe className="size-3.5" />
        <span className="mono text-[11px] font-medium uppercase tracking-widest">{active.short}</span>
        <ChevronDown className={`size-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            role="listbox"
            className="panel absolute right-0 z-50 mt-2 min-w-[168px] overflow-hidden p-1.5 shadow-2xl rtl:left-0 rtl:right-auto"
          >
            {languages.map((l) => {
              const selected = l.code === current;
              return (
                <li key={l.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      setLanguage(l.code as LanguageCode);
                      setOpen(false);
                    }}
                    className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2 text-[13px] transition-colors hover:bg-white/5 ${
                      selected ? "text-heading" : "text-muted-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="mono text-[10px] uppercase tracking-widest text-sub-muted">{l.short}</span>
                      <span>{l.label}</span>
                    </span>
                    {selected && <Check className="size-3.5 text-blue" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
