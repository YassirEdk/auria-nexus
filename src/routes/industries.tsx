import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Cpu, Car, Shirt, Sofa, Sparkles, HardHat, ShoppingBag, Dumbbell,
  Baby, Utensils, ArrowUpRight,
} from "lucide-react";
import { InteriorPage } from "@/components/auria/InteriorPage";

const sectors = [
  {
    icon: Cpu,
    code: "IND-01",
    title: "Electronics & consumer tech",
    fr: "Électronique",
    hubs: "Shenzhen · Dongguan · Huizhou",
    copy: "PCBA, IoT devices, small appliances, accessories. FCC, CE, RoHS, RED compliance files handled alongside the shipment.",
  },
  {
    icon: Car,
    code: "IND-02",
    title: "Automotive & mobility parts",
    fr: "Pièces automobiles",
    hubs: "Ningbo · Wenzhou · Changchun",
    copy: "Aftermarket parts, EV accessories, tooling. IATF 16949 shops, PPAP documentation, batch traceability from casting to container.",
  },
  {
    icon: Shirt,
    code: "IND-03",
    title: "Fashion & textiles",
    fr: "Mode & textile",
    hubs: "Guangzhou · Hangzhou · Keqiao",
    copy: "Knit, woven, denim, activewear. BSCI-audited workshops, fabric labs, size-set fitting and OEKO-TEX certification.",
  },
  {
    icon: Sofa,
    code: "IND-04",
    title: "Furniture & home",
    fr: "Meuble & maison",
    hubs: "Foshan · Dongguan · Nantong",
    copy: "Case goods, upholstery, lighting, décor. Load testing, moisture control, container-optimized packaging for retail.",
  },
  {
    icon: Sparkles,
    code: "IND-05",
    title: "Beauty & personal care",
    fr: "Beauté & cosmétique",
    hubs: "Guangzhou · Shanghai",
    copy: "Skincare, haircare, tools and packaging. GMPC/ISO 22716 factories, EU/US formulation compliance, private-label brands.",
  },
  {
    icon: HardHat,
    code: "IND-06",
    title: "Industrial equipment & tooling",
    fr: "Équipement industriel",
    hubs: "Qingdao · Jinan · Wuxi",
    copy: "Machinery, hydraulics, hand tools, jigs. Factory acceptance tests, spare-parts kitting, technical documentation in EN/FR.",
  },
  {
    icon: ShoppingBag,
    code: "IND-07",
    title: "Retail & FMCG",
    fr: "Retail & grande conso",
    hubs: "Yiwu · Ningbo · Shantou",
    copy: "Promotional, seasonal and everyday-consumer categories. Multi-supplier consolidation, EAN/GS1, retail-ready packaging.",
  },
  {
    icon: Dumbbell,
    code: "IND-08",
    title: "Sports & outdoor",
    fr: "Sport & outdoor",
    hubs: "Xiamen · Quanzhou · Ningbo",
    copy: "Fitness, camping, cycling, water sports. Load and drop testing, EN 71 / EN 14682 safety compliance.",
  },
  {
    icon: Baby,
    code: "IND-09",
    title: "Baby, kids & toys",
    fr: "Bébé & jouets",
    hubs: "Shantou · Dongguan · Yiwu",
    copy: "Toys, care accessories, plush. EN 71, ASTM F963, CPSIA testing, phthalate and heavy-metal screening.",
  },
  {
    icon: Utensils,
    code: "IND-10",
    title: "Kitchenware & tabletop",
    fr: "Art de la table",
    hubs: "Chaozhou · Yangjiang · Jieyang",
    copy: "Ceramics, stainless steel, silicone, glass. Food-contact compliance (LFGB, FDA), thermal shock and dishwasher testing.",
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

function IndustriesContent() {
  return (
    <>
      <section className="border-b border-line py-24 lg:py-32">
        <div className="site-container">
          <Reveal>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="section-eyebrow">Sectors</span>
                <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-heading md:text-5xl">
                  Ten sectors. One operating stack.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted-foreground md:text-base">
                Commerce des entreprises en Chine — every sector has its own factory belts, certifications and failure modes. We map ours to yours.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {sectors.map(({ icon: Icon, code, title, fr, hubs, copy }, i) => (
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
                  <div className="mono mt-5 flex items-center gap-2 border-t border-line pt-3 text-[10px] uppercase tracking-widest text-sub-muted">
                    <span className="status-dot" style={{ background: "#3B82F6", color: "#3B82F6" }} />
                    hubs · {hubs}
                  </div>
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
              <span className="label-mono">/ 03·B Manufacturing map</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading md:text-5xl">
                The Chinese belts we cover.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                Every industry lives in a specific cluster. Choosing the right city is half the sourcing job.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { region: "Pearl River Delta", cities: "Shenzhen · Guangzhou · Dongguan · Foshan", strong: "Electronics, cosmetics, fashion, furniture" },
              { region: "Yangtze River Delta", cities: "Shanghai · Ningbo · Yiwu · Hangzhou", strong: "Small commodities, retail goods, textiles" },
              { region: "Bohai Rim", cities: "Qingdao · Tianjin · Jinan", strong: "Industrial machinery, tools, home appliances" },
              { region: "Southeast Coast", cities: "Xiamen · Quanzhou · Shantou · Chaozhou", strong: "Sports, footwear, toys, ceramics" },
            ].map((r) => (
              <Reveal key={r.region}>
                <div className="panel h-full p-6">
                  <span className="label-mono text-blue">{r.region}</span>
                  <p className="mono mt-3 text-[11px] uppercase tracking-widest text-heading">{r.cities}</p>
                  <p className="mt-4 border-t border-line pt-3 text-[13px] leading-6 text-muted-foreground">{r.strong}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact" className="btn-primary">
                Discuss your sector <ArrowUpRight className="size-3.5" />
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

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — AURIA" },
      { name: "description", content: "Cross-sector sourcing expertise in China: electronics, automotive, fashion, furniture, beauty, industrial, retail, sports and more." },
    ],
  }),
  component: () => (
    <InteriorPage
      code=""
      eyebrow="Industries"
      title="Cross-sector expertise,"
      subtitle="one operating stack in China."
      intro="Commerce des entreprises en Chine — our model adapts to different product specifications, factory belts, certifications and commercial realities across ten industries."
    >
      <IndustriesContent />
    </InteriorPage>
  ),
});
