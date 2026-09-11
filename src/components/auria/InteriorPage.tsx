import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { SiteLayout } from "./SiteShell";
import { openRequestAccess } from "./RequestAccessModal";

export function InteriorPage({
  code = "00",
  eyebrow,
  title,
  subtitle,
  intro,
  children,
}: {
  code?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  intro: string;
  children?: React.ReactNode;
}) {
  const { t } = useTranslation();
  return (
    <SiteLayout>
      <section className="scan-line-container relative border-b border-line pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">
        <div className="site-container">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="status-badge tone-blue"
          >
            <span className="status-dot" style={{ background: "#3B82F6", color: "#3B82F6" }} />
            {code ? `/ ${code} · ${eyebrow}` : eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-5xl text-[30px] font-bold leading-[1.08] tracking-tight text-heading sm:text-4xl sm:leading-[1.05] md:text-6xl"
          >
            {title}
            {subtitle && (
              <>
                <br />
                <span className="text-muted-foreground">{subtitle}</span>
              </>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-2xl text-[15px] leading-6 text-muted-foreground sm:mt-6 sm:text-base sm:leading-7 md:text-lg"
          >
            {intro}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10"
          >
            <button type="button" onClick={openRequestAccess} className="btn-primary">
              {t("cta.applyNow")} <ArrowUpRight className="size-3.5 rtl:-scale-x-100" />
            </button>
            <Link to="/" className="btn-ghost-line">
              {t("cta.backToHome")} <ArrowRight className="size-3.5 rtl:-scale-x-100" />
            </Link>
          </motion.div>
        </div>
      </section>
      {children}
    </SiteLayout>
  );
}
