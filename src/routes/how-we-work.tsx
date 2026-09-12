import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { ArrowUpRight, FileSearch, ClipboardCheck, Factory, Ship, PackageCheck } from "lucide-react";
import { InteriorPage } from "@/components/auria/InteriorPage";
import { buildMeta, buildLinks, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

const steps = [
  { icon: FileSearch, step: "01", key: "step1" },
  { icon: ClipboardCheck, step: "02", key: "step2" },
  { icon: Factory, step: "03", key: "step3" },
  { icon: PackageCheck, step: "04", key: "step4" },
  { icon: Ship, step: "05", key: "step5" },
] as const;

const guarantees = ["g1", "g2", "g3", "g4", "g5", "g6"] as const;

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function HowWeWorkContent() {
  const { t } = useTranslation();
  return (
    <>
      <section className="border-b border-line py-14 sm:py-20 lg:py-32">
        <div className="site-container">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="section-eyebrow">{t("howWeWork.workflowEyebrow")}</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading md:text-5xl">
                {t("howWeWork.workflowTitle")}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                {t("howWeWork.workflowCopy")}
              </p>
            </div>
          </Reveal>

          <div className="mx-auto mt-10 max-w-5xl sm:mt-14">
            <ol className="relative border-l border-line rtl:border-l-0 rtl:border-r">
              {steps.map(({ icon: Icon, step, key }, i) => {
                const signals = t(`howWeWork.${key}Signals`, { returnObjects: true }) as string[];
                return (
                  <Reveal key={step} delay={i * 0.06}>
                    <li className="relative py-6 pl-6 sm:py-8 sm:pl-10 rtl:pl-0 rtl:pr-6 sm:rtl:pr-10">
                      <span
                        className="absolute -left-[7px] top-8 size-3.5 rounded-full ring-4 ring-background sm:top-10 rtl:left-auto rtl:-right-[7px]"
                        style={{ background: "#3B82F6" }}
                      />
                      <div className="panel p-5 sm:p-6 md:p-8">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-3 sm:gap-4">
                            <span className="grid size-10 shrink-0 place-items-center border border-line bg-black/40">
                              <Icon className="size-5 text-blue" />
                            </span>
                            <div className="min-w-0">
                              <span className="mono text-[10px] uppercase tracking-widest text-sub-muted">{t("howWeWork.stepLabel")} · {step}</span>
                              <p className="text-base font-semibold text-heading sm:text-lg md:text-xl">{t(`howWeWork.${key}Title`)}</p>
                              <p className="mono text-[10px] uppercase tracking-widest text-blue">{t(`howWeWork.${key}Sub`)}</p>
                            </div>
                          </div>
                          <span className="status-badge tone-blue">
                            <span className="status-dot" style={{ background: "#3B82F6", color: "#3B82F6" }} />
                            {t("howWeWork.slaLabel")} · {t(`howWeWork.${key}Sla`)}
                          </span>
                        </div>
                        <p className="mt-5 text-[14px] leading-7 text-muted-foreground sm:mt-6 md:text-[15px]">{t(`howWeWork.${key}Body`)}</p>
                        <div className="mt-5 grid grid-cols-1 gap-2 border-t border-line pt-4 sm:mt-6 sm:grid-cols-2 lg:grid-cols-4">
                          {signals.map((s) => (
                            <div key={s} className="mono flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                              <span className="status-dot" style={{ background: "#10B981", color: "#10B981" }} />
                              {s}
                            </div>
                          ))}
                        </div>
                      </div>
                    </li>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-b border-line py-14 sm:py-20 lg:py-32">
        <div className="site-container">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="section-eyebrow">{t("howWeWork.guaranteesEyebrow")}</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading md:text-5xl">
                {t("howWeWork.guaranteesTitle")}
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:mt-14 sm:grid-cols-2 md:grid-cols-3">
            {guarantees.map((g) => (
              <Reveal key={g}>
                <div className="panel p-6 md:p-7">
                  <span className="label-mono">{t(`howWeWork.${g}k`)}</span>
                  <p className="mono mt-3 text-3xl font-semibold text-blue">{t(`howWeWork.${g}v`)}</p>
                  <p className="mt-3 border-t border-line pt-3 text-[13px] leading-6 text-muted-foreground">{t(`howWeWork.${g}label`)}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:mt-14">
              <Link to="/contact" className="btn-primary">
                {t("howWeWork.ctaBrief")} <ArrowUpRight className="size-3.5 rtl:-scale-x-100" />
              </Link>
              <Link to="/services" className="btn-ghost-line">
                {t("howWeWork.ctaServices")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function HowWeWorkHeader() {
  const { t } = useTranslation();
  return (
    <InteriorPage
      code=""
      eyebrow={t("howWeWork.headerEyebrow")}
      title={t("howWeWork.headerTitle")}
      subtitle={t("howWeWork.headerSubtitle")}
      intro={t("howWeWork.headerIntro")}
    >
      <HowWeWorkContent />
    </InteriorPage>
  );
}

export const Route = createFileRoute("/how-we-work")({
  head: () => ({
    meta: buildMeta({
      path: "/how-we-work",
      title: "How AURIA Works — China Sourcing & Import Process",
      description:
        "AURIA's transparent five-step process: brief, supplier scouting, factory verification, quality control and international logistics — with SLAs and evidence packs.",
      keywords: [
        "how to import from china",
        "china sourcing process",
        "china factory audit",
        "china quality inspection",
        "china order management",
      ],
    }),
    links: buildLinks("/how-we-work"),
    scripts: [
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "How we work", path: "/how-we-work" },
        ])
      ),
    ],
  }),
  component: HowWeWorkHeader,
});
