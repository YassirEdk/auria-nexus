import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ScanLine } from "lucide-react";
import { SiteLayout } from "@/components/auria/SiteShell";
import { ContactSection } from "@/components/auria/AuriaHome";
import qrWechat from "@/assets/WhatsApp Image 2026-09-05 at 20.40.35.jpeg";
import qrWhatsapp from "@/assets/WhatsApp Image 2026-09-05 at 20.40.34.jpeg";

function QrCard({
  src,
  label,
  handle,
  tone,
}: {
  src: string;
  label: string;
  handle: string;
  tone: "green" | "blue";
}) {
  const color = tone === "green" ? "#10B981" : "#3B82F6";
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="panel scan-line-container relative overflow-hidden p-6 md:p-8"
    >
      <div className="flex items-center justify-between border-b border-line pb-3">
        <div className="flex items-center gap-2">
          <span className="status-dot" style={{ background: color, color }} />
          <span className="label-mono text-heading">{label}</span>
        </div>
        <span className="mono text-[10px] uppercase tracking-widest text-sub-muted">
          <ScanLine className="mr-1 inline size-3" />
          scan
        </span>
      </div>

      <div className="relative mx-auto mt-6 grid aspect-square w-full max-w-[320px] place-items-center bg-white p-4">
        <span
          aria-hidden
          className="pointer-events-none absolute left-2 top-2 size-4 border-l-2 border-t-2"
          style={{ borderColor: color }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-2 top-2 size-4 border-r-2 border-t-2"
          style={{ borderColor: color }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute left-2 bottom-2 size-4 border-l-2 border-b-2"
          style={{ borderColor: color }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-2 bottom-2 size-4 border-r-2 border-b-2"
          style={{ borderColor: color }}
        />
        <img
          src={src}
          alt={`${label} QR code`}
          loading="lazy"
          decoding="async"
          className="h-full w-full select-none object-contain"
          draggable={false}
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      <div className="mono mt-6 flex items-center justify-between border-t border-line pt-3 text-[10px] uppercase tracking-widest text-sub-muted">
        <span>{handle}</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="status-dot" style={{ background: color, color }} />
          channel · live
        </span>
      </div>
    </motion.div>
  );
}

function QrSection() {
  return (
    <section className="border-b border-line py-24 lg:py-32">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="label-mono">/ Direct channels</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading md:text-5xl">
            Talk to the desk. Scan to connect.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
            Point your phone camera at either code to reach an AURIA operator on WeChat or WhatsApp — no forms, no wait.
          </p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
          <QrCard
            src={qrWechat}
            label="WeChat · 微信"
            handle="AURIA · Shanghai desk"
            tone="blue"
          />
          <QrCard
            src={qrWhatsapp}
            label="WhatsApp"
            handle="AURIA · Global desk"
            tone="green"
          />
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <SiteLayout>
      <section className="scan-line-container relative border-b border-line pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="site-container">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="status-badge tone-blue"
          >
            <span className="status-dot" style={{ background: "#3B82F6", color: "#3B82F6" }} />
            Contact
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-5xl text-4xl font-bold leading-[1.05] tracking-tight text-heading md:text-6xl"
          >
            Open a secure channel<br />
            <span className="text-muted-foreground">with an AURIA operator.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg"
          >
            Share your product, quantity and destination. Confirmation and a first response within one working day.
          </motion.p>
        </div>
      </section>
      <QrSection />
      <ContactSection />
    </SiteLayout>
  );
}

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact AURIA — Apply Now" },
      { name: "description", content: "Open a secure channel with an AURIA operator for sourcing, manufacturing and logistics from China. WeChat and WhatsApp available." },
    ],
  }),
  component: ContactPage,
});
