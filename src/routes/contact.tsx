import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { ScanLine } from "lucide-react";
import { SiteLayout, accentForPath } from "@/components/auria/SiteShell";
import { ContactSection } from "@/components/auria/AuriaHome";
import qrWechat from "@/assets/WhatsApp Image 2026-09-05 at 20.40.35.jpeg";
import qrWhatsapp from "@/assets/WhatsApp Image 2026-09-05 at 20.40.34.jpeg";
import { buildMeta, buildLinks, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

/** Renders a QR image with its white background knocked out to transparent, so
 *  the (coloured) modules sit directly on the dark card instead of a white box.
 *  Done on a canvas at load time; the source JPEGs have no alpha channel. */
function QrImage({
  src,
  alt,
  recolorDark,
}: {
  src: string;
  alt: string;
  // If set, the (dark) QR modules are recoloured to this [r,g,b] so they stay
  // visible on the dark card — used for black-on-white QRs. Omit to keep the
  // source colours (e.g. the violet WeChat code).
  recolorDark?: [number, number, number];
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let cancelled = false;
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      if (cancelled) return;
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const image = ctx.getImageData(0, 0, w, h);
      const px = image.data;
      for (let i = 0; i < px.length; i += 4) {
        const r = px[i] ?? 0;
        const g = px[i + 1] ?? 0;
        const b = px[i + 2] ?? 0;
        // Near-white (incl. JPEG's slightly-off-white halo) → fully transparent.
        if (r > 200 && g > 200 && b > 200) {
          px[i + 3] = 0;
        } else if (recolorDark) {
          px[i] = recolorDark[0];
          px[i + 1] = recolorDark[1];
          px[i + 2] = recolorDark[2];
        }
      }
      ctx.putImageData(image, 0, 0);
    };
    img.src = src;
    return () => { cancelled = true; };
  }, [src, recolorDark]);
  return (
    <canvas
      ref={ref}
      role="img"
      aria-label={alt}
      className="h-full w-full select-none"
      style={{ imageRendering: "pixelated" }}
    />
  );
}

// Near-white light tone for recolouring dark (black) QR modules on the dark card.
const QR_LIGHT: [number, number, number] = [232, 236, 244];

function QrCard({
  src,
  label,
  handle,
  tone,
  recolorDark,
}: {
  src: string;
  label: string;
  handle: string;
  tone: "green" | "blue";
  recolorDark?: [number, number, number];
}) {
  const { t } = useTranslation();
  const color = tone === "green" ? "#10B981" : "#3B82F6";
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="panel scan-line-container relative overflow-hidden p-5 sm:p-6 md:p-8"
    >
      <div className="flex items-center justify-between border-b border-line pb-3">
        <div className="flex items-center gap-2">
          <span className="status-dot" style={{ background: color, color }} />
          <span className="label-mono text-heading">{label}</span>
        </div>
        <span className="mono text-[10px] uppercase tracking-widest text-sub-muted">
          <ScanLine className="mr-1 inline size-3" />
          {t("contact.scan")}
        </span>
      </div>

      <div className="relative mx-auto mt-6 grid aspect-square w-full max-w-[320px] place-items-center p-4">
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
        <QrImage src={src} alt={`${label} QR code`} {...(recolorDark ? { recolorDark } : {})} />
      </div>

      <div className="mono mt-6 flex items-center justify-between border-t border-line pt-3 text-[10px] uppercase tracking-widest text-sub-muted">
        <span>{handle}</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="status-dot" style={{ background: color, color }} />
          {t("contact.channelLive")}
        </span>
      </div>
    </motion.div>
  );
}

function QrSection() {
  const { t } = useTranslation();
  return (
    <section className="border-b border-line py-14 sm:py-20 lg:py-32">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="label-mono">{t("contact.directEyebrow")}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading md:text-5xl">
            {t("contact.directTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
            {t("contact.directCopy")}
          </p>
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:mt-14 sm:grid-cols-2">
          <QrCard
            src={qrWechat}
            label="WeChat · 微信"
            handle={t("contact.wechatHandle")}
            tone="blue"
          />
          <QrCard
            src={qrWhatsapp}
            label="WhatsApp"
            handle={t("contact.whatsappHandle")}
            tone="green"
            recolorDark={QR_LIGHT}
          />
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const accent = accentForPath(pathname);
  return (
    <SiteLayout>
      <section className="scan-line-container relative border-b border-line pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">
        <div className="site-container">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="status-badge"
            style={{
              color: accent.light,
              borderColor: `color-mix(in srgb, ${accent.dark} 55%, transparent)`,
              background: `color-mix(in srgb, ${accent.light} 8%, transparent)`,
            }}
          >
            <span className="status-dot" style={{ background: accent.light, color: accent.light }} />
            {t("contact.headerEyebrow")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-5xl text-[30px] font-bold leading-[1.08] tracking-tight text-heading sm:text-4xl sm:leading-[1.05] md:text-6xl"
          >
            {t("contact.headerTitle1")}<br />
            <span className="text-muted-foreground">{t("contact.headerTitle2")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-2xl text-[15px] leading-6 text-muted-foreground sm:mt-6 sm:text-base sm:leading-7 md:text-lg"
          >
            {t("contact.headerIntro")}
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
    meta: buildMeta({
      path: "/contact",
      title: "Contact AURIA — Talk to a China Sourcing Operator",
      description:
        "Open a secure channel with an AURIA operator for China sourcing, trading and logistics. Reply within one business day. WeChat and WhatsApp available.",
      keywords: [
        "contact china sourcing",
        "china sourcing agent contact",
        "wechat china sourcing",
        "whatsapp china supplier",
        "auria contact",
      ],
    }),
    links: buildLinks("/contact"),
    scripts: [
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])
      ),
    ],
  }),
  component: ContactPage,
});
