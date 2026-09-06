import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SiteLayout } from "./SiteShell";

const services = [
  { code: "01", title: "Global Sourcing",       lede: "Right product · right factory.",     copy: "Find the right products and manufacturers according to your requirements." },
  { code: "02", title: "Supplier Verification", lede: "Trust, verified.",                    copy: "Identify and verify reliable factories and suppliers." },
  { code: "03", title: "Negotiation",           lede: "Terms, engineered.",                  copy: "Secure competitive prices and favorable commercial conditions." },
  { code: "04", title: "Quality Control",       lede: "Nothing leaves China unchecked.",     copy: "Inspection and quality monitoring before products leave the factory." },
  { code: "05", title: "Private Label",         lede: "Your brand, built in Shenzhen.",      copy: "Develop products with custom branding, packaging and specifications." },
  { code: "06", title: "Product Development",   lede: "Idea → tooling → object.",           copy: "Turn ideas into manufactured products through Chinese production partners." },
  { code: "07", title: "Warehousing",           lede: "Consolidate. Then ship.",             copy: "Receive, store and consolidate goods from multiple suppliers." },
  { code: "08", title: "International Logistics", lede: "Anywhere in the world.",            copy: "Coordinate international transportation and delivery." },
];

const process = [
  ["01", "Brief"],
  ["02", "Source"],
  ["03", "Negotiate"],
  ["04", "Control"],
  ["05", "Deliver"],
] as const;

const sectors = [
  "Automotive", "Consumer Electronics", "Fashion & Textiles", "Home & Furniture",
  "Beauty & Cosmetics", "Industrial Equipment", "Construction", "Packaging",
  "Retail & E-commerce", "Hospitality",
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.27]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.4]);
  const titleScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.89]);
  const labelOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[857px] overflow-hidden" style={{ height: "100vh" }}>
      <motion.div
        style={{ scale: bgScale, opacity: bgOpacity }}
        className="absolute inset-0 will-change-transform"
      >
        <div className="noir-vignette absolute inset-0" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-40 mix-blend-screen"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
          }}
        />
      </motion.div>

      <div className="absolute inset-x-0 top-32 z-10 site-container">
        <div className="flex items-center justify-between">
          <p className="eyebrow"><span>/ 001</span><span className="opacity-40">China → Global</span></p>
          <p className="eyebrow hidden md:inline-flex"><span className="opacity-40">Ref</span><span>AUR-2026</span></p>
        </div>
      </div>

      <motion.div
        style={{ scale: titleScale }}
        className="relative z-20 flex h-full items-center justify-center px-6 will-change-transform"
      >
        <div className="relative text-center">
          <h1
            className="display font-black uppercase leading-[0.86] tracking-[-0.03em] text-[color:var(--off)]"
            style={{ fontSize: "clamp(3.5rem, 12vw, 15rem)" }}
          >
            Global<br />
            <span className="italic font-thin">trade</span>
          </h1>
          <motion.span
            style={{ opacity: labelOpacity }}
            className="mono absolute left-[calc(100%+1rem)] top-2 hidden text-[13px] uppercase tracking-[0.2em] text-[color:var(--off)]/60 lg:inline-block"
          >
            [ engineered<br />from China ]
          </motion.span>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-16 z-20 site-container">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <p className="max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
            A precision network for sourcing, manufacturing and logistics. AURIA operates as a single accountable partner between global operators and China&apos;s production base.
          </p>
          <div className="flex items-center gap-4 md:justify-end">
            <Link to="/contact" className="slab-btn text-white">
              Start a project <ArrowUpRight className="size-4" />
            </Link>
            <Link to="/" hash="services" className="circle-btn text-white">
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  return (
    <section id="company" className="relative flex min-h-screen items-center justify-center scroll-mt-20 bg-[color:var(--zinc)] px-6 py-32">
      <div className="site-container">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-6xl text-center display font-medium leading-[1.05] tracking-[-0.02em]"
          style={{ fontSize: "clamp(2rem, 5.4vw, 5rem)" }}
        >
          <span className="italic font-thin text-white/50">We</span> build supply chains that behave like <span className="italic font-thin text-white/50">infrastructure</span> — quiet, exact, and always <span className="italic font-thin text-white/50">on</span>.
        </motion.p>
        <div ref={ref} className="mx-auto mt-16 h-px w-full max-w-[320px] bg-white/30" style={{ transform: `scaleX(${inView ? 1 : 0})`, transformOrigin: "left", transition: "transform 1.4s cubic-bezier(0.16,1,0.3,1)" }} />
      </div>
    </section>
  );
}

