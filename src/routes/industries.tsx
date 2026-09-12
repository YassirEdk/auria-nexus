import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import {
  Cpu, Car, Shirt, Sofa, Sparkles, HardHat, ShoppingBag, Dumbbell,
  Baby, Utensils, ArrowUpRight,
} from "lucide-react";
import { InteriorPage } from "@/components/auria/InteriorPage";
import { buildMeta, buildLinks, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

const sectors = [
  { icon: Cpu, code: "IND-01", key: "ind01", hubs: "Shenzhen · Dongguan · Huizhou" },
  { icon: Car, code: "IND-02", key: "ind02", hubs: "Ningbo · Wenzhou · Changchun" },
  { icon: Shirt, code: "IND-03", key: "ind03", hubs: "Guangzhou · Hangzhou · Keqiao" },
  { icon: Sofa, code: "IND-04", key: "ind04", hubs: "Foshan · Dongguan · Nantong" },
  { icon: Sparkles, code: "IND-05", key: "ind05", hubs: "Guangzhou · Shanghai" },
  { icon: HardHat, code: "IND-06", key: "ind06", hubs: "Qingdao · Jinan · Wuxi" },
  { icon: ShoppingBag, code: "IND-07", key: "ind07", hubs: "Yiwu · Ningbo · Shantou" },
  { icon: Dumbbell, code: "IND-08", key: "ind08", hubs: "Xiamen · Quanzhou · Ningbo" },
  { icon: Baby, code: "IND-09", key: "ind09", hubs: "Shantou · Dongguan · Yiwu" },
  { icon: Utensils, code: "IND-10", key: "ind10", hubs: "Chaozhou · Yangjiang · Jieyang" },
] as const;

const belts = [
  { key: "belt1", cities: "Shenzhen · Guangzhou · Dongguan · Foshan" },
  { key: "belt2", cities: "Shanghai · Ningbo · Yiwu · Hangzhou" },
  { key: "belt3", cities: "Qingdao · Tianjin · Jinan" },
  { key: "belt4", cities: "Xiamen · Quanzhou · Shantou · Chaozhou" },
] as const;

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

function IndustriesContent() {
  const { t } = useTranslation();
  return (
    <>
      <section className="border-b border-line py-14 sm:py-20 lg:py-32">
        <div className="site-container">
          <Reveal>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="section-eyebrow">{t("industries.sectorsEyebrow")}</span>
                <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-heading md:text-5xl">
                  {t("industries.sectorsTitle")}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted-foreground md:text-base">
                {t("industries.sectorsCopy")}
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-2">
            {sectors.map(({ icon: Icon, code, key, hubs }, i) => (
              <Reveal key={code} delay={(i % 2) * 0.06}>
                <div className="panel h-full p-6 md:p-7">
                  <div className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center border border-line bg-black/40">
                      <Icon className="size-5 text-blue" />
                    </span>
                    <span className="mono text-[10px] uppercase tracking-widest text-sub-muted">{code}</span>
                  </div>
                  <p className="mt-6 text-[15px] font-semibold text-heading">{t(`industries.${key}Title`)}</p>
                  <p className="mono mt-1 text-[10px] uppercase tracking-widest text-blue">{t(`industries.${key}Sub`)}</p>
                  <p className="mt-3 text-[13px] leading-6 text-muted-foreground">{t(`industries.${key}Copy`)}</p>
                  <div className="mono mt-5 flex items-center gap-2 border-t border-line pt-3 text-[10px] uppercase tracking-widest text-sub-muted">
                    <span className="status-dot" style={{ background: "#3B82F6", color: "#3B82F6" }} />
                    {t("industries.hubsLabel")} · {hubs}
                  </div>
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
              <span className="section-eyebrow">{t("industries.mapEyebrow")}</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading md:text-5xl">
                {t("industries.mapTitle")}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                {t("industries.mapCopy")}
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
            {belts.map((r) => (
              <Reveal key={r.key}>
                <div className="panel h-full p-6">
                  <span className="label-mono text-blue">{t(`industries.${r.key}Region`)}</span>
                  <p className="mono mt-3 text-[11px] uppercase tracking-widest text-heading">{r.cities}</p>
                  <p className="mt-4 border-t border-line pt-3 text-[13px] leading-6 text-muted-foreground">{t(`industries.${r.key}Strong`)}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:mt-14">
              <Link to="/contact" className="btn-primary">
                {t("industries.ctaDiscuss")} <ArrowUpRight className="size-3.5 rtl:-scale-x-100" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function IndustriesHeader() {
  const { t } = useTranslation();
  return (
    <InteriorPage
      code=""
      eyebrow={t("industries.headerEyebrow")}
      title={t("industries.headerTitle")}
      subtitle={t("industries.headerSubtitle")}
      intro={t("industries.headerIntro")}
    >
      <IndustriesContent />
    </InteriorPage>
  );
}

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: buildMeta({
      path: "/industries",
      title: "Industries — China Product Sourcing by Sector · AURIA",
      description:
        "Cross-sector China sourcing: electronics, automotive parts, fashion & textiles, furniture, beauty, industrial hardware, retail, sports and baby products.",
      keywords: [
        "china electronics sourcing",
        "china automotive parts",
        "china fashion manufacturer",
        "china furniture supplier",
        "china beauty products",
        "china industrial sourcing",
        "china retail sourcing",
      ],
    }),
    links: buildLinks("/industries"),
    scripts: [
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ])
      ),
    ],
  }),
  component: IndustriesHeader,
});
