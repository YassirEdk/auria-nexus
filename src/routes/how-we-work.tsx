import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, FileSearch, ClipboardCheck, Factory, Ship, PackageCheck } from "lucide-react";
import { InteriorPage } from "@/components/auria/InteriorPage";

const steps = [
  {
    icon: FileSearch,
    step: "01",
    title: "Brief & specification",
    fr: "Cahier des charges",
    sla: "48h",
    body: "You share the product, target landed cost, destination market and volume plan. We translate it into a Chinese-language technical spec, HS pre-classification and a sourcing brief the factories can quote against.",
    signals: ["Product spec (EN + ZH)", "Target FOB / DDP", "Compliance targets", "Volume forecast"],
  },
  {
    icon: ClipboardCheck,
    step: "02",
    title: "Supplier shortlist & verification",
    fr: "Sélection & audit",
    sla: "7–10 days",
    body: "We shortlist 3–5 vetted manufacturers, run a business-license and capacity check, visit the factory floor in person, and cross-sign compliance and shipment history before you commit.",
    signals: ["Live factory visit", "Business + tax check", "Capacity + line audit", "Historical export records"],
  },
  {
    icon: Factory,
    step: "03",
    title: "Sample, negotiation & PO",
    fr: "Échantillon & commande",
    sla: "2–4 weeks",
    body: "Pre-production samples validated against spec, MOQ and price negotiated, payment terms and Incoterms engineered around your working capital. Purchase order signed in EN or FR with your name on the contract.",
    signals: ["Golden sample signed", "RFQ comparison sheet", "Payment terms (LC/TT)", "Bilingual PO"],
  },
  {
    icon: PackageCheck,
    step: "04",
    title: "Production tracking & QC",
    fr: "Production & contrôle",
    sla: "Continuous",
    body: "Weekly production evidence packs — photos, line-level milestones, tooling status. During-production and pre-shipment inspections (AQL 2.5) with defect telemetry logged to your dashboard before container release.",
    signals: ["Weekly evidence pack", "AQL 2.5 inspection", "Lab testing (SGS/BV)", "Non-conformance workflow"],
  },
  {
    icon: Ship,
    step: "05",
    title: "Consolidation, freight & delivery",
    fr: "Fret & livraison",
    sla: "Door-to-door",
    body: "Consolidation at Shanghai or Shenzhen, export documentation, container booking (FCL/LCL/air/rail), customs clearance at both ends and door-to-door tracking until receipt at your warehouse.",
    signals: ["Bonded consolidation", "Full export docs", "Lane risk monitoring", "Signed proof of delivery"],
  },
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

function HowWeWorkContent() {
  return (
    <>
      <section className="border-b border-line py-24 lg:py-32">
        <div className="site-container">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="section-eyebrow">Workflow</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading md:text-5xl">
                Five verified steps, from brief to warehouse.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                Commerce des entreprises en Chine — a transparent process where every step is documented, every claim is corroborated and every SLA is written down before we start.
              </p>
            </div>
          </Reveal>

          <div className="mx-auto mt-14 max-w-5xl">
            <ol className="relative border-l border-line">
              {steps.map(({ icon: Icon, step, title, fr, sla, body, signals }, i) => (
                <Reveal key={step} delay={i * 0.06}>
                  <li className="relative py-8 pl-10">
                    <span
                      className="absolute -left-[7px] top-10 size-3.5 rounded-full ring-4 ring-background"
                      style={{ background: "#3B82F6" }}
                    />
                    <div className="panel p-6 md:p-8">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-4">
                          <span className="grid size-10 place-items-center border border-line bg-black/40">
                            <Icon className="size-5 text-blue" />
                          </span>
                          <div>
                            <span className="mono text-[10px] uppercase tracking-widest text-sub-muted">STEP · {step}</span>
                            <p className="text-lg font-semibold text-heading md:text-xl">{title}</p>
                            <p className="mono text-[10px] uppercase tracking-widest text-blue">{fr}</p>
                          </div>
                        </div>
                        <span className="status-badge tone-blue">
                          <span className="status-dot" style={{ background: "#3B82F6", color: "#3B82F6" }} />
                          SLA · {sla}
                        </span>
                      </div>
                      <p className="mt-6 text-[14px] leading-7 text-muted-foreground md:text-[15px]">{body}</p>
                      <div className="mt-6 grid grid-cols-2 gap-2 border-t border-line pt-4 sm:grid-cols-4">
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
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-b border-line py-24 lg:py-32">
        <div className="site-container">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="section-eyebrow">Guarantees</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading md:text-5xl">
                What we commit to, in writing.
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { k: "Response time", v: "≤ 48h", label: "RFQ acknowledged and scoped" },
              { k: "Factory visits", v: "100%", label: "On-site before first PO" },
              { k: "Inspection", v: "AQL 2.5", label: "Pre-shipment on every order" },
              { k: "Evidence pack", v: "Weekly", label: "Photos, milestones, defect log" },
              { k: "Lane monitoring", v: "24/7", label: "Ocean, rail, air, tariff signals" },
              { k: "Working languages", v: "EN · FR · ZH", label: "Docs in your language, not just Mandarin" },
            ].map((it) => (
              <Reveal key={it.k}>
                <div className="panel p-6 md:p-7">
                  <span className="label-mono">{it.k}</span>
                  <p className="mono mt-3 text-3xl font-semibold text-blue">{it.v}</p>
                  <p className="mt-3 border-t border-line pt-3 text-[13px] leading-6 text-muted-foreground">{it.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact" className="btn-primary">
                Start a brief <ArrowUpRight className="size-3.5" />
              </Link>
              <Link to="/services" className="btn-ghost-line">
                See services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export const Route = createFileRoute("/how-we-work")({
  head: () => ({
    meta: [
      { title: "How we work — AURIA" },
      { name: "description", content: "A transparent five-step workflow from product brief to international delivery — with SLAs, evidence packs and on-site factory visits in China." },
    ],
  }),
  component: () => (
    <InteriorPage
      code=""
      eyebrow="Process"
      title="Brief to delivery,"
      subtitle="in five verified steps."
      intro="Commerce des entreprises en Chine — a transparent five-step workflow keeps every sourcing operation connected, accountable and moving forward on corroborated signals."
    >
      <HowWeWorkContent />
    </InteriorPage>
  ),
});
