import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Search, BadgeCheck, Handshake, ShieldCheck, Factory, Warehouse,
  Ship, FileText, Tags, Wrench, ArrowUpRight,
} from "lucide-react";
import { InteriorPage } from "@/components/auria/InteriorPage";

const services = [
  {
    icon: Search,
    code: "SVC-01",
    title: "Sourcing & supplier discovery",
    fr: "Sourcing usine",
    copy: "Shortlist of vetted Chinese manufacturers matched to your product spec, target price and destination market — Yiwu, Shenzhen, Guangzhou, Ningbo, Qingdao.",
  },
  {
    icon: BadgeCheck,
    code: "SVC-02",
    title: "Supplier verification & audit",
    fr: "Vérification fournisseur",
    copy: "Business license, factory visit, capacity check, compliance dossier and shipment history — every claim cross-signed before you commit.",
  },
  {
    icon: Handshake,
    code: "SVC-03",
    title: "Negotiation & purchasing",
    fr: "Négociation & achat",
    copy: "MOQ benchmarks, comparative RFQs, payment-term engineering and Incoterms defined against your working-capital constraints.",
  },
  {
    icon: ShieldCheck,
    code: "SVC-04",
    title: "Quality control & inspection",
    fr: "Contrôle qualité",
    copy: "AQL-based pre-shipment inspection, during-production checks and lab testing coordinated with SGS, BV or in-house inspectors.",
  },
  {
    icon: Factory,
    code: "SVC-05",
    title: "Production tracking",
    fr: "Suivi de production",
    copy: "Line-level milestones, tooling status and daily output signals per PO, with weekly evidence packs delivered to your inbox.",
  },
  {
    icon: Tags,
    code: "SVC-06",
    title: "Private label & OEM/ODM",
    fr: "Marque propre",
    copy: "Custom formulations, packaging, artwork, barcodes and manuals — from concept sample to compliant retail-ready product.",
  },
  {
    icon: Warehouse,
    code: "SVC-07",
    title: "Consolidation & warehousing",
    fr: "Consolidation Shanghai",
    copy: "Multi-supplier consolidation, palletization, labeling and export prep at the Shanghai and Shenzhen bonded nodes.",
  },
  {
    icon: Ship,
    code: "SVC-08",
    title: "Freight & logistics",
    fr: "Fret & logistique",
    copy: "FCL, LCL, air and rail bookings with door-to-door tracking across ocean, EU rail and cross-border truck lanes.",
  },
  {
    icon: FileText,
    code: "SVC-09",
    title: "Customs & compliance",
    fr: "Douane & conformité",
    copy: "HS classification, CE/RoHS/FCC files, certificates of origin, RCEP and EU CBAM prep — clean paperwork, no clearance surprises.",
  },
  {
    icon: Wrench,
    code: "SVC-10",
    title: "After-sales & warranty ops",
    fr: "SAV & garantie",
    copy: "Return-to-vendor coordination, rework, spare-parts programs and warranty claims managed directly with the Chinese factory.",
  },
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

function ServicesContent() {
  return (
    <>
      <section className="border-b border-line py-24 lg:py-32">
        <div className="site-container">
          <Reveal>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="section-eyebrow">Capabilities</span>
                <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-heading md:text-5xl">
                  Ten services. One operator on the ground in China.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted-foreground md:text-base">
                Commerce des entreprises en Chine — from the first RFQ in Yiwu to the final container discharged at your port, every step is executed by the same accountable team.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {services.map(({ icon: Icon, code, title, fr, copy }, i) => (
              <Reveal key={code} delay={(i % 2) * 0.06}>
                <div className="panel h-full p-6 md:p-7">
                  <div className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center border border-line bg-black/40">
                      <Icon className="size-5 text-blue" />
                    </span>
                    <span className="mono text-[10px] uppercase tracking-widest text-sub-muted">{code}</span>
                  </div>
                  <p className="mt-6 text-[15px] font-semibold text-heading">{title}</p>
                  <p className="mono mt-1 text-[10px] uppercase tracking-widest text-blue">{fr}</p>
                  <p className="mt-3 text-[13px] leading-6 text-muted-foreground">{copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line py-24 lg:py-32">
        <div className="site-container">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="label-mono">/ 02·B Engagement</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading md:text-5xl">
                Three ways to plug AURIA in.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                Composable modules on one evidence graph — engage on a single PO, a product line or as your full China office.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                tag: "Project",
                title: "One-off sourcing",
                copy: "You have a product, we run the sourcing → QC → shipping cycle once. Fixed scope, fixed fee.",
                items: ["Single product or SKU family", "3–4 supplier shortlist", "One inspection cycle", "Door-to-door delivery"],
              },
              {
                tag: "Retainer",
                title: "Product line partner",
                copy: "Recurring POs across one category. We hold the supplier relationships and evidence graph.",
                items: ["Monthly PO cadence", "Rolling QC + audit", "Consolidated shipments", "Quarterly cost review"],
                featured: true,
              },
              {
                tag: "Embedded",
                title: "Your China office",
                copy: "Full outsourced procurement, quality and logistics team operating under your brand.",
                items: ["Dedicated pod (3–6 people)", "Multi-category coverage", "Weekly evidence packs", "On-site factory presence"],
              },
            ].map((p) => (
              <Reveal key={p.title}>
                <div
                  className={`panel h-full p-6 md:p-7 ${p.featured ? "border-blue/60" : ""}`}
                  style={p.featured ? { boxShadow: "0 20px 60px -20px rgba(59,130,246,0.25)", borderColor: "rgba(59,130,246,0.55)" } : undefined}
                >
                  <div className="flex items-center justify-between">
                    <span className={`status-badge ${p.featured ? "tone-blue" : "tone-muted"}`}>{p.tag}</span>
                    {p.featured && (
                      <span className="mono text-[10px] uppercase tracking-widest text-blue">recommended</span>
                    )}
                  </div>
                  <p className="mt-6 text-lg font-semibold text-heading">{p.title}</p>
                  <p className="mt-3 text-[13px] leading-6 text-muted-foreground">{p.copy}</p>
                  <ul className="mt-6 space-y-2 border-t border-line pt-4">
                    {p.items.map((it) => (
                      <li key={it} className="mono flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground">
                        <span className="status-dot" style={{ background: "#10B981", color: "#10B981" }} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact" className="btn-primary">
                Scope a project <ArrowUpRight className="size-3.5" />
              </Link>
              <Link to="/how-we-work" className="btn-ghost-line">
                See our 5-step process
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — AURIA" },
      { name: "description", content: "End-to-end sourcing, verification, quality control, private label, consolidation and logistics services from China." },
    ],
  }),
  component: () => (
    <InteriorPage
      code=""
      eyebrow="Services"
      title="Factory-to-destination"
      subtitle="services from China."
      intro="Commerce des entreprises en Chine — a complete procurement operation deployed as composable modules on the AURIA evidence graph, from RFQ to delivery."
    >
      <ServicesContent />
    </InteriorPage>
  ),
});
