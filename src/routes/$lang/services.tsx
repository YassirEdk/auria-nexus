import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@/lib/link";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import {
  Search, BadgeCheck, Handshake, ShieldCheck, Factory, Warehouse,
  Ship, FileText, Tags, Wrench, ArrowUpRight,
} from "lucide-react";
import { InteriorPage } from "@/components/auria/InteriorPage";
import {
  buildMeta,
  buildLinks,
  breadcrumbJsonLd,
  jsonLdScript,
  webPageJsonLd,
  KEYWORDS_SERVICES,
} from "@/lib/seo";
import { DEFAULT_LOCALE, isLocale } from "@/lib/locale";

const services = [
  { icon: Search, code: "SVC-01", key: "svc01" },
  { icon: BadgeCheck, code: "SVC-02", key: "svc02" },
  { icon: Handshake, code: "SVC-03", key: "svc03" },
  { icon: ShieldCheck, code: "SVC-04", key: "svc04" },
  { icon: Factory, code: "SVC-05", key: "svc05" },
  { icon: Tags, code: "SVC-06", key: "svc06" },
  { icon: Warehouse, code: "SVC-07", key: "svc07" },
  { icon: Ship, code: "SVC-08", key: "svc08" },
  { icon: FileText, code: "SVC-09", key: "svc09" },
  { icon: Wrench, code: "SVC-10", key: "svc10" },
] as const;

const engagements: { key: string; featured: boolean }[] = [
  { key: "eng1", featured: false },
  { key: "eng2", featured: true },
  { key: "eng3", featured: false },
];

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

function ServicesContent() {
  const { t } = useTranslation();
  return (
    <>
      <section className="border-b border-line py-14 sm:py-20 lg:py-32">
        <div className="site-container">
          <Reveal>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="section-eyebrow">{t("services.capEyebrow")}</span>
                <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-heading md:text-5xl">
                  {t("services.capTitle")}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted-foreground md:text-base">
                {t("services.capCopy")}
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-2">
            {services.map(({ icon: Icon, code, key }, i) => (
              <Reveal key={code} delay={(i % 2) * 0.06}>
                <div className="panel h-full p-6 md:p-7">
                  <div className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center border border-line bg-black/40">
                      {/* Services route accent (NAV_ACCENTS.services.light). */}
                      <Icon className="size-5" style={{ color: "#60A5FA" }} />
                    </span>
                    <span className="mono text-[10px] uppercase tracking-widest text-sub-muted">{code}</span>
                  </div>
                  <p className="mt-6 text-[15px] font-semibold text-heading">{t(`services.${key}Title`)}</p>
                  <p
                    className="mono mt-1 text-[10px] uppercase tracking-widest"
                    style={{ color: "#60A5FA" }}
                  >
                    {t(`services.${key}Sub`)}
                  </p>
                  <p className="mt-3 text-[13px] leading-6 text-muted-foreground">{t(`services.${key}Copy`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line py-14 sm:py-20 lg:py-32">
        <div className="site-container">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="label-mono">{t("services.engEyebrow")}</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading md:text-5xl">
                {t("services.engTitle")}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                {t("services.engCopy")}
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:mt-14 md:grid-cols-3">
            {engagements.map((p) => {
              const items = t(`services.${p.key}Items`, { returnObjects: true }) as string[];
              return (
                <Reveal key={p.key}>
                  <div
                    className="panel h-full p-6 md:p-7"
                    style={
                      p.featured
                        ? {
                            boxShadow: "0 20px 60px -20px rgba(96,165,250,0.25)",
                            borderColor: "rgba(96,165,250,0.55)",
                          }
                        : undefined
                    }
                  >
                    <div className="flex items-center justify-between">
                      {/* Featured tag uses the services route accent (light blue)
                          instead of the default sig-blue badge tone. */}
                      <span
                        className={`status-badge ${p.featured ? "" : "tone-muted"}`}
                        style={
                          p.featured
                            ? {
                                color: "#60A5FA",
                                background: "rgba(96,165,250,0.10)",
                                borderColor: "rgba(96,165,250,0.35)",
                              }
                            : undefined
                        }
                      >
                        {t(`services.${p.key}Tag`)}
                      </span>
                      {p.featured && (
                        <span
                          className="mono text-[10px] uppercase tracking-widest"
                          style={{ color: "#60A5FA" }}
                        >
                          {t("services.recommended")}
                        </span>
                      )}
                    </div>
                    <p className="mt-6 text-lg font-semibold text-heading">{t(`services.${p.key}Title`)}</p>
                    <p className="mt-3 text-[13px] leading-6 text-muted-foreground">{t(`services.${p.key}Copy`)}</p>
                    <ul className="mt-6 space-y-2 border-t border-line pt-4">
                      {items.map((it) => (
                        <li key={it} className="mono flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground">
                          <span className="status-dot" style={{ background: "#10B981", color: "#10B981" }} />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:mt-14">
              <Link to="/contact" className="btn-primary">
                {t("services.ctaScope")} <ArrowUpRight className="size-3.5 rtl:-scale-x-100" />
              </Link>
              <Link to="/industries" className="btn-ghost-line">
                {t("services.ctaIndustries")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ServicesHeader() {
  const { t } = useTranslation();
  return (
    <InteriorPage
      code=""
      eyebrow={t("services.headerEyebrow")}
      title={t("services.headerTitle")}
      subtitle={t("services.headerSubtitle")}
      intro={t("services.headerIntro")}
    >
      <ServicesContent />
    </InteriorPage>
  );
}

export const Route = createFileRoute("/$lang/services")({
  head: (ctx) => {
    const p = ctx.params as { lang?: string } | undefined;
    const locale = isLocale(p?.lang) ? p.lang : DEFAULT_LOCALE;
    return {
      meta: buildMeta({
        path: "/services",
        locale,
        title: "China Sourcing, Trading & Logistics Services — AURIA",
        description:
          "AURIA offers end-to-end China services: sourcing agents, factory verification, quality control, private label / OEM, warehousing, consolidation and international logistics.",
        keywords: KEYWORDS_SERVICES,
      }),
      links: buildLinks("/services", locale),
      scripts: [
        jsonLdScript(
          breadcrumbJsonLd(
            [
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
            ],
            locale,
          ),
        ),
        jsonLdScript(
          webPageJsonLd({
            path: "/services",
            title: "China Sourcing, Trading & Logistics Services — AURIA",
            description:
              "AURIA offers end-to-end China services: sourcing agents, factory verification, quality control, private label / OEM, warehousing, consolidation and international logistics.",
            keywords: KEYWORDS_SERVICES,
            locale,
          }),
        ),
      ],
    };
  },
  component: ServicesHeader,
});