function ServiceCard({ s, idx }: { s: (typeof services)[number]; idx: number }) {
  return (
    <Reveal delay={(idx % 2) * 0.08}>
      <Link to="/contact" className="card-work group block text-[color:var(--off)]">
        <div className="card-media absolute inset-0">
          <div className="absolute inset-0" style={{
            background:
              idx % 2 === 0
                ? "linear-gradient(135deg, #18181b 0%, #262626 60%, #0a0a0a 100%)"
                : "linear-gradient(220deg, #0f0f11 0%, #1a1a1d 60%, #050505 100%)",
          }} />
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />
          <span className="display absolute right-6 top-6 text-[6rem] font-thin italic leading-none text-white/10">{s.code}</span>
        </div>
        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
          <p className="eyebrow"><span>/ {s.code}</span><span className="opacity-40">service</span></p>
          <div className="card-meta">
            <p className="display italic font-thin text-white/50 text-lg">{s.lede}</p>
            <div className="mt-2 flex items-end justify-between gap-6">
              <h3 className="display font-medium leading-[0.95] tracking-tight text-4xl md:text-5xl">
                {s.title}
              </h3>
              <span className="card-cta circle-btn text-white shrink-0">
                <ArrowUpRight className="size-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

function SelectedWorks() {
  return (
    <section id="services" className="scroll-mt-20 bg-white px-6 py-24 text-black">
      <div className="site-container">
        <Reveal>
          <h2 className="display font-black uppercase leading-[0.86] tracking-[-0.03em]" style={{ fontSize: "clamp(2.75rem, 8vw, 9rem)" }}>
            Selected<br />
            <span className="italic font-thin">practice</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
          {services.map((s, i) => <ServiceCard key={s.code} s={s} idx={i} />)}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="scroll-mt-20 bg-black px-6 py-32">
      <div className="site-container">
        <Reveal>
          <p className="eyebrow">/ 04 Process</p>
          <h2 className="display mt-6 font-medium leading-[0.92] tracking-[-0.02em]" style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}>
            One clear <span className="italic font-thin text-white/50">path</span>.
          </h2>
        </Reveal>
        <div className="mt-20 grid gap-10 md:grid-cols-5">
          {process.map(([num, label], i) => (
            <Reveal key={num} delay={i * 0.08}>
              <div className="border-t border-white/30 pt-6">
                <p className="mono text-xs uppercase tracking-widest text-white/50">/ 0{i + 1}</p>
                <p className="display mt-6 text-3xl font-medium tracking-tight md:text-4xl">
                  {label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Sectors() {
  return (
    <section id="sectors" className="scroll-mt-20 overflow-hidden border-y border-white/10 bg-black py-10">
      <div className="marquee-track gap-16 pr-16">
        {[...sectors, ...sectors].map((s, i) => (
          <span key={i} className="display flex items-center gap-8 whitespace-nowrap text-4xl font-medium tracking-tight md:text-6xl">
            {s} <span className="text-white/20">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="border-t border-white/10 bg-black px-6 py-32" id="inquiry">
      <div className="site-container grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">
        <Reveal>
          <p className="eyebrow">/ 06 Contact</p>
          <h2 className="display mt-6 font-medium leading-[0.92] tracking-[-0.02em]" style={{ fontSize: "clamp(2rem, 5.4vw, 5.5rem)" }}>
            Tell us what<br /><span className="italic font-thin text-white/50">you need.</span>
          </h2>
          <p className="mono mt-10 space-y-2 text-xs uppercase tracking-widest text-white/50">
            <span className="block">Ops · China</span>
            <span className="block">Time · 24 / 7</span>
            <span className="block">Ping · hello@auria.trade</span>
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <form className="grid gap-8 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
            {[
              ["Full Name", "text", "Your name", false],
              ["Company", "text", "Company name", false],
              ["Business Email", "email", "name@company.com", false],
              ["Country", "text", "Country", false],
              ["What are you looking for?", "text", "Product or sourcing category", true],
              ["Estimated Order Volume", "text", "Quantity or budget", true],
            ].map(([label, type, placeholder, wide]) => (
              <label key={String(label)} className={`field-label ${wide ? "sm:col-span-2" : ""}`}>
                {label}
                <input
                  type={type as string}
                  placeholder={placeholder as string}
                  className="mt-1 border-b border-white/30 bg-transparent py-3 text-base text-white placeholder:text-white/30 focus:border-white focus:outline-none"
                />
              </label>
            ))}
            <label className="field-label sm:col-span-2">
              Message
              <textarea
                rows={5}
                placeholder="Specifications, timeline and destination"
                className="mt-1 border border-white/30 bg-transparent p-5 text-base text-white placeholder:text-white/30 focus:border-white focus:outline-none"
              />
            </label>
            <div className="sm:col-span-2">
              <button type="submit" className="slab-btn text-white">
                Send inquiry <ArrowUpRight className="size-4" />
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function AuriaHome() {
  return (
    <SiteLayout>
      <Hero />
      <Manifesto />
      <SelectedWorks />
      <Process />
      <Sectors />
      <ContactSection />
    </SiteLayout>
  );
}

export { services, process, sectors, ContactSection, Reveal };
