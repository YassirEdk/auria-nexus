import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { ArrowUpRight, MapPin, Users, Languages, Shield, Compass, Handshake } from "lucide-react";
import { InteriorPage } from "@/components/auria/InteriorPage";

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

const offices = [
  { city: "Shanghai", key: "Shanghai" },
  { city: "Shenzhen", key: "Shenzhen" },
  { city: "Guangzhou", key: "Guangzhou" },
  { city: "Yiwu", key: "Yiwu" },
] as const;

const values = [
  { icon: Shield, key: "value1" },
  { icon: Handshake, key: "value2" },
  { icon: Compass, key: "value3" },
  { icon: Languages, key: "value4" },
] as const;

const teamRoles = ["team1", "team2", "team3"] as const;

function AboutContent() {
  const { t } = useTranslation();
  return (
    <>
      <section className="border-b border-line py-14 sm:py-20 lg:py-32">
        <div className="site-container">
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <Reveal>
              <span className="section-eyebrow">{t("about.studioEyebrow")}</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading md:text-5xl">
                {t("about.studioTitle")}
              </h2>
              <p className="mt-6 text-[15px] leading-7 text-muted-foreground md:text-base">
                {t("about.studioP1")}
              </p>
              <p className="mt-4 text-[15px] leading-7 text-muted-foreground md:text-base">
                {t("about.studioP2")}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="panel p-6 md:p-8">
                <div className="flex items-center justify-between border-b border-line pb-3">
                  <span className="label-mono text-heading">{t("about.glanceTitle")}</span>
                  <span className="mono text-[10px] text-sub-muted">ORG-01</span>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-5 sm:gap-6">
                  {[
                    { l: t("about.glanceFounded"), v: "2019" },
                    { l: t("about.glanceTeam"), v: t("about.glanceTeamV") },
                    { l: t("about.glanceOffices"), v: t("about.glanceOfficesV") },
                    { l: t("about.glanceClients"), v: "180+" },
                    { l: t("about.glanceCategories"), v: t("about.glanceCategoriesV") },
                  ].map((k) => (
                    <div key={k.l}>
                      <p className="label-mono">{k.l}</p>
                      <p className="mono mt-2 text-xl font-semibold text-blue sm:text-2xl">{k.v}</p>
                    </div>
                  ))}
                </div>
                <div className="mono mt-8 flex items-center justify-between border-t border-line pt-3 text-[10px] uppercase tracking-widest text-sub-muted">
                  <span className="inline-flex items-center gap-2">
                    <span className="status-dot" style={{ background: "#10B981", color: "#10B981" }} />
                    {t("about.glanceHq")}
                  </span>
                  <span>lat 31.23 · lng 121.47</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-line py-14 sm:py-20 lg:py-32">
        <div className="site-container">
          <Reveal>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="section-eyebrow">{t("about.presenceEyebrow")}</span>
                <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-heading md:text-5xl">
                  {t("about.presenceTitle")}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted-foreground md:text-base">
                {t("about.presenceCopy")}
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
            {offices.map((o) => (
              <Reveal key={o.city}>
                <div className="panel h-full p-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-blue" />
                    <span className="mono text-[11px] uppercase tracking-widest text-blue">{o.city}</span>
                  </div>
                  <p className="mt-4 text-[14px] font-semibold text-heading">{t(`about.office${o.key}Role`)}</p>
                  <p className="mt-2 border-t border-line pt-3 text-[13px] leading-6 text-muted-foreground">
                    {t(`about.office${o.key}Detail`)}
                  </p>
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
              <span className="section-eyebrow">{t("about.principlesEyebrow")}</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading md:text-5xl">
                {t("about.principlesTitle")}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                {t("about.principlesCopy")}
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2">
            {values.map(({ icon: Icon, key }) => (
              <Reveal key={key}>
                <div className="panel h-full p-6 md:p-7">
                  <span className="grid size-10 place-items-center border border-line bg-black/40">
                    <Icon className="size-5 text-blue" />
                  </span>
                  <p className="mt-6 text-[15px] font-semibold text-heading">{t(`about.${key}Title`)}</p>
                  <p className="mt-3 text-[13px] leading-6 text-muted-foreground">{t(`about.${key}Copy`)}</p>
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
              <span className="section-eyebrow">{t("about.teamEyebrow")}</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading md:text-5xl">
                {t("about.teamTitle")}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                {t("about.teamCopy")}
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:mt-14 md:grid-cols-3">
            {teamRoles.map((r) => (
              <Reveal key={r}>
                <div className="panel p-6 md:p-7">
                  <Users className="size-5 text-blue" />
                  <p className="mt-6 text-[15px] font-semibold text-heading">{t(`about.${r}Role`)}</p>
                  <p className="mt-3 border-t border-line pt-3 text-[13px] leading-6 text-muted-foreground">
                    {t(`about.${r}Detail`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:mt-14">
              <Link to="/contact" className="btn-primary">
                {t("about.ctaTalk")} <ArrowUpRight className="size-3.5 rtl:-scale-x-100" />
              </Link>
              <Link to="/how-we-work" className="btn-ghost-line">
                {t("about.ctaSee")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function AboutHeader() {
  const { t } = useTranslation();
  return (
    <InteriorPage
      code=""
      eyebrow={t("about.headerEyebrow")}
      title={t("about.headerTitle")}
      subtitle={t("about.headerSubtitle")}
      intro={t("about.headerIntro")}
    >
      <AboutContent />
    </InteriorPage>
  );
}

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — AURIA" },
      { name: "description", content: "AURIA is your China-based operating partner for global sourcing, production, quality control and logistics — offices in Shanghai, Shenzhen, Guangzhou and Yiwu." },
    ],
  }),
  component: AboutHeader,
});
