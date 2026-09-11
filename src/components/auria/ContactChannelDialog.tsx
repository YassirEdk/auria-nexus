import { motion, AnimatePresence } from "motion/react";
import { X, MessageCircle, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

const WA_NUMBER = "212625461733";
const EMAIL = "aureacompany907@gmail.com";

export type ChannelPayload = { subject: string; body: string };

/** Small modal that lets the visitor send a prepared message via WhatsApp or
 *  Gmail. Rendered by whichever form built the payload; `null` payload = closed. */
export function ContactChannelDialog({
  payload,
  onClose,
}: {
  payload: ChannelPayload | null;
  onClose: () => void;
}) {
  const { t } = useTranslation();

  const openWhatsApp = () => {
    if (!payload) return;
    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(payload.body)}`,
      "_blank",
      "noopener",
    );
    onClose();
  };

  const openGmail = () => {
    if (!payload) return;
    const url =
      "https://mail.google.com/mail/?view=cm&fs=1" +
      `&to=${encodeURIComponent(EMAIL)}` +
      `&su=${encodeURIComponent(payload.subject)}` +
      `&body=${encodeURIComponent(payload.body)}`;
    window.open(url, "_blank", "noopener");
    onClose();
  };

  return (
    <AnimatePresence>
      {payload && (
        <>
          <motion.div
            key="cc-backdrop"
            className="fixed inset-0 z-[110] bg-background/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            key="cc-dialog"
            role="dialog"
            aria-modal="true"
            className="panel fixed left-1/2 top-1/2 z-[111] w-[min(92vw,420px)] -translate-x-1/2 -translate-y-1/2 border-line p-6 shadow-2xl"
            initial={{ opacity: 0, scale: 0.96, y: "-46%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%" }}
            exit={{ opacity: 0, scale: 0.96, y: "-46%" }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-heading">{t("channel.title")}</h3>
                <p className="mt-1 text-[13px] leading-6 text-muted-foreground">
                  {t("channel.copy")}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={t("channel.close")}
                className="grid size-8 shrink-0 place-items-center border border-line bg-black/60 text-muted-foreground transition-colors hover:border-blue/60 hover:text-heading"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-6 grid gap-3">
              <button
                type="button"
                onClick={openWhatsApp}
                className="group flex items-center gap-3 border border-line bg-black/40 p-3.5 text-start transition-colors hover:border-green/60 hover:bg-white/[0.03]"
              >
                <span className="grid size-9 flex-none place-items-center rounded-full bg-green/15">
                  <MessageCircle className="size-4 text-green" />
                </span>
                <span className="flex-1">
                  <span className="block text-[14px] font-semibold text-heading">
                    {t("channel.whatsapp")}
                  </span>
                  <span className="mono block text-[10px] uppercase tracking-widest text-sub-muted">
                    {t("channel.whatsappNote")}
                  </span>
                </span>
              </button>

              <button
                type="button"
                onClick={openGmail}
                className="group flex items-center gap-3 border border-line bg-black/40 p-3.5 text-start transition-colors hover:border-blue/60 hover:bg-white/[0.03]"
              >
                <span className="grid size-9 flex-none place-items-center rounded-full bg-blue/15">
                  <Mail className="size-4 text-blue" />
                </span>
                <span className="flex-1">
                  <span className="block text-[14px] font-semibold text-heading">
                    {t("channel.email")}
                  </span>
                  <span className="mono block text-[10px] uppercase tracking-widest text-sub-muted">
                    {t("channel.emailNote")}
                  </span>
                </span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
