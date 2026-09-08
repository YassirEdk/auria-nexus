import { createFileRoute, Link } from "@tanstack/react-router";
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
  { city: "Shanghai", role: "Headquarters · consolidation node", detail: "Yangshan bonded warehouse, export ops, freight desk" },
  { city: "Shenzhen", role: "Electronics & hardware office", detail: "Huaqiangbei sourcing, PCBA audits, sample lab" },
  { city: "Guangzhou", role: "Consumer goods office", detail: "Fashion, beauty and home showrooms + factory pool" },
  { city: "Yiwu", role: "Small commodities office", detail: "International Trade City sourcing, multi-supplier POs" },
];

const values = [
  { icon: Shield, title: "Corroboration first", copy: "No single-source claims. Every event needs two independent signals before it enters your dossier." },
  { icon: Handshake, title: "One accountable operator", copy: "You get one contact and one contract — we handle every Chinese counterpart on your behalf." },
  { icon: Compass, title: "Neutral on the factory", copy: "We take no commission from suppliers. Our alignment is with your landed cost and quality, not their margin." },
  { icon: Languages, title: "Documents in your language", copy: "Specs, POs, evidence packs and inspection reports in English or French — not just Mandarin." },
];

function AboutContent() {
  return (
    <>
      <section className="border-b border-line py-14 sm:py-20 lg:py-32">
        <div className="site-container">
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <Reveal>
              <span className="section-eyebrow">Studio</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading md:text-5xl">
                Your China-based operator, not a broker.
              </h2>
              <p className="mt-6 text-[15px] leading-7 text-muted-foreground md:text-base">
                AURIA is an on-the-ground sourcing, quality and logistics team based in China, serving importers, brands and distributors in Europe, North Africa and the Gulf. We coordinate every relationship, every detail and every shipment from product brief to global delivery — under one contract, in your language.
              </p>
              <p className="mt-4 text-[15px] leading-7 text-muted-foreground md:text-base">
                Commerce des entreprises en Chine — nous ne sommes ni un intermédiaire ni une plateforme. Nous sommes votre équipe opérationnelle, présente physiquement dans les usines chinoises que vous ne pouvez pas visiter.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="panel p-6 md:p-8">
                <div className="flex items-center justify-between border-b border-line pb-3">
                  <span className="label-mono text-heading">AURIA · at a glance</span>
                  <span className="mono text-[10px] text-sub-muted">ORG-01</span>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-5 sm:gap-6">
                  {[
                    { l: "Founded", v: "2019" },
                    { l: "Team", v: "24 ops" },
                    { l: "Offices", v: "4 · CN" },
                    { l: "Clients served", v: "180+" },
                    { l: "Categories", v: "10 sectors" },
                    { l: "Languages", v: "EN · FR · ZH" },
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
                    hq · Shanghai
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
                <span className="section-eyebrow">Presence</span>
                <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-heading md:text-5xl">
                  Four offices across the Chinese manufacturing belts.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted-foreground md:text-base">
                We choose the office by product category, not by convenience. The person quoting your PO is the person walking the factory floor.
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
                  <p className="mt-4 text-[14px] font-semibold text-heading">{o.role}</p>
                  <p className="mt-2 border-t border-line pt-3 text-[13px] leading-6 text-muted-foreground">{o.detail}</p>
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
              <span className="section-eyebrow">Principles</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading md:text-5xl">
                How we operate, differently.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                Four principles keep us honest. They are also why our clients stay for more than one PO.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, copy }) => (
              <Reveal key={title}>
                <div className="panel h-full p-6 md:p-7">
                  <span className="grid size-10 place-items-center border border-line bg-black/40">
                    <Icon className="size-5 text-blue" />
                  </span>
                  <p className="mt-6 text-[15px] font-semibold text-heading">{title}</p>
                  <p className="mt-3 text-[13px] leading-6 text-muted-foreground">{copy}</p>
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
              <span className="section-eyebrow">Team</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading md:text-5xl">
                Sourcing engineers, not sales reps.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                Our team blends Chinese industrial experience with European retail and compliance standards. We speak the factory floor and the buyer's office equally well.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:mt-14 md:grid-cols-3">
            {[
              { role: "Sourcing engineers", detail: "Product-first, category specialists. They read technical drawings and BOMs before they read RFQs." },
              { role: "Quality inspectors", detail: "Trained on AQL, IPC-A-610, EN and ASTM standards. In-house team + partnerships with SGS and Bureau Veritas." },
              { role: "Logistics desk", detail: "Freight forwarders and customs specialists holding both Chinese export and EU import filings under one roof." },
            ].map((t) => (
              <Reveal key={t.role}>
                <div className="panel p-6 md:p-7">
                  <Users className="size-5 text-blue" />
                  <p className="mt-6 text-[15px] font-semibold text-heading">{t.role}</p>
                  <p className="mt-3 border-t border-line pt-3 text-[13px] leading-6 text-muted-foreground">{t.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:mt-14">
              <Link to="/contact" className="btn-primary">
                Talk to the team <ArrowUpRight className="size-3.5" />
              </Link>
              <Link to="/how-we-work" className="btn-ghost-line">
                See how we work
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — AURIA" },
      { name: "description", content: "AURIA is your China-based operating partner for global sourcing, production, quality control and logistics — offices in Shanghai, Shenzhen, Guangzhou and Yiwu." },
    ],
  }),
  component: () => (
    <InteriorPage
      code=""
      eyebrow="About"
      title="One accountable operator."
      subtitle="Zero blind spots in China."
      intro="Commerce des entreprises en Chine — AURIA works as an extension of your business, coordinating relationships, detail and execution from product brief to global delivery, backed by a corroborated signal graph."
    >
      <AboutContent />
    </InteriorPage>
  ),
});
